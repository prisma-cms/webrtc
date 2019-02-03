

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import gql from 'graphql-tag';

export default class IceCandidateCubscriber extends Component {

  static propTypes = {
    debug: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    onIceCandidate: PropTypes.func.isRequired,
  }

  static contextTypes = {
    client: PropTypes.object.isRequired,
  }

  state = {
    items: [],
  }

  componentDidMount(){

    this.subscribeForICE();

  }


  componentWillUnmount(){

    if(this.subscriptionObserver){
      this.subscriptionObserver.unsubscribe();
    }
  }

  
  async subscribeForICE(){

    const {
      client,
    } = this.context;

    const {
      user: currentUser,
    } = this.props;

    const {
      id: currentUserId,
    } = currentUser;

    let subscriptionObserver = await client.subscribe({
      query: gql`
        subscription (
          $userId:ID!
        ){
          iceCandidate(
            userId: $userId
          ){
            from
            to
            sdp
            callRequestId,
          }
        }
      `,
      variables: {
        userId: currentUserId,
      },
    })
      .subscribe({
        next: async (response) => {
          // ... call updateQuery to integrate the new comment
          // into the existing list of comments

          const {
            data: {
              iceCandidate: {
                from,
                to,
                callRequestId,
              },
            },
          } = response;

          // console.log("iceCandidate updated", response);
          // console.log(`APIonicecandidateRECEIVE ${to} <= ${from}`, response);


          // console.log(`APIonicecandidate_SHORT_RECEIVE_2 ${to} <= ${from}`, response);
          // console.log(`APIonicecandidate_FULL_RECEIVE ${to} <= ${from}`, event.candidate);

          const {
            onIceCandidate,
          } = this.props;

          if(onIceCandidate){
            onIceCandidate(response);
          }

          
        },
        error(err) {

          console.error('iceCandidate subscribe err', err);

          // this.setState({
          //   subscribeError: err.message,
          // });

        },
      });
  }

  render() {
    return null
  }
}


