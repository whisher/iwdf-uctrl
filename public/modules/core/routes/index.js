(function() {
'use strict';

function config($stateProvider) {
    $stateProvider      
        .state('home', {
            url: '/',
            templateUrl: 'core/templates/index.html',
            controller:'CoreController as core',
            data: {
                currentTabIcon: 'Home'
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
        .state('search', {
            url: '/search',
            templateUrl: 'core/templates/search.html',
            controller:'SearchController as search',
            data: {
                currentTabIcon: 'Search'
            } 
        })
        .state('wrench', {
            url: '/wrench',
            templateUrl: 'core/templates/wrench.html',
            controller:'WrenchController as wrench',
            data: {
                currentTabIcon: 'Wrench'
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
        .state('screenshot', {
            url: '/screenshot/:id',
            templateUrl: 'core/templates/screenshot.html',
            controller:'ScreenshotController as screenshot',
            data: {
                currentTabIcon: 'Screenshot'
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
