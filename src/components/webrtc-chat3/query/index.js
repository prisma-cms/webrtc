import gql from "graphql-tag";

// import {
//   CallJoinRoom,
//   // updateCallRequest,
// } from 'query';

// export {
//   CallJoinRoom,
//   // updateCallRequest,
// }

export const fragmentUserFields = `
  fragment userFields on User{
    id
    username
  }
`;

export const fragmentUser = `
  fragment user on User{
    ...userFields
  }

  ${fragmentUserFields}
`;


export const user = gql`
  query user(
    $userId:ID!
  ){
    user(
      id:$userId
    ){
      ...user
    }
  }

  ${fragmentUser}
`;






export const fragmentCallRequest = `
  fragment callRequest on CallRequest{
    id
    Called{
      ...userFields
    }
    Caller{
      ...userFields
    }
    caller_descriptions
    called_descriptions
    status
  }
 

  ${fragmentUserFields}

`;
