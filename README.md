Re-poker
---
A poker platfrom running over React/GrapQL/Rails stack

:pick: :pick: *The project is active development* :pick: :pick:

## What is *Re-poker*?

Re-poker is a scalable Poker web platform that is
 - created around a functionaly designed Poker engine written in Ruby
 - served via Rails GraphQL API supporting GraphQL subscription
 - presented by elegant React Apollo frontend


## Setup

1. Clone the repo localy and follow the setup guide for two subprojects:
```
git clone git@github.com:kanevk/re-poker.git
```

2. Setup the API - [Api setup](./api/README.md)
3. Setup the Web Client - [Client setup](./client/README.md)

## Run locally
Run both the Api & Web client servers and sign-in through the browser:

```
login: bob
pass: 1
```

## Setup EC2

From https://docs.docker.com/engine/install/ubuntu/

```bash
sudo apt-get update

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
  "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) \
  stable"

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io # Install the latest version
sudo docker run hello-world # test docker

sudo apt-get update

# Installing git
sudo apt-get install git
# Docker compose
sudo apt-get install docker-compose
```

```
bundle exec rails db:create
```

```
bundle exec rails db:seed
```
