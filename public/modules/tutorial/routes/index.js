(function() {
'use strict';

function config($stateProvider) {
    $stateProvider      
        .state('tutorial', {
            url: '/tutorial',
            templateUrl: 'tutorial/templates/index.html',
            controller:'TutorialController as tutorial',
            data: {
                currentTabIcon: 'tutorial'
            } 
        });
}

angular.module('tutorial.routes', [])
    .config(config);
})();
