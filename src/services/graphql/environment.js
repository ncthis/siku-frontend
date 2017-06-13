// @flow

import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import ServiceExchange from './../ServiceExchange';

// $FlowFixMe
import config from 'config'; // eslint-disable-line

const source = new RecordSource();
const store = new Store(source);

class AccessToken {
  static accessToken = undefined;

  static init() {
    ServiceExchange.subscribe('authenticated', ({ idToken }: { idToken: string, }) => AccessToken.onAuth(idToken));
  }

  static onAuth(token: string) {
    AccessToken.accessToken = token;
  }
}

AccessToken.init();

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchQuery<T, V>(operation: { text: string, }, variables: V): Promise<T> {
  return fetch(config.GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: AccessToken.accessToken,
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then((response: Response): Promise<T> => response.json());
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);

const environment = new Environment({
  network,
  store,
});

export default environment;
