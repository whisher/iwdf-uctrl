'use strict';

/**
 * Module dependencies.
 */
var support = require('../controllers/support');
module.exports = function(app, auth, jwt) {

  // Send available options on OPTIONS requests
  app.options( '/api/support', function (req, res) {
    res.send(['GET', 'PUT', 'DELETE', 'OPTIONS']);
  });

  // Root routing
  app.route('/api/support')
    .get(jwt, auth.isAdmin, support.all)
    .post(jwt,support.create)
    // 405 Method Not Allowed
    .all(function (req, res, next) {
      var err = new Error();
      err.route = '/api/support';
      err.status = 405;
      next(err);
  });

  app.route('/api/support/user')
    .get(jwt, support.user);

  app.route('/api/support/onhold')
    .get(jwt, auth.isAdmin, support.onHold);

  app.route('/api/support/:supportId')
    .get(auth.isMongoId, support.show)
    .put(auth.isMongoId, jwt, auth.isOwner, support.update)
    .delete(auth.isMongoId, jwt, auth.isOwner, support.destroy);

  // Setting up the supportId param
  app.param('supportId', support.support);
  
 

  app.route('/api/support/onhold')
    .get(support.onHold);

};