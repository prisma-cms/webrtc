import React, { Component } from 'react';
import PropTypes from "prop-types";

import PrismaCmsApp from '@prisma-cms/front'

import * as queryFragments from "../schema/generated/api.fragments";

import DevRenderer from "./Renderer";


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

