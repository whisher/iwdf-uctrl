(function() {
'use strict';

function config($stateProvider) {
    $stateProvider      
        .state('wrench', {
            url: '/wrench',
            templateUrl: 'wrench/templates/index.html',
            controller:'WrenchController as wrench',
            data: {
                currentTabIcon: 'wrench'
            } 
        });
}

angular.module('wrench.routes', [])
    .config(config);
})();
