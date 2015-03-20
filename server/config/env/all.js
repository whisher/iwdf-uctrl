'use strict';

var path = require('path'),
  rootPath = process.cwd(),
  serverPath = rootPath + '/server',
  staticPath = rootPath + '/build'; 

module.exports = {
  rootPath: rootPath,
  serverPath: serverPath,
  staticPath: staticPath,
  http: {
    port: process.env.PORT || 3000
  },
  https: {
    port: false,

    // Paths to key and cert as string
    ssl: {
      key: '',
      cert: ''
    }
  },
  hostname: process.env.HOST || process.env.HOSTNAME || 'localhost',
  db: process.env.MONGOHQ_URL,
  templateEngine: 'ejs',


  // The secret should be set to a non-guessable string that
  // is used to compute a session hash
  apiSecret: 'version01#www.viewtwoo.com#2015',
  sessionSecret: 'version01#www.viewtwoo.com#2015',
  // Time Expiration token
  expiresInMinutes: 60*5,
  // The name of the MongoDB collection to store sessions in
  sessionCollection: 'sessions',

  // The session cookie settings
  sessionCookie: {
    path: '/',
    httpOnly: true,
    // If secure is set to true then it will cause the cookie to be set
    // only when SSL-enabled (HTTPS) is used, and otherwise it won't
    // set a cookie. 'true' is recommended yet it requires the above
    // mentioned pre-requisite.
    secure: false,
    // Only set the maxAge to null if the cookie shouldn't be expired
    // at all. The cookie will expunge when the browser is closed.
    maxAge: null
  },

  // The session cookie name
  sessionName: 'connect.sid',
  // If true when there is a 404/500 status the app use the 404/500 route
  niceErrorPage: true
};
