import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PrismaCmsComponent from "@prisma-cms/component";
import { compose, graphql } from 'react-apollo';

import {
  userCallBalance,
  createCallDeposite,
} from "query";


class PayButton extends PrismaCmsComponent {

  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    room: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
  };


  /**
   * Пополняем баланс
   */
  async createCallDeposite() {

    const {
      sending,
    } = this.state;

    if(sending){
      return;
    }

    const {
      room: {
        Call: {
          id: callId,
          min_time,
        },
      },
    } = this.props;

    this.setState({
      sending: true,
    });


    await this.mutate({
      mutation: createCallDeposite,
      variables: {
        callId,
        time: min_time,
      },
    })
    .catch(console.error);


    this.setState({
      sending: false,
    });

  }


  render() {

    const {
      room,
      currentUser: currentUser,
      balance: {
        object: balance,
      },
    } = this.props;

    const {
    } = this.context;

    const {
      sending,
    } = this.state;


    const {
      Call,
    } = room || {};

    if (!currentUser || !Call) {
      return null;
    }



    const {
      id: currentUserId,
    } = currentUser;

    const {
      id: callId,
      minute_price,
      min_time,
      userId: calledId,
      status: callStatus,
    } = Call;


    /**
     * Если вызываемый является текущим пользователем, прекращаем выполнение
     */
    if (calledId === currentUserId) {
      return null;
    }


    let amount = minute_price * min_time;

    if (!amount) {
      return null;
    }

    let content = null;


    /**
     * Если у пользователя не хватает денег на звонок, предлагаем оплатить
     */
    if (callStatus === "Accepted" && balance < amount) {

      content = <button
        className="button bg-blue"
        style={{
          height: "2.6rem",
          borderRadius: "1.3rem",
          width: "90%",
          fontSize: "1rem",
          justifyContent: "center",
        }}
        disabled={sending ? true : false}
        onClick={event => {
          this.createCallDeposite();
        }}
      >
        {sending ? "Please, wait..." : "Pay now"}
      </button>

    }
    else {

    }

    return super.render(
      content
    );
  }
}

// export default PayButton;

export default compose(
  graphql(userCallBalance, {
    name: "balance",
    options: props => {



      const {
        room: {
          // id: roomId,
          Call: {
            id: callId,
          },
        },
      } = props;

      return {
        variables: {
          callId,
          ...props
        },
      }
    },
  })
)(PayButton);