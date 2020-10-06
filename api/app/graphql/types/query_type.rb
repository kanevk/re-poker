module Types
  class QueryType < Types::BaseObject
    field :is_authenticated, Boolean, null: false
    def is_authenticated
      !!context[:current_user]
    end

    field :rooms, [Types::RoomType], null: false

    def rooms
      Room.all
    end
  end
end
