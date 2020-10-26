module Types
  class CardType < Types::BaseObject
    field :rank, String, null: false # TODO: move to enum
    field :color, String, null: true # TODO: move to enum
  end
end
