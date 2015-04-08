'use strict';

/**
 * Module dependencies.
 */
var users = require('../controllers/users');
module.exports = function(app) {
	// Setting up the userId param
  	app.param('userId', users.user);
};



