import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import withStyles from 'material-ui/styles/withStyles'

import Grid from "material-ui/Grid";

import InfoIcon from "material-ui-icons/InfoOutline";
import CloseIcon from "material-ui-icons/Clear";

import PrismaCmsComponent from "@prisma-cms/component";

// import Avatar from "Avatar";

// import MiniModal from "ui/MiniModal";

// import RoomInfo from "./RoomInfo";

// import MessageEditor from "ui/Chat/Message/Editor";

// import Message from "./Message";
import CallButton from "./CallButton";

const styles = {
  root: {
    // border: "1px solid blue",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: "#f4f5f6",
    borderRadius: 5,
    // maxWidth: 1200,
    // margin: "0 auto",
  },
  header: {

    padding: "5px 16px",
    backgroundColor: "#fff",

    "& .videoButton": {
      height: "2rem",
      borderRadius: "1rem",
      justifyContent: "space-between",
      padding: "0 12px",
      marginRight: 10,
    },

    "& .avatar": {
      border: "2px solid #fff",
      marginLeft: -8,
      cursor: "pointer",
    },
  },
  content: {
    // flex: "1 1",
    // border: "1px solid green",
    // padding: 15,
    height: "100%",
  },
  showMember: {
    position: "absolute",
    bottom: 0,

    // "& .border": {
    //   boxShadow: "0px 0px 2px 2px #0000001f",
    // },

    // "& .border-radius": {
    //   borderRadius: "2px",
    // },

    // "& .bg": {
    //   backgroundColor: "white",
    // },

    // "& .wrapper": {
    //   position: "absolute",
    //   zIndex: 10,
    //   top: 8,
    //   left: -10,

    //   "& .corner": {
    //     transform: "rotate(45deg)",
    //     width: 10,
    //     height: 10,
    //     top: -5,
    //     left: 16,
    //     position: "absolute",
    //     zIndex: 20,
    //   },

    //   "& .content": {
    //     padding: 15,
    //     position: "relative",
    //     zIndex: 30,
    //   },
    // },
  },
};

// class RoomChatView extends RoomView {
class RoomChatView extends PrismaCmsComponent {


  static propTypes = {
    // ...RoomView.propTypes,
    // showVideoChatHandler: PropTypes.func.isRequired,
    callButtons: PropTypes.array.isRequired,
  }


  constructor(props) {

    super(props);

    this.state = {
      ...this.state,
      showRoominfo: false,
    }
  }

  render() {

    const {
      classes,
      room,
      callButtons,
      // showVideoChatHandler,
    } = this.props;


    const {
      user: currentUser,
      Avatar,
    } = this.context;

    if (!room || !currentUser) {
      return null;
    }


    const {
      // showMember,
      showRoominfo,
      // editorState,
    } = this.state;


    const {
      id: roomId,
      // name: roomName,
      // Members: members,
      // Messages: messages,
      // Call,
    } = room;

    let membersIcons = [];

    const {
      id: currentUserId,
    } = currentUser;

    // let otherMembers = members.filter(n => n.id !== currentUserId);
    // let otherMembers = members;


    let zIndex = 0;

    // membersIcons = otherMembers.map(n => {

    //   const {
    //     id,
    //     fullname,
    //     city,
    //   } = n;

    //   zIndex++;

    //   return <div
    //     key={id}
    //     style={{
    //       zIndex,
    //       position: "relative",
    //     }}
    //   >
    //     <Avatar
    //       className="avatar"
    //       user={n}
    //       size="default"
    //       onClick={event => {
    //         this.setState({
    //           showMember: showMember === id ? undefined : id,
    //         })
    //       }}
    //     />

    //     {showMember && showMember === id
    //       ?

    //       <div
    //         className={classes.showMember}
    //       >
    //         {/* <MiniModal> */}
    //           <Grid
    //             container
    //             spacing={16}
    //             alignItems="center"
    //             style={{
    //               flexWrap: "nowrap",
    //             }}
    //           >
    //             <Grid
    //               item
    //             >

    //               <Avatar
    //                 user={n}
    //                 size="middle"
    //                 style={{
    //                   border: "1px solid #ddd",
    //                 }}
    //               />

    //             </Grid>

    //             <Grid
    //               item
    //               xs
    //               style={{
    //                 whiteSpace: "nowrap",
    //               }}
    //             >
    //               <Typography
    //                 style={{
    //                   fontWeight: 600,
    //                   color: "#666",
    //                   fontSize: "0.9rem",
    //                 }}
    //               >
    //                 {fullname}
    //               </Typography>

    //               {city
    //                 ?
    //                 <Typography
    //                   style={{
    //                     color: "#888",
    //                     fontSize: "0.7rem",
    //                   }}
    //                 >
    //                   {city}
    //                 </Typography>
    //                 : null
    //               }

    //             </Grid>
    //           </Grid>
    //         {/* </MiniModal> */}
    //       </div>
    //       : null
    //     }

    //   </div>
    // });


    let callButton;


    // if (Call) {

    //   callButton = <button
    //     className="videoButton button bg-green"
    //   >
    //     <VideoCamIcon
    //     // style={{
    //     //   fill: "transparent",
    //     //   stroke: "#fff",
    //     // }}
    //     /> Show video chat
    //   </button>;

    // }
    // else {

    //   callButton = <button
    //     className="videoButton button bg-blue"
    //   >
    //     <VideoCamIcon
    //     // style={{
    //     //   fill: "transparent",
    //     //   stroke: "#fff",
    //     // }}
    //     /> Request a video call
    //   </button>;
    // }

    callButton = <CallButton 
      room={room}
      currentUser={currentUser}
      // showVideoChatHandler={showVideoChatHandler}
    />

    let header = <div
      className={classes.header}
    >

      <Grid
        container
        spacing={8}
        alignItems="center"
      >
        {/* <Grid
          item
          // xs={12}
          // sm={6}
          // md
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 8,
            }}
          >
            {membersIcons}
          </div>
        </Grid> */}

        {/* <Grid
        item
        xs
      >
      </Grid> */}

        {/* <Grid
          item
          xs
          // xs={12}
          // sm={6}
          // md
        >
          {roomName}
        </Grid> */}

        {/* <Grid
        item
        xs
      >
      </Grid> */}

        <Grid
          item
          // xs={12}
          // md
          style={{
            flexGrow: 1,
          }}
        >

          <Grid
            container
            alignItems="center"
            style={{
              flexWrap: "nowrap",
            }}
          >

            <Grid
              item
              xs
            >
            </Grid>

            <Grid
              item
            >

              {callButton}

            </Grid>

            <Grid
              item
            >

              <div
                style={{
                  // position: "relative",
                  marginRight: 10,
                }}
              >

                <IconButton
                  style={{
                    height: "auto",
                    width: "auto",
                  }}
                  onClick={event => {
                    this.setState({
                      showRoominfo: !showRoominfo,
                    });
                  }}
                >
                  <InfoIcon
                    className={showRoominfo ? "text-blue" : ""}
                    style={{
                      fontSize: "2.3rem",
                    }}
                  />
                </IconButton>

                {/* {showRoominfo
                  ?
                  <RoomInfo
                    room={room}
                  />
                  : null
                } */}

                <IconButton>
                  <CloseIcon />
                </IconButton>

              </div>


            </Grid>

          </Grid>

        </Grid>

      </Grid>

    </div>


    // return super.render(
    return (
      <div
        className={classes.root}
      >


        <div
          className={classes.content}
        >



          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              // border: "1px solid blue",
            }}
          >

            {header}

            {/* <div
              style={{
                flex: "1 0",
                // border: "1px solid red",
                overflowX: "hidden",
                overflowY: "auto",
                padding: "0 20px",
              }}
            >

              {messages.map(n => {

                const {
                  id
                } = n;

                return <Message
                  key={id}
                  message={n}
                  currentUser={currentUser}
                />
              })}

            </div> */}

            <div
              style={{
                backgroundColor: "#e6edf0",
              }}
            >
              <div
                style={{
                  margin: "0 auto",
                  maxWidth: 1000,
                  padding: "0 15px",
                }}
              >
                <form
                  onSubmit={event => {
                    event.preventDefault();
                    this.sendMessage();
                  }}
                >
                  <Grid
                    container
                    spacing={16}
                    alignItems="center"
                  >


                    {callButtons && callButtons.length 
                    ? 
                    <Grid
                      item
                    >
                      {callButtons}
                    </Grid> : null
                    }

                    {/* <Grid
                      item
                      xs
                    >

                      <MessageEditor
                        editorClassName="message-editor"
                        onEditorStateChange={this.onEditorStateChange}
                        editorState={editorState}
                      />

                    </Grid> */}

                    {/* <Grid
                      item
                    >

                      <button
                        className="bg-lightgrey"
                        style={{
                          border: "none",
                          borderRadius: 5,
                          padding: "5px 13px",
                          textAlign: "center",
                          margin: "0 15px 0 0",
                          cursor: "pointer",
                        }}
                        type="submit"
                      >
                        <SendIcon
                          style={{
                            color: "white",
                            fontSize: "1rem",
                          }}
                        />
                      </button>

                    </Grid> */}
                  </Grid>
                </form>
              </div>
            </div>
          </div>


        </div>

      </div>
    );
  }
}

export default withStyles(styles)(props => <RoomChatView 
  {...props}
/>);
