(function() {
'use strict';

function config($stateProvider) {
    $stateProvider      
        .state('support', {
            url: '/support',
            templateUrl: 'support/templates/index.html',
            controller:'SupportController as support',
            data: {
                currentTabIcon: 'support'
            } 
        });
}

angular.module('support.routes', [])
    .config(config);
})();
