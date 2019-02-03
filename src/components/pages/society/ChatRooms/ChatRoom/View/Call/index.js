import React, { Component } from 'react';
import PropTypes from 'prop-types';


import PrismaCmsComponent from "@prisma-cms/component";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class Call extends Component {

  static propTypes = {

  };

  render() {
    return (
      <div>
        
      </div>
    );
  }
}
 

// export default class CallConnector extends PrismaCmsComponent{

//   componentWillMount(){

//     if(!this.Renderer){

//       const {
//         query: {
//           callRequest,
//         },
//       } = this.context;

//       const {
//       } = this.props;
  
//       this.Renderer = graphql(gql(callRequest))(Call);
  
//     }

//     super.componentWillMount && super.componentWillMount();

//   }


//   render(){

//     const {
//       Renderer,
//     } = this;

//     return "Call";

    
//     return <Renderer 
//       {...this.props}
//     />

//   }

// }