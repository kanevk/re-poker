require 'rails_helper'

RSpec.describe 'Room query', type: :queries do
  # A fake implementation of the context[:channel] required in order subscriptions to work
  let(:channel) do
    double('channel', stream_from: Object.new)
  end

  it 'returns the requested room' do
    query = <<~GRAPHQL
      subscription ($roomId: ID!) {
        getRoom(roomId: $roomId) {
          id
          currentGame {
            id
            version
            currentPlayer {
              id
            }
            currentStage
            isFinished
            smallBlind
            bigBlind
            pot
            boardCards { rank color }
            players {
              id
              name
              avatarUrl
              balance
              position
              seatNumber
            }
          }
        }
      }
    GRAPHQL

    user = User.create!(name: 'bob', balance: 100, password: '1')
    another_user = User.create!(name: 'maria', balance: 200, password: '1')

    players = [
      { id: user.id, balance: 100 },
      { id: another_user.id, balance: 200 },
    ]

    room = Room.create!(name: 'name', small_blind: 5, big_blind: 10)

    game_state = PokerEngine::Game.start(players, small_blind: room.small_blind,
                                                           big_blind: room.big_blind,
                                                           deck_seed: rand(1..1_000))
    game = Game.create!(state: game_state, room: room, version: SecureRandom.uuid)
    room.update!(current_game: game, seats: [user.id, another_user.id])

    response = graphql_execute(query, variables: { 'roomId' => room.id }, context: { current_user: user, channel: channel })

    game.reload

    expect(response).to resolve_successfully('getRoom').with({
      'id' => room.id.to_s,
      'currentGame' => {
        'id' => game.id.to_s,
        'version' => game.version,
        'currentPlayer' => {
          'id' => user.id.to_s,
        },
        'currentStage' => 'preflop',
        'isFinished' => false,
        'smallBlind' => 5.0,
        'bigBlind' => 10.0,
        'pot' => 15.0,
        'boardCards' => [],
        'players' => contain_exactly(
          {
            'id' => user.id.to_s,
            'name' => 'bob',
            'avatarUrl' => nil,
            'balance' => 95.0,
            'position' => 'SB',
            'seatNumber' => 0,
          },
          {
            'id' => another_user.id.to_s,
            'name' => 'maria',
            'avatarUrl' => nil,
            'balance' => 190.0,
            'position' => 'BB',
            'seatNumber' => 1,
          },
        )
      }
    })
  end

  it "players' cards are obfuscated" do
    query = <<~GRAPHQL
      subscription ($roomId: ID!) {
        getRoom(roomId: $roomId) {
          id
          currentGame {
            id
            players {
              id
              cards { rank color }
            }
          }
        }
      }
    GRAPHQL

    user = User.create!(name: 'bob', balance: 100, password: '1')
    another_user = User.create!(name: 'maria', balance: 200, password: '1')
    players = [ { id: user.id, balance: 100 }, { id: another_user.id, balance: 200 } ]

    room = Room.create!(name: 'name', small_blind: 5, big_blind: 10)
    game_state = PokerEngine::Game.start(players, small_blind: room.small_blind,
                                                  big_blind: room.big_blind,
                                                  deck_seed: rand(1..1_000))
    game = Game.create!(state: game_state, room: room, version: SecureRandom.uuid)
    room.update!(current_game: game, seats: [user.id, another_user.id])

    response = graphql_execute(query, variables: { 'roomId' => room.id }, context: { current_user: user, channel: channel })

    game.reload

    expect(response).to resolve_successfully('getRoom').with({
      'id' => room.id.to_s,
      'currentGame' => {
        'id' => game.id.to_s,
        'players' => contain_exactly(
          {
            'id' => user.id.to_s,
            'cards' => [{ 'color' => nil, 'rank' => 'hidden' }, { 'color' => nil, 'rank' => 'hidden' }],
          },
          {
            'id' => another_user.id.to_s,
            'cards' => [{ 'color' => nil, 'rank' => 'hidden' }, { 'color' => nil, 'rank' => 'hidden' }],
          },
        )
      }
    })
  end
end
