import gql from "graphql-tag";

import {
  // fragmentUser,
  fragmentCallRequest,
} from './index';

// export const signup = gql`
//   mutation signup(
//     $username:String!
//   ){
//     user:signup(
//       username:$username
//     ){
//       ...user
//     }
//   }

//   ${fragmentUser}
// `



// export const createCallRequest = gql`

//   mutation createCallRequest(
//     $callerId:ID!
//     $calledId:ID!
//     $offer:Json!
//     $sdp:Json!
//     $room: ID!
//   ){
//     createCallRequest(
//       # roomId:ID
//       callerId:$callerId
//       calledId:$calledId
//       offer: $offer
//       sdp: $sdp
//       room: $room
//     ){
//       ...callRequest
//     }
//   }

//   ${fragmentCallRequest}

// `;


// export const createCallRequest = gql`

//   mutation createCallRequest(
//     $calledId:ID!
//     # $offer:Json!
//     $callId: ID!
//   ){
//     createCallRequest(
//       data: {
//         # roomId:ID
//         calledId:$calledId
//         # offer: $offer
//         callId: $callId
//         caller_descriptions: {}
//         called_descriptions: {}
//       }
//     ){
//       ...callRequest
//     }
//   }

//   ${fragmentCallRequest}

// `;


// export const createCallRequestProcessor = gql`

//   mutation createCallRequestProcessor(
//     $calledId:ID!
//     $callId: ID!
//   ){
//     response: createCallRequestProcessor(
//       data: {
//         # roomId:ID
//         calledId:$calledId
//         # offer: $offer
//         callId: $callId
//         caller_descriptions: {}
//         called_descriptions: {}
//       }
//     ){
//       success
//       message
//       errors{
//         key
//         message
//       }
//       data{
//         ...callRequest
//       }
//     }
//   }

//   ${fragmentCallRequest}

// `;


export const updateCallRequest = gql`

  mutation updateCallRequest(
    $where: CallRequestWhereUniqueInput!
    $data: CallRequestUpdateInput!
  ){
    updateCallRequest(
      where:$where
      data: $data
    ){
      ...callRequest
    }
  }

  ${fragmentCallRequest}

`;

export const createCallOffer = gql`

  mutation createCallOffer(
    $id:ID!
    $offer:Json!
  ){
    createOffer: createCallOffer(
      id:$id
      offer:$offer
    ){
      ...callRequest
    }
  }

  ${fragmentCallRequest}

`;

export const createAnswer = gql`

  mutation createAnswer(
    $id:ID!
    $answer:Json!
  ){
    createAnswer(
      id:$id
      answer:$answer
    ){
      ...callRequest
    }
  }

  ${fragmentCallRequest}

`;

