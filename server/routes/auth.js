'use strict';

/**
 * Module dependencies.
 */
 var passport = require('passport'),
	auth = require('../middlewares/auth'),
	_auth = require('../controllers/auth');
module.exports = function(app) {
	var jwt = require('../middlewares/jwt')(app);
	app.route('/auth/signin').post( _auth.signin(app, passport));
    	app.route('/auth/register').post(_auth.userNameExists, _auth.userEmailExists,_auth.register(app));
	app.route('/auth/logout').get(auth.isLogged, _auth.logout);
	app.route('/auth/isjustlogged').get(_auth.isjustlogged);
	app.route('/auth/hasvalidtoken').get(jwt, _auth.hasValidToken);
};



