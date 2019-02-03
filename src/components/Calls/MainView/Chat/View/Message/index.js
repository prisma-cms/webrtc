import React, { Component } from 'react'
import PropTypes from 'prop-types'


import { Message as MessageView, styles } from "../../../../../../../pages/Chats/Chat/View/Message";
import { withStyles } from 'material-ui';

export class Message extends MessageView {

  // static propTypes = {
  //   // prop: PropTypes
  // }

  render() {

    const {
      fullname,
    } = this.getAuthor() || {};

    return (
      <div className="message">

        {this.renderUserLink(this.renderAvatar({
          className: "avatar",
        }), {
            className: "msgSenderAvatar",
          })}

        <div className="messageInner">
          {this.renderUserLink(fullname, {
              className: "msgSenderName",
            })}
          <div className="msgText">
            {this.renderText()}
          </div>
          <div className="msgDate">
            {this.renderDate()}
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(props => <Message 
  {...props}
/>);