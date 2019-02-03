import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui';

import Context from "@prisma-cms/context"

// import {
//   user as userQuery,
// } from "query";


// import UserLink from "ui/Link/User";

import { compose, graphql } from 'react-apollo';


/**
 * ToDo: Надо сделать, чтобы можно было видеть несколько входящих окон
 */

const styles = {
  root: {
    // position: "relative",
  },
  inner: {
  },
  alert: {
    // position: "absolute",
    ["&.cAlert--alert"]: {
      // top: 100,
      // right: 40,

      "@media (max-width: 440px)": {
        right: 0,
        // left: 0,
      },
    },
  },
}

export class CallRequest extends Component {

  static contextType = Context;

  static propTypes = {
    item: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    accept: PropTypes.func.isRequired,
    reject: PropTypes.func.isRequired,
    // data: PropTypes.object.isRequired,
  }

  render() {


    // return "CallRequest";

    const {
      Avatar,
      UserLink,
    } = this.context;

    const {
      classes,
      accept,
      reject,
      item: callRequest,
    } = this.props;


    // const {
    //   loading,
    //   callRequest,
    // } = data;


    // if (!callRequest || loading) {
    //   return null;
    // }

    if (!callRequest) {
      return null;
    }


    const {
      id,
      // fullname,
      // username,
      Caller,
    } = callRequest;


    return (
      <div
        className={["cAlert testArea opened", classes.root].join(" ")}
      >
        <audio
          key="callingRington"
          src="/media/whatsapp.mp3"
          autoPlay
          loop
          // controls
        />

        <div
          className={[classes.inner].join(" ")}
        >

          <div
            className={["cAlert--alert", classes.alert].join(" ")}
          >

            {/* <UserLink
              className="alertUser"
              username={username}
            > 
              <Avatar
                className="userAvatar"
                user={callRequest}
              />
              <div className="userName">{fullname || username}</div>
            </UserLink> */}

            {Caller ?
              <UserLink
                user={Caller}
              /> : null
            }

            <div className="alertMessage">
              <div className="message">Is calling you</div>{/* Звонит Вам */}
              <div className="loading"><span className="aml1"></span><span className="aml2"></span><span className="aml3"></span></div>
            </div>
            <div className="alertControls">
              <button
                type="button" className="button transition-03 smooth btnDecline"
                onClick={reject}
              >
                <i className="icon fal fa-remove"></i>Decline{/* Отменить */}
              </button>

              <button
                type="button" className="button transition-03 smooth btnAccept"
                onClick={accept}
              >
                <i className="icon fal fa-video"></i>Accept{/* Принять */}
              </button>

              {/* <button type="button" className="button transition-03 smooth btnAcceptTwo"><span>Accept without video</span></button>Принять без видео */}
            </div>

          </div>

        </div></div>
    )
  }
}

// export default graphql(userQuery, {
//   options: props => {

//     const {
//       item,
//     } = props;

//     if (!item) {
//       return {
//         skip: true,
//       }
//     }


//     const {
//       Caller: {
//         id: callerId,
//       },
//     } = item;

//     return {
//       // skip,
//       variables: {
//         where: {
//           id: callerId,
//         },
//       },
//     };
//   },
// })(withStyles(styles)(CallRequest));

export default withStyles(styles)(CallRequest);
