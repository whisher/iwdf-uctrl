(function() {
'use strict';

function config($stateProvider) {
    $stateProvider      
        .state('screenshot', {
            url: '/screenshot/:id',
            templateUrl: 'core/templates/screenshot.html',
            controller:'ScreenshotController as screenshot',
            data: {
                currentTabIcon: 'screenshot'
            } 
        });
}

angular.module('screenshot.routes', [])
    .config(config);
})();
