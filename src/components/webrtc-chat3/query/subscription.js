import gql from "graphql-tag";


export const callRequestSubscription = gql`

  subscription callRequest{
    callRequest{
      mutation
      node {
        id
        Room{
          id
        }
        Called{
          id
          username
        }
        Caller{
          id
          username
        }
        caller_descriptions
        called_descriptions
        status
      }
    }
  }
 
`;