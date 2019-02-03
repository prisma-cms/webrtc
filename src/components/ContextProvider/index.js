
import React, {
  Component,
} from 'react';

import Context from '@prisma-cms/context';


class ContextProvider extends Component {

  static contextType = Context;


  // componentWillMount() {

  //   const {
  //     query,
  //     ...other
  //   } = this.context;

  //   this.newContext = {
  //     query: {
  //       ...query,
  //       ...this.prepareQuery(),
  //     },
  //     ...other
  //   }

  // }


  render() {

    const {
      children,
    } = this.props;

    let {
      query,
    } = this.context;

    Object.assign(this.context, {
      query: {
        ...query,
        ...this.prepareQuery(),
      },
    });

    return <Context.Provider
      value={this.context}
    >
      {children || null}
    </Context.Provider>;

  }


  prepareQuery() {

    return {
      ...this.prepareCallRequestQuery(),
    }
  }


  prepareCallRequestQuery() {
    const {
      queryFragments,
    } = this.context;


    const {
      ChatRoomNoNestingFragment,
      CallRequestNoNestingFragment,
      UserNoNestingFragment,
      BatchPayloadNoNestingFragment,
    } = queryFragments;


    const callRequestFragment = `
      fragment callRequest on CallRequest {
        ...CallRequestNoNesting
        Called{
          ...UserNoNesting
        }
        Caller{
          ...UserNoNesting
        }
        Room{
          ...ChatRoomNoNesting
          Members{
            ...UserNoNesting
          }
        }
      }

      ${CallRequestNoNestingFragment}
      ${UserNoNestingFragment}
      ${ChatRoomNoNestingFragment}
    `;


    const callRequestsConnection = `
      query callRequestsConnection (
        $where: CallRequestWhereInput
        $orderBy: CallRequestOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objectsConnection: callRequestsConnection (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          aggregate{
            count
          }
          edges{
            node{
              ...callRequest
            }
          }
        }
      }

      ${callRequestFragment}
    `;


    const callRequests = `
      query callRequests (
        $where: CallRequestWhereInput
        $orderBy: CallRequestOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objects: callRequests (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          ...callRequest
        }
      }

      ${callRequestFragment}
    `;


    const callRequest = `
      query callRequest (
        $where: CallRequestWhereUniqueInput!
      ){
        object: callRequest(
          where: $where
        ){
          ...callRequest
        }
      }

      ${callRequestFragment}
    `;


    const createCallRequestProcessor = `
      mutation createCallRequestProcessor(
        $data: CallRequestCreateInput!
      ) {
        response: createCallRequestProcessor(
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...callRequest
          }
        }
      }

      ${callRequestFragment}
    `;


    const updateCallRequestProcessor = `
      mutation updateCallRequestProcessor(
        $data: CallRequestUpdateInput!
        $where: CallRequestWhereUniqueInput!
      ) {
        response: updateCallRequestProcessor(
          data: $data
          where: $where
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...callRequest
          }
        }
      }

      ${callRequestFragment}
    `;


    const deleteCallRequest = `
      mutation deleteCallRequest (
        $where: CallRequestWhereUniqueInput!
      ){
        deleteCallRequest(
          where: $where
        ){
          ...CallRequestNoNesting
        }
      }
      ${CallRequestNoNestingFragment}
    `;


    const deleteManyCallRequests = `
      mutation deleteManyCallRequests (
        $where: CallRequestWhereInput
      ){
        deleteManyCallRequests(
          where: $where
        ){
          ...BatchPayloadNoNesting
        }
      }
      ${BatchPayloadNoNestingFragment}
    `;


    return {
      callRequestsConnection,
      callRequests,
      callRequest,
      createCallRequestProcessor,
      updateCallRequestProcessor,
      deleteCallRequest,
      deleteManyCallRequests,
    }
  }

}

export default ContextProvider;