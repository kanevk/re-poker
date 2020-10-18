users =
  %w(bob player42 game_over u-r-going-down bOOb3 next_turn hangover night-n-day).map do |name|
    User.create!(name: name, password: '1', balance: rand(100.00..2000.0))
  end


%w(heaven ocean river cotton salt sugar blue red).each_with_index do |room_name, room_index|
  subset_users = users.shuffle[0..5]

  room = Room.create!(name: room_name, small_blind: 5, big_blind: 10)
  room_players = subset_users.map.with_index do |u, i|
    RoomPlayer.create!(
      user: u,
      balance: u.balance / 4,
      room: room,
      active: false,
      bot_strategy: :none,
      seat_number: i
    )
  end

  players = room_players.map { |rp| rp.slice(:id, :balance).symbolize_keys }
  game_state = PokerEngine::Game.start(players, small_blind: room.small_blind,
                                                big_blind: room.big_blind,
                                                deck_seed: room_index)
  game = Game.create!(state: game_state, room: room)

  room.update!(current_game: game)
end
