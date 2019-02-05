import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';


import {
  styles as defaultStyles,
  ChatRoomView as ChatRoomViewProto,
} from "@prisma-cms/society/lib/components/pages/ChatRooms/View/Object";

import { withStyles } from 'material-ui';

// import Call from "./Call";
// import CallsView from "./Calls/View";
// import Calls from "../../../../../Calls";
import Calls from "./Calls";


export const styles = theme => {

  return {
    ...defaultStyles(),
    roomWrapper: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      flexBasis: "100%",
      width: "100%",
    },
  }
};


export class ChatRoomView extends ChatRoomViewProto {


  // constructor(props){

  //   super(props);



  // }

  renderDefaultView() {

    const {
      Grid,
      streams,
    } = this.context;

    const object = this.getObjectWithMutations();

    const {
      classes,
    } = this.props;


    let content = null;


    if (streams && streams.length) {

      content = (
        <Grid
          container
          className={classes.container}
        >

          <Grid
            item
            xs={8}
          >

            <Calls
              ChatRoom={object}
            />

          </Grid>

          <Grid
            item
            xs={4}
          >

            {super.renderDefaultView()}

          </Grid>

        </Grid>
      );

    }
    else {
      content = (
        <Fragment>
          <Calls
            ChatRoom={object}
          />

          {super.renderDefaultView()}
        </Fragment>
      );
    }

    return <div
      className={classes.roomWrapper}
    >
      {content}
    </div>

  }
}


export default withStyles(styles)(props => <ChatRoomView
  {...props}
/>);