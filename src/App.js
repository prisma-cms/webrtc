import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./styles/less/styles.css";

import Context from '@prisma-cms/context';

import SubscriptionProvider from "./components/SubscriptionProvider";
import ContextProvider from "./components/ContextProvider";

import CallRequestButtons from "./components/Calls/CallRequestButtons";

import WebRtcChatProvider from './components/webrtc-chat3';

export {
  ContextProvider,
  SubscriptionProvider,
  CallRequestButtons,
  WebRtcChatProvider,
}

class App extends Component {

  static contextType = Context;

  render() {
    return (
      <div>
        My awesome component
      </div>
    );
  }
}

export default App;