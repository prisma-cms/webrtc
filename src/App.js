import React, { PureComponent } from 'react';
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

class App extends PureComponent {

  render() {

    const {
      children,
      ...other
    } = this.props;

    return (
      <div
        {...other}
      >
        <h2>
          My awesome component
        </h2>
        {children}
      </div>
    );
  }
}

export default App;