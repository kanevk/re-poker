module Types
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
end
