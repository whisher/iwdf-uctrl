(function() {
'use strict';

function config($stateProvider) {
    $stateProvider      
        .state('developers', {
            url: '/developers',
            templateUrl: 'developers/templates/index.html',
            controller:'DevelopersController as developers',
            data: {
                currentTabIcon: 'developers'
            } 
        });
}

angular.module('developers.routes', [])
    .config(config);
})();
