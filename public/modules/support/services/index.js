(function() {
  'use strict';

function Messages($http) {
  return {
    getOnHold: function() {
        return $http.get('/api/support/message/onhold'); 
    },
    getByUserId: function(userId) {
        return $http.get('/api/support/user/'+userId); 
    },
    update: function(id, data) {
      return $http.put('/api/support/' + id, data);
    }
  };
}

angular.module('support.services', [])
    .factory('Messages', Messages);
})();