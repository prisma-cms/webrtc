import React, { Component } from 'react';
import PropTypes from "prop-types";

import PrismaCmsApp from '@prisma-cms/front'
import { Renderer as PrismaCmsRenderer } from '@prisma-cms/front'

import * as queryFragments from "../schema/generated/api.fragments";

import App from "../App";


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


  render() {

    const {
      pure,
      ...other
    } = this.props;

    return pure ? <App
      {...other}
    /> : super.render();

  }

}

export default class DevApp extends Component {

  static propTypes = {
    queryFragments: PropTypes.object.isRequired,
  }

  static defaultProps = {
    queryFragments,
    lang: "ru",
  }

  render() {

    const {
      ...other
    } = this.props;

    return <PrismaCmsApp
      Renderer={DevRenderer}
      // pure={true}
      {...other}
    />
  }
}

