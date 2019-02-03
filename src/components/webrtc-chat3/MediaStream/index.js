import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';

import OkIcon from 'material-ui-icons/DoneAll';
import FailureIcon from 'material-ui-icons/Clear';

const styles = {

  video: {
    border: "1px solid #ddd",
    width: "100%",
    maxWidth: "100%",
    // height: 300,
  },
  ok: {
    color: "green",
  },
  errors: {
    color: "red",
  },
};


export class MediaStream extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    stream: PropTypes.object.isRequired,
    muted: PropTypes.bool.isRequired,
  }


  static defaultProps = {
    muted: false,
  }


  render() {

    if (typeof window === "undefined") {
      return null;
    }

    const {
      classes,
      stream,
      muted,
      ...other
    } = this.props;


    if (!stream) {
      return null;
    }

    console.log("stream", stream);

    // return "Stream";

    const {
      active,
    } = stream;

    const audioTrack = stream.getAudioTracks()[0];
    const videoTrack = stream.getVideoTracks()[0];

    // console.log("videoTrack", videoTrack);

    let player;

    let mainStyle = {
      position: "relative",
      left: 0,
      bottom: 0,
      maxWidth: "100%",
    }

    if (active) {

      // const src = window.URL.createObjectURL(stream);

      if (videoTrack && videoTrack.enabled) {

        const {
          aspectRatio,
          width,
          heigth,
        } = videoTrack.getSettings();

        player = <video
          className={classes.video}
          // src={src}
          ref={element => {

            // console.log("element", element);
            if (element) {
              element.srcObject = stream;
            }

          }}
          autoPlay
          playsInline
          muted={muted}
          style={{
            maxWidth: width,
            minHeight: 100,
            minWidth: 60,
            ...mainStyle,
          }}
          {...other}
        />
      }
      else if (audioTrack && audioTrack.enabled) {
        player = <audio
          // src={src}
          ref={element => {

            // console.log("element", element);
            if (element) {
              element.srcObject = stream;
            }

          }}
          autoPlay
          playsInline
          controls
          muted={muted}
          style={{
            ...mainStyle,
          }}
          {...other}
        />
      }

    }


    return (
      player || null
    )
  }
}

export default withStyles(styles)(MediaStream);
