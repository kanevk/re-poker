import { gql } from "@apollo/client";

const IS_AUTHENTICATED_QUERY = gql`
  query {
    isAuthenticated
  }
`;

const GET_ROOMS = gql`
  query GetRooms {
    rooms { id name }
  }
`

const GET_CURRENT_ROOM = gql`
  query GetCurrentGame($roomId: ID!) {
    getRoom(id: $roomId) {
      currentGame {
        currentPlayerId
        currentStage
        gameEnded
        smallBlind
        bigBlind
        pot
        boardCards { rank color }
        players {
          id
          name
          avatarUrl
          balance
          position
          seatNumber
          cards { rank color }
        }
      }
    }
  }
`;

export { GET_ROOMS, GET_CURRENT_ROOM, IS_AUTHENTICATED_QUERY };

