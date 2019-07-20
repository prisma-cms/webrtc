
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import gql from "graphql-tag";

import Context from '@prisma-cms/context';

export default class SubscriptionProvider extends PureComponent {


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

    const {
      client,
    } = this.context;


    if(!client){
      console.error("client is empty");
      return;
    }

    await this.unsubscribe();


    let {
      subscriptions,
    } = this.state;


    const subscribeUser = gql`
      subscription user{
        user{
          mutation
          node{
            id
          }
        }
      }
    `;

    const userSub = await client
      .subscribe({
        query: subscribeUser,
        variables: {
        },
      })
      .subscribe({
        next: async (data) => {

          await this.reloadData();

        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      });


    subscriptions.push(userSub);

    this.setState({
      subscriptions,
    });

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
    } = this.context;

    await loadApiData();

    await client.reFetchObservableQueries();

  }


  render() {

    const {
      children,
      user,
      client,
      loadApiData,
      ...other
    } = this.props;

    return children;

    // return children ? <children.type
    //   {...children.props}
    //   {...other}
    // /> : null;

  }

}