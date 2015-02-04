'use strict';

/**
 * Module dependencies.
 */
module.exports = function(io){
	var users = {};
	var rooms = ['room1','room2','room3'];
	return function (socket) {
		console.log('a user connected');
		io.emit('rooms', rooms);
	 	socket.on('disconnect', function(){
	 		console.log('leave user',socket.user);
	 		socket.broadcast.to(socket.room).emit('toaster leave', socket.user.username );
	 		delete users[socket.room][socket.user.id];
	    		socket.broadcast.emit('update users', users);
		});
		socket.on('add user', function(user){
	  		console.log('add user',user);
    			socket.user = user;
    			socket.room = rooms[0];
    			socket.join(socket.room);
   			if(!users[socket.room]){
   				users[socket.room] = {};	
   			}
   			users[socket.room][socket.user.id] = socket.user;
			io.emit('room', socket.room);
			if( !(socket.user in users[socket.room]) ){
				io.emit('toaster join', socket.user);	
			}
   			io.emit('update users', users);
  		});
  		socket.on('switch room', function(room){
	  		console.log('switch room',room);
			delete users[socket.room][socket.user.id];
	  		socket.leave(socket.room);
			socket.join(room);
    			socket.room = room;
    			if(!users[socket.room]){
   				users[socket.room] = {};	
   			}
   			users[socket.room][socket.user.id] = socket.user;
   			io.emit('room', socket.room);
			/*io.emit('room', socket.room);
			if( !(user in users) ){
				io.emit('toaster join', user);	
			}
   			io.emit('update users', users);*/
  		});
	  	socket.on('chat message', function(msg){
	  		console.log('chat message', msg);
	  		io.in(socket.room).emit('chat message',{ user: socket.user.username , msg: msg });
	  	});
	};
};



