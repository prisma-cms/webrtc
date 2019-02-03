
import React from 'react'
// import PropTypes from 'prop-types'

import PrismaCmsComponent from '@prisma-cms/component';

import Provider from "./provider"
import MediaStream from "./MediaStream"

export {
  MediaStream,
}

export default class WebRtcChatProvider extends PrismaCmsComponent {


  render() {

    const {
      user: currentUser,
    } = this.context;

    // if (!currentUser) {
    //   return null;
    // }

    const {
      id: currentUserId,
    } = currentUser || {};

    return <Provider
      key={currentUserId}
      user={currentUser}
      {...this.props}
    />
  }
}