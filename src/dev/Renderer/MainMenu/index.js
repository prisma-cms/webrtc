import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Context from '@prisma-cms/context';

import Grid from '@prisma-cms/front/lib/modules/ui/Grid';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import { Notices } from '@prisma-cms/society';

// import Modal from './AuthModal';

import {
  styles,
} from "@prisma-cms/front/lib/components/App/Renderer/MainMenu";

// import UserItem from './User';
import UserItem from "@prisma-cms/front/lib/components/App/Renderer/MainMenu/User";

export class MainMenu extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }


  static contextType = Context;

  state = {
    // opened: false,
  }

  logout() {

    const {
      logout,
    } = this.context;

    logout();

  }

  // handleClose = () => {

  //   this.setState({
  //     opened: false,
  //   });

  // }


  render() {

    const {
      user,
    } = this.context;

    const {
      // opened,
    } = this.state;

    const {
      classes,
    } = this.props;

    const {
      id: userId,
      sudo,
    } = user || {}

    return (

      <AppBar
        // position="relative"
        className={classes.root}
        style={{
          position: "relative",
        }}
      >

        <Grid
          container
          spacing={16}
          alignItems="center"
          className="MainMenu-root"
        >

          <Grid
            item
          >
            <Link
              to="/"
            >
              <Typography
                component="span"
                className={classes.link}
              >
                Main page
            </Typography>
            </Link>
          </Grid>

          <Grid
            item
          >
            <Link
              to="/users"
            >
              <Typography
                component="span"
                className={classes.link}
              >
                Users
            </Typography>
            </Link>
          </Grid>

          <Grid
            item
          >
            <Link
              to="/chat-rooms"
            >
              <Typography
                component="span"
                className={classes.link}
              >
                Chat rooms
            </Typography>
            </Link>
          </Grid>

          <Grid
            item
          >
            <Link
              to="/chat-messages"
            >
              <Typography
                component="span"
                className={classes.link}
              >
                Chat messages
            </Typography>
            </Link>
          </Grid>

          <Grid
            item
          >
            <a
              href="/graphql-voyager"
            >
              <Typography
                component="span"
                className={classes.link}
              >
                Graphql Voyager
              </Typography>
            </a>
          </Grid>


          <Grid
            item
            xs
          >
          </Grid>

          {user
            ?
            [
              <Grid
                key="notifications"
                item
              >
                <Notices
                  key={userId}
                  user={user}
                  classes={{
                    icon: classes.link,
                  }}
                />
              </Grid>,
              <Grid
                key="user"
                item
              >
                <UserItem
                  key={userId}
                  user={user}
                  classes={classes}
                />
              </Grid>,
              <Grid
                key="logout"
                item
              >
                <Button
                  onClick={() => this.logout()}
                  className={classes.link}
                >
                  Signout
              </Button>

              </Grid>
            ]
            :
            <Grid
              key="login"
              item
            >
              <Button
                onClick={e => {
                  // this.setState({
                  //   opened: true,
                  // });
                  const {
                    openLoginForm,
                  } = this.context;
                  openLoginForm();
                }}
              >
                <Typography
                  component="span"
                  className={classes.link}
                >
                  Signin
              </Typography>
              </Button>

            </Grid>
          }


        </Grid>

      </AppBar>

    )
  }
}

export default withStyles(styles)(props => <MainMenu
  {...props}
/>);