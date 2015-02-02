(function() {
  'use strict';

function chatSocket(socketFactory) {
  return socketFactory();
}

angular.module('chat.services', [])
	.factory('chatSocket', chatSocket); 
})();