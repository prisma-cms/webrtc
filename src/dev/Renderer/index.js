import React, { Component } from 'react';
import PropTypes from "prop-types";

import App, {
  ContextProvider, 
  SubscriptionProvider,
} from "../../App";

import { Renderer as PrismaCmsRenderer } from '@prisma-cms/front'

import MainMenu from './MainMenu';


class DevRenderer extends PrismaCmsRenderer {


  static propTypes = {
    ...PrismaCmsRenderer.propTypes,
    pure: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsRenderer.defaultProps,
    pure: false,
  }


  getRoutes() {

    let routes = super.getRoutes();

    return [
      {
        exact: true,
        path: "/",
        component: App,
      },
      // {
      //   path: "*",
      //   render: props => this.renderOtherPages(props),
      // },
    ].concat(routes);

  }


  renderMenu() {

    return <MainMenu />
  }


  render() {

    const {
      pure,
      ...other
    } = this.props;

    return <ContextProvider>
      <SubscriptionProvider>
        {pure ? <App
          {...other}
        /> : super.render()}
      </SubscriptionProvider>
    </ContextProvider>;

  }

}

export default DevRenderer;