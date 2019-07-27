import React, { Component } from 'react';
import PropTypes from "prop-types";

import App, {
  ContextProvider,
  SubscriptionProvider,
  WebRtcChatProvider,
} from "../../App";

import { Renderer as PrismaCmsRenderer } from '@prisma-cms/front'
import Context from '@prisma-cms/context'
import withStyles from 'material-ui/styles/withStyles';

import MainMenu from './MainMenu';
import DevMainPage from './pages/MainPage';


// export const styles = {

//   root: {
//     // border: "1px solid blue",
//     height: "100%",
//     display: "flex",
//     flexDirection: "column",

//     "& #Renderer--body": {
//       // border: "1px solid green",
//       flex: 1,
//       overflow: "auto",
//       display: "flex",
//       flexDirection: "column",
//     },
//   },
// }


import {
  ContextProvider as SocietyContextProvider,
  SubscriptionProvider as SocietySubscriptionProvider,
} from "@prisma-cms/society";


import ChatRoomsPage from "../../components/pages/society/ChatRooms";
import ChatRoomPage from "../../components/pages/society/ChatRooms/ChatRoom";
import CreateChatRoomPage from "../../components/pages/society/ChatRooms/ChatRoom/Create";

import ChatMessagesPage from "../../components/pages/society/ChatMessages";
import ChatMessagePage from "../../components/pages/society/ChatMessages/ChatMessage";


// import WebRtcChatProvider from '../../components/webrtc-chat3';

import * as queryFragments from "../../schema/generated/api.fragments";

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


class DevRenderer extends PrismaCmsRenderer {


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
        component: DevMainPage,
        // render: props => {
        //   // console.log("props", { ...props });
        //   return <DevMainPage
        //     {...props}
        //   >
        //     <div>
        //     Test
        //     </div>
        //   </DevMainPage>;
        // }
        // render: props => {
        //   console.log("props", { ...props });
        //   return null;
        // }
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



  renderMenu() {

    return <MainMenu />
  }


  renderWrapper() {

    let iceServers = [];

    iceServers.push({
      'urls': [
        'stun:localhost:3478',
      ],
      'username': 'test',
      'credential': 'test'
    });

    iceServers.push({
      'urls': [
        'turn:localhost:3478',
      ],
      'username': 'test',
      'credential': 'test'
    });

    return <Context.Consumer>
      {context => {

        {/* const {
          schema,
        } = context;

        if (!schema) {
          return null;
        } */}

        return <Context.Provider
          value={Object.assign(context, this.context, {
            queryFragments,
          })}
        >
          <SocietyContextProvider>
            <SocietySubscriptionProvider>
              <ContextProvider>
                <SubscriptionProvider>
                  <WebRtcChatProvider
                    connectionProps={{
                      iceServers,
                      // candidates: {
                      //   relay: true,
                      //   reflexive: true,
                      //   host: true,
                      // },
                    }}
                  >
                    {super.renderWrapper()}
                  </WebRtcChatProvider>
                </SubscriptionProvider>
              </ContextProvider>
            </SocietySubscriptionProvider>
          </SocietyContextProvider>
        </Context.Provider>


      }}
    </Context.Consumer>

  }


  render() {

    const {
      pure,
      classes,
      ...other
    } = this.props;

    return pure ? <App
      {...other}
    /> :
      <div
        className={classes.root}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body, html, #root{
              height: 100%;
            }
          `,
          }}
        />
        {super.render()}
      </div>;

  }

}

export default withStyles(styles)(props => <DevRenderer
  {...props}
/>);