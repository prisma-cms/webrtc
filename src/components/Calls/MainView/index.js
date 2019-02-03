import React, { Component } from 'react'

import ReactDOM from 'react-dom';

import PropTypes from 'prop-types'
import { withStyles } from 'material-ui';

import { MediaStream } from '../../webrtc-chat3';

// import Grid from 'material-ui/Grid';
// import IconButton from 'material-ui/IconButton';

// import CloseIcon from "material-ui-icons/Clear";
// import ContactsIcon from "material-ui-icons/People";
// import InfoIcon from "material-ui-icons/Info";
// import BackIcon from "material-ui-icons/ArrowBack";
// import ChatIcon from "material-ui-icons/Chat";

import CallingIcon from "material-ui-icons/PhoneInTalk";
import HangupIcon from "material-ui-icons/CallEnd";

// import Member from "./Member";
// import InviteMember from "./InviteMember";
import { compose, graphql } from 'react-apollo';

import PrismaCmsComponent from "@prisma-cms/component";

// import {
//   CallJoinRoom,
// } from 'query';


// import {
//   // call,
//   chatRoom,
//   updateCallProcessor,
// } from "query";

// import Chat from "./Chat";

// import RoomInfo from "./Info";

import TextChatView from "./View/Chat";
// import VideoChatView from "./View/Video";

let styles = {
  root: {
    "&.opened": {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      alignItems: "center",

      // "& .chat": {
      //   maxWidth: "100%",
      //   left: "auto",
      //   marginLeft: "auto",
      //   maxHeight: "calc(100% - 100px)",
      // },
    },
    "& .cMain": {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      flexGrow: 1,

      "& .blockVideo": {

      },
    },
    "& video": {
      maxHeight: "100%",
      maxWidth: "100%",
    },
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
  chat: {
    // overflowX: "auto",
    // padding: "30px 3% 5%",
    padding: "30px 3% 10px",
    position: "relative",
    zIndex: 500,
    width: "100%",
    height: "100%",
    // border: "1px solid red",

    flex: "none",
    // height: 700,
  },
  wrapper: {
    // display: "flex",
    // flexDirection: "row",
    // flexWrap: "nowrap",
    // height: "100%",
    // // margin: "0 3%",
    // width: "100%",
    // // overflowY: "hidden",
    // // overflowX: "auto",
    // // position: "relative",
    // backgroundColor: "#e6edf0",
    // borderRadius: 5,

    display: "block",
    // flexDirection: "row",
    // flexWrap: "nowrap",
    height: "100%",
    // margin: "0 3%",
    width: "100%",
    overflow: "auto",
    // overflowY: "hidden",
    // overflowX: "auto",
    // position: "relative",
    // backgroundColor: "#e6edf0",
    // backgroundColor: "#fff",
    // borderRadius: 5,
  },
  header: {

  },
  participants: {
    // display: "flex",
    // flexDirection: "row",
    // overflowX: "auto",
    // position: "relative",
    // flexWrap: "nowrap",

    // width: "100%",
    position: "relative",
    background: "rgba(0, 0, 0, 0.5)",
    // height: 100,
    // justifyContent: "flex-end",

    // bottom: 0;
    // left: 0;

    // z-index: 70;
    // "& > .user": {
    //   // flexBasis: "33.3%",
    //   // minWidth: "33.3%",
    // },
  },
  user: {

  },
  blockVideo: {
    display: "flex",
    flexBasis: "100%",
    flexDirection: "column",
    height: "100",
  },
  mainVideo: {
    flex: "1 1 auto",
    width: "100%",
    display: "flex",
    flexBasis: "100%",
    alignItems: "center",
  },
  controls: {
    height: "100%",
    alignItems: "center",
    flexWrap: "nowrap",
    // overflowX: "auto",
    "& > div": {
      padding: "0 10px",
    },
  },
  cMain: {
    width: "calc(100% - 300px)",
    minWidth: 300,
  },
  cExtra: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: 300,
    flex: "none",
  },
  scrollableContainer: {
    overflowY: "auto",
  },
}

export class CallMainView2 extends PrismaCmsComponent {

  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    ChatRoom: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    // call: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    callUser: PropTypes.func.isRequired,
    streams: PropTypes.array.isRequired,
    connection: PropTypes.object,
    closeCall: PropTypes.func.isRequired,
    callRequests: PropTypes.array.isRequired,

  }

  // static contextTypes = {
  //   ...PrismaCmsComponent.contextTypes,
  //   updateCallRequest: PropTypes.func.isRequired,
  //   closeCall: PropTypes.func.isRequired,
  //   /**
  //    * Важный параметр для определения есть исходящий звонок или нет
  //    */
  //   isCalling: PropTypes.bool.isRequired,
  //   //
  // }


  static childContextTypes = {
    acceptCall: PropTypes.func,
    rejectCall: PropTypes.func,
  }

  getChildContext() {

    return {
      acceptCall: this.acceptCall,
      rejectCall: this.rejectCall,
    }
  }


  constructor(props) {

    super(props);

    this.state = {
      ...this.state,
      inviteMemberOpened: false,

      /**
       * 1. Chat info
       */
      viewState: 0,
    }
  }


  async closeCall(callRequestId) {

    const {
      // connection,
      closeCall,
    } = this.props;

    // const {
    //   closeCall,
    // } = this.context;


    // this.updateCall({
    //   status: "Ended",
    // });

    const {
      connection,
      // streams,
    } = this.props;

    // connection && connection.close();

    const {
      updateCallRequest,
    } = this.context;

    if (callRequestId) {
      await updateCallRequest(callRequestId, {
        status: "Ended",
      });
    }

    connection && connection.close();
    // closeCall();
  }


  // expertId, callId
  callUser = async (expertId, callId) => {


    console.log("callUser");

    const {
      callUser,
      roomId,
    } = this.props;

    this.setState({
      calling: true,
    });


    /**
     * 
     */
    await callUser(expertId, callId)
      .then(r => {
        console.log("callUser result", r);
        return r;
      })
      .catch(error => {
        console.log("callUser error", error);
        return error;
      })
      ;


    this.setState({
      calling: false,
    });

  }


  getCall() {

    // let {
    //   data: {
    //     object,
    //   },
    // } = this.props;

    // return object && object.Call || null;

    return {}
  }




  rejectCall = () => {
    return this.updateCall({
      status: "Rejected",
    });
  }


  acceptCall = () => {

    return this.updateCall({
      status: "Accepted",
    });
  }


  async updateCall(data) {

    console.error("updateCall", data);

    // const {
    //   client,
    // } = this.context;


    // const {
    //   // item: {
    //   // },
    //   id,
    // } = this.getCall();

    // let variables = {
    //   data,
    //   where: {
    //     id,
    //   },
    // };


    // const result = await this.mutate({
    //   mutation: updateCallProcessor,
    //   variables,
    // })
    //   .then(async r => {

    //     await client.reFetchObservableQueries();

    //     return r;
    //   })
    // // .catch(console.error);

    // // console.log("updateCall result", result);

  }


  render() {


    if (typeof window === "undefined") {
      return null;
    }


    const {
      Grid,
    } = this.context;


    let {
      classes,
      // callUser,
      streams,
      user: currentUser,
      // call,
      // data: {
      //   // object: call,
      //   loading,
      //   object: Room,
      // },
      connection,
      callRequests,
      ChatRoom,
    } = this.props;


    // console.error("Room");

    if (!ChatRoom) {
      return null;
    }


    callRequests = callRequests ? callRequests.filter(n => ["Created", "Accepted", "Started"].indexOf(n.status) !== -1) : [];

    console.log("Active callRequests", callRequests);

    // const {
    //   closeCall,
    // } = this.context;

    const {
      inviteMemberOpened,
      viewState,
      loading: updateCllRequested,
      showVideoChat,
    } = this.state;


    const call = this.getCall();


    console.log("activeCall", call);

    if (!currentUser) {
      return null;
    }

    const {
      isCalling,
    } = this.context;


    const {
      id: currentUserId,
    } = currentUser;




    let mainStream = streams && streams.find(stream => stream.type !== "local") || null;
    let otherStreams = streams && streams.filter(stream => !mainStream || mainStream.id !== stream.id) || [];
    // let otherStreams = streams.filter(stream => true) || [];



    let chatView;
    let videoView;

    let buttons = [];

    let otherStreamsView;

    // chatView = <TextChatView
    //   room={Room}
    //   callButtons={buttons}
    // // showVideoChatHandler={event => {
    // //   this.setState({
    // //     showVideoChat: true,
    // //   });
    // // }}
    // />


    const hasMyOutcomeRequest = isCalling && callRequests && callRequests.find(n => n.Caller.id === currentUserId) || null;
    const hasMyIncomeRequests = callRequests && callRequests.filter(n => n.Called.id === currentUserId) || [];


    // console.log("hasMyOutcomeRequest", hasMyOutcomeRequest, callRequests, currentUserId);
    console.log("hasMyIncomeRequests", hasMyIncomeRequests, callRequests, currentUserId);



    if (ChatRoom) {

      // console.log("ChatRoom", ChatRoom);
      // return null;


      let fullView = showVideoChat;

      const {
        id: roomId,
        // status: callStatus,
        // // userId: expertId,
        // User: {
        //   id: expertId,
        // },
        CreatedBy: {
          id: expertId,
        },    // Call requester
      } = ChatRoom;

      const callStatus = "Accepted";


      console.log("callStatus", callStatus);

      switch (callStatus) {


        case "Requested":


          // console.log("expertId !== currentUserId", expertId, currentUserId);

          // if (expertId !== currentUserId) {
          //   buttons.push("Waiting for reception");
          // }
          // else {
          //   buttons.push(<a
          //     key="reject"
          //     href="javascript:;"
          //     className="link transition-03 smooth btn-merged"
          //     onClick={event => {
          //       event.preventDefault();

          //       this.rejectCall();

          //     }}
          //   >
          //     Reject request
          //   </a>);

          //   buttons.push(<a
          //     key="accept"
          //     href="javascript:;"
          //     className="link active transition-03 smooth btn-merged"
          //     onClick={event => {
          //       event.preventDefault();

          //       this.acceptCall();

          //     }}
          //   >
          //     Accept request
          //   </a>);
          // }

          break;

        case "Accepted":
        case "Started":

          console.log("expertId === currentUserId", expertId === currentUserId);

          if (expertId === currentUserId) {

          }
          else {

            /**
             * Если есть активный вызов:
             * - если вызывающий - текущий пользователь, то кнопка завершения текущего соединения.
             * - если это эксперт, то кнопка завершения всех соединений
             */

            console.log("hasMyOutcomeRequest", hasMyOutcomeRequest);
            console.log("hasMyIncomeRequests", hasMyIncomeRequests);

            if (hasMyOutcomeRequest) {

              const {
                id: callRequestId,
                status,
              } = hasMyOutcomeRequest;


              switch (status) {

                case "Created":


                  buttons.push(<button
                    key="calling"
                    type="button"
                    className="button btnCall transition-03 smooth circle"
                    // onClick={event => {
                    //   // callUser("cjdp665565yho01119wymwezk");
                    //   this.callUser(expertId, callId);
                    // }}
                    // disabled={callRequests.filter(n => n.status === "Created").length > 0}
                    style={{
                      background: "#34c96f",
                      color: "white",
                      fontSize: 26,
                      lineHeight: 60,
                      width: 60,
                      height: 60,
                      textAlign: "center",
                    }}
                  >

                    <CallingIcon
                      style={{
                        margin: "0 auto",
                      }}
                    />
                  </button>);

                  break;


                case "Accepted":
                case "Started":

                  /**
                   * Завершение вызова
                   */
                  buttons.push(<button
                    key="calling"
                    type="button"
                    className="button btnCall transition-03 smooth circle"
                    onClick={event => {
                      // callUser("cjdp665565yho01119wymwezk");
                      this.closeCall(callRequestId);
                    }}
                    // disabled={callRequests.filter(n => n.status === "Created").length > 0}
                    style={{
                      background: "#f50057",
                      color: "white",
                      fontSize: 26,
                      lineHeight: 60,
                      width: 60,
                      height: 60,
                      textAlign: "center",
                    }}
                  >

                    <HangupIcon
                      style={{
                        margin: "0 auto",
                      }}
                    />
                  </button>);

                  break;

              }

            }
            else if (hasMyIncomeRequests && hasMyIncomeRequests.length) {

            }
            else {

              buttons.push(<button
                key="call"
                type="button"
                className="button btnCall transition-03 smooth circle"
                onClick={event => {
                  // callUser("cjdp665565yho01119wymwezk");
                  this.callUser(expertId, roomId);
                }}
                // disabled={callRequests.filter(n => n.status === "Created").length > 0}
                style={{
                  background: "#34c96f",
                  color: "white",
                  fontSize: 26,
                  lineHeight: 60,
                  width: 60,
                  height: 60,
                  textAlign: "center",
                }}
              >
                <i
                  className="icon fal fa-phone"
                  style={{
                    margin: "0 auto",
                  }}
                ></i>
              </button>);
            }
          }

          break;


        case "Rejected":
          buttons.push("Call rejected");
          break;

      }


      if (callStatus && ["Accepted", "Started"].indexOf(callStatus) !== -1) {

        fullView = true;

      }


      if (streams && streams.length) {
        videoView = <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            // border: "1px solid green",
            background: "#e8eef2",
          }}
        >
          <div
            style={{
              flex: "1 0 0%",
              // border: "1px solid blue",
              display: "flex",
            }}
          >

            {mainStream
              ?
              <MediaStream
                stream={mainStream}
                muted={mainStream.type === "local"}
                // muted={true}
                controls
              />
              :
              null
            }
          </div>
          <div
            style={{
              // border: "1px solid red",
              background: "#fff",
              padding: 15,
            }}
          >

            {/* {buttons} */}

          </div>
        </div>
      }



      otherStreamsView = otherStreams.map(stream => {

        const {
          id,
          type,
        } = stream;

        return <div
          key={id}
          className={["user", classes.user].join(" ")}
          style={{
            // flex: "1 1 0%",
            // display: "flex",
          }}
        >
          <Grid
            container
            style={{
              flexWrap: "nowrap"
            }}
          >
            <Grid
              item
              xs
            >

            </Grid>
            <Grid
              item
              style={{
                maxWidth: "100%",
              }}
            >
              <MediaStream
                stream={stream}
                // stream={mainStream}
                muted={type === "local"}
                // muted={true}
                controls
              />
            </Grid>
            <Grid
              item
              xs
            >

            </Grid>
          </Grid>

        </div>

      })


      if (fullView) {

        // chatView = <Grid
        //   container
        //   spacing={16}
        //   style={{
        //     height: "100%",
        //   }}
        // >
        //   <Grid
        //     item
        //     // xs={12}
        //     // md={3}
        //     style={{
        //       width: 260,
        //     }}
        //   >
        //     {otherStreamsView}
        //   </Grid>

        //   <Grid
        //     item
        //     xs
        //   // xs={12}
        //   // md={6}
        //   >
        //     {videoView}
        //   </Grid>

        //   <Grid
        //     item
        //     // xs={12}
        //     // md={3}
        //     style={{
        //       width: 320,
        //     }}
        //   >
        //     {chatView}
        //   </Grid>
        // </Grid>;
      }

    }


    chatView = <TextChatView
      room={ChatRoom}
      callButtons={buttons}
    // showVideoChatHandler={event => {
    //   this.setState({
    //     showVideoChat: true,
    //   });
    // }}
    />


    let columns = [];


    console.log("videoView", videoView);

    if (otherStreamsView && otherStreamsView.length && videoView) {


      columns.push(<Grid
        key="otherStreamsView"
        item
        // xs={12}
        // md={3}
        style={{
          width: 260,
        }}
      >
        {otherStreamsView}
      </Grid>);

      columns.push(<Grid
        key="videoView"
        item
        xs
      // xs={12}
      // md={6}
      >
        {videoView}
      </Grid>);

      columns.push(<Grid
        key="chatView"
        item
        // xs={12}
        // md={3}
        style={{
          width: 320,
        }}
      >
        {chatView}
      </Grid>);
    }

    else if (videoView) {

      columns.push(<Grid
        key="videoView"
        item
        xs
      // xs={12}
      // md={6}
      >
        {videoView}
      </Grid>);

      columns.push(<Grid
        key="chatView"
        item
        // xs={12}
        // md={3}
        style={{
          width: 320,
        }}
      >
        {chatView}
      </Grid>);

    }
    else {
      columns.push(<Grid
        key="chatView"
        item
        xs={12}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {chatView}
      </Grid>);
    }


    return super.render(columns || null);



    // const content = <div
    //   className={["cArea testArea expanded opened", classes.root].join(" ")}
    //   id="testCall"
    //   style={{
    //     position: "absolute",
    //     top: 0,
    //     bottom: 0,
    //     height: "100%",
    //     zIndex: 310,
    //   }}
    // >

    //   <div
    //     className="overlay"
    //     style={{
    //       position: "absolute",
    //       height: "100%",
    //       top: 0,
    //       bottom: 0,
    //     }}
    //   ></div>

    //   <div className={[classes.chat].join(" ")}>

    //     <div
    //       className={classes.wrapper}
    //     // style={{
    //     //   border: "2px solid red",
    //     // }}
    //     >

    //       {/* <div
    //         className={classes.header}
    //       >
    //       </div>

    //       <div
    //         className={classes.content}
    //       >
    //         {chatView}
    //       </div> */}

    //       {/* {chatView} */}

    //       <Grid
    //         container
    //         spacing={16}
    //         style={{
    //           height: "100%",
    //         }}
    //       >
    //         {columns}
    //       </Grid>;

    //       {/* {showVideoChat || (call && showVideoChat === undefined)
    //         ?
    //         <Grid
    //           container
    //           spacing={16}
    //           style={{
    //             height: "100%",
    //           }}
    //         >
    //           <Grid
    //             item
    //             // xs={12}
    //             // md={3}
    //             style={{
    //               width: 260,
    //             }}
    //           >
    //             {otherStreamsView}
    //           </Grid>

    //           <Grid
    //             item
    //             xs
    //           // xs={12}
    //           // md={6}
    //           >
    //             {videoView}
    //           </Grid>

    //           <Grid
    //             item
    //             // xs={12}
    //             // md={3}
    //             style={{
    //               width: 320,
    //             }}
    //           >
    //             {chatView}
    //           </Grid>
    //         </Grid>
    //         :
    //         chatView
    //       } */}


    //     </div>

    //   </div>

    // </div>;


    // // const container = window.document.querySelector(".main-content");

    // // if (container) {

    // //   return ReactDOM.createPortal(super.render(content), container);
    // //   // return ReactDOM.createPortal(super.render(callView), window.document.body);
    // // }

    // // else {
    // //   console.error("Can not get container");
    // //   return null;
    // // }

    // return super.render(content);

  }
}

// export default compose(graphql(
//   // call,
//   chatRoom,
// ))(withStyles(styles)(CallMainView2));

export default withStyles(styles)(props => <CallMainView2
  {...props}
/>);
