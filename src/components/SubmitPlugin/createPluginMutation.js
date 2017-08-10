import { graphql } from 'react-relay';

const createPluginMutation = graphql`
  mutation createPluginMutation ($input: CreatePluginInput!) {
    createPlugin(input: $input) {
      changedPlugin {
        id
      }
    }
  }
`;

export default createPluginMutation;
