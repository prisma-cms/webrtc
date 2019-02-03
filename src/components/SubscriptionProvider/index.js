
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import gql from "graphql-tag";

import Context from '@prisma-cms/context';

export default class SubscriptionProvider extends Component {


  static contextType = Context;


  state = {
    subscriptions: [],
  }


  componentDidMount() {

    this.subscribe();

  }

  componentWillUnmount() {

    this.unsubscribe();

  }


  async subscribe() {

    // const {
    //   client,
    //   user: currentUser,
    // } = this.context;


    // if (!client) {
    //   console.error("client is empty");
    //   return;
    // }

    // await this.unsubscribe();


    // let {
    //   subscriptions,
    // } = this.state;


    // // if(currentUser) {

    // const subscribecallRequest = gql`
    //     subscription callRequest{
    //       callRequest{
    //         mutation
    //         node{
    //           id
    //         }
    //       }
    //     }
    //   `;

    // const callRequestSub = await client
    //   .subscribe({
    //     query: subscribecallRequest,
    //     variables: {
    //     },
    //   })
    //   .subscribe({
    //     next: async (data) => {

    //       await this.reloadData();

    //       this.forceUpdate();

    //     },
    //     error(error) {
    //       console.error('subscribeCallRequests callRequestback with error: ', error)
    //     },
    //   });


    // subscriptions.push(callRequestSub);

    // // }


    // this.setState({
    //   subscriptions,
    // });

  }


  unsubscribe() {


    return new Promise((resolve) => {

      const {
        subscriptions,
      } = this.state;

      if (subscriptions && subscriptions.length) {


        subscriptions.map(n => {
          n.unsubscribe();
        });

        Object.assign(this.state, {
          subscriptions: [],
        });

      }

      resolve();

    });

  }


  async reloadData() {

    const {
      client,
      loadApiData,
      rendererForceUpdate,
    } = this.context;

    await loadApiData();

    // await client.reFetchObservableQueries();
    await client.resetStore();

    rendererForceUpdate();

  }


  render() {

    const {
      children,
      callRequest,
      client,
      loadApiData,
      ...other
    } = this.props;

    return children || null;

    // return children ? <children.type
    //   {...children.props}
    //   {...other}
    // /> : null;

  }

}