class StartNewGameJob < ApplicationJob
  def perform(room_id:)
    Gameplay.start_game(room_id)

    ApiSchema.subscriptions.trigger(:get_room, { room_id: room_id }, nil)
  end
end
