'use strict';

/**
 * Module dependencies.
 */
var _auth = require('../controllers/auth');
module.exports = function(app, auth, configs, jwt, passport) {
	app.route('/auth/signin').post(auth.isjustlogged, _auth.signin(configs, passport));
    	app.route('/auth/register').post(auth.isjustlogged, _auth.userNameExists, _auth.userEmailExists,_auth.register(configs));
	app.route('/auth/logout').get(auth.isnotlogged, _auth.logout);
	app.route('/auth/isjustlogged').get(_auth.isjustlogged);
	app.route('/auth/hasvalidtoken').get(jwt, _auth.hasValidToken);
	app.route('/partials/:name').get(jwt , function (req, res) {
    		var name = req.params.name;
    		console.log(name);
    		res.render('partials/' + name);
	});
	app.route('/auth/screenshot').post(function (req, res) {
    		//var name = req.params.name;
            console.log(req.user);
    		var webshot = require('webshot');
    		var id = Math.random().toString(36).slice(2);
                        var options = {
                            onLoadFinished: function() {
                                var elems = document.body.getElementsByTagName('*');
                                    for (var i=0; i<elems.length; i++) {
                                        var elem = elems[i];
                                        if(elem.dataset.ngShow){
                                            if(req.user){
                                                if(elem.dataset.ngShow.indexOf('!') !== -1){
                                                    elem.style.display= 'display';
                                                }
                                            }
                                        }
                                    } 
                            }
                        };
		webshot(req.body.url, configs.rootPath +'/screenshots/'+ id +'.png', options, function(err) {
  			if(!err){
				res.json({ id: id});
  			}
		});
    	});
};



