import { graphql } from 'react-relay';

const loginMutation = graphql`
  mutation loginMutation(
    $input: LoginUserWithAuth0LockInput!
  ) {
    loginUserWithAuth0Lock(input: $input) {
      user {
        id
      }
      clientMutationId
    }
  }
`;

export default loginMutation;
