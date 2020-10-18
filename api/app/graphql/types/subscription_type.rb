class Types::GetRoomType < Subscriptions::BaseSubscription
  payload_type Types::RoomType
  argument :room_id, ID, required: true

  def subscribe(room_id:)
    context[:current_room_player] = RoomPlayer.find_by(room_id: room_id, user: context[:current_user])
    Room.find(room_id)
  end

  def update(room_id:)
    context[:current_room_player] = RoomPlayer.find_by(room_id: room_id, user: context[:current_user])
    Room.find(room_id)
  end

end

class Types::SubscriptionType < GraphQL::Schema::Object
  extend GraphQL::Subscriptions::SubscriptionRoot

  field :get_room, subscription: Types::GetRoomType
end
