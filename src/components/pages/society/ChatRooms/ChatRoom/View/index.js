import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


import {
  styles as defaultStyles,
  ChatRoomView as ChatRoomViewProto,
} from "@prisma-cms/society/lib/components/pages/ChatRooms/View/Object";

import withStyles from 'material-ui/styles/withStyles';

// import Call from "./Call";
// import CallsView from "./Calls/View";
// import Calls from "../../../../../Calls";
import Calls from "./Calls";


export const styles = theme => {

  return {
    ...defaultStyles(),
    roomWrapper: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    },
  }
};


export class ChatRoomView extends ChatRoomViewProto {

  static propTypes = {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    ...ChatRoomViewProto.propTypes,
    use_calls: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    ...ChatRoomViewProto.defaultProps,
    use_calls: true,
  }


  renderDefaultView() {

    const {
      Grid,
      streams,
    } = this.context;

    const object = this.getObjectWithMutations();

    const {
      classes,
      use_calls,
    } = this.props;


    let content = null;

    if (!use_calls) {

      content = super.renderDefaultView();

    }
    else if (streams && streams.length) {

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

    // return <div
    //   // className={classes.root}
    //   style={{
    //     border: "2px solid green",
    //     // flex: 1,
    //     // position: "relative",
    //     // overflow: "hidden",

    //     height: "100%",
    //     display: "flex",
    //     flexDirection: "column",
    //   }}
    // >
    //   <div
    //     className={classes.roomWrapper}
    //   >
    //     {content}
    //   </div>
    // </div>

  }
}


export default withStyles(styles)(props => <ChatRoomView
  {...props}
/>);

// export default withStyles(styles)(props => <ChatRoomView
//   {...props}
//   data={{
//     object: {},
//   }}
// />);