module Types
  HIDDEN_CARD_RANK = 'hidden'

  class RoomType < Types::BaseObject
    field :id, ID, null: false
    field :name, ID, null: false

    field :current_game, Types::GameType, null: false
    field :move_time_limit, Integer, null: false
    def move_time_limit
      Gameplay::MOVE_TIME_LIMIT
    end

    field :users, [UserType], null: false
    def users
      User.find(object.players.pluck(:user_id))
    end

  end
end
