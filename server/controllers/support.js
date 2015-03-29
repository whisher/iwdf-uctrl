'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Support = mongoose.model('Support'),
  Message = mongoose.model('Message'),
  _ = require('lodash');


/**
 * Find support by id
 */
exports.support = function(req, res, next, id) {
  Support.load(id, function(err, support) {
    if (err) return next(err);
    if (!support) return next(new Error('Failed to load support ' + id));
    req.support = support;
    next();
  });
};

/**
 * Create a support
 */
exports.create = function(req, res) {
  var support = new Support(req.body);
  support.user = mongoose.Types.ObjectId(req.user.id);
  support.save(function(err) {
    if (err) {console.log(err);
      return res.status(500).json([{'param':'support','msg':'Cannot save the support'}]);
    }
    res.status(201).json(support);
  });
};

/**
 * Update a support
 */
exports.update = function(req, res) {
  var message = new Message({ text: req.body.text, type: req.body.type });
  message.user = req.user;
  var support = req.support;
  support.status = req.body.status;
  var messagesLen = support.messages.push(message);
  support.save(function(err) {console.log(err);
    if (err) {
      return res.status(500).json([{'param':'support','msg':'Cannot update the support'}]);
    }
    res.json(support);
  });
};

/**
 * Delete an support
 */
exports.destroy = function(req, res) {
  var support = req.support;
  support.remove(function(err) {
    if (err) {
      return res.status(500).json([{'param':'support','msg':'Cannot delete the support'}]);
    }
    // TODO no element found in the browser
    res.sendStatus(204);
  });
};

/**
 * Show an support
 */
exports.show = function(req, res) {
  res.json(req.support);
};

/**
 * List of Supports
 */
exports.all = function(req, res) {
  Support.find().sort('-created').populate('user', 'username email _id').exec(function(err, supports) {
    if (err) {
      return res.status(500).json([{'param':'supports','msg':'Cannot list the supports'}]);
    }
    res.json(supports);
  });
};

/**
 * Supports by user id
 */
exports.user = function(req, res) {
  var user = mongoose.Types.ObjectId(req.user.id);
  Support.find({user:user}).sort('-created').populate('user', 'username email _id').exec(function(err, supports) {
    if (err) {
      return res.status(500).json([{'param':'supports','msg':'Cannot list the supports'}]);
    }
    if(!supports.length && !req.user.hasAdminRole){
      var support = new Support();
      support.user = mongoose.Types.ObjectId(req.user.id);
      support.save(function(err) {
        if (err) {
          return res.status(500).json([{'param':'support','msg':'Cannot save the support'}]);
        }
        return res.status(201).json(support);
      });
    }
    else{
      res.json(supports[0]);
    }
  });
};

/**
 * List of Supports
 */
exports.onHold = function(req, res) {
  Support.find( { status: 'open' }).sort('-created').populate('user', 'username email _id').exec(function(err, supports) {
    if (err) {
      return res.status(500).json([{'param':'supports','msg':'Cannot list the supports'}]);
    }
    var data= {};
    supports.forEach(function(support){
      data[support.user._id] = support;
    },data);
    res.json(data);
  });
};
