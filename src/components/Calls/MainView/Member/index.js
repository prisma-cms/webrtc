import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Avatar from "Avatar";


export default class Member extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  render() {

    const {
      item: member,
    } = this.props;


    if(!member){
      return null;
    }


    const {
      id: memberId,
      fullname,
    } = member;

    return (
      <div
      >
        <Avatar 
          user={member}
          size="default"
        />
        {fullname}
      </div>
    )
  }
}
