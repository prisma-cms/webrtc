import React, { Component } from 'react';
import PropTypes from 'prop-types';


import PrismaCmsComponent from "@prisma-cms/component";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import View from "./View";

// class Call extends Component {

//   static propTypes = {

//   };

//   render() {
//     return (
//       <div>
        
//       </div>
//     );
//   }
// }
 

export default class CallRequestConnector extends PrismaCmsComponent{

  componentWillMount(){

    if(!this.Renderer){

      const {
        query: {
          callRequests,
        },
      } = this.context;

      const {
      } = this.props;
  
      this.Renderer = graphql(gql(callRequests))(View);
  
    }

    super.componentWillMount && super.componentWillMount();

  }


  render(){

    const {
      Renderer,
    } = this;

    // return "Call";

    
    return <Renderer 
      {...this.props}
    />

  }

}