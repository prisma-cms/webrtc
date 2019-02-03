
/**
 * Участники комнаты.
 * У кого указано, что он принимает звонки, выводим коннект, если еще нет текущего звонка.
 * Если есть, то надо указать, кто участник
 */

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Avatar from "Avatar";
import { withStyles } from 'material-ui';

import Grid from "material-ui/Grid";
import IconButton from "material-ui/IconButton";

import UserLink from "ui/Link/User";

import CallIcon from "material-ui-icons/Call";

import CallRequestButton from 'ui/Button/User/RequestCall';

const styles = {
  root: {
    // display: "flex",
    // flexDirection: "row",
    borderTop: "1px solid #ddd",
    padding: 5,

    "&:first-child": {
      borderTop: "none",
    },
  },
};


export class Member extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    room: PropTypes.object.isRequired,
    call: PropTypes.object,
  }


  static contextTypes = {
    // callUser: PropTypes.func.isRequired,
    user: PropTypes.object,
  }



  // callUser
  // callUser = (userId, roomId) => {

  //   const {
  //     callUser,
  //   } = this.context;


  //   // const {
  //   //   id: userId,
  //   // } = this.getUser() || {};


  //   return userId && roomId ? callUser(userId, {
  //     room: roomId,
  //   }) : false;

  // }


  // getUser() {

  //   const {
  //     user,
  //   } = this.props;

  //   return user;
  // }


  // getRoom() {

  //   const {
  //     room,
  //   } = this.props;

  //   return room;
  // }


  render() {

    const {
      user: member,
      classes,
      call,
      room,
    } = this.props;


    const {
      user: currentUser,
    } = this.context;


    if (!member || !currentUser || !room) {
      return null;
    }


    const {
      id: currentUserId,
    } = currentUser;

    const {
      id: roomId,
    } = room;


    const {
      id: memberId,
      username,
      fullname,
      callPrice,
    } = member;

    let callInfo;


    if (callPrice && currentUserId !== memberId) {

      if (!call) {

        // callInfo = <IconButton
        //   onClick={event => this.callUser(memberId, roomId)}
        // >
        //   <CallIcon />
        // </IconButton>

        callInfo = <Fragment>
          <CallIcon /> <CallRequestButton
            user={member}
            room={room}
          />
        </Fragment>

      }

    }


    return (
      <div
        className={classes.root}
      >
        <Grid
          container
          spacing={8}
          alignItems="center"
        >

          <Grid
            item
          >
            <Avatar
              user={member}
              size="default"
            />
          </Grid>

          <Grid
            item
            xs
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <UserLink
              username={username}
              target="_blank"
            >
              {fullname}
            </UserLink>

            {callInfo}

          </Grid>
        </Grid>

      </div>
    )
  }
}

export default withStyles(styles)(Member);

