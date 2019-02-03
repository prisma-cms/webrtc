import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { MediaStream } from 'webrtc-chat3';

export default class CallsDebug extends Component {

  static propTypes = {
    // prop: PropTypes
  }

  render() {

    let callsView = [];


    /**
     * Если есть локальный стрим, проверяем, чтобы статус был активным,
     * после чего проверяем наличие треков
     */
    if (localStream) {

      if (localStream.active) {

        const videoTracks = localStream.getVideoTracks()
        const audioTracks = localStream.getAudioTracks()


        if (videoTracks && videoTracks.length) {

          callsView.push(<VideocamIcon
            key="cam"
          />);

        }

        if (audioTracks && audioTracks.length) {

          callsView.push(<MicIcon
            key="mic"
          />);

        }


      }

    }

    // Кнопка для вызова звонка
    const callButton = [
      <IconButton
        key="test3"
        onClick={event => {
          this.callUser("cjdp665565yho01119wymwezk");
        }}
      >
        <CallIcon />
      </IconButton>,
      <IconButton
        key="test10"
        onClick={event => {
          this.callUser("cjesdf6ah0api01958lpa6y7x");
        }}
      >
        <CallIcon />
      </IconButton>
    ]

    callsView.push(callButton);

    // Активные соединения


    let connectionsView = [];

    connectionsView = streams && streams.map(stream => {

      const {
        id: streamid,
        type,
      } = stream;

      if (!stream) {
        return null;
      }

      return <Grid
        item
        xs={12}
      >
        <div>
          {type} streamid: {streamid}
        </div>

        <div>

          <MediaStream
            stream={stream}
            muted={type === "local"}
          />
        </div>


      </Grid>

    }) || [];

    callsView.push(<div
      key="peerConnections"
      style={{
        position: "fixed",
        width: "100%",
        border: "1px solid #ddd",
        background: "rgba(255, 255, 255, 0.8)",
        top: 70,
        left: 0,
        right: 0,
        maxHeight: "90vh",
        overflow: "auto",
      }}
    >
      <Grid
        container
      >

        {connectionsView}

        {peerConnections && peerConnections.map((peerConnection, index) => {

          const {
            id,
            from,
            to,
            callRequestId,
            signalingState,
            iceConnectionState,
            iceGatheringState,
            localDescription,
            remoteDescription,
          } = peerConnection;


          return (<Grid
            item
            xs
            key={index}
          >
            <Grid
              container
              style={{
                // border: "1px solid",
                // background: "#fff",
                // position: "absolute",
                // // width: "100%",
                // top: 60,
                // let: 0,
                // right: 0,
                flexWrap: "nowrap",
              }}
            >
              <Grid
                item
              >
                <ConnectionIcon
                // key={`connection_${id}`}
                />
              </Grid>

              <Grid
                item
                xs
              >

                <Grid
                  container
                  style={{
                    background: to === currentUserId ? "rgba(0, 255, 0, 0.6)" : from === currentUserId ? "rgba(255, 0, 0, 0.6)" : undefined,
                  }}
                >

                  <Grid
                    item
                    xs={12}
                  >
                    {callRequestId}
                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    From: {from}
                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    to: {to}
                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    localStreams: {peerConnection.getLocalStreams().length}

                    {peerConnection.getLocalStreams().map(n => n.id).join(", ")}

                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    tracks: ({peerConnection.getLocalStreams().reduce((current, next) => {
                      return current + next.getTracks().length;
                    }, 0)})

                    {peerConnection.getLocalStreams().reduce((current, next) => {
                      next.getTracks().map(n => {
                        current.push(n.id);
                      })
                      return current;
                    }, []).join(", ")}

                    <Grid
                      container
                    >
                      {peerConnection.getLocalStreams().map((stream, index) => {
                        return <Grid
                          key={index}
                          item
                        >
                          <MediaStream
                            stream={stream}
                            muted={true}
                          />
                        </Grid>
                      })}
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    remoteStreams: {peerConnection.getRemoteStreams().length}

                    {peerConnection.getRemoteStreams().map(n => n.id).join(", ")}

                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    tracks: ({peerConnection.getRemoteStreams().reduce((current, next) => {
                      return current + next.getTracks().length;
                    }, 0)})

                    {peerConnection.getRemoteStreams().reduce((current, next) => {
                      next.getTracks().map(n => {
                        current.push(n.id);
                      })
                      return current;
                    }, []).join(", ")}

                    <Grid
                      container
                    >
                      {peerConnection.getRemoteStreams().map((stream, index) => {
                        return <Grid
                          key={index}
                          item
                        >
                          <MediaStream
                            stream={stream}
                            muted={true}
                          />
                        </Grid>
                      })}
                    </Grid>

                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    signalingState: {signalingState}
                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >

                    iceConnectionState: {iceConnectionState}

                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    iceGatheringState: {iceGatheringState}
                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    localDescription: {localDescription && JSON.stringify(localDescription.toJSON()) || ""}
                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    remoteDescription: {remoteDescription && JSON.stringify(remoteDescription.toJSON()) || ""}
                  </Grid>

                </Grid>

              </Grid>
            </Grid>
          </Grid>)

        })}

      </Grid>
    </div>);



    return (
      <div>

      </div>
    )
  }
}
