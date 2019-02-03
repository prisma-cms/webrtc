import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RTCMultiConnection from "rtcmulticonnection";

class Test extends Component {


  componentDidMount() {


    console.log("Test componentDidMount");

    setTimeout(() => {

      var connection = new RTCMultiConnection();

      // this line is VERY_important
      connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

      // if you want text chat
      connection.session = {
        data: true
      };

      connection.onopen = function (event) {
        connection.send('hello everyone');
      };

      connection.onmessage = function (event) {
        console.log(event.userid + ' said: ' + event.data);
      };

      connection.openOrJoin('your-room-id');

    }, 2000)

  }


  // shouldComponentUpdate() {

  //   return false;
  // }


  render() {
    return (
      <div>
        sdfdsf

        <script src="https://rtcmulticonnection.herokuapp.com/dist/RTCMultiConnection.min.js"></script>
        <script src="https://rtcmulticonnection.herokuapp.com/socket.io/socket.io.js"></script>


      </div>
    );
  }
}

Test.propTypes = {

};

export default Test;