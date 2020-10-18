require 'rails_helper'

RSpec.describe Gameplay do
  describe '#start_game' do
    let!(:user) { User.create!(name: 'bob', balance: 100, password: '1') }
    let!(:another_user) { User.create!(name: 'maria', balance: 200, password: '1') }

    it 'creates new current game' do
      room, _room_players =
        create_room_bundle([user, another_user], name: 'name', small_blind: 5, big_blind: 10)

      Gameplay.start_game(room.id)

      room.reload
      expect(room.current_game_id).not_to be_nil
    end

    it 'sets correct player balances' do
      room, room_players =
        create_room_bundle([user, another_user], name: 'name', small_blind: 5, big_blind: 10)
      first_player, second_player = room_players

      Gameplay.start_game(room.id)

      room.reload
      game = room.current_game

      expect(game.state[:players].values).to contain_exactly(
        hash_including(id: first_player.id, balance: 100 - 5), # small blind
        hash_including(id: second_player.id, balance: 200 - 10) # big blind
      )
    end

    it do
      room, room_players =
        create_room_bundle([user, another_user], name: 'name', small_blind: 5, big_blind: 10)
      first_player, second_player = room_players
      create_current_game(room, room_players) # first player is small blind

      expect { Gameplay.start_game(room.id) }
        .to change { room.reload.current_game.state[:players].values }
        .from(
          contain_exactly(
            hash_including(id: first_player.id, position: :SB),
            hash_including(id: second_player.id, position: :BB)
          )
        )
        .to(
          contain_exactly(
            hash_including(id: first_player.id, position: :BB),
            hash_including(id: second_player.id, position: :SB)
          )
        )
    end
  end

  def create_room_bundle(users, **room_attributes)
    room = Room.create!(room_attributes)
    room_players = users.map.with_index do |user, i|
      RoomPlayer.create!(
        user: user,
        room: room,
        balance: user.balance,
        active: true,
        bot_strategy: :none,
        seat_number: i
      )
    end

    [room, room_players]
  end

  def create_current_game(room, room_players)
    players = room_players.map { |o| o.slice(:id, :balance) }.map(&:symbolize_keys)
    game_state =
      PokerEngine::Game.start(players, small_blind: room.small_blind,
                                       big_blind: room.big_blind,
                                       deck_seed: 1)

    game = Game.create!(state: game_state, room: room)
    room.update!(current_game: game)

    game
  end

  def update_game_with_move(game, move:, bet:)
    new_state = PokerEngine::Game.next(game.state, player_id: game.state[:current_player_id],
                                                   type: move,
                                                   bet: bet)
    game.update!(state: new_state)
  end
end
