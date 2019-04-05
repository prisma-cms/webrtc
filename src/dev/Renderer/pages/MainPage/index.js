import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Page from "../layout";
import App from '../../../../App';

class DevMainPage extends Page {

  render() {

    const {
      ...other
    } = this.props;

    return super.render(
      <App
        {...other}
      />
    );
  }
}


export default DevMainPage;