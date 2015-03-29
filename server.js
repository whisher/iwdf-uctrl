'use strict';

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
	jwt = require('./server/middlewares/jwt')(configs);

// Bootstrap db connection
var db = require('./server/config/db')(configs);
 
// Bootstrap models
var modelsPath = path.join(configs.serverPath+ '/models');
fs.readdirSync(modelsPath).forEach(function (file) {
	require(modelsPath + '/' + file);
});

require(configs.serverPath+'/config/passport')(passport);

// We are going to protect /api routes with JWT
//app.use('/api', expressJwt({secret: configs.apiSecret}));


require(configs.serverPath+'/config/express')(configs,app,passport,db);

 if (app.get('env') === 'development') {
 	app.disable('etag');
	app.use(require('connect-livereload')());
}
app.set('port', process.env.PORT || 3000);

app.use(favicon(path.join(configs.rootPath,configs.releasePath,'favicon.png')));
app.use(express.static( path.join(configs.rootPath, configs.releasePath)));
app.use('/screenshots',express.static(path.join(configs.rootPath, 'screenshots')));

// Routes
require(configs.serverPath+'/routers/index')(app, configs, jwt);
require(configs.serverPath+'/routers/auth')(app, auth, configs, jwt, passport);
require(configs.serverPath+'/routers/users')(app, auth);
require(configs.serverPath+'/routers/support')(app, auth, jwt);

app.use(function(err, req, res, next) {
	// If the error object doesn't exists
	if (!err){
		return next();
	}
	// Log it
	console.error(err.stack);
	//For /api
	if (err.constructor.name === 'UnauthorizedError') {
    		res.status(401).send('Unauthorized');
  	}
  	if (err.status === 405) {
    		res.status(405).send('Method Not Allowed');
  	}
  	res.status(500).send('Internal Server Error');
});

// Assume 404 since no middleware responded
app.use(function(req, res) {
	// Log it
	console.error(req.url);
	if(configs.niceErrorPage){
		return res.status(404).render('404');
	}
	res.status(404).send('Not Found');
});

if (app.get('env') === 'development') {
	app.use(errorHandler());
}
var server = http.createServer(app);
var io = sio(server);

var supportNs = io.of('/support');
supportNs.use(
	socketio_jwt.authorize({
  		secret: configs.apiSecret,
  		handshake: true
	})
);
supportNs.on('connection', require(configs.serverPath+'/routers/support.socket')(supportNs));

server.listen(app.get('port'), function () {
	console.log( 'Express started on http://'  + configs.hostname + ':' +
		app.get('port') + ' env: ' + app.get('env') +  '; press Ctrl-C to terminate.' );
});

exports = module.exports = app;
