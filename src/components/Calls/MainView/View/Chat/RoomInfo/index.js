import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';

import MiniModal from "ui/MiniModal";

import Grid from "material-ui/Grid";
import { IconButton } from 'material-ui';

// import Avatar from 'Avatar';

import PersonAddIcon from "material-ui-icons/PersonAdd";
// import PersonAddIcon from "icons/PersonAddOutline";
import BackIcon from "material-ui-icons/KeyboardArrowLeft";
import AddIcon from "material-ui-icons/AddCircleOutline";

import PrismaCmsComponent from "@prisma-cms/component";

import {
  users,
  updateChatRoom,
} from "query"

const styles = {
  header: {
    color: "white",
    padding: 10,
  },
  content: {
    padding: 15,
    maxHeight: 300,
    overflow: "auto",
  },
}

// console.log("users", users);


class RoomInfo extends PrismaCmsComponent {


  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    style: PropTypes.object,
    room: PropTypes.object.isRequired,
  }


  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      showAddMember: false,
      searchUserValue: "",
      newMembers: [],
    }
  }


  async searchUser(value) {

    const {
      client,
    } = this.context;


    let result;


    if (value) {

      const {
        room: {
          Members: members,
        },
      } = this.props;


      let id_not_in = members && members.length ? members.map(({ id }) => id) : undefined;


      result = await client.query({
        query: users,
        variables: {
          first: 100,
          where: {
            OR: [{
              username_contains: value
            }, {
              firstname_contains: value
            }, {
              lastname_contains: value
            }],
            id_not_in,
          }
        },
      })
      // .then(r => {

      // });

    }



    const {
      objects,
    } = result && result.data || {}

    let newMembers = objects || [];

    this.setState({
      newMembers,
    });

  }


  addMember(userId) {

    const {
      room: {
        id: roomId,
      },
    } = this.props;

    this.mutate({
      mutation: updateChatRoom,
      variables: {
        where: {
          id: roomId,
        },
        data: {
          Members: {
            connect: {
              id: userId,
            },
          },
        },
      },
    })
      .then(r => {

        this.setState({
          showAddMember: false,
          searchUserValue: "",
          newMembers: [],
        });

        return r;
      });

  }


  renderUserRow(user, button) {

    const {
      Avatar,
    } = this.context;

    const {
      id,
      fullname,
    } = user;

    return <Grid
      key={id}
      container
      alignItems="center"
      spacing={16}
      style={{
        flexWrap: "nowrap",
      }}
    >
      <Grid
        item
      >
        <Avatar
          user={user}
          size="small"
        />
      </Grid>
      <Grid
        item
        xs
        style={{
          // whiteSpace: "nowrap",
        }}
      >
        {fullname}
      </Grid>

      <Grid
        item
      >
        {button}
      </Grid>

    </Grid>
  }

  render() {

    const {
      style,
      classes,
      room,
    } = this.props;


    const {
      user: currentUser,
    } = this.context;

    if (!room || !currentUser) {
      return null;
    }

    const {
      showAddMember,
      searchUserValue,
      newMembers,
    } = this.state;


    let header;
    let content;

    const {
      id: roomId,
      name,
      Members: members,
    } = room;

    const {
      id: currentUserId,
    } = currentUser;

    let otherMembers = members.filter(n => n.id !== currentUserId);


    if (showAddMember) {
      header = <Grid
        container
        spacing={0}
        alignItems="center"
        style={{
          flexWrap: "nowrap",
          whiteSpace: "nowrap",
          cursor: "pointer",
        }}
        onClick={event => {
          this.setState({
            showAddMember: false,
          });
        }}
      >
        <Grid
          item
        >

          <IconButton
            style={{
              width: "auto",
              height: "auto",
            }}
          >
            <BackIcon
              style={{
                color: "white",
                fontSize: "1.3rem",
              }}
            />
          </IconButton>

        </Grid>

        <Grid
          item
          xs
        >
          <div
            style={{
              fontSize: "0.9rem",
              marginRight: 10,
              textAlign: "center",
            }}
          >
            Add member
        </div>
        </Grid>

      </Grid>


      content = <div>

        <div
          style={{
            marginBottom: 15,
          }}
        >
          <input
            placeholder="Search your contacts"
            style={{
              border: "1px solid #ddd",
              padding: 3,
              width: "100%",
            }}
            value={searchUserValue || ""}
            onChange={event => {
              const {
                value,
              } = event.target;

              this.setState({
                searchUserValue: value,
              }, () => {
                this.searchUser(value);
              });

            }}
          />
        </div>

        {newMembers ? newMembers.map(user => {

          const {
            id,
          } = user;

          return this.renderUserRow(user, <IconButton
            onClick={event => {
              this.addMember(id);
            }}
          >
            <AddIcon
              className="text-blue"
            />
          </IconButton>);
        }) : null}

      </div>

    }
    else {

      header = <Grid
        container
        spacing={0}
        alignItems="center"
        style={{
          flexWrap: "nowrap",
          whiteSpace: "nowrap",
        }}
      >
        <Grid
          item
          xs
        >
          <div
            style={{
              fontSize: "0.9rem",
              marginRight: 10,
            }}
          >
            {name}
          </div>
        </Grid>

        <Grid
          item
        >

          {/* <IconButton
            style={{
              width: "auto",
              height: "auto",
            }}
          >
            <EditIcon
              style={{
                color: "white",
                fontSize: "1rem",
              }}
            />
          </IconButton> */}

        </Grid>
      </Grid>


      content = <div
      >
        <div
          style={{
            marginBottom: 5,
          }}
        >
          <Grid
            container
            alignItems="center"
            spacing={8}
            style={{
              flexWrap: "nowrap",
              cursor: "pointer",
            }}
            className="text-blue"
            onClick={event => {
              this.setState({
                showAddMember: true,
              });
            }}
          >
            <Grid
              item
            >
              <IconButton
                style={{
                  width: "auto",
                  height: "auto",
                  backgroundColor: "#0097fb",
                  color: "white",
                  padding: 5,
                  // borderRadius: "50%",
                }}
              >
                <PersonAddIcon
                  style={{
                    fontSize: "1.2rem",
                  }}
                />
              </IconButton>
            </Grid>
            <Grid
              item
              xs
              style={{
                // whiteSpace: "nowrap",
              }}
            >
              Add member
              </Grid>
            <Grid
              item
            >
            </Grid>

          </Grid>
        </div>


        {otherMembers.map(user => {

          return this.renderUserRow(user);

          {/* const {
            id,
            fullname,
          } = user;

          return <Grid
            key={id}
            container
            alignItems="center"
            spacing={8}
            style={{
              flexWrap: "nowrap",
            }}
          >
            <Grid
              item
            >
              <Avatar
                user={user}
                size="small"
              />
            </Grid>
            <Grid
              item
              xs
              style={{
                // whiteSpace: "nowrap",
              }}
            >
              {fullname}
            </Grid>
            <Grid
              item
            >
            </Grid>

          </Grid> */}

        })}
      </div>

    }


    return (
      <div
        style={{
          position: "relative",
        }}
      >

        <MiniModal
          position="right"
          radiusClass="big-radius"
          wrapperStyle={{
            right: -3,
            minWidth: 260,
          }}
          contentStyles={{
            padding: 0,
          }}
          cornerStyles={{
            backgroundColor: "#434649",
          }}
        >

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

        </MiniModal>

      </div>
    );
  }
}

export default withStyles(styles)(props => <RoomInfo 
  {...props}
/>);