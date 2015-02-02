'use strict';

/**
 * Module dependencies.
 */
module.exports = function(io){
	var usernames = {};
	return function (socket) {
		console.log('a user connected');
	 	socket.on('disconnect', function(){
	 		console.log('leave user',socket.username);
	 		socket.broadcast.emit('toaster message', socket.username , 'has left the chat');
	 		delete usernames[socket.username];
	    		socket.broadcast.emit('update users', usernames);
		});
	  	socket.on('add user', function(username){
	  		console.log('add user',username);
    			socket.username = username;
   			usernames[username] = username;
   			io.emit('toaster message', username , 'has joined the chat');
    			io.emit('update users', usernames);
  		});
	  	socket.on('chat message', function(msg){
	  		console.log('chat message', msg);
	  		io.emit('chat message', socket.username ,  msg);
	  	});
	};
};



