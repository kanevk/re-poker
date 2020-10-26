# Re-poker API

## Setup

Before start, make sure you have the following installed: `bundler, docker, docker-compose`

* Enter the `api` folder
```
cd api
```
* Set/Install correct Ruby version >= 2.6
With rbenv:
```
rbenv use
```
**Note: If you use another ruby version manager use it to install Ruby with version >= 2.6**

* Install service dependencies
```
docker-compose up
```

* Install system dependencies

```
bundle install
```

**If you face problem** with the `pg` gem, install with a correct config path:

```shell
  gem install pg -v '1.2.3' --source 'https://rubygems.org/' --with-pg-config=../docker/data/postgres/postgresql.conf
```

* Database creation
```
bundle exec rails db:setup
```

## Run tests

```
bundle exec rspec -fd
```

## Run locally

```
bundle exec rails s
```

*Start sidekiq for working background jobs*

```
bundle exec sidekiq
```
