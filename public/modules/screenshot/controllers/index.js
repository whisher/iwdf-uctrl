(function() {
'use strict';

function ScreenshotController($stateParams){
	var screenshot = this;
	screenshot.id = $stateParams.id;
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
                		console.log(response);	
		});
	};
}


angular.module('screenshot.controllers', [])
	.controller('ScreenshotController',ScreenshotController)
    	.controller('CameraController',CameraController);
})();
