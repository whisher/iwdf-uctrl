(function() {
'use strict';

angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
});

function config($locationProvider, $urlRouterProvider, $logProvider, $httpProvider, DEBUG) {
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/');  
    $logProvider.debugEnabled(DEBUG);
    $httpProvider.useApplyAsync(true);
}

function run($log) {
    $log.debug('App is running!');
}

angular.module('app', ['ngAnimate','anim-in-out','core','auth','users'])
	    .config(config)
	    .run(run);
 })();




