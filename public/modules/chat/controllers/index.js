(function() {
'use strict';
//'has joined the chat' 
function ChatController($rootScope, $state, chatSocket, chatMsg, chatData, toaster) {
  if(!$rootScope.global.isAuthenticated){
    return $state.go('home');
  }
  var chat = this;
  chat.users = chatData.getUsers();
  chat.usersNum =  chat.users.length;
  chat.rooms = chatData.getRooms();
  chat.room = chatData.getRoom();
  chat.messages = chatData.getMessages(chat.room);
  chat.msgNum = chat.messages.length;
  
  chatSocket.on('connect', function(){
       chatSocket.emit('add user', $rootScope.global.isAuthenticated);
  });
  chatSocket.on('rooms', function(rooms){
      chat.rooms = rooms;
      chatData.setRooms(chat.rooms);
  });
  chatSocket.on('room', function(room){
      chat.room = room;
      chatData.setRoom(chat.room);
  });
  chatSocket.on('update users', function(users) {
    var data = [];
    angular.forEach(users[chat.room], function(value, key) {console.log(value);
         this.unshift(value.username);
    }, data);
    chat.users = data;
    chat.usersNum = chat.users.length;
    chatData.setUsers(chat.users);
  });
  chatSocket.on('chat message', function(msg){
    chat.msgNum = chat.messages.unshift(msg);
    chatData.setMessages(chat.room,msg);
  });
  chatSocket.on('toaster leave', function(user){
    console.log(user);
  });
  chatSocket.on('toaster join', function(user){
    toaster.pop('success', 'chat', user.username + ': ' + chatMsg.join);
  });
  chat.send = function(){
  	chatSocket.emit('chat message', chat.data.message);
 	chat.data.message = '';	
  };
  chat.switchRoom = function(room){
    chatSocket.emit('switch room', room);
    
    alert(room);
  };
  
}

angular.module('chat.controllers', [])
    .controller('ChatController', ChatController);
})();
