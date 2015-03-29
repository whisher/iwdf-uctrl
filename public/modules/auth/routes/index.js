(function() {
'use strict';

function config($stateProvider,$httpProvider) {
    $stateProvider      
        .state('auth', {
            abstract: true,
        	template: '<ui-view/>',
        	resolve:{
            	auth : function(Auth){
            		return Auth.hasValidToken();
            	}
            }

    });
    $httpProvider.interceptors.push('HttpInterceptor');
}

angular.module('auth.routes', [])
    .config(config);
    
})();