(function() {
'use strict';

function config($stateProvider) {
    $stateProvider      
        .state('world', {
            url: '/world',
            templateUrl: 'world/templates/index.html',
            controller:'WorldController as word',
            data: {
                currentTabIcon: false
            } 
        });
}

angular.module('world.routes', [])
    .config(config);
})();
