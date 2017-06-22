import { commitMutation, graphql as _graphql } from 'react-relay';
import environment from './environment';

export const graphql = _graphql;

function mutate<V, P>(mutation: string, variables: V): Promise<P> {
  return new Promise((resolve: (res: P) => void, reject: (err: Error) => void) => {
    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: resolve,
      onError: reject,
    });
  });
}

export default mutate;
