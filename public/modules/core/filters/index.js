(function() {
  'use strict';

function ucfirst() {
    return function (input) {
        if (input) {
            return input.charAt(0).toUpperCase() + input.slice(1);
        }
        return input;
    };
}
angular.module('core.filters', [])
  .filter('ucfirst', ucfirst);
})();
