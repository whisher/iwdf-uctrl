'use strict';

/**
* Set up debug for developement
*/
 if (process.env.NODE_ENV === 'development') {
 	process.env.DEBUG = 'app';
}
/**
 * Module dependencies.
 */
var fs = require('fs'),
	http = require('http'),
	express = require('express'),
	app = express(),
	favicon = require('serve-favicon'),
	path = require('path'),
	passport = require('passport'),
	errorHandler = require('errorhandler'),
	sio = require('socket.io'),
	socketio_jwt = require('socketio-jwt'),
	configs = require('./server/config/config'),
	auth = require('./server/middlewares/auth'),
	jwt = require('./server/middlewares/jwt')(configs),
	debug = require('debug')('app');

// Bootstrap db connection
var db = require('./server/config/db')(configs);
 
// Bootstrap models
var modelsPath = path.join(configs.serverPath+ '/models');
fs.readdirSync(modelsPath).forEach(function (file) {
	require(modelsPath + '/' + file);
});

// Set up passport
require(configs.serverPath+'/config/passport')(passport);

// Set up express
require(configs.serverPath+'/config/express')(configs,app,passport,db);

 if (app.get('env') === 'development') {
 	app.disable('etag');
	app.use(require('connect-livereload')());
}

// Set up port
app.set('port', process.env.PORT || 3000);

// Set up static
app.use(favicon(path.join(configs.rootPath,configs.releasePath,'favicon.png')));
app.use(express.static( path.join(configs.rootPath, configs.releasePath)));
app.use('/screenshots',express.static(path.join(configs.rootPath, 'screenshots')));

// Set up routes
require(configs.serverPath+'/routers/index')(app, configs, jwt);
require(configs.serverPath+'/routers/auth')(app, auth, configs, jwt, passport);
require(configs.serverPath+'/routers/users')(app, auth);
require(configs.serverPath+'/routers/support')(app, auth, jwt);

// Manage 500 status
app.use(function(err, req, res, next) {
	// If the error object doesn't exists
	if (!err){
		return next();
	}
	debug(err.stack);
	//For jwt
	if (err.constructor.name === 'UnauthorizedError') {
    		res.status(401).send('Unauthorized');
  	}
  	if (err.status === 403) {
    		res.status(403).send('Forbidden');
  	}
  	if (err.status === 405) {
    		res.status(405).send('Method Not Allowed');
  	}
  	res.status(500).send('Internal Server Error');
});

// Assume 404 since no middleware responded
app.use(function(req, res) {
	debug(req.url);
	if(configs.niceErrorPage){
		return res.status(404).render('404');
	}
	res.status(404).send('Not Found');
});

// Error handler
if (app.get('env') === 'development') {
	app.use(errorHandler());
}

// Set up socket.io
var server = http.createServer(app),
	io = sio(server),
	supportNs = io.of('/support');

supportNs.use(
	socketio_jwt.authorize({
  		secret: configs.apiSecret,
  		handshake: true
	})
);
supportNs.on('connection', require(configs.serverPath+'/routers/support.socket')(supportNs));

// Binds and listens for connections
server.listen(app.get('port'), function () {
	debug( 'Express started on http://'  + configs.hostname + ':' +
		app.get('port') + ' env: ' + app.get('env') +  '; press Ctrl-C to terminate.' );
});

// Making the app variable be referenced directly from another module
exports = module.exports = app;
