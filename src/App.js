import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./styles/less/styles.css";

import {
  Context,
} from '@prisma-cms/front'

import SubscriptionProvider from "./components/SubscriptionProvider";
import ContextProvider from "./components/ContextProvider";

export {
  Context,
  ContextProvider,
  SubscriptionProvider,
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