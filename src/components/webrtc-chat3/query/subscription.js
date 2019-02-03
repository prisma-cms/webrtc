import gql from "graphql-tag";

export const callRequestSubscription = gql`

  subscription callRequest{
    callRequest{
      mutation
      node {
        id
        Room{
          id
          name
        }
        Called{
          id
          username
          fullname
          image
        }
        Caller{
          id
          username
          fullname
          image
        }
        caller_descriptions
        called_descriptions
        status
      }
    }
  }
 
`;