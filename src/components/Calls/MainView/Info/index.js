import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Member from "./Member";
import withStyles from 'material-ui/styles/withStyles';

const styles = {
  root: {
    padding: "30px 0 0",
    overflowY: "auto",
  },
}

export class RoomInfo extends Component {

  static propTypes = {
    call: PropTypes.object,
    room: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  }

  render() {

    const {
      room,
      call,
      classes,
    } = this.props;


    if (!room) {
      return null;
    }


    const {
      Members: members,
    } = room;

    return (
      <div
        className={classes.root}
      >

        {members.map(n => {

          const {
            id,
          } = n;

          return <Member
            key={id}
            user={n}
            call={call}
            room={room}
          />
        })}

      </div>
    )
  }
}

export default withStyles(styles)(props => <RoomInfo 
  {...props}
/>);
