(function() {
  'use strict';

// If false signin / register in view otherwise in modal
var HAS_MODAL_LOGIN = true;

function Auth($http) {
  return {
    isLoggedIn: function() {
        return $http.get('/auth/isloggedin');
    },
    hasValidToken: function() {
        return $http.get('/auth/hasvalidtoken');
    },
    signin: function(data) {
        return $http.post('/auth/signin', data);
    },
    register: function(data) {
        return $http.post('/auth/register', data);
    },
    logout: function() {
        return $http.get('/auth/logout');
    }
  };
}

function UserTokenStorage($localStorage) {
  return {
    set: function(token) {
        $localStorage.token = token;
    },
    get: function() {
        return $localStorage.token; 
    },
    del: function() {
        $localStorage.$reset();
    }
  };
}

function signinModal($rootScope, $modal, $templateCache, $state, $timeout) {
    function successCallback (data) {
        $rootScope.$emit('auth-is-authenticated', data.token);
    }
    function errorCallback (data) {
        $state.go('home');
    }
    return {
        open : function(){
            var modalInstance =  $modal.open({
                template: $templateCache.get('auth/templates/modal.html'),
                controller: 'SigninModalController',
                controllerAs: 'auth',
                size:'lg'
            });
            return modalInstance.result.then(successCallback).catch(errorCallback);
        }
    };
}
 
function HttpInterceptor($rootScope, $q, UserTokenStorage) {
    return {
        'request': function(config) {
            var token = UserTokenStorage.get();
            config.requestTimestamp = new Date().getTime();
            config.headers = config.headers || {};
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        },
        'response': function(response) {
            response.config.responseTimestamp = new Date().getTime();
            return response;
        },
        'responseError': function(rejection) {
            if (rejection.status === 401) {
                $rootScope.$emit('auth-unauthorized', rejection);
            }
            if (rejection.status === 403) {
                $rootScope.$emit('auth-forbidden', rejection);
            }
            return $q.reject(rejection);
        }
    };
}

angular.module('auth.services', [])
    .constant('HAS_MODAL_LOGIN', HAS_MODAL_LOGIN)
    .factory('Auth', Auth)
    .factory('UserTokenStorage', UserTokenStorage)
    .factory('HttpInterceptor', HttpInterceptor)
    .factory('signinModal', signinModal);
})();