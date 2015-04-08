(function() {
  'use strict';

function SocketSupport(socketFactory, UserTokenStorage) {
	var ioSocket = io.connect(':3000/support?token=' + UserTokenStorage.get());
	var socket = socketFactory({
    		ioSocket: ioSocket
  	});
	return socket;
}
angular.module('socket.services', [])
   .factory('SocketSupport', SocketSupport);
})();