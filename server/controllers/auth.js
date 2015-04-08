'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	User = mongoose.model('User'),
      jwt = require('jsonwebtoken');

/**
 * just logged route
 */
exports.isjustlogged = function(req, res) {
  if (req.isAuthenticated()) {
    return res.sendStatus(403);
  }
  return res.sendStatus(200);
};


/**
 * just logged route
 */
exports.hasValidToken = function(req, res) {
  return res.sendStatus(200);
};

/**
 * Try to signin  an user
 */
exports.signin = function(app, passport) {
  return function(req, res,next) {
    if (req.isAuthenticated()) {
      req.logout();
    }
    req.checkBody('email', 'You must enter a valid email address').isEmail();
    req.checkBody('password', 'Password must be between 8-20 characters long').len(8, 20);
    var errors = req.validationErrors();
    if (errors) {
      return res.status(400).json(errors);
    }
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return res.status(500).json(err);
      }
      if (!user) {
        return res.status(403).json(info);
      }
      req.login(user, function(err) {
	 if (err) {
	     return res.status(500).json(err);
        }
        var userData =  {username:user.username, hasAdminRole:user.isAdmin(), email:user.email, id:user._id};
        var token = jwt.sign(userData, app.locals.apiSecret, { expiresInMinutes: app.locals.tokenExpiresInMinutes });
        res.json({ token: token });
        
      });
    })(req, res, next);
  };
};

/**
 * Register
 */
exports.register  = function(app) {
  return function(req, res, next) {
    if (req.isAuthenticated()) {
      req.logout();
    }
    req.checkBody('username', 'username must be between 3-10 characters long').len(3, 10);
    req.checkBody('email', 'You must enter a valid email address').isEmail();
    req.checkBody('password', 'Password must be between 8-20 characters long').len(8, 20);
    req.checkBody('password_confirmation', 'Passwords do not match').equals(req.body.password);
    var errors = req.validationErrors();
    if (errors) {
      return res.status(400).json(errors);
    }
    var user = new User(req.body);
    user.save(function(err) {
      if (err) {
	 return res.status(500).json(err);
	} 
	req.login(user, function(err) {
        if (err) {
	   return res.status(500).json(err);
        } 
        var userData =  {username:user.username,hasAdminRole:false,email:user.email,id:user._id};
        var token = jwt.sign(userData, app.locals.apiSecret, { expiresInMinutes: app.locals.tokenExpiresInMinutes });
        res.json({ token: token });
	});
    });
  };
};

exports.logout = function(req, res) {
	req.logout();
	// TODO no element found in the browser
      res.sendStatus(200);
};

exports.userEmailExists = function(req, res, next) {
	User.count({
        		email: req.body.email
    	}, function (err, count) {
        		if (count === 0) {
            		return	next();
        		} 
           		res.status(400).json([{'param':'email','msg':'The email <'+req.body.email +'> is already registered'}]);
	});
};

exports.userNameExists = function(req, res, next) {
	User.count({
        		username: req.body.username
    	}, function (err, count) {
        		if (count === 0) {
            		return	next();
        		} 
           		res.status(400).json([{'param':'username','msg':'The username <'+req.body.username +'> is already registered'}]);
	});
};
