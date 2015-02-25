'use strict';

/**
 * Module dependencies.
 */
var index = require('../controllers/index');
module.exports = function(app, configs, jwt) {
	app.route('/partials/:name').get(index.partials(configs, jwt));
	app.route('/auth/screenshot').post(index.screenshot(configs, jwt));
};



