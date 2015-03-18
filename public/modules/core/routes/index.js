(function() {
'use strict';

function config($stateProvider) {
    $stateProvider      
        .state('home', {
            url: '/',
            templateUrl: 'core/templates/index.html',
            controller:'CoreController as core',
            data: {
                currentTabIcon: 'store'
            } 
        })
        .state('explore', {
            url: '/explore',
            templateUrl: 'core/templates/explore.html',
            controller:'ExploreController as explore',
            data: {
                currentTabIcon: false
            } 
        })
        .state('wrench', {
            url: '/wrench',
            templateUrl: 'core/templates/wrench.html',
            controller:'WrenchController as wrench',
            data: {
                currentTabIcon: 'wrench'
            } 
        })
        .state('tutorial', {
            url: '/tutorial',
            templateUrl: 'core/templates/tutorial.html',
            controller:'TutorialController as tutorial',
            data: {
                currentTabIcon: 'tutorial'
            } 
        })
        .state('support', {
            url: '/support',
            templateUrl: 'core/templates/support.html',
            controller:'SupportController as support',
            data: {
                currentTabIcon: 'support'
            } 
        })
        .state('store', {
            url: '/store',
            templateUrl: 'core/templates/store.html',
            controller:'StoreController as store',
            data: {
                currentTabIcon: 'store'
            } 
        })
        .state('developers', {
            url: '/developers',
            templateUrl: 'core/templates/developers.html',
            controller:'DevelopersController as developers',
            data: {
                currentTabIcon: 'developers'
            } 
        })
        .state('screenshot', {
            url: '/screenshot/:id',
            templateUrl: 'core/templates/screenshot.html',
            controller:'ScreenshotController as screenshot',
            data: {
                currentTabIcon: 'screenshot'
            } 
        })
        .state('segret', {
            url: '/segret',
            templateUrl: 'partials/segret',
            controller:'SegretController as segret',
            data: {
                currentTabIcon: 'Segret'
            } 
        })
        .state('404', {
            url: '/404',
            	templateUrl: 'core/templates/404.html'
        });
}

angular.module('core.routes', [])
    .config(config);
})();
