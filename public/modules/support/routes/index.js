(function() {
'use strict';

function config($stateProvider) {
    $stateProvider      
        .state('auth.support', {
            url: '/support',
            templateUrl: 'support/templates/index.html',
            controller:'SupportController',
            controllerAs: 'support',
            resolve: {
               messages: function(Messages){
                    return Messages.getOnHold();
                }
            },
            data: {
                currentTabIcon: 'support'
            } 
        })
         .state('auth.support_user', {
            url: '/support/user/:userId',
            templateUrl: 'support/templates/user.html',
            controller:'SupportUserController',
            controllerAs: 'supportUser',
            resolve: {
               messages: function(Messages, $stateParams){
                    return Messages.getByUserId($stateParams.userId);
                }
            },
            data: {
                currentTabIcon: 'support'
            } 
        });
}

angular.module('support.routes', [ 'auth.routes'])
    .config(config);
})();
