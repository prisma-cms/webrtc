
import expect from 'expect'

import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import App from "../App";



describe('@prisma-cms/tests app', () => {
  let node


  beforeEach(() => {
    node = document.createElement('root')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })




  it('Render App', () => {

    expect(App).toNotBe(null);

  });

})

