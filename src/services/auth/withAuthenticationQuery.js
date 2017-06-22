import { graphql } from 'react-relay';

export default graphql`
  query withAuthenticationQuery {
    viewer {
      id
      user {
        id
      }
    }
  }
`;
