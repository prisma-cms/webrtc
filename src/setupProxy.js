
// module.exports = require("@prisma-cms/front/lib/setupProxy");

const proxy = require('http-proxy-middleware');

const setupProxy = require("@prisma-cms/front/lib/setupProxy");

module.exports = function (app) {

  app.use(proxy('/socket.io/', {
    target: 'http://localhost:9001',
    ws: true,
  }));

  return setupProxy(app);
}

