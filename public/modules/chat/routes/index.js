(function() {
'use strict';

function config($stateProvider) {
	$stateProvider      
        		.state('chat', {
            		url: '/chat',
            		templateUrl: 'chat/templates/index.html',
            		controller:'ChatController as chat',
            		resolve: {
	                    		hasvalidtoken: function(Auth){
	                        		return Auth.hasValidToken();
	                    		} 
	                	}
    		});
        		
}

angular.module('chat.routes', [])
    .config(config);
})();
