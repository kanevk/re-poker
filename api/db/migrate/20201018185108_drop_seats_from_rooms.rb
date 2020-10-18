class DropSeatsFromRooms < ActiveRecord::Migration[6.0]
  def change
    remove_column :rooms, :seats, :integer, array: true, null: false, default: []
  end
end
