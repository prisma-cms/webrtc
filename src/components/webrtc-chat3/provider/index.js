
/**
 * Пользователь коннекта обязательно должен быть id текущего пользователя.
 * connection.userid = 
 * Это надо, чтобы отлавливать события при добавлении и удалении стримов.
 * При добавлении стрима, если стрим принадлежит вызываемому абоненту, 
 * надо добавить пользователя в контракт звонка joinCall.
 * Если удаляемый стрим - стрим эксперта, то надо закрыть все соединения.
 * При закрытии соединения, надо вызывать метод ухода из звонка (контракт).
 * 
 */

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
// import gql from 'graphql-tag';

import PrismaCmsComponent from '@prisma-cms/component';
import Context from '@prisma-cms/context';

// import {
//   updateCallRequest,
// } from "../query";

import {
  // createCallRequestProcessor,
  updateCallRequest,
  // createCallOffer,
  // createAnswer,
} from "../query/mutate";

// import {
//   JoinCall,
//   EndCall,
// } from 'query';


import CallRequestSubscriber from './Subscribers/CallRequest';
// import IceCandidateSubscriber from './Subscribers/IceCandidate';


import io from 'socket.io-client';
import gql from 'graphql-tag';
import ChatRoomPage from '../../pages/society/ChatRooms/ChatRoom';

import RTCMultiConnection from "rtcmulticonnection";

// import Test from "./Test";

import adapter from 'webrtc-adapter';

global.io = io;
global.RTCMultiConnection = RTCMultiConnection;
// global.adapter = adapter;


