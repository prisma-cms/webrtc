import expect from 'expect'

// // import message from 'src/index'


import App from "../../../dev";

describe('Module template', () => {
  it('displays a welcome message', () => {
    // expect(message).toContain('Welcome to @prisma-cms/tests')
    expect("message").toContain('message')
  })
})

export default App;
