'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  _ = require('lodash');

/**
 * Generic just logged routing middleware
 */
exports.isjustlogged = function(req, res, next) {
  if (req.isAuthenticated()) {
    return res.sendStatus(403);
  }
  next();
};

/**
 * Generic not logged routing middleware
 */
exports.isnotlogged = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.sendStatus(403);
  }
  next();
};

/**
 * Generic validates if the first parameter is a mongo ObjectId
 */
exports.isMongoId = function(req, res, next) {
  if ((_.size(req.params) === 1) && (!mongoose.Types.ObjectId.isValid(_.values(req.params)[0]))) {
      return res.status(500).send('Parameter passed is not a valid Mongo ObjectId');
  }
  next();
};

/**
* Support authorization 
*/
exports.isOwner = function(req, res, next) {
  if (!req.user.hasAdminRole && req.support.user.id !== req.user.id) {
    return res.sendStatus(401);
  }
  next();
};

/**
* Admin authorization 
*/
exports.isAdmin = function(req, res, next) {
  if (!req.user.hasAdminRole) {
    return res.sendStatus(401);
  }
  next();
};
