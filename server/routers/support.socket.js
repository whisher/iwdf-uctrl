'use strict';

var admins = {},
	users = {},
	roomAdmins = 'admin';

function onSocket(io){
	return function onConnection(socket) {
		var user = socket.decoded_token;
		console.log('user connect');
		function isAdmin(){
			return user.hasAdminRole;
		}
		function onAuthenticate(){
			if(isAdmin()){
				admins[user.id] = user;
				socket.join(roomAdmins);
				socket.broadcast.emit('admins connect',admins);
				socket.emit('users connect', users);
			}
			else{
				users[user.id] = user;
				socket.join(user.id);
				socket.broadcast.emit('users connect',users);
				socket.emit('admins connect', admins);
				console.log(users);
			}
		}
		socket.on('authenticate',onAuthenticate);

		function supportUpdate(support){
	  		io.in(support.user._id).emit('support update',support);
	  	}
		socket.on('support update', supportUpdate);

		function supportUserUpdate(support){
			io.in(roomAdmins).emit('support user update',support);
		}
		socket.on('support user update',supportUserUpdate);
  		
	};
}




module.exports = onSocket;