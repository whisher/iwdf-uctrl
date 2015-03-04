(function() {
'use strict';

function config($stateProvider) {
	$stateProvider      
        		.state('home', {
            		url: '/',
            		templateUrl: 'core/templates/index.html',
            		controller:'CoreController as core'
    		})
                        .state('explore', {
                            url: '/explore',
                            templateUrl: 'core/templates/explore.html',
                            controller:'ExploreController as explore'
                        })
                        .state('search', {
                            url: '/search',
                            templateUrl: 'core/templates/search.html',
                            controller:'SearchController as search'
                        })
                        .state('wrench', {
                            url: '/wrench',
                            templateUrl: 'core/templates/wrench.html',
                            controller:'WrenchController as wrench'
                        })
                        .state('segret', {
                            url: '/segret',
                            templateUrl: 'partials/segret',
                            controller:'SegretController as segret'
                        })
                        .state('screenshot', {
                            url: '/screenshot/:id',
                            templateUrl: 'core/templates/screenshot.html',
                            controller:'ScreenshotController as screenshot'
                        })
        		.state('404', {
            		url: '/404',
            		templateUrl: 'core/templates/404.html'
    		});
}

angular.module('core.routes', [])
    .config(config);
})();
