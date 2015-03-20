(function() {
  'use strict';

var DEBUG = true;
var VERSION = '0.0.1';

angular.module('core.services', [])
    .constant('DEBUG', DEBUG)
    .constant('VERSION', VERSION);
})();