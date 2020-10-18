module Types
  HIDDEN_CARD_RANK = 'hidden'

  class CardType < Types::BaseObject
    field :rank, String, null: false # TODO: move to enum
    field :color, String, null: true # TODO: move to enum
  end

  class PlayerType < Types::BaseObject
    OBJECT = Struct.new(:id, :name, :active, :balance, :money_in_pot,
                        :seat_number, :position, :avatar_url, :cards, :is_in_turn,
                        keyword_init: true) do

      def initialize(**kwargs)
        super(kwargs.slice(*members))
      end
    end

    field :id, ID, null: false
    field :name, String, null: false
    field :active, Boolean, null: false
    field :balance, Integer, null: true
    field :money_in_pot, Integer, null: true
    field :seat_number, Int, null: true
    field :position, String, null: true # TODO: move to enum
    field :avatar_url, String, null: true
    field :cards, [CardType], null: true
    field :is_in_turn, Boolean, null: false
  end

  class GameType < Types::BaseObject
    field :id, ID, null: false
    field :version, ID, null: false

    field :current_player, PlayerType, null: true
    def current_player
      room_player = RoomPlayer.find_by(user: @context[:current_user], room_id: @object.room_id)

      return unless room_player

      resolve_player(@object.state[:players][room_player.id])
    end

    field :current_stage, String, null: true
    def current_stage
      @object.state[:current_stage]
    end

    field :board_cards, [CardType], null: false
    def board_cards
      @object.state[:board]
    end

    field :is_finished, Boolean, null: false
    def is_finished
      @object.state[:game_ended]
    end

    field :just_started, Boolean, null: false
    def just_started
      true
    end

    field :big_blind, Integer, null: false
    def big_blind
      @object.state[:big_blind]
    end

    field :small_blind, Integer, null: false
    def small_blind
      @object.state[:small_blind]
    end

    field :pot, Integer, null: false
    def pot
      @object.state[:pot]
    end

    field :players, [PlayerType], null: true
    def players
      @object
        .state[:players].values.map do |player|
          player.merge(cards: [
            { rank: HIDDEN_CARD_RANK }, { rank: HIDDEN_CARD_RANK }
          ])
        end
        .map(&method(:resolve_player))
        .sort_by(&:seat_number)
    end

    private

    def resolve_player(player_data)
      @context[:room_player_by_id] ||=
        RoomPlayer.includes(:user).find(@object.state[:players].keys).map { |o| [o.id, o] }.to_h

      id = player_data.fetch(:id)
      room_player = @context[:room_player_by_id][id]

      fields = player_data.merge(
        name: room_player.user.name,
        seat_number: room_player.seat_number,
        is_in_turn: @object.state[:current_player_id] == id,
        avatar_url: nil
      )

      Types::PlayerType::OBJECT.new(**fields)
    end
  end

  class RoomType < Types::BaseObject
    field :id, ID, null: false
    field :name, ID, null: false

    field :current_game, Types::GameType, null: false
    field :move_time_limit, Integer, null: false
    def move_time_limit
      Gameplay::MOVE_TIME_LIMIT
    end

  end
end
