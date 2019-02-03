import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'


import PrismaCmsComponent from "@prisma-cms/component";


import CallsView from "../../../../../../../Calls";


export default class CallsRow extends PrismaCmsComponent {

  static propTypes = {
    // item: PropTypes.object.isRequired,
    ChatRoom: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }


  async updateCall(data) {




    return;

    const {
      client,
      updateCallProcessor,
    } = this.context;


    const {
      item: {
        id,
      },
    } = this.props;

    let variables = {
      data,
      where: {
        id,
      },
    };


    await this.mutate({
      mutation: updateCallProcessor,
      variables,
    })
      .then(async r => {

        await client.reFetchObservableQueries();

        return r;
      })
    // .catch(console.error);



  }


  // callUser
  callUser = (userId, roomId) => {



    const {
      callUser,
    } = this.context;

    return callUser(userId, {
      room: roomId,
    });

  }


  componentDidUpdate(){



    super.componentDidUpdate && super.componentDidUpdate();
  }

  render() {

    const {
      streams,
      connections,
    } = this.context;
    
    const {
      ChatRoom,
      data: {
        objects: callRequests,
      },
      ...other
    } = this.props;

    if (!ChatRoom) {
      return null;
    }


    const {
      user: currentUser,
    } = this.context;

    if (!currentUser || !callRequests) {
      return null;
    }


    return super.render(
      <CallsView
        ChatRoom={ChatRoom}
        // key={activeCall}
        // key={dialogueId}
        user={currentUser}
        // where={{
        //   // callId: activeCall,
        //   id: dialogueId,
        // }}
        callUser={this.callUser}
        streams={streams}
        connection={connections ? connections[0] : null}
        closeCall={event => this.closeCall()}
        callRequests={callRequests}
      />
    )
  }
}
