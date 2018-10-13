
import expect from 'expect'

import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import PropTypes from "prop-types";

import chalk from "chalk";

import TestApp from "./App";


class Renderer extends Component {

  static propTypes = {
  }

  render() {

    return <div
      id="content"
      {...this.props}
    />

  }
}


describe('@prisma-cms/tests app', () => {
  let node


  beforeEach(() => {
    node = document.createElement('root')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })


  it('Render Main App', () => {


    render(<TestApp
      Renderer={Renderer}
    >
      <div
        id="test"
      >
        Test
      </div>
    </TestApp>, node, () => {

      const item = node.querySelector("#test");

      expect(item).toNotBe(null);
      expect(item.textContent).toBe("Test");

    })
  });

  it('Render Index App', () => {



    return new Promise((resolve, reject) => {

      node.id = "root";

      document.body.append(node);

      require("../index");

      setTimeout(() => {

        // console.log(chalk.green(node), node.textContent);

        expect(node.textContent).toContain("Main page");
        expect(node.textContent).toContain("Users");
        expect(node.textContent).toContain("Signin");

        resolve();
      }, 1000);

    });

    // render(<TestApp
    //   Renderer={Renderer}
    // >
    //   <div
    //     id="test"
    //   >
    //     Test
    //   </div>
    // </TestApp>, node, () => {

    //   const item = node.querySelector("#test");

    //   expect(item).toNotBe(null);
    //   expect(item.textContent).toBe("Test");

    // })

  });



})

