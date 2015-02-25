'use strict';

/**
 * Module dependencies.
 */
var webshot = require('webshot');

exports.partials = function(configs, jwt) {
	return function(req, res) {
      		var name = req.params.name;
      		res.render('partials/' + name);
  	};
};
exports.screenshot = function(configs, jwt) {
	return function(req, res) {
      		var id = Math.random().toString(36).slice(2);
                        	var options = {
                         	onLoadFinished: function() {
                            	}
                        	};
		webshot(req.body.url, configs.rootPath +'/screenshots/'+ id +'.png', options, function(err) {
  			if(!err){
				res.json({ id: id});
  			}
		});
  	};
};
