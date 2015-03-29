(function() {
  'use strict';

function Messages($http) {
  return {
    getOnHold: function() {
        return $http.get('/api/support/onhold'); 
    },
    getByUser: function() {
        return $http.get('/api/support/user'); 
    },
    update: function(id, data) {
      return $http.put('/api/support/' + id, data);
    }
  };
}

angular.module('support.services', [])
    .factory('Messages', Messages);
})();