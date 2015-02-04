(function() {
'use strict';

function CoreController() {
  var core = this;
  core.welcome = 'Welcome to Chat Expresso.';
}

angular.module('core.controllers', [])
    .controller('CoreController', CoreController);
})();
