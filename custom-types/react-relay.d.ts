declare module 'react-relay' {
  const graphql: any;

  interface IQueryRendererProps {
    environment: {};
    query: any;
    variables: any;
    render: (error: Error, props: any) => JSX.Element;
  }

  const QueryRenderer: any;

  interface IMutationParams {
    mutation: string;
    variables: any;
    onCompleted: (res: any) => void;
    onError: (err: Error) => void;
  }

  function commitMutation(
    environment: {},
    params: IMutationParams,
  ): void;
}
