const proxy = require('http-proxy-middleware');


module.exports = function (app) {

  app.use(proxy('/api/', {
    target: 'http://localhost:4000/',
    ws: true,
    pathRewrite: {
      "^/api/": "/"
    }
  }));

  app.use(proxy('/images/', {
    target: 'http://localhost:4000/',
    pathRewrite: {
      "^/images/resized/([^/]+)/uploads/(.+)": "/images/$1/$2",
      "^/images/([^/]+)/uploads/(.+)": "/images/$1/$2",
    }
  }));

};


