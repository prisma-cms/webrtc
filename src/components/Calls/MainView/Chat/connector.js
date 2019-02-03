import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { compose, graphql } from 'react-apollo'

import {
  chatRoom,
} from 'query';

import View from './View';

export class ChatConnector extends Component {

  static propTypes = {
    View: PropTypes.func.isRequired,
  }


  static defaultProps = {
    View,
  }

  render() {

    const {
      View,
      ...other
    } = this.props;

    return (
      <View
        {...other}
      />
    )
  }
}

export default compose(
  graphql(chatRoom, {
    // name: "chats",
  })
)(ChatConnector)
