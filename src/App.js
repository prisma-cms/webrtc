import React, { PureComponent } from 'react';

import "./styles/less/styles.css";

import SubscriptionProvider from "./components/SubscriptionProvider";
import ContextProvider from "./components/ContextProvider";

export {
  ContextProvider,
  SubscriptionProvider,
}

class App extends PureComponent {

  render() {
    return (
      <div>
        My awesome component
      </div>
    );
  }
}

export default App;