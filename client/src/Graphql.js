import { gql } from '@apollo/client';

const SIGNIN_USER_MUTATON = gql`
  mutation($username: String!, $password: String!) {
    signinUser(input: { username: $username, password: $password }) {
      token
    }
  }
`;

const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    currentUser {
      id
      name
    }
  }
`;

const GET_ROOMS_QUERY = gql`
  query GetRooms {
    rooms {
      id
      name
    }
  }
`;

const FULL_PLAYER_FRAGMENT = gql`
  fragment FullPlayer on Player {
    id
    name
    active
    isInTurn
    avatarUrl
    balance
    moneyInPot
    position
    seatNumber
    cards {
      rank
      color
    }
  }
`;

const GET_ROOM_SUBSCRIPTION = gql`
  subscription($roomId: ID!) {
    getRoom(roomId: $roomId) {
      moveTimeLimit
      currentGame {
        version
        currentPlayer {
          ...FullPlayer
        }
        currentStage
        isFinished
        smallBlind
        bigBlind
        pot
        boardCards {
          rank
          color
        }
        players {
          ...FullPlayer
        }
      }
      users {
        id
        name
      }
    }
  }

  ${FULL_PLAYER_FRAGMENT}
`;

const MAKE_MOVE_MUTATION = gql`
  mutation($input: MakeMoveInput!) {
    makeMove(input: $input) {
      success
    }
  }
`;

export {
  SIGNIN_USER_MUTATON,
  GET_ROOMS_QUERY,
  GET_CURRENT_USER_QUERY,
  GET_ROOM_SUBSCRIPTION,
  MAKE_MOVE_MUTATION,
};
