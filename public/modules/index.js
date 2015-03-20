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

angular.module(
	'app', 
	[
		'ngAnimate',
		'core',
		'auth',
		'users',
		'world',
		'wrench',
		'tutorial',
		'support',
		'store',
		'developers',
		'screenshot'
	])
	.config(config);
 })();




