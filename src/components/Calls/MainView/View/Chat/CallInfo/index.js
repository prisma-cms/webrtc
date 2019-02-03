/**
 * Выводим информацию о звонке.
 * 
 * На вход обязательно объект пользователя, которому звонок должен идти.
 * А так же передается конкретный звонок, если надо вывести информацию по нему
 * 
 * Это окно довольно сложную логику имеет, поэтому в случае необходимости
 * расширить его функционал, надо будете перенести в node_modules
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Grid } from 'material-ui';


// import MiniModal from "ui/MiniModal";

// import SimpleSelect from "ui/SelectField/Simple";

import { Link } from "react-router-dom";

// import RequestCallButton from "ui/Button/User/RequestCall";

// import PayButton from "./PayButton";

const styles = {
  root: {
    color: "#666",
  },
  textDefault: {
    color: "#666",
    fontSize: "0.8rem",
  },
  textBig: {
    fontSize: "2rem",
    fontWeight: 600,
  },
  textMiddle: {
    fontSize: "1.4rem",
    fontWeight: 600,
  },
  header: {
    color: "white",
    padding: 10,
    textAlign: "center",
    fontSize: "1.2rem",
  },
  content: {
    padding: 15,
    minHeight: 300,
    maxHeight: 500,
    overflow: "auto",
  },
  centered: {
    textAlign: "center",
  },
  select: {

    marginTop: 15,
    marginBottom: 15,

    // "&.Select": {
    //   "& .Select-control": {
    //     "& .Select-value-label": {
    //       color: "red",
    //     }
    //   },
    // },
  },
  requestButton: {
    fontSize: "1rem",
    height: 40,
    lineHeight: "40px",
    borderRadius: 20,
    justifyContent: "center",
    width: "90%",
  },
};

class CallInfo extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    room: PropTypes.object,
  };


  static contextTypes = {
    user: PropTypes.object.isRequired,
    acceptCall: PropTypes.func.isRequired,
    rejectCall: PropTypes.func.isRequired,
  }

  state = {
    durations: [{
      value: 15,
      label: "15 minutes",
    }, {
      value: 30,
      label: "30 minutes",
    }, {
      value: 45,
      label: "45 minutes",
    }, {
      value: 60,
      label: "1 hour",
    }, {
      value: 90,
      label: "1.5 hour",
    }, {
      value: 120,
      label: "2 hours",
    },],
    newCallDuration: 15,
  }

  render() {

    const {
      classes,
      user,
      // call,
      room,
    } = this.props;


    if (!user || !room) {
      return null;
    }

    const {
      Call: call,
    } = room;


    const {
      durations,
      newCallDuration,
    } = this.state;


    const {
      user: currentUser,
      acceptCall,
      rejectCall,
    } = this.context;

    if (!currentUser) {
      return null;
    }

    const {
      id: currentUserId,
      tokens,
    } = currentUser;

    const {
      callPrice,  // 
    } = user;


    let minutePrice = callPrice ? (callPrice / 60).toFixed(2) : 0;

    let tokensBalance = tokens ? (Number(tokens) / 10 ** 18).toFixed(2) : 0;


    let header = `${minutePrice}€ per minute`;


    let content;


    if (call) {

      /**
       * Если звонок есть, то зависит от его статуса.
       * Если статус еще незавершенный, то надо показать инфу
       */
      const {
        id: callId,
        status,
        User: {
          id: calledId,
        },
        CreatedBy: {
          id: callerId,
        },
        min_time: duration = 0,
      } = call;

      const newCallDuration = duration;

      let amount = callPrice > 0 ? (callPrice / 60 * newCallDuration).toFixed(2) : 0;


      let buttons;
      let info;

      if (calledId === currentUserId) {

        if (["Canceled", "Accepted", "Started"].indexOf(status) === -1) {
          buttons = <Grid
            container
          >
            <Grid
              item
              xs={6}
            >

              <button
                className={["button bg-blue", classes.requestButton].join(" ")}
                onClick={acceptCall}
                disabled={["Accepted", "Started"].indexOf(status) !== -1}
              >
                Accept
              </button>

            </Grid>

            <Grid
              item
              xs={6}
            >
              <button
                className={["button bg-grey", classes.requestButton].join(" ")}
                onClick={rejectCall}
                disabled={status === "Rejected"}
              >
                Reject
              </button>
            </Grid>
          </Grid>;
        }

      }
      else {

        info = <div>


          <div
            className={classes.textDefault}
            style={{
              marginTop: 10,
              marginBottom: 15,
            }}
          >
            Your balance <Link
              to="/payments"
              className={"text-blue"}
            >Top-up</Link> <br />
            {tokensBalance}€
          </div>

          {/* <PayButton 
            room={room}
            currentUser={currentUser}
          /> */}

          <div
            className={classes.textDefault}
            style={{
              marginTop: 10,
            }}
          >
            If the duration of call was less then stated, we will refund the difference to your balance.
            Minimum non-refundable duration is {newCallDuration} minutes.
          </div>
        </div>

      }


      let state;


      switch (status) {

        case "Requested":

          state = "Not accepted yet";

          break;

        default: state = status;

      }


      content = <div
        className={classes.centered}
      >

        <div
          style={{
            marginBottom: 15,
          }}
        >
          <p
            className={["uppercase", classes.textDefault].join(" ")}
          >
            State
        </p>


          <p
            className={["text-blue", classes.textMiddle].join(" ")}
          >
            {state}
          </p>
        </div>

        <div
          style={{
            marginBottom: 15,
          }}
        >
          <p
            className={["uppercase", classes.textDefault].join(" ")}
          >
            Duration
          </p>


          <p
            className={["text-blue", classes.textMiddle].join(" ")}
          >
            {duration} minutes
          </p>

        </div>

        <div
          style={{
            marginBottom: 15,
          }}
        >

          <Typography
            className={["uppercase", classes.textDefault].join(" ")}
          >
            Amount to pay
          </Typography>

          <Typography
            className={["uppercase", classes.textDefault, classes.textBig].join(" ")}
          >
            {amount}€
          </Typography>

        </div>








        {buttons}


        {info}


      </div>

    }
    else {

      /**
       * Если звонка нет, то выводим информацию для запроса звонка
       */


      let amount = callPrice > 0 ? (callPrice / 60 * newCallDuration).toFixed(2) : 0;

      content = <div
        className={classes.centered}
      >

        <Typography
          className={["uppercase", classes.textDefault].join(" ")}
        >
          Set the duration
        </Typography>

        {/* <SimpleSelect
          className={classes.select}
          options={durations}
          value={newCallDuration || ""}
          onChange={value => {
            this.setState({
              newCallDuration: value,
            });
          }}
          clearable={false}
        /> */}

        <Typography
          className={["uppercase", classes.textDefault].join(" ")}
        >
          Amount to pay
        </Typography>

        <Typography
          className={["uppercase", classes.textDefault, classes.textBig].join(" ")}
        >
          {amount}€
        </Typography>

        <div
          className={classes.textDefault}
          style={{
            marginTop: 10,
            marginBottom: 15,
          }}
        >
          Your balance <Link
            to="/payments"
            className={"text-blue"}
          >Top-up</Link> <br />
          {tokensBalance}€
        </div>


        {/* <RequestCallButton
          room={room}
          user={user}
          min_time={newCallDuration}
        >
          <button
            className={["button bg-blue", classes.requestButton].join(" ")}
          >
            Submit
        </button>
        </RequestCallButton> */}

        <div
          className={classes.textDefault}
          style={{
            marginTop: 10,
          }}
        >
          If the duration of call was less then stated, we will refund the difference to your balance.
          Minimum non-refundable duration is {newCallDuration} minutes.
        </div>


      </div>
    }


    return (
      <div
        style={{
          position: "relative",
        }}
      >
        {/* <MiniModal
          position="right"
          radiusClass="big-radius"
          wrapperStyle={{
            right: -40,
            minWidth: 260,
          }}
          contentStyles={{
            padding: 0,
          }}
          cornerStyles={{
            backgroundColor: "#434649",
            right: 120,
          }}
          className={classes.root}
        > */}
          <div
            className={[classes.header, "bg-grey"].join(" ")}
          >

            {header}


          </div>

          <div
            className={classes.content}
          >

            {content}

          </div>
        {/* </MiniModal> */}
      </div>
    );
  }
}


export default withStyles(styles)(CallInfo);