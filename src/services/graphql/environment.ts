// @flow

import _ from 'lodash';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import config from './../../config';
import AccessTokenManager from './AccessTokenManager';

const source: RecordSource = new RecordSource();
const store: Store = new Store(source);

const getHeaders = (accessToken: string): Headers =>
  _({
    'content-type': 'application/json',
    Authorization: accessToken,
  })
    .omitBy(_.isEmpty)
    .value();

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchQuery<T, V>(operation: { text: string, }, variables: V): Promise<T> {
  const headers: Headers = getHeaders(AccessTokenManager.getToken());

  return fetch(config.GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers,
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
