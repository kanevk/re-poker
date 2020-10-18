# == Schema Information
#
# Table name: room_players
#
#  id           :bigint           not null, primary key
#  user_id      :bigint
#  room_id      :bigint           not null
#  balance      :decimal(15, 2)   not null
#  active       :boolean          not null
#  bot_strategy :string           not null
#  seat_number  :integer          not null
#
class RoomPlayer < ApplicationRecord
  enum bot_strategy: { none: 'none' }, _suffix: true

  scope :active, -> { where(active: true) }

  belongs_to :user
  belongs_to :room
end
