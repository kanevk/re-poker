class AddConstraintsToUsersAndPlayers < ActiveRecord::Migration[6.0]
  def change
    add_index :users, :name, name: 'users_on_name_idx', unique: true
    add_index :room_players, [:user_id, :room_id], name: 'room_players_on_user_id_and_room_id_idx',
                                                   unique: true
  end
end
