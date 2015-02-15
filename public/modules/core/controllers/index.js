(function() {
'use strict';

function CoreController() {
	var core = this;
}
function GmgridController() {
  	var gmgrid = this;
}
function SearchController() {
  	var search = this;
}
function WrenchController() {
  	var wrench = this;
}
function SegretController(){
	var segret = this;
}
function CameraController($location, $http, $state){
	var camera = this;
	camera.screenShot = function(){
		var url = $location.absUrl();
		$http.post('/auth/screenshot',{url:url})
		.then(function(response) {
                		$state.go('screenshot',{id:response.data.id});
            	})
            	.catch(function(response) {
                		console.log('error');
		});
		console.log(url);
	};
}
function ScreenshotController($stateParams){
	var screenshot = this;
	screenshot.id = $stateParams.id;
	console.log(screenshot.id);
}
angular.module('core.controllers', [])
    .controller('CoreController', CoreController)
     .controller('GmgridController',GmgridController)
     .controller('SearchController',SearchController)
     .controller('WrenchController',WrenchController)
     .controller('SegretController',SegretController)
     .controller('CameraController',CameraController)
      .controller('ScreenshotController',ScreenshotController);
})();
