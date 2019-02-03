import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import {ChatMessageEditorView as EditorProto} from "../../../../../../../pages/Chats/Chat/View/Editor";

import Editor, { createEditorState } from "Editor";

import Editable from 'DataView/Object/Editable';

import Grid from "material-ui/Grid";

import {
  sendDirectMessage,
} from 'query';


import { compose, graphql } from 'react-apollo';
import { withStyles } from 'material-ui';


const styles = {
  editorWrapper: {

    "& .public-DraftEditor-content > [data-contents=true]": {
      height: 95,
      minHeight: "auto",
      overflowY: "auto",
    },
  },
}

export class ChatMessageEditor extends Editable {

  static propTypes = {
    ...Editable.propTypes,
    roomId: PropTypes.string.isRequired,
  }

  static defaultProps = {
    ...Editable.defaultProps,
    data: {
      object: {},
    },
  };


  getMutationVariables(data) {

    data = super.getMutationVariables(data);

    // console.log("getMutationVariables data", data);

    const {
      roomId,
    } = this.props;

    return {
      ...data.data,
      roomId,
    };
  }

  async save(){

    return super.save()
    .then(r => {
      // this.setState();

      this.setState({
        editorState: null,
      });

      return r;
    })
  }

  render() {

    const {
      classes,
    } = this.props;

    const {
      editorState,
    } = this.state;


    // const {
    //   text,
    // } = this.getObjectWithMutations();

    return super.render(
      <div
        style={{
          width: "100%",
          // height: 130,
          height: "auto",
        }}
      >
        <div
          className={["blockInput", classes.editorWrapper].join(" ")}
          style={{
            position: "relative",
            height: "auto",
          }}
        >

          {/* <textarea className="input" placeholder="Message"></textarea> */}

          <Editor
            readOnly={false}
            // value={text || {}}
            onEditorStateChange={(editorState, rawContent) => {
              // console.log("onEditorStateChange", editorState, rawContent);
              this.setState({
                // text: rawContent,
                editorState,
              });
            }}
            editorState={editorState}
            onChange={(rawContent) => {
              // console.log("onChange", rawContent);
              this.updateObject({
                text: rawContent,
              });
            }}
            placeholder="Type message"
          />


          {/* <label className="chatEnter noselect" id="chatEnter">
            <input type="checkbox" htmlFor="chatEnter" />
            <div className="title"><i className="icon fal fa-check"></i>Chat with "Enter"</div>
          </label> */}

          <div
            style={{
              padding: "5px 0",
            }}
          >
            <Grid
              container
              spacing={8}
            >
              <Grid
                item
                xs
              >

              </Grid>

              <Grid
                item
              >

                <button
                  type="button" className="button chatSend transition-03 smooth"
                  style={{
                    position: "relative",
                    top: "auto",
                    right: 0,
                    bottom: "auto",
                  }}
                  onClick={event => {
                    // console.log("Save");
                    this.save();
                  }}
                  disabled={!editorState}
                >Send</button>

              </Grid>

            </Grid>

          </div>


        </div>
      </div>
    )
  }
}

export default compose(
  graphql(sendDirectMessage, {
    // options: props => {

    //   console.log("sendDirectMessage props", props);

    //   return {}
    // },
  }),
)(withStyles(styles)(ChatMessageEditor));

