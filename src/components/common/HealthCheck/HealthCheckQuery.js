import { graphql } from 'react-relay';

const HealthCheckQuery = graphql`
    query HealthCheckQuery {
      checkHealth {
          healthy
          message
      }
    }
  `;

export default HealthCheckQuery;
