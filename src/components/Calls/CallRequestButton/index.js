import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton';
import withStyles from 'material-ui/styles/withStyles'

import Context from "@prisma-cms/context"

// import {
//   user as userQuery,
// } from "query";


// import UserLink from "ui/Link/User";

import { compose, graphql } from 'react-apollo';

import EndCallIcon from "material-ui-icons/CallEnd";
import CallIcon from "material-ui-icons/Call";

/**
 * ToDo: Надо сделать, чтобы можно было видеть несколько входящих окон
 */

const styles = {
  root: {
    // position: "relative",
  },
  inner: {
  },
  // alert: {
  //   // position: "absolute",
  //   ["&.cAlert--alert"]: {
  //     // top: 100,
  //     // right: 40,

  //     "@media (max-width: 440px)": {
  //       right: 0,
  //       // left: 0,
  //     },
  //   },
  // },
  button: {
    backgroundColor: "white",
    height: 40,
    width: 40,
  },
}

export class CallRequestButton extends Component {

  static contextType = Context;

  static propTypes = {
    item: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    accept: PropTypes.func.isRequired,
    reject: PropTypes.func.isRequired,
    // data: PropTypes.object.isRequired,
  }



  async closeCall(callRequestId, status = "Ended") {


    // const {
    //   connection,
    //   // streams,
    // } = this.props;



    const {
      updateCallRequest,
      connections,
    } = this.context;

    if (callRequestId) {

      await updateCallRequest(callRequestId, {
        status,
      });

    }

    const connection = connections && connections[0] || null;

    connection && connection.close();
  }


  async cancelCall(callRequestId) {

    return this.closeCall(callRequestId, "Canceled");

  }



  render() {


    // return "CallRequest";

    const {
      Avatar,
      UserLink,
      user: currentUser,
      Grid,
      ChatRoomLink,
    } = this.context;

    const {
      classes,
      accept,
      reject,
      item: callRequest,
    } = this.props;


    const {
      id: currentUserId,
    } = currentUser || {};


    if (!currentUserId) {
      return null;
    }


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
      id: callRequestId,
      // fullname,
      // username,
      Caller,
      status,

      // status,
      Called,
      // Call: {
      //   // id: callId,
      // },
      Room,
    } = callRequest;


    const {
      id: callerId,
    } = Caller;

    const {
      id: calledId,
    } = Called;

    let button = null;


    switch (status) {

      case "Created":

        if (calledId === currentUserId) {

          // const __button = <div
          //   className={["cAlert testArea opened", classes.root].join(" ")}
          // >
          //   <audio
          //     key="callingRington"
          //     src="/media/call.mp3"
          //     autoPlay
          //     loop
          //   // controls
          //   />

          //   <div
          //     className={[classes.inner].join(" ")}
          //   >

          //     <div
          //       className={["cAlert--alert", classes.alert].join(" ")}
          //     >
          //       {Caller ?
          //         <UserLink
          //           user={Caller}
          //         /> : null
          //       }

          //       <div className="alertMessage">
          //         <div className="message">Is calling you</div>{/* Звонит Вам */}
          //         <div className="loading"><span className="aml1"></span><span className="aml2"></span><span className="aml3"></span></div>
          //       </div>
          //       <div className="alertControls">
          //         <button
          //           type="button" className="button transition-03 smooth btnDecline"
          //           onClick={reject}
          //         >
          //           <i className="icon fal fa-remove"></i>Decline{/* Отменить */}
          //         </button>

          //         <button
          //           type="button" className="button transition-03 smooth btnAccept"
          //           onClick={accept}
          //         >
          //           <i className="icon fal fa-video"></i>Accept{/* Принять */}
          //         </button>

          //         {/* <button type="button" className="button transition-03 smooth btnAcceptTwo"><span>Accept without video</span></button>Принять без видео */}
          //       </div>

          //     </div>

          //   </div>
          // </div>;


          button = <Grid
            container
            alignItems="center"
          >

            <Grid
              // className={[classes.inner].join(" ")}
              item
            >

              <audio
                key="callingRington"
                src="/media/call.mp3"
                autoPlay
                loop
              // controls
              />

              {Caller ?
                <UserLink
                  user={Caller}
                /> : null
              }

            </Grid>

            <Grid
              // className={[classes.inner].join(" ")}
              item
            >

              <IconButton
                className={[classes.button].join(" ")}
                color="primary"
                onClick={accept}
              // style={{
              //   backgroundColor: "white",
              // }}
              >
                <CallIcon
                />
              </IconButton>

            </Grid>

            <Grid
              // className={[classes.inner].join(" ")}
              item
            >

              <IconButton
                className={[classes.button].join(" ")}
                color="secondary"
                onClick={reject}
              >
                <EndCallIcon

                />
              </IconButton>

            </Grid>


          </Grid>

        }
        else if (callerId === currentUserId) {

          button = <Grid
            container
            alignItems="center"
          >

            {/* <Grid
              // className={[classes.inner].join(" ")}
              item
            >


              {Caller ?
                <UserLink
                  user={Caller}
                /> : null
              }

            </Grid> */}

            <Grid
              // className={[classes.inner].join(" ")}
              item
            >

              <IconButton
                className={[classes.button].join(" ")}
                color="secondary"
                onClick={event => {
                  // callUser("cjdp665565yho01119wymwezk");
                  this.cancelCall(callRequestId);
                }}
              >
                <EndCallIcon

                />
              </IconButton>



            </Grid>
          </Grid>

        }

        break;

      case "Started":

        if (calledId === currentUserId || callerId === currentUserId) {

          // button = <div
          //   className={["cAlert testArea opened", classes.root].join(" ")}
          // >

          //   <div
          //     className={[classes.inner].join(" ")}
          //   >


          //     {Caller ?
          //       <UserLink
          //         user={Caller}
          //       /> : null
          //     }

          //     <div className="alertControls">
          //       <button
          //         type="button" className="button transition-03 smooth btnDecline"
          //         onClick={event => {
          //           // callUser("cjdp665565yho01119wymwezk");
          //           this.closeCall(callRequestId);
          //         }}
          //       >
          //         <i className="icon fal fa-remove"></i> Завершить
          //         </button>

          //       {/* <button type="button" className="button transition-03 smooth btnAcceptTwo"><span>Accept without video</span></button>Принять без видео */}
          //     </div>

          //   </div>
          // </div>


          let User;

          if (calledId === currentUserId) {
            User = Caller;
          }
          else if (callerId === currentUserId) {
            User = Called;
          }


          button = <Grid
            container
            alignItems="center"
          >

            <Grid
              item
            >

              {User ?
                <UserLink
                  user={User}
                /> : null
              }

            </Grid>

            <Grid
              item
            >

              {Room ?
                <ChatRoomLink
                  object={Room}
                /> : null
              }

            </Grid>

            <Grid
              item
            >
              <IconButton
                className={[classes.button].join(" ")}
                color="secondary"
                onClick={event => {
                  this.closeCall(callRequestId);
                }}
              >
                <EndCallIcon

                />
              </IconButton>

            </Grid>
          </Grid>

        }

        break;

    }


    return button;
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

export default withStyles(styles)(props => <CallRequestButton
  {...props}
/>);
