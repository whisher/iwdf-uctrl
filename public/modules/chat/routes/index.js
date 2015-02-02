(function() {
'use strict';

function config($stateProvider) {
	$stateProvider      
        		.state('chat', {
            		url: '/chat',
            		templateUrl: 'chat/templates/index.html',
            		controller:'ChatController as chat'
    		});
        		
}

angular.module('chat.routes', [])
    .config(config);
})();
