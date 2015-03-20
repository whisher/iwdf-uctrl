(function() {
'use strict';

function config($stateProvider) {
    $stateProvider      
        .state('store', {
            url: '/store',
            templateUrl: 'store/templates/index.html',
            controller:'StoreController as store',
            data: {
                currentTabIcon: 'store'
            } 
        });
}

angular.module('store.routes', [])
    .config(config);
})();
