import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';

import VideoCamIcon from "material-ui-icons/Videocam";
// import VideoCamIcon from "icons/OutlineVideocam";

// import RequestCallButton from "ui/Button/User/RequestCall";

import CallInfo from "../CallInfo";

const styles = {

}

class CallButton extends Component {

  static propTypes = {
    room: PropTypes.object,
    currentUser: PropTypes.object.isRequired,
    // showVideoChatHandler: PropTypes.func.isRequired,
  }


  state = {
    callInfoOpened: false,
  }

  toggleCallInfo() {

    const {
      callInfoOpened,
    } = this.state;

    this.setState({
      callInfoOpened: !callInfoOpened,
    });

  }


  render() {

    let callButton = null;

    const {
      room,
      // user,
      currentUser,
      classes,
      // showVideoChatHandler,
    } = this.props;


    // console.log("CallButton", room, currentUser);

    if (!room || !currentUser) {
      return null;
    }


    const {
      callInfoOpened,
    } = this.state;

    const {
      id: roomId,
      Call,
      Members: members,
    } = room;

    const {
      id: currentUserId,
    } = currentUser;

    // if (Call) {


    //   const {
    //     status,
    //   } = Call;

    //   if (["Accepted"].indexOf(status) !== -1) {

    //     callButton = <button
    //       className="videoButton button bg-green"
    //       onClick={showVideoChatHandler}
    //     >
    //       <VideoCamIcon
    //       // style={{
    //       //   fill: "transparent",
    //       //   stroke: "#fff",
    //       // }}
    //       /> Show video chat
    //     </button>;

    //   }

    // }

    let showCallInfo = callInfoOpened;

    let called = null;



    /**
     * Если звонок есть, то вызываемого берем из этого звонка.
     * Иначе вызываемый - случайный пользователь из текущей сессии
     */
    if (Call) {

      /**
       * Если звонок требует ответного действия
       * от того, кому звонят, надо вывести форму
       */

      const {
        status,
        User: {
          id: calledId,
        },
      } = Call;

      if (status === "Requested" && calledId === currentUserId) {
        showCallInfo = true;
      }

      called = members ? members.find(({ id }) => id === calledId) : null;


    }
    else {
      called = members ? members.filter(({ id }) => id !== currentUserId).find(n => n.callsEnabled === true) : null;
    }



    if (!callButton) {

      /**
       * Запрашиваем звонок только если у кого-то из пользователей разрешены входящие звонки
       */






      // if (called) {


      // console.log("called", called, members);


      if (called) {

        callButton = <button
          className="videoButton button bg-blue"
          onClick={event => {

            this.toggleCallInfo();
          }}
        >
          <VideoCamIcon
          // style={{
          //   fill: "transparent",
          //   stroke: "#fff",
          // }}
          /> {!Call ? "Request a video call" : "Show call info"}

        </button>
          ;

      }

      // callButton = <button
      //   className="videoButton button bg-blue"
      // >
      //   <VideoCamIcon
      //   // style={{
      //   //   fill: "transparent",
      //   //   stroke: "#fff",
      //   // }}
      //   /> Request a video call
      // </button>;

      // callButton = <RequestCallButton
      //   room={room}
      //   user={called}
      // >
      //   <button
      //     className="videoButton button bg-blue"
      //   >
      //     <VideoCamIcon
      //     // style={{
      //     //   fill: "transparent",
      //     //   stroke: "#fff",
      //     // }}
      //     /> Request a video call
      //   </button>
      // </RequestCallButton>
      // ;



    }

    // }

    return (
      <div>
        {callButton}
        {showCallInfo
          ?
          <CallInfo
            user={called}
            room={room}
          />
          : null
        }
      </div>
    );
  }
}

export default withStyles(styles)(CallButton);