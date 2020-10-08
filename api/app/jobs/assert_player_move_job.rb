class AssertPlayerMoveJob
  include Sidekiq::Worker

   sidekiq_options retry: false

  def perform(kwargs = {})
    kwargs.symbolize_keys!

    game_version = kwargs.fetch(:game_version)
    player_id = kwargs.fetch(:player_id)

    game = Gameplay.make_move(game_version, player_id: player_id, move: :fold)

    ApiSchema.subscriptions.trigger(:get_room, { room_id: game.room_id }, nil)
  end
end
