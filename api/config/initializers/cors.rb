Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # TODO: add production
    # origins 'localhost:3001', 'https://kanevk.github.io'
    origins '*'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
