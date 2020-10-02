import { gql } from '@apollo/client';

const SIGNIN_USER_MUTATON = gql`
  mutation($username: String!, $password: String!) {
    signinUser(input: { username: $username, password: $password }) {
      userId
      token
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

const GET_ROOM_SUBSCRIPTION = gql`
  subscription($roomId: ID!) {
    getRoom(roomId: $roomId) {
      currentGame {
        version
        currentPlayer {
          id
          name
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
          id
          name
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
      }
    }
  }
`;

export { GET_ROOMS_QUERY, SIGNIN_USER_MUTATON, GET_ROOM_SUBSCRIPTION };
