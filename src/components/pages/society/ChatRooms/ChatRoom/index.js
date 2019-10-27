import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Page from "../../../layout";

import {
  ChatRoom,
} from "@prisma-cms/society";


import View from "./View";


class ChatRoomPage extends Page {


  // setPageMeta() {

  //   return super.setPageMeta({
  //     title: "Чаты",
  //   });

  // }


  render() {

    return super.render(
      <ChatRoom
        {...this.props}
        View={View}
      />
    );

    return <div
      style={{
        height: 600,
        border: "1px solid red",
      }}
    >
      {super.render(
        <ChatRoom
          {...this.props}
          View={View}
        />
      )}
    </div>;
  }
}


export default ChatRoomPage;