import ActionCable from 'actioncable';
import { ActionCableLink } from 'graphql-ruby-client';
import { ApolloLink, createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({ uri: process.env.REACT_APP_GRAPHQL_URL });

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription'
  );
};

const authLink = setContext((obj, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpAuthLink = authLink.concat(httpLink);

// TODO: Send the token dynamically
const token = localStorage.getItem('token');

const cable = ActionCable.createConsumer(process.env.REACT_APP_WS_URL);
const cableAuthLink = authLink.concat(new ActionCableLink({ cable, connectionParams: { token } }));

const link = ApolloLink.split(hasSubscriptionOperation, cableAuthLink, httpAuthLink);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default apolloClient;
