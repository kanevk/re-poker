import { gql } from "@apollo/client";

const SIGNIN_USER = gql`
  mutation ($username: String!, $password: String!) {
    signinUser(input: { username: $username, password: $password}) {
      userId
      token
    }
  }
`;

export { SIGNIN_USER }
