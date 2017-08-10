// import environment from './environment';
// import { graphql, commitMutation } from 'react-relay';
// import * as React from 'react';
// import { HOCType } from 'siku-types';

// export interface IResultPropsType<Result extends {}, Variables extends {}> {
//   error: Error;
//   result: Result;
//   loading: boolean;
//   variables: Variables;
// }

// const withMutation = <
//   Result extends {},
//   Variables extends {},
//   OwnProps extends {}
// >(name: string, mutation: typeof graphql) => (
//   BaseComponent: React.StatelessComponent<OwnProps>,
// ): HOCType<IResultPropsType<Result, Variables>, OwnProps> =>
//   class WithMutation extends React.Component<OwnProps, {}> {
//     public render() {
//       const mutate = (variables: Variables): Promise<Result> =>
//         new Promise((resolve, reject) => {
//           commitMutation(environment, {
//             mutation,
//             variables,
//             onCompleted: resolve,
//             onError: reject,
//           });
//         });

//       const proppedMutate = {
//         [name]: mutate,
//       };

//       return <BaseComponent {...this.props} {...proppedMutate} />;
//     }
//   };

// export default withMutation;
