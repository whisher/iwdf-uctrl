(function() {
'use strict';

function ChatController($rootScope, $state, chatSocket, toaster) {
  var chat = this;
  chat.messages = [];
  chat.msgNum = 0;
  chat.users = [];
  chat.usersNum = 0;
  if(!$rootScope.global.isAuthenticated){
    return $state.go('home');
  }
  chatSocket.on('connect', function(){
       chatSocket.emit('add user', $rootScope.global.isAuthenticated.username);
  });
  chatSocket.on('update users', function(usernames) {
    console.log(usernames);
    var users = [];
    angular.forEach(usernames, function(value, key) {
          this.push(value);
    }, users);
    chat.users = users;
    chat.usersNum = users.length;
  });
  chatSocket.on('chat message', function(user ,msg){
    chat.msgNum = chat.messages.unshift(user + ': ' +msg);
  });
  chatSocket.on('leave user', function(user){
    console.log(user);
  });
  chatSocket.on('toaster message', function(user ,msg){
    toaster.pop('success', 'chat', user + ': ' +msg);
  });
  chat.send = function(){
  	chatSocket.emit('chat message', chat.data.message);
 	chat.data.message = '';	
  };
  
}

angular.module('chat.controllers', [])
    .controller('ChatController', ChatController);
})();
