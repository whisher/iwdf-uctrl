(function() {
'use strict';

function CoreController() {
  var core = this;
  console.log(this);
  core.welcome = 'Welcome to Chat Expresso.';
}
function GmgridController() {
  var gmgrid = this;
  console.log(gmgrid);
  
}

angular.module('core.controllers', [])
    .controller('CoreController', CoreController)
     .controller('GmgridController',GmgridController);
})();
