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
         .state('auth.support user', {
            url: '/support/user',
            templateUrl: 'support/templates/user.html',
            controller:'SupportUserController',
            controllerAs: 'supportUser',
            resolve: {
               messages: function(Messages){
                    return Messages.getByUser();
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
