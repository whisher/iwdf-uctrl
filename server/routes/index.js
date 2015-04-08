'use strict';

/**
 * Module dependencies.
 */
var index = require('../controllers/index');
module.exports = function(app) {
	var jwt = require('../middlewares/jwt')(app);
	app.route('/partials/:name').get(jwt, index.partials);
	app.route('/auth/screenshot').post(jwt ,index.screenshot(app));
};



