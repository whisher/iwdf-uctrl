(function() {
'use strict';

function CoreController() {
	var core = this;
}
function ExploreController() {
  	var explore = this;
}
function WrenchController() {
    var wrench = this;
}
function TutorialController() {
  	var tutorial = this;
}
function SupportController() {
    var support = this;
}
function StoreController() {
    var store = this;
}
function DevelopersController() {
    var developers = this;
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
    .controller('ExploreController',ExploreController)
    .controller('WrenchController',WrenchController)
    .controller('TutorialController',TutorialController)
    .controller('SupportController',SupportController)
    .controller('StoreController',StoreController)
    .controller('DevelopersController',DevelopersController)
    .controller('SegretController',SegretController)
    .controller('CameraController',CameraController)
    .controller('ScreenshotController',ScreenshotController);
})();
