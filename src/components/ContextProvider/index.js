
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
      ...this.prepareUserQuery(),
    }
  }

  prepareUserQuery() {


    const {
      queryFragments,
    } = this.context;


    const {
      UserNoNestingFragment,
      BatchPayloadNoNestingFragment,
    } = queryFragments;



    const usersConnection = `
      query usersConnection (
        $where: UserWhereInput
        $orderBy: UserOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objectsConnection: usersConnection (
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
              ...UserNoNesting
            }
          }
        }
      }

      ${UserNoNestingFragment}
    `;


    const users = `
      query users (
        $where: UserWhereInput
        $orderBy: UserOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objects: users (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          ...UserNoNesting
        }
      }

      ${UserNoNestingFragment}
    `;


    const user = `
      query user (
        $where: UserWhereUniqueInput!
      ){
        object: user (
          where: $where
        ){
          ...UserNoNesting
        }
      }

      ${UserNoNestingFragment}
    `;


    const createUserProcessor = `
      mutation createUserProcessor(
        $data: UserCreateInput!
      ) {
        response: createUserProcessor(
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...UserNoNesting
          }
        }
      }

      ${UserNoNestingFragment}
    `;


    const updateUserProcessor = `
      mutation updateUserProcessor(
        $data: UserUpdateInput!
        $where: UserWhereUniqueInput!
      ) {
        response: updateUserProcessor(
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
            ...UserNoNesting
          }
        }
      }

      ${UserNoNestingFragment}
    `;



    const deleteUser = `
      mutation deleteUser (
        $where: UserWhereUniqueInput!
      ){
        deleteUser(
          where: $where
        ){
          ...UserNoNesting
        }
      }
      ${UserNoNestingFragment}
    `;


    const deleteManyUsers = `
      mutation deleteManyUsers (
        $where: UserWhereInput
      ){
        deleteManyUsers(
          where: $where
        ){
          ...BatchPayloadNoNesting
        }
      }
      ${BatchPayloadNoNestingFragment}
    `;


    return {
      usersConnection,
      users,
      user,
      createUserProcessor,
      updateUserProcessor,
      deleteUser,
      deleteManyUsers,
    }

  }

}

export default ContextProvider;