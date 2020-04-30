import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';

import App from '../App';

import PrismaCmsPerformanceTester from "@prisma-cms/performance";

export default class DevApp extends App {


  render() {

    // const {
    //   ...other
    // } = this.props;

    // return <PrismaCmsApp
    //   Renderer={DevRenderer}
    //   apolloOptions={{
    //     localStorage: global.sessionStorage,
    //   }}
    //   // pure={true}
    //   {...other}
    // />
    return <Fragment>
      <div
        id="prisma-cms-performance-tester"
      >
        <PrismaCmsPerformanceTester
          // test={{}}
          props={this.props}
          state={this.state}
          context={this.context}
          prefix="dev_app"
        />
      </div>
      <div
        id="content"
      >
        {super.render()}
      </div>

    </Fragment>
  }

}