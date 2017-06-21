declare module 'react-relay' {
  const graphql: any;

  type EnvironmentType = {};

  interface QueryRendererProps {
    environment: EnvironmentType;
    query: any;
    variables: any;
    render: (error: Error, props: any) => JSX.Element;
  }

  const QueryRenderer: any;

  interface MutationParams {
    mutation: string;
    variables: any;
    onCompleted: (res: any) => void;
    onError: (err: Error) => void;
  }

  function commitMutation(environment: EnvironmentType, params: MutationParams): void;
}