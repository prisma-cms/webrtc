import React, { Component } from 'react';
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
    // container: {
    //   // height: "100%",
    //   flex: 1,
    // },
  }
};


export class ChatRoomView extends ChatRoomViewProto {


  // constructor(props){

  //   super(props);

  //   console.log("ChatRoomView constructor");

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
        <div>

          <Calls
            ChatRoom={object}
          />

          {super.renderDefaultView()}

        </div>
      );
    }

    return content;

  }
}


export default withStyles(styles)(props => <ChatRoomView
  {...props}
/>);