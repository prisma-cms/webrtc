import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import View from "../../../../../../pages/Chats/Chat/View";

import Message from "./Message";

import Editor from "./Editor";

export default class CallChatView extends View {

  static propTypes = {
    ...View.propTypes,
    classes: PropTypes.object.isRequired,
  }



  renderEditor() {

    const {
      id: roomId,
    } = this.getItem() || {}

    return roomId && <Editor
      roomId={roomId}
    /> || null;
  }


  renderMessages() {





    // let messagesArray = [];

    // messages.map(n => {
    //   // messagesArray.unshift(n);
    //   messagesArray.push(n);
    // });

    const messages = this.getMessages();


    return messages.map(n => {

      const {
        id,
      } = n;

      return <Message
        key={id}
        item={n}
      />

    });
  }


  render() {

    const messages = this.renderMessages();



    const {
      classes,
    } = this.props;

    return (
      <Fragment>
        <div
          className={["blockMessages scrollableContainer", classes.scrollableContainer].join(" ")}
          style={{
            flex: "1 0",
          }}
        >

          {messages}

        </div>

        {this.renderEditor()}

      </Fragment>
    )
  }
}
