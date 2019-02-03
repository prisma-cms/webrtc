import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import InviteIcon from 'material-ui-icons/PersonAdd';

import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';

// import UsersAutocomplete from 'ui/Users/Autocomplete';
import UsersAutocomplete from 'ui/Users/Autocomplete';

import {
  updateCallProcessor,
} from 'query';

// import gql from 'graphql-tag';


export default class ChatInviteUser extends Component {

  static propTypes = {
    call: PropTypes.object.isRequired,
    opened: PropTypes.bool.isRequired,
    handleOpened: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
  }


  static contextTypes = {
    client: PropTypes.object.isRequired,
  };


  state = {
    // opened: false,
  }


  onSubmit = async user => {

    const {
      client,
    } = this.context;

    const {
      call: {
        id: callId,
      },
      handleOpened,
      onSuccess,
    } = this.props;

    const {
      id: userId,
    } = user;

    // const mutation = gql`
    //   mutation updateChatRoom(
    //     $callId: ID!
    //     $userId: ID!
    //   ){
    //     updateChatRoom(
    //       where:{
    //         id:$callId
    //       }
    //       data:{
    //         members:{
    //           connect: {
    //             id: $userId
    //           }
    //         }
    //       }
    //     ){
    //       id
    //     }
    //   }
    // `;

    return await client.mutate({
      mutation: updateCallProcessor,
      variables: {
        where:{
          id:callId
        },
        data:{
          Room: {
            update: {
              Members:{
                connect: {
                  id: userId,
                },
              },
            },
          },
        },
      },
    })
      .then(r => {
        onSuccess();
        return r;
      })
      .catch(console.error);

  }

  render() {
    
    const {
      style,
      call,
      opened,
      handleOpened,
      onSuccess,
      ...other
    } = this.props;


    if(!call){
      return null;
    }

    const {
      Members: members,
    } = call;

    let exclude = members ? members.map(n => n.id) : [];


    const button = <IconButton
      key="button"
      onClick={handleOpened}
      style={{
        color: "white",
      }}
    >
      <InviteIcon />
    </IconButton>;

    // if(!opened){
    //   return button;
    // }

    return (
      <Grid
        container
        spacing={0}
        alignItems="center"
        style={{
          ...style,
          flexWrap: "nowrap",
          // color: "#fff",
        }}
        {...other}
      >

        <Grid
          item
        >
          {button}
        </Grid>

        {opened
          ?
          <Grid
            item
          >
            <UsersAutocomplete
              exclude={exclude}
              onSubmit={this.onSubmit}
              direction="top"
            />
          </Grid>
          :
          null
        }



      </Grid>
    )
  }
}
