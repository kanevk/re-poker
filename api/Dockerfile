FROM ruby:2.7.1-alpine

RUN bundle config --global frozen 1

WORKDIR /app

COPY Gemfile Gemfile.lock ./
# Required for the nokogiri gem
RUN apk update && apk add --no-cache build-base \
    && gem install nokogiri -v '1.10.10' --source 'https://rubygems.org/'
# Required for the pg gem
RUN apk add --no-cache postgresql-libs \
    && apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev \
    && gem install pg -v '1.2.3' --source 'https://rubygems.org/' \
    && apk add --update tzdata
RUN gem install bundler \
    && bundle config --with $RAILS_ENV \
    && bundle install --jobs 5 --retry 3

COPY . .

EXPOSE 3000 443
CMD ["bundle", "exec", "rails", "s", "--port", "3000"]
