(function() {
'use strict';
function run($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
console.log(toState.data.currentTabIcon); 
$rootScope.global.currentTabIcon = toState.data.currentTabIcon;
    });
}
angular.module('core', [
      	'ui.router',
      	'templates',
	'core.services',
	'core.filters',
      	'core.directives',
      	'core.controllers',
     	'core.routes'
]).run(run);


})();

