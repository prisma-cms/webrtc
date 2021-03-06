import React, { Component } from 'react'
import PropTypes from 'prop-types'


import {
  callRequestSubscription,
} from '../../../query/subscription';

import Context from "@prisma-cms/context";

export default class CallRequestsSubscriber extends Component {


  static propTypes = {
    user: PropTypes.object.isRequired,

    onDataReceived: PropTypes.func.isRequired,
  }


  static contextType = Context;

  // static contextTypes = {
  //   client: PropTypes.object.isRequired,
  //   localStorage: PropTypes.object.isRequired,
  // };


  componentDidMount() {


    this.subscribe();
  }

  componentWillUnmount() {

    this.unsubscribe();

  }



  // componentDidUpdate(){



  //   super.componentDidUpdate && super.componentDidUpdate();
  // }


  subscribe() {
    // call the "subscribe" method on Apollo Client


    if (this.subscriptionObserver) {
      return;
    }


    const {
      client,
      // localStorage,
    } = this.context;

    // const {
    //   user: currentUser,
    // } = this.props;

    // if (!currentUser) {
    //   return;
    // }

    // const {
    //   id: subscriberId,
    // } = currentUser;

    // const {
    //   token,
    // } = localStorage;

    this.subscriptionObserver = client.subscribe({
      query: callRequestSubscription,
      variables: {
        // subscriberId,
        // token,
      },
    })
      .subscribe({
        next: async (response) => {
          // ... call updateQuery to integrate the new comment
          // into the existing list of comments


          const {
            errors,
            data,
          } = response;

          if (
            (errors && errors.length)
            || !data
          ) {
            this.setState({
              error: errors[0].message,
            });
          }
          else {
            const {
              onDataReceived,
            } = this.props;


            const result = onDataReceived && onDataReceived(data);

            await this.reloadData();

            return result;
          }

        },
        error: (err) => {

          console.error('callRequestSubscription subscribe err', err);

          this.setState({
            subscribeError: err.message,
          });

        },
      })


  }


  unsubscribe() {
    if (this.subscriptionObserver) {

      this.subscriptionObserver.unsubscribe();

    }
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

    return null;
  }

}
