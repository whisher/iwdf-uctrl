(function() {
'use strict';

angular.module('chat', [
      	'ui.router',
      	'templates',
      	'btford.socket-io',
      	'toaster',
	'chat.services',
      	'chat.controllers',
     	'chat.routes'
]);


})();

