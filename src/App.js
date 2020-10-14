import React, { PureComponent } from 'react';
import SubscriptionProvider from "./components/SubscriptionProvider";
import ContextProvider from "./components/ContextProvider";

export {
  ContextProvider,
  SubscriptionProvider,
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