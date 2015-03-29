(function() {
'use strict';

function run($rootScope) {
    $rootScope.global  = {};
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
      $rootScope.global.currentTabIcon = 'user';
      if(toState.data){
        $rootScope.global.currentTabIcon = toState.data.currentTabIcon;
      }
	
    });
   
}
angular.module('core', [
      	'ui.router',
      	'templates',
      'ngAnimate',
	'core.services',
	'core.filters',
      	'core.directives',
      	'core.controllers',
     	'core.routes'
])
  .run(run);

})();

