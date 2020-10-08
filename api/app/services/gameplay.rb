module Gameplay
  def self.start_game(room_id)
    room = Room.find(room_id)
    players = User.find(room.seats).map { |u| { id: u.id, balance: u.balance } }

    seed = (SecureRandom.rand * 100_000).to_i

    state =
      PokerEngine::Game.start(players, small_blind: room.small_blind,
                                       big_blind: room.small_blind,
                                       deck_seed: seed)
    game = Game.create!(room: room, state: state)
    room.update!(current_game: game)

    AssertPlayerMoveJob.perform_in(15.seconds, game_version: game.version, player_id: state[:last_action][:player_id])
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
    game.update_state(new_state)

    if new_state[:game_ended]
      StartNewGameJob.perform_async(room_id: game.room_id)
    else
      AssertPlayerMoveJob.perform_in(15.seconds, game_version: game.version, player_id: new_state[:last_action][:player_id])
    end

    game
  end
end
