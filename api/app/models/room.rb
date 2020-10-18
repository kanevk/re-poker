# == Schema Information
#
# Table name: rooms
#
#  id              :bigint           not null, primary key
#  name            :string
#  small_blind     :decimal(15, 2)
#  big_blind       :decimal(15, 2)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  current_game_id :bigint
#
class Room < ApplicationRecord
  belongs_to :current_game, class_name: 'Game', optional: true
  has_many :players, class_name: 'RoomPlayer'
end
