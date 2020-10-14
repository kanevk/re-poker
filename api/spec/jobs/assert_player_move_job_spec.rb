require 'rails_helper'

RSpec.describe AssertPlayerMoveJob do
  let!(:users) do
    Array.new(2) { |i| User.create!(name: "name-#{i}", balance: 100, password: '1') }
  end
  let!(:room) do
    Room.create!(name: 'name', small_blind: 5, big_blind: 10, seats: users.map(&:id) )
  end
  let!(:game) { create_game(room: room, users: users) }

  before do
    allow(Gameplay).to receive(:make_move).and_return(game)
    allow(ApiSchema.subscriptions).to receive(:trigger)
  end

  it do
    expect(ApiSchema.subscriptions).to receive(:trigger).with(:get_room, { room_id: game.room_id }, nil)

    Sidekiq::Testing.inline! do
      AssertPlayerMoveJob.perform_later(game_version: game.version, player_id: game.state[:current_player_id])
    end
  end

  it do
    expect(Gameplay)
      .to receive(:make_move).with(game.version, player_id: game.state[:current_player_id], move: :fold)

    Sidekiq::Testing.inline! do
      AssertPlayerMoveJob.perform_later(game_version: game.version, player_id: game.state[:current_player_id])
    end
  end

  it 'raises an exception when the game version has changed' do
    allow(Gameplay).to receive(:make_move).and_raise(ActiveRecord::RecordNotFound)

    Sidekiq::Testing.inline! do
      expect do
        AssertPlayerMoveJob.perform_later(game_version: 'next-version',
                                          player_id: game.state[:current_player_id])
      end.to raise_exception(ActiveRecord::RecordNotFound)
    end
  end

  def create_game(room:, users:)
    players = users.map { |u| { id: u.id, balance: u.balance } }

    state =
      PokerEngine::Game.start(players, small_blind: room.small_blind,
                                       big_blind: room.small_blind,
                                       deck_seed: 10)
    game = Game.create!(room: room, state: state)
    room.update!(current_game: game)

    game.reload
  end
end

