(function() {
  'use strict';

function supportDate($filter) {
  var angularDateFilter = $filter('date');
    return function(input) {
      return angularDateFilter(input, 'short');
    };
}
angular.module('support.filters', [])
    .filter('supportDate', supportDate);
})();
