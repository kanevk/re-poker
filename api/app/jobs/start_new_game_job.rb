class StartNewGameJob
  include Sidekiq::Worker

   sidekiq_options retry: false

  def perform(kwargs = {})
    kwargs.symbolize_keys!
    room_id = kwargs.fetch(:room_id)

    Gameplay.start_game(room_id)

    ApiSchema.subscriptions.trigger(:get_room, { room_id: room_id }, nil)
  end
end
