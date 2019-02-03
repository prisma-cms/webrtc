import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui';

import Context from "@prisma-cms/context"


import CallRequestButton from "../CallRequestButton";

export class CallRequestButtons extends Component {

  static contextType = Context;


  render() {


    const {
      callRequests,
      user: currentUser,
      acceptCall,
      rejectCall,
    } = this.context;

    const {
      id: currentUserId,
    } = currentUser || {};


    if (!currentUserId) {
      return null;
    }


    // const requestedCalls = callRequests && callRequests.filter(n => ["Created"].indexOf(n.status) !== -1) || [];
    const requestedCalls = callRequests;




    // return "sdfdsf";

    let callsView = [];

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
      // if (calledId === currentUserId) {
      //   callsView.push(<CallRequestButton
      //     key={callRequestId}
      //     // item={currentCallRequest}
      //     item={requestedCall}
      //     accept={event => {
      //       acceptCall(callRequestId);
      //       // setActiveCall(room);
      //       // setActiveCall(currentCallRequest);
      //     }}
      //     reject={event => {
      //       rejectCall(callRequestId);
      //     }}
      //   />)
      // }

      callsView.push(<CallRequestButton
        key={callRequestId}
        // item={currentCallRequest}
        item={requestedCall}
        accept={async event => {
          acceptCall(callRequestId)
          .then(r => {

          });
          // setActiveCall(room);
          // setActiveCall(currentCallRequest);
        }}
        reject={event => {
          rejectCall(callRequestId);
        }}
      />)


    });


    return callsView;

  }
}


export default CallRequestButtons;
