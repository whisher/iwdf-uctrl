'use strict';

/**
 * Module dependencies.
 */
var webshot = require('webshot');

/**
 * Protected view
 */
exports.partials = function(req, res) {
	var name = req.params.name;
      res.render('partials/' + name);
};

/**
 * Build screenshot
 */
exports.screenshot = function(app) {
	return function(req, res) {
      		var id = Math.random().toString(36).slice(2);
                        	var options = {
                         	onLoadFinished: function() {
                            	}
                        	};
		webshot(req.body.url, app.locals.rootPath +'/screenshots/'+ id +'.png', options, function(err) {
  			if(!err){
				res.json({ id: id});
  			}
		});
  	};
};
