'use strict';

/**
 * Module dependencies.
 */
var _auth = require('../controllers/auth');
module.exports = function(app, auth, configs, jwt, passport) {
	app.route('/auth/signin').post( _auth.signin(configs, passport));
    	app.route('/auth/register').post(_auth.userNameExists, _auth.userEmailExists,_auth.register(configs));
	app.route('/auth/logout').get( _auth.logout);
	//app.route('/auth/isjustlogged').get(_auth.isjustlogged);
	app.route('/auth/hasvalidtoken').get(jwt, _auth.hasValidToken);
};



