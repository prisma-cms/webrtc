import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui';

import CloseIcon from 'material-ui-icons/Clear';
import TalkIcon from 'material-ui-icons/PhoneInTalk';

import IconButton from 'material-ui/IconButton';

import Context from "@prisma-cms/context";

import CallRequest from "./CallRequest";

import MainView from "./MainView";

// import Page from "../layout";

/**
 * Модуль звонков
 */

const styles = {
  root: {},
};

export class Calls extends Component {

  static propTypes = {
    // ...Page.propTypes,
    // user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  }


  static contextType = Context;

  state = {}

  static contextTypes__ = {
    localStream: PropTypes.object,
    peerConnections: PropTypes.array.isRequired,
    callRequests: PropTypes.array.isRequired,
    callUser: PropTypes.func.isRequired,
    acceptCall: PropTypes.func.isRequired,
    rejectCall: PropTypes.func.isRequired,

    // setActiveCall: PropTypes.func.isRequired,
    closeCall: PropTypes.func.isRequired,

    connections: PropTypes.array.isRequired,
    streams: PropTypes.array.isRequired,
  }



  // callUser
  callUser = (userId, roomId) => {

    console.log("callUser");

    const {
      callUser,
    } = this.context;

    return callUser(userId, {
      room: roomId,
    });

  }


  closeCall = () => {

    const {
      closeCall,
      connections,
    } = this.context;

    connections && connections[0] && connections[0].close();
    closeCall();
  }


  render() {

    let {
      // localStream,
      // peerConnections,
      connections,
      streams,
      // closeCall,

      callRequests,
      acceptCall,
      rejectCall,
      // setActiveCall,
      router,
    } = this.context;

    let {
      user: currentUser,
    } = this.context;


    const {
      classes,
      ChatRoom,
    } = this.props;


    if (!currentUser) {
      return null;
    }



    const {
      id: currentUserId,
    } = currentUser;


    let callsView = [];


    // Активная иконка должна быть только одна
    let actionButton;

    /**
     * Входящий запрос
     * ToDo Надо будет перевести на отображение множественных звонков
     */

    let currentCallRequest;

    // let activeCall;

    const activeCallRequest = callRequests && callRequests.find(n => ["Started"].indexOf(n.status) !== -1);

    if (activeCallRequest) {

      currentCallRequest = activeCallRequest;

      // activeCall = activeCallRequest.Call.id;

    }
    else {

      currentCallRequest = callRequests && callRequests.find(n => ["Created", "Accepted", "Started"].indexOf(n.status) !== -1);
    }



    const requestedCalls = callRequests && callRequests.filter(n => ["Created"].indexOf(n.status) !== -1) || [];


    // return "sdfdsf";

    requestedCalls.map(requestedCall => {

      const {
        id: callRequestId,
        // status,
        Called: {
          id: calledId,
        },
        // Call: {
        //   // id: callId,
        // },
        Room: {
          id: room,
        },
      } = requestedCall;


      /**
       * Если это новый звонок и адресован текущему пользователю, выводим запрос
       */
      if (calledId === currentUserId) {
        callsView.push(<CallRequest
          key={callRequestId}
          item={currentCallRequest}
          accept={event => {
            acceptCall(callRequestId);
            // setActiveCall(room);
            // setActiveCall(currentCallRequest);
          }}
          reject={event => {
            rejectCall(callRequestId);
          }}
        />)
      }


    });


    if (currentCallRequest) {

      const {
        id: callRequestId,
        status,
        Called: {
          id: calledId,
        },
        // Call: {
        //   id: callId,
        // },
        Room: {
          id: room,
        },
      } = currentCallRequest;


      /**
       * Если звонок активный, выводим иконку, чтобы всегда можно было перейти в него
       */
      if (status === "Started" && room) {


        callsView.push(<IconButton
          key="activeCall"
          onClick={event => {
            router.history.push(`/inbox/${room}/`)
          }}
        >
          <TalkIcon
            style={{
              // color: activeCall ? undefined : "green",
              color: "green",
            }}
          />
        </IconButton>);

      }

    }


    // activeCall && callsView.push(<MainView
    //   key={activeCall}
    //   user={currentUser}
    //   // where={{
    //   //   // id: activeCall,
    //   //   callId: activeCall,
    //   // }}
    //   callUser={this.callUser}
    //   streams={streams}
    //   connection={connections ? connections[0] : null}
    //   closeCall={this.closeCall}
    //   callRequests={callRequests}
    // />);

    callsView.push(<MainView
      // key={`MainView_${activeCall}`}
      key={`MainView`}
      user={currentUser}
      ChatRoom={ChatRoom}
      // where={{
      //   // id: activeCall,
      //   callId: activeCall,
      // }}
      callUser={this.callUser}
      streams={streams}
      connection={connections ? connections[0] : null}
      closeCall={this.closeCall}
      callRequests={callRequests}
    />);


    // if (activeCallRequest) {
    //   actionButton = <IconButton
    //     key="close"
    //     onClick={event => this.closeCall()}
    //   >
    //     <CloseIcon />
    //   </IconButton>
    // }


    if (actionButton) {
      callsView.push(actionButton);
    }

    return callsView;

    // return callsView && callsView.length ? <div
    //   className={classes.root}
    // >
    //   {callsView}
    // </div>
    //   : null
  }
}

export default withStyles(styles)(props => <Calls
  {...props}
/>);