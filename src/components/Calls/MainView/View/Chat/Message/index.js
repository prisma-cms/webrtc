import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid } from 'material-ui';


// import MessageEditor from "ui/Chat/Message/Editor";
// import Editor, { createEditorState } from 'Editor'

// import UserLink from "ui/Link/User";

// import Avatar from "Avatar";

import moment from "moment";

import PrismaCmsComponent from "@prisma-cms/component";

const styles = {
  textWrapper: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 3,
    minWidth: 200,
  },
}


class ChatMessage extends PrismaCmsComponent {

  static propTypes = {
    message: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
  };


  constructor(props) {

    super(props);

    const {
      message,
    } = this.props;

    // const {
    //   text,
    // } = message;

    // const editorState = createEditorState(text);

    // this.state = {
    //   editorState,
    // };

  }

  render() {

    const {
      Avatar,
      UserLink,
    } = this.context;

    const {
      message,
      currentUser,
      classes,
    } = this.props;

    if (!message) {
      return null;
    }

    const {
      text,
      Author: user,
      createdAt: created_at,
    } = message;

    const {
      editorState,
    } = this.state;

    const {
      id: authorId,
      username,
      fullname,
    } = user || {}


    const {
      id: currentUserId,
    } = currentUser || {};


    const isCurrentUser = currentUserId && currentUserId === authorId;

    return (
      <Grid
        container
        spacing={16}
        style={{
          flexDirection: isCurrentUser ? "row-reverse" : undefined,
        }}
      >

        <Grid
          item
        >

          <Avatar
            user={user}
            size="default"
          />

        </Grid>

        <Grid
          item
          style={{
            maxWidth: "100%",
          }}
        >
          <div
            style={{
              textAlign: isCurrentUser ? "right" : undefined,
            }}
          >
            {!isCurrentUser ? <UserLink
              username={username}
            >
              {fullname}
            </UserLink> : null} <small
              className="text-grey"
              style={{
                fontSize: "0.7rem",
              }}
            >
              {created_at ? moment(created_at).format("DD-MM-YYYY HH:mm") : null}
            </small>
          </div>

          <div
            className={classes.textWrapper}
          >
            "Editor"
            {/* <Editor
              editorState={editorState}
              readOnly
            /> */}
          </div>
        </Grid>

      </Grid>
    );
  }
}


export default withStyles(styles)(ChatMessage);