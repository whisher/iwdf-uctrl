(function() {
'use strict';

angular.module('chat', [
      	'ui.router',
      	'templates',
      	'btford.socket-io',
      	'toaster',
      	'auth.services',
	'chat.services',
      	'chat.controllers',
     	'chat.routes'
]);


})();

