class CreateRoomPlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :room_players do |t|
      t.belongs_to :user, foreign_key: true, index: true, null: true
      t.belongs_to :room, foreign_key: true, index: true, null: false
      t.decimal :balance, precision: 15, scale: 2, null: false
      t.boolean :active, null: false
      t.string :bot_strategy, null: false
      t.integer :seat_number, null: false
    end
  end
end
