import React, { Component } from 'react';
import PropTypes from "prop-types";

import App, {
  ContextProvider,
  SubscriptionProvider,
  WebRtcChatProvider,
} from "../../App";

import { Renderer as PrismaCmsRenderer } from '@prisma-cms/front'
import { withStyles } from 'material-ui';


import {
  ContextProvider as SocietyContextProvider,
  SubscriptionProvider as SocietySubscriptionProvider,
} from "@prisma-cms/society";


import ChatRoomsPage from "../../components/pages/society/ChatRooms";
import ChatRoomPage from "../../components/pages/society/ChatRooms/ChatRoom";
import CreateChatRoomPage from "../../components/pages/society/ChatRooms/ChatRoom/Create";

import ChatMessagesPage from "../../components/pages/society/ChatMessages";
import ChatMessagePage from "../../components/pages/society/ChatMessages/ChatMessage";

import MainMenu from './MainMenu';


// import WebRtcChatProvider from '../../components/webrtc-chat3';

export const styles = theme => {



  const {
    typography: {
      fontFamily,
      fontSize,
    },
    palette: {
      text: {
        primary,
      },
    },
  } = theme;

  return {
    root: {
      fontFamily,
      fontSize,
      color: primary,

      height: "100%",
      display: "flex",
      flexDirection: "column",

      "& #Renderer--body": {
        flex: 1,
        overflow: "auto",
        width: "100%",
      },
    },

    header: {
      marginBottom: 6,
      position: "relative",
      zIndex: 1,
    },

    body: {
      flex: 1,
      overflow: "auto",
    },
  }

}


class Renderer extends PrismaCmsRenderer {


  static propTypes = {
    ...PrismaCmsRenderer.propTypes,
    pure: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsRenderer.defaultProps,
    pure: false,
  }


  renderMenu() {

    return <MainMenu />
  }


  getRoutes() {

    let routes = super.getRoutes();

    return [
      {
        exact: true,
        path: "/",
        component: App,
      },
      // {
      //   exact: true,
      //   path: "/",
      //   component: ChatRoomsPage,
      // },
      {
        exact: true,
        path: "/chat-rooms",
        component: ChatRoomsPage,
      },
      {
        exact: true,
        path: "/chat-rooms/create",
        component: CreateChatRoomPage,
      },
      {
        exact: true,
        path: "/chat-rooms/:id",
        render: props => {

          const {
            match: {
              params: {
                id,
              },
            },
          } = props;

          return <ChatRoomPage
            key={id}
            where={{
              id,
            }}
            {...props}
          />
        },
      },
      {
        exact: true,
        path: "/chat-messages",
        component: ChatMessagesPage,
      },
      {
        exact: true,
        path: "/chat-messages/:id",
        render: props => {

          const {
            match: {
              params: {
                id,
              },
            },
          } = props;

          return <ChatMessagePage
            key={id}
            where={{
              id,
            }}
            {...props}
          />
        },
      },
      // {
      //   path: "*",
      //   render: props => this.renderOtherPages(props),
      // },
    ].concat(routes);

  }


  renderWrapper() {

    return <SocietyContextProvider>
      <SocietySubscriptionProvider>
        <ContextProvider>
          <SubscriptionProvider>
            <WebRtcChatProvider
              iceServers={[{
                'urls': [
                  'stun:localhost:3478'
                ],
              }]}
            >
              {super.renderWrapper()}
            </WebRtcChatProvider>
          </SubscriptionProvider>
        </ContextProvider>
      </SocietySubscriptionProvider>
    </SocietyContextProvider>;

  }


  render() {

    const {
      pure,
      classes,
      ...other
    } = this.props;

    return <div
      className={classes.root}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
          html, body, #root {
            height: 100%;
          }
        `,
        }}
      />
      {pure ?
        <App
          {...other}
        />
        : super.render()
      }
    </div>

  }

}

export default withStyles(styles)(props => <Renderer
  {...props}
/>);