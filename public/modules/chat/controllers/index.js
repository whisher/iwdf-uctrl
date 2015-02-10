(function() {
'use strict';
//'has joined the chat' 
function ChatController($rootScope, $state, hasvalidtoken, chatSocket, chatMsg, chatData, toaster) {
  var chat = this;
  chat.data = {};
  chat.users = chatData.getUsers();
  chat.usersNum =  chat.users.length;
  chat.rooms = chatData.getRooms();
  chat.room = chatData.getRoom();
  chat.messages = chatData.getMessages(chat.room);
  chat.msgNum = chat.messages.length;
  chatSocket.removeAllListeners();
  chatSocket.on('connect', function(){
       chatSocket.emit('authenticate');
  });
  chatSocket.on('error', function(error) {
    if (error.type === 'UnauthorizedError' || error.code === 'invalid_token') {
      return $state.go('home');
    }
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
    angular.forEach(users[chat.room], function(value, key) {
      this.unshift(value.username);
    }, data);
    chat.users = data;
    chat.usersNum = chat.users.length;
    chatData.setUsers(chat.users);
  });

  chatSocket.on('toaster leave', function(msg){
    toaster.pop('success', 'chat', msg.user.username + ': ' + chatMsg.leave + ' '  + msg.room);
  });
  chatSocket.on('toaster join', function(msg){
    toaster.pop('success', 'chat', msg.user.username + ': ' + chatMsg.join + ' ' + msg.room);
  });

  chatSocket.on('chat message', function(msg){
    chat.msgNum = chatData.addMessage(chat.room,msg);
    chat.messages = chatData.getMessages(chat.room);
  });

  chat.send = function(){
    if(!!chat.data.message){
  	chatSocket.emit('chat message', chat.data.message);
    }
    chat.data.message = '';	
  };

  chat.switchRoom = function(room){
    chatSocket.emit('switch room', room);
    chat.room = room;
    chatData.setRoom(chat.room);
    chat.messages = chatData.getMessages(chat.room);
    chat.msgNum = chat.messages.length;
  };
  
}

angular.module('chat.controllers', [])
    .controller('ChatController', ChatController);
})();
