class AssertPlayerMoveJob < ApplicationJob
  def perform(game_version:, player_id:)
    game = Gameplay.make_move(game_version, player_id: player_id, move: :fold)

    ApiSchema.subscriptions.trigger(:get_room, { room_id: game.room_id }, nil)
  end
end
