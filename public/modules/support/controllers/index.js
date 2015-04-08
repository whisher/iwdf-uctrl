(function() {
'use strict';

function SupportController($rootScope, $state, SocketSupport, Messages, messages) {
  var support = this; 
  
  var data = messages.data;
  
  support.usersOnLine = {};
  support.userUpdate = {};

  support.usersId = Object.keys(data);
  support.hasSupport = support.usersId.length;
  support.messages = (!support.hasSupport)?{}:data;
  support.supportId = (!support.hasSupport)?null:data[support.usersId[0]]._id;
  support.message =(!support.hasSupport)?[]:data[support.usersId[0]].messages;
  support.showUserId =(!support.hasSupport)?[]:data[support.usersId[0]].user._id;
  
  support.show = function(key){
    var current = support.messages[key];
    support.message = current.messages;
    support.supportId = current._id;
    if(support.userUpdate[key]){
      delete support.userUpdate[key];
    }
    support.showUserId =key;
  };

  support.data = {};
  support.data.type = 'reply';
  support.data.status = 'closed';
  support.send= function(){
    var len = support.data.text.length;
    if( (len >= 10) && (len <= 500) ){
      Messages.update(support.supportId,support.data).then(function(response) {
        support.message = response.data.messages;
        SocketSupport.emit('support update',response.data);
        support.data.text = '';
      })
      .catch(function(response) {
        console.log(response.data[0].msg);
      });
    }
  };

  SocketSupport.removeAllListeners();

  SocketSupport.on('connect', function(){
    SocketSupport.emit('authenticate');
  });

  SocketSupport.on('support user update', function(data){
    support.hasSupport = true;
    support.userUpdate[data.user._id] = data;
    Messages.getOnHold().then(function(response) {
        support.messages = response.data;
      })
      .catch(function(response) {
        console.log(response);
    });
  });

  SocketSupport.on('users connect', function(users){
    support.usersOnLine = users;
  });

  SocketSupport.on('error', function(error) {
    if (error.type === 'UnauthorizedError' || error.code === 'invalid_token') {
      return $state.go('home');
    }
  });

  $rootScope.$on('logout', function(event, user) { 
    SocketSupport.emit('logout',user);
  });
}

function SupportUserController($rootScope, $state, SocketSupport, Messages, messages, $translate) {
  var supportUser = this; 
  var data = messages.data;
  supportUser.supportId = data._id;
  supportUser.messages = data.messages;
  supportUser.supportIsOnline = false;
  
  supportUser.data = {};
  supportUser.data.type = 'question';
  supportUser.data.status = 'open';
  supportUser.send= function(){
    var len = supportUser.data.text.length;
    supportUser.data.text = supportUser.data.text.replace(/<\/?[^>]+(>|$)/g, '');
    if( (len >= 10) && (len <=500) ){
      Messages.update(supportUser.supportId,supportUser.data).then(function(response) {
        supportUser.messages = response.data.messages;
        $translate('support.reply').then(function (reply) {
          var data = {
            text : reply,
            created: Date.now(),
            type: 'reply'
          };
          supportUser.messages.push(data);
        });
        SocketSupport.emit('support user update',response.data);
        supportUser.data.text = '';
      })
      .catch(function(response) {
        console.log(response.data[0].msg);
      });
    }
  };

  SocketSupport.removeAllListeners();

  SocketSupport.on('connect', function(){
          SocketSupport.emit('authenticate');
  });

  SocketSupport.on('support update', function(data){
          console.log('support update',data);
          supportUser.messages = data.messages;
  });

  SocketSupport.on('admins connect', function(admins){
     console.log('admins connect',admins);
     supportUser.supportIsOnline = Object.keys(admins).length > 0;
  });
  
  SocketSupport.on('error', function(error) {
    if (error.type === 'UnauthorizedError' || error.code === 'invalid_token') {
      return $state.go('home');
    }
  });

  $rootScope.$on('logout', function(event, user) { 
    SocketSupport.emit('logout',user);
  });
  
}
angular.module('support.controllers', [])
    .controller('SupportController', SupportController)
    .controller('SupportUserController', SupportUserController);
})();
