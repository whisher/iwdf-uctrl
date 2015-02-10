'use strict';

var users = {};
var rooms = ['room1','room2','room3'];
module.exports = function(io){
	return function (socket) {
		console.log('a user connected');
		console.log('connected',socket.decoded_token);
		socket.user = socket.decoded_token;
		socket.on('disconnect', function(){
	 		console.log('leave user',socket.user);
	 		socket.broadcast.to(socket.room).emit('toaster leave',{user:socket.user,room:socket.room});
	 		delete users[socket.room][socket.user.id];
	 		delete socket.user;
	 		delete socket.decoded_token;
	    		socket.broadcast.emit('update users', users);
		});
		socket.on('authenticate', function(){
	  		console.log('add user',socket.user);
	  		socket.room = rooms[0];
    			socket.join(socket.room);
   			if(!users[socket.room]){
   				users[socket.room] = {};	
   			}	
   			if( Object.keys(users[socket.room]).indexOf(socket.user.id) === -1 ){
				io.emit('toaster join', {user:socket.user,room:socket.room});	
			}
			users[socket.room][socket.user.id] = socket.user;
			io.emit('rooms', rooms);
			io.emit('room', socket.room);
   			io.emit('update users', users);
  		});
  		socket.on('switch room', function(room){
	  		console.log('switch room',room);
			delete users[socket.room][socket.user.id];
	  		socket.leave(socket.room);
	  		socket.room = room;
			socket.join(socket.room);
    			if(!users[socket.room]){
   				users[socket.room] = {};	
   			}
   			if( Object.keys(users[socket.room]).indexOf(socket.user.id) === -1 ){
				io.emit('toaster join', {user:socket.user,room:socket.room});	
			}
			users[socket.room][socket.user.id] = socket.user;
   			io.emit('update users', users);
   			console.log('switch room users',users);
  		});
	  	socket.on('chat message', function(msg){
	  		console.log('chat message', msg ,socket.user);
	  		io.in(socket.room).emit('chat message',{ user: socket.user , msg: msg });
	  	});
	};
};



