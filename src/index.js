import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import ActionCable from 'actioncable';
import { ActionCableLink } from 'graphql-ruby-client';
import { ApolloLink, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription'
  )
}

const authLink = setContext((obj, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const httpAuthLink = authLink.concat(httpLink);


// TODO: Send the token dynamically
const token = localStorage.getItem('token')

const cable = ActionCable.createConsumer('ws://localhost:3000/cable')
const cableAuthLink = authLink.concat(new ActionCableLink({ cable, connectionParams: { token } }));

const link = ApolloLink.split(
  hasSubscriptionOperation,
  cableAuthLink,
  httpAuthLink
);


// Initialize the client
const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
