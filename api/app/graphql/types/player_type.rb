module Types
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
end
