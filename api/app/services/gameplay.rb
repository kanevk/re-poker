module Gameplay
  MOVE_TIME_LIMIT = 5.seconds

  def self.start_game(room_id)
    room = Room.find(room_id)
    room_players = room.players

    return unless room_players.any?(&:active)

    players =
      # TODO: Extend for cases when players join and leaving the room
      if room.current_game
        ops = PokerEngine::StateOperations.new(room.current_game.state)
        # FIXME: this works for preflop only
        index_by_player_id = ops.ordered_player_ids.rotate.map.with_index.to_h

        room_players
          .each_with_object([]) { |pl, arr| arr[index_by_player_id.fetch(pl.id)] = pl }
          .map { |pl| { id: pl.id, balance: pl.balance } }
      else
        room_players.order(:seat_number).map { |pl| { id: pl.id, balance: pl.balance } }
      end

    state =
      PokerEngine::Game.start(players, small_blind: room.small_blind,
                                       big_blind: room.big_blind,
                                       deck_seed: (SecureRandom.rand * 100_000).to_i)
    game = Game.create!(room: room, state: state)
    room.update!(current_game: game)

    AssertPlayerMoveJob.set(wait: MOVE_TIME_LIMIT)
                       .perform_later(game_version: game.version, player_id: state[:last_action][:player_id])
    true
  end

  def self.make_move(game_version, player_id:, move:, bet: nil)
    game = Game.lock("FOR UPDATE NOWAIT").find_by!(version: game_version)

    new_state = nil
    Timeout.timeout(100) do
      new_state = PokerEngine::Game.next(game.state, player_id: game.state[:current_player_id],
                                                     type: move,
                                                     bet: bet)
    end
    # TODO: sync users balances
    game.update!(state: new_state)

    if new_state[:game_ended]
      StartNewGameJob.perform_later(room_id: game.room_id)
    else
      AssertPlayerMoveJob.set(wait: MOVE_TIME_LIMIT)
                         .perform_later(game_version: game.version,
                                        player_id: new_state[:last_action][:player_id])
    end

    game
  end
end