export default class WebRtcProvider extends PrismaCmsComponent {

  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
  }



  state = {
    video: false,
    audio: false,
    peerConnections: [],
    callRequests: [],

    connections: [],
    // streams: [],

    /**
     * Массив висячих активных звонков, к которым подключены через контракт.
     * Эти звонки обязательно надо будет завершить при завершении соединения.
     */
    callsJoined: [],
    isCalling: false,
  };



  componentDidMount() {

    console.log("WebRtcProvider componentDidMount");

    this.init();
  }


  componentDidUpdate(prevProps, prevState) {


    const {
      user,
    } = this.props;

    const {
      user: prevUser,
    } = prevProps || {};

    // console.log("componentDidUpdate prevContext", user, prevUser);


    if (
      (user || prevUser)
    ) {

      if (!user) {
        this.cleanup();
      }
      else if (user && (!prevUser || prevUser.id !== user.id)) {
        this.init();
      }

    }

    // super.componentDidUpdate

  }


  forceUpdate() {

    console.log("forceUpdate");

    const {
      rendererForceUpdate,
    } = this.context;

    rendererForceUpdate();

    super.forceUpdate();

  }


  async init() {


    // require("@fi1osof/rtcmulticonnection-v3/dist/RTCMultiConnection");

    // const {
    //   user,
    // } = this.props;

    // // console.log("WebRtcChatProvider init", user);

    // if (user) {
    //   // await this.initDevides();

    //   // this.getUserMedia();
    // }

  }


  cleanup() {

  }


  async initDevides() {

    let video = false;
    let audio = false;

    if (typeof window !== "undefined" && window.navigator.mediaDevices) {

      await window.navigator.mediaDevices.enumerateDevices()
        .then(r => {

          r.map(n => {

            const {
              kind,
            } = n;

            if (kind === "audioinput") {
              audio = true;
            }
            else if (kind === "videoinput") {
              video = true;
            }

          })

        })
        .catch(console.error);

    }

    const result = {
      audio,
      video,
    };

    this.setState(result);

    return result;
  }


  getStreams() {

    let streams = [];

    const {
      connections,
    } = this.state;

    const connection = connections && connections[0];

    if (connection) {

      connection.peers.forEach(peer => {
        peer.streams.map(stream => {
          streams.push(stream);
        });
      })

      connection.attachStreams.map(stream => {
        streams.push(stream);
      });

    }

    return streams;

  }


  /**
   * Создаем вызов по конкретному звонку
   */
  // callUser = async (variables) => {
  callUser = async (calledId, requestData) => {

    console.log("callUser, calledId, requestData", calledId, requestData);

    const {
      query: {
        createCallRequestProcessor,
      },
    } = this.context;

    // console.log("createCallRequestProcessor", createCallRequestProcessor);


    let {
      room: chatRoomId,
    } = requestData;


    let {
      requesttedCalls = [],
    } = this.state;

    requesttedCalls.push("id");

    this.setState({
      requesttedCalls,
      isCalling: true,
    });


    console.log("callUser setState requesttedCalls", requesttedCalls);

    // const result = await this.mutate({
    const result = await this.mutate({
      mutation: gql(createCallRequestProcessor),
      variables: {
        // calledId,
        // callId: room,
        data: {
          Called: {
            connect: {
              id: calledId,
            },
          },
          Room: {
            connect: {
              id: chatRoomId,
            },
          },
          caller_descriptions: {},
          called_descriptions: {},
        },
      },
    })
      .then(r => {
        console.log("callUser createCallRequest result", r);

        this.setState({
          requesttedCalls: [],
        });

        return r;
      })
      .catch(error => {
        console.error("callUser createCallRequest error", error);

        return error;
      });

    this.setState({
      isCalling: false,
    });


    return result;

  }


  async addConnection(roomId) {

    const {
      RTCMultiConnection,
    } = global;

    console.log("addConnection", roomId);

    let {
      connections,
    } = this.state;


    const {
      user: currentUser,
    } = this.props;

    if (connections.length || !currentUser) {
      return;
    }

    const {
      id: currentUserId,
    } = currentUser;


    var connection = new RTCMultiConnection();


    const {
      hostname,
    } = global.location;



    connections.push(connection);

    this.state.connections = connections;


    connection.userid = currentUserId;

    connection.enableLogs = true;

    connection.maxRelayLimitPerUser = 10; // each broadcast should serve only 10 users ???

    // by default, socket.io server is assumed to be deployed on your own URL
    connection.socketURL = '/';



    connection.DetectRTC.load(() => {

      const mediaConstraints = {
        audio: connection.DetectRTC && connection.DetectRTC.audioInputDevices && connection.DetectRTC.audioInputDevices.length ? true : false,
        video: connection.DetectRTC && connection.DetectRTC.videoInputDevices && connection.DetectRTC.videoInputDevices.length ? true : false,
      }

      console.log("RTCMultiConnection connection.DetectRTC", connection.DetectRTC);
      console.log("RTCMultiConnection connection detect mediaConstraints", mediaConstraints);

      if (!mediaConstraints.audio && !mediaConstraints.video) {
        console.error("Devices not found");
        // throw (new Error("Devices not found"));
      }


      // connection.socketMessageEvent = 'video-conference-demo';


      connection.session = mediaConstraints;
      connection.mediaConstraints = mediaConstraints;

      connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
      };

      // connection.videosContainer = document.getElementById('videos-container');

      connection.onstream = this.onstream;


      /**
       * Это событие срабатывает в том числе когда закрываем коннест
       * this.state.connections[0].close()
       */
      connection.onstreamended = (event) => {

        const {
          stream,
        } = event;

        let {
          // streams,
          connections,
        } = this.state;

        // console.log("onstreamended", event);

        const {
          streamid,
          type,
        } = stream;



        connection = connections && connections[0];

        if (connection) {

          const remoteStreams = connection.getRemoteStreams();


          /**
           * Если удаленных стримов не осталось, закрываем полностью текущее соединение
           */
          if (!remoteStreams.length) {

            this.closeConnection();

          }
        }


        this.forceUpdate();

        return;

      };


      connection.openOrJoin(roomId, function (isRoomExists, roomid) {
        console.log("openOrJoin isRoomExists, roomid", isRoomExists, roomid);
      });

      this.forceUpdate();

      // setTimeout(() => {

      // }, 1000)

      return;

    });


    // connection.onclose = this.onConnectionClose;

    this.forceUpdate();

    return connection;
  }


  onConnectionClose = (connection) => {
    // console.log("onConnectionClose", connection);
  }

  closeConnection = () => {

    let {
      connections,
      callRequests,
    } = this.state;


    const {
      user: currentUser,
    } = this.props;

    console.log("closeConnection", connections, callRequests);

    if (!currentUser) {
      return;
    }

    const {
      id: currentUserId,
    } = currentUser;

    let connection = connections && connections[0];

    if (connection) {

      let participants = connection.getAllParticipants();

      participants.map(participant => {
        connection.disconnectWith(participant)
      });

      connection.attachStreams.map(n => {
        // n.getTracks().map(track => track.stop());
        n.stop();
      });

      // connection.close();
      connection.closeSocket();

      delete connections[0];

      this.setState({
        connections: [],
      });

    }

    callRequests.map(async callRequest => {

      console.log("Stop callRequest", callRequest);

      const {
        id: callRequestId,
        // Call: {
        //   id: callId,
        // },
        status,
        Caller,
      } = callRequest;

      const {
        id: callerId,
      } = Caller;

      const {
        isCalling,
      } = this.state;


      console.log("Stop callRequest isCalling", isCalling, callerId, currentUserId);

      if (!isCalling || callerId !== currentUserId || ["Started"].indexOf(status) === -1) {

        return;
      }

      const {
        client,
      } = this.context;


      await this.updateCallRequest(callRequestId, {
        status: "Ended",
      });

    });

  }


  onstream = async (event) => {

    console.log("onstream", event);

    const {
      streamid,
      stream,
      type,
      userid,
    } = event;


    const {
      user: currentUser,
    } = this.props;


    const {
      id: currentUserId,
    } = currentUser;


    const {
      callRequests,
    } = this.state;


    if (type === "remote") {

      // console.log("onStream event remote stream", userid, stream);

      /**
       * Пытаемся среди локальных колл-реквестов найти такой, где
       * вызывающий абонент - текущий пользователь,
       * а вызываемый - чей стрим добавлен,
       * а так же статус запроса - Accepted
       */

      const callRequest = callRequests.find(n => n.Called.id === userid && n.Caller.id === currentUserId && n.status === "Accepted");



      // Если такой стрим был найден, коннектимся в контракт
      if (callRequest) {

        // console.log("localPeerConnection addstream", a, b, c);

        this.joinCall(callRequest);

      }


    }

    this.forceUpdate();

  }


  hangup = () => {
    this.closeConnection();
  }


  async onEndCall(callRequest) {



    if (!callRequest) {
      throw (new Error("Can not get callRequest"));
    }

    const {
      id: callRequestId,
      status,
    } = callRequest;

    /**
     * Если звонок завершился, 
     */
    // this.mutate({
    //   mutation: endCallRequest,
    // });


    /**
     * Если завершен звонок, надо найти соединение и завершить его.
     * а так же удалить звонок из массива звонков
     */

    let {
      callRequests,
    } = this.state;

    const stateCallRequest = callRequests && callRequests.find(n => n.id === callRequestId) || null;


    if (stateCallRequest) {

      const index = callRequests.indexOf(stateCallRequest);

      if (index !== -1) {
        callRequests.splice(index, 1);

        this.setState({
          callRequests,
        });
      }

    }

  }


  /**
   * Данные приходят по подписчику.
   * Здесь приходят все изменения по всем звонкам
   */
  onCallDataReceived = async data => {
    console.log("onCallDataReceived", data);

    const {
      callRequest: {
        node: callRequest,
      },
    } = data || {};

    const {
      user: currentUser,
    } = this.props;

    if (!callRequest) {
      throw (new Error("Can not get call request data"));
    }

    if (!currentUser) {
      throw (new Error("Can not get current user"));
    }


    const {
      id: currentUserId,
    } = currentUser;

    let {
      callRequests,
      requesttedCalls,
    } = this.state;


    const {
      client,
    } = this.context;



    const {
      id: callRequestId,
      status,
      Room: {
        id: roomId,
      },
      Called: {
        id: calledId,
      },
      Caller: {
        id: callerId,
      },
      called_descriptions: calledDescriptions,
      caller_descriptions: callerDescriptions,
    } = callRequest;


    const {
      offer: callerOffer,
    } = callerDescriptions;

    const {
      answer: calledAnswer,
    } = calledDescriptions;


    // const peerConnection = await this.getPeerConnectionByCallRequest(callRequest);

    // const localStream = await this.getUserMedia();

    console.log("Updated callRequest", callRequest);

    console.log("onCallDataReceived status", status);
    console.log("onCallDataReceived requesttedCalls", requesttedCalls);
    console.log("onCallDataReceived callerId === currentUserId", callerId === currentUserId, callerId, currentUserId);

    /**
     * В зависимости от статуса выполняем те или иные действия
     */
    switch (status) {

      case "created":
      case "Created":

        break;



      case "Accepted":

        console.log("Accepted callRequest", callRequest);


        /**
         * Звонок принят и надо создать соединение.
         * ID вызываемого является названием комнаты
         */
        // if (requesttedCalls && requesttedCalls.indexOf(callRequestId) !== -1) {
        //   this.addConnection(roomId);
        // }

        /**
         * Временный хак, так как ответ от сервера приходит только когда окончательно завершится звонок
         */
        if (requesttedCalls && requesttedCalls.length && callerId === currentUserId) {
          console.log("requesttedCalls addConnection", roomId, callRequest);

          /**
           * 
           */


          setTimeout(() => {

            this.addConnection(roomId);

          }, 5000);
        }


        break;


      // Мы получили оффер от звонящего, надо его принять и отправить ответ

      case "Offer":


        break;


      // Пришел окончательный ответ от вызываемого.
      // В этот момент и здесь и там есть стримы и пиры и навешены события на айскандидатов,
      // можно добавлять свой стрим
      case "Answer":

        // console.log("Answer callRequest", callRequest);

        break;


      case "Rejected":

        // const {
        //   onReject,
        // } = this.props;

        this.onReject();

        break;


      case "Ended":
      case "Error":
      case "Canceled":

        // const {
        //   onReject,
        // } = this.props;

        this.onEndCall(callRequest);

        break;


      default:

    }



    const index = callRequests.findIndex(({ id }) => id === callRequest.id);

    /**
     * Смотрим есть ли у нас уже в массиве этот звонок.
     * Если нет, то добавляем новый.
     * Если есть, то обновляем его
     */
    if (index !== -1) {
      callRequests[index] = callRequest;
    }
    else {
      // callRequest.test = "sdfdsf";
      callRequests.push(callRequest);
    }


    this.setState({
      callRequests,
    });

  }


  addStream = (stream, peerConnection) => {
    // stream.getTracks().forEach(track => {
    //   peerConnection.addTrack(track, stream);
    // });
    peerConnection.addStream(stream);
  }


  onReject() {
    // console.log("onReject");
  }


  async createPeerConnection(callerId, calledId, callRequestId) {

    // console.log("createPeerConnection");

    return;

  }


  /**
   * Получаем пир по данным звонка
   */
  getPeerConnectionByCallRequest(callRequest) {

    if (!callRequest) {
      throw (new Error("callRequest is empty"));
    }


    const {
      id: callRequestId,
    } = callRequest;


    const {
      peerConnections,
    } = this.state;

    return peerConnections.find(n => n.callRequestId === callRequestId);

  }

  acceptCall = async callRequestId => {


    console.log("Member acceptCall", callRequestId, currentUserId);

    const {
      callRequests,
    } = this.state;


    const {
      user: currentUser,
    } = this.props;


    const {
      client,
    } = this.context;


    const {
      id: currentUserId,
    } = currentUser;



    const callRequest = callRequests.find(n => n.id === callRequestId);

    if (!callRequest) {
      throw (new Error("Can not get callRequest"));
    }


    const {
      id,
      // room: roomId,
      Room: {
        id: roomId,
      },
      status,
      Caller: caller,
      Called: called,
      caller_descriptions,
      called_descriptions,
    } = callRequest;



    // const {
    //   id: callerId,
    // } = caller;

    // const {
    //   offer: callerOffer,
    //   answer: callerAnswer,
    //   sdp: callerSdp,
    // } = caller_descriptions;

    // const {
    //   id: calledId,
    // } = called;

    // let sdp = [];
    // let answer;


    const result = await this.updateCallRequest(callRequestId, {
      status: "Accepted",
    })
      .then(r => {


        /**
         * Звонок принят и надо создать соединение.
         * ID вызываемого является названием комнаты
         */
        this.addConnection(roomId);

        const {
          router: {
            history,
          },
        } = this.context;


        history.push(`/chat-rooms/${roomId}`);

        return r;
      });

    return result;
  }


  rejectCall = callRequestId => {

    // console.log("rejectCall", callRequestId);

    return this.updateCallRequest(callRequestId, {
      status: "Rejected",
    });

  }



  updateCallRequest = async (id, data) => {

    const {
      client,
    } = this.context;

    const {
      user: {
        id: userId,
      },
    } = this.props;

    const result = await client.mutate({
      mutation: updateCallRequest,
      variables: {
        userId,
        where: {
          id,
        },
        data,
      },
    }).catch(console.error);

    // console.log("update result", result);

  }


  render() {

    const {
      children,
      user: currentUser,
    } = this.props;


    const {
      localStream,
      peerConnections,
      callRequests,

      connections,
      // streams,

      isCalling,
    } = this.state;


    // return <Test />

    return super.render(
      <Context.Consumer>
        {context =>

          <Context.Provider
            value={Object.assign(context, {
              localStream,
              peerConnections,
              callRequests,
              callUser: this.callUser,
              acceptCall: this.acceptCall,
              rejectCall: this.rejectCall,
              updateCallRequest: this.updateCallRequest,

              connections,
              streams: this.getStreams(),
              isCalling,
              test: [],
            })}
          >

            <Fragment>

              {children}

              {currentUser ? <CallRequestSubscriber
                key={currentUser.id}
                user={currentUser}
                onDataReceived={this.onCallDataReceived}
              /> : null}

            </Fragment>
          </Context.Provider>
        }

      </Context.Consumer>
    );

  }
}
