import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Connector from "./connector";

export default class CallChat extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    room: PropTypes.object.isRequired,
  }

  render() {


    const {
      room,
      ...other
    } = this.props;

    if (!room) {
      return null;
    }

    const {
      id: dialogueId,
    } = room;


    return <Connector
      where={{
        id: dialogueId,
      }}
      {...other}
    />;


    // const {
    //   classes,
    // } = this.props;

    // return (
    //   <Fragment>
    //     <div
    //       className={["blockMessages scrollableContainer", classes.scrollableContainer].join(" ")}
    //     >

    //       <Connector
    //         where={{
    //           id: dialogueId,
    //         }}
    //       />

    //     </div>

    //     <div
    //       style={{
    //         width: "100%",
    //         height: 130,
    //       }}
    //     >
    //       <div className="blockInput">

    //         <textarea className="input" placeholder="Message"></textarea>
    //         <label className="chatEnter noselect" id="chatEnter"><input type="checkbox" htmlFor="chatEnter" /><div className="title"><i className="icon fal fa-check"></i>Chat with "Enter"</div></label>
    //         <button type="button" className="button chatSend transition-03 smooth">Send</button>

    //       </div>
    //     </div>
    //   </Fragment>
    // )
  }



  render___() {


    const {
      room,
    } = this.props;

    if (!room) {
      return null;
    }

    const {
      id: dialogueId,
    } = room;

    return <Connector
      where={{
        id: dialogueId,
      }}
    />;


    const {
      classes,
    } = this.props;

    return (
      <Fragment>
        <div
          className={["blockMessages scrollableContainer", classes.scrollableContainer].join(" ")}
        >

          <div className="message">
            <a href="#" className="msgSenderAvatar"><img className="avatar" src="/img/random/random_user/1.jpg" /></a>
            <div className="messageInner">
              <a href="#" className="msgSenderName">Someone Someone</a>
              <div className="msgText">Something...</div>
              <div className="msgDate">15:15</div>
            </div>
          </div>

        </div>

        <div
          style={{
            width: "100%",
            height: 130,
          }}
        >
          <div className="blockInput">

            <textarea className="input" placeholder="Message"></textarea>
            <label className="chatEnter noselect" id="chatEnter"><input type="checkbox" htmlFor="chatEnter" /><div className="title"><i className="icon fal fa-check"></i>Chat with "Enter"</div></label>
            <button type="button" className="button chatSend transition-03 smooth">Send</button>

          </div>
        </div>
      </Fragment>
    )
  }
}
