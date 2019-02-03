import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PrismaCmsComponent from "@prisma-cms/component";

// import {
//   sendDirectMessage,
// } from "query";

// import {
//   convertToRaw,
//   // createEditorState,
// } from "draft-js";

// import { createEditorState } from "Editor";

export default class RoomView extends PrismaCmsComponent {

  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    room: PropTypes.object.isRequired,
  }


  updateRoom(data) {

    const {

    } = this.props;

  }


  // onEditorStateChange = (editorState) => {

  //   const rawContent = editorState ? convertToRaw(editorState.getCurrentContent()) : undefined;

  //   // console.log("onEditorStateChange", editorState, rawContent);

  //   this.setState({
  //     // text: rawContent,
  //     editorState,
  //     rawContent,
  //   });
  // }


  // resetEditorState = () => {

  //   // console.log("createEditorState", createEditorState);

  //   this.setState({
  //     editorState: createEditorState(),
  //     rawContent: undefined,
  //   });

  // }


  // async sendMessage() {

  //   // console.log("sendMessage");

  //   const {
  //     // editorState,
  //     rawContent,
  //   } = this.state;

  //   const {
  //     room: {
  //       id: roomId,
  //     },
  //   } = this.props;

  //   const result = await this.mutate({
  //     mutation: sendDirectMessage,
  //     variables: {
  //       roomId,
  //       text: rawContent,
  //     },
  //   })
  //     .then(r => {

  //       const {
  //         response,
  //       } = r.data;


  //       const {
  //         success,
  //         data,
  //       } = response || {}

  //       if (success && data) {

  //         // const {
  //         //   room: {
  //         //     id: roomId,
  //         //   },
  //         // } = data;

  //         // const {
  //         //   router: {
  //         //     history,
  //         //   },
  //         // } = this.context;

  //         // const uri = `/inbox/${roomId}/`;

  //         // this.setState({
  //         //   editorState: createEditorState(),
  //         //   rawContent: undefined,
  //         // });

  //         this.resetEditorState();

  //         // close && close();

  //         // setTimeout(() => {
  //         //   history.push(uri);
  //         // }, 300);

  //       }

  //       return r;
  //     })
  //     .catch(e => e);

  //   return result;
  // }


  render(content) {
    return super.render(
      content
    );
  }
}
