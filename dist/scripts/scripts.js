angular.module("templates",[]).run(["$templateCache",function($templateCache){$templateCache.put("auth/templates/modal.html",'<form name="form" class="col-md-8 col-md-offset-2 form-auth" novalidate=""><button type="button" class="btn btn-default pick-right" data-ng-click="auth.cancel()"><span class="fa fa-times"></span></button><div data-ng-if="global.current.signin"><div class="modal-header"><h3 class="text-left"><span class="fa fa-sign-in"></span> Sign In</h3></div><div class="modal-body"><div class="form-group"><input tabindex="1" type="email" name="email" placeholder="Email" class="form-control" required="required" data-ng-model="auth.data.email" data-user-feedback=""></div><div class="form-group"><input tabindex="2" type="password" name="password" placeholder="Password" class="form-control" required="required" data-ng-minlength="5" data-ng-maxlength="15" data-ng-model="auth.data.password" data-user-feedback=""></div></div><div class="modal-footer"><div class="form-group form-no-required clearfix"><div class="pull-right"><button tabindex="3" type="button" class="btn btn-default" data-ng-click="global.show(\'register\')">Register</button> <button tabindex="4" type="submit" class="btn btn-primary" data-ng-click="auth.signin()">Sign In</button></div></div><div class="text-center" show-errors="" errors="global.errors"></div></div></div><div data-ng-if="global.current.register"><div class="modal-header"><h3 class="text-left"><span class="fa fa-user"></span> Register</h3></div><div class="modal-body"><div class="form-group"><input type="text" tabindex="1" name="username" placeholder="Username" class="form-control" required="required" data-ng-minlength="3" data-ng-maxlength="10" data-ng-model="auth.data.username" data-user-feedback=""></div><div class="form-group"><input type="email" tabindex="2" name="email" placeholder="Email" class="form-control" required="required" data-ng-model="auth.data.email" data-user-feedback=""></div><div class="form-group"><input type="password" tabindex="3" name="password" placeholder="Password" class="form-control" required="required" data-ng-minlength="8" data-ng-maxlength="20" data-ng-model="auth.data.password" data-user-feedback=""></div><div class="form-group"><input type="password" tabindex="4" name="password_confirmation" placeholder="Retype password" class="form-control" required="required" data-ng-minlength="8" data-ng-maxlength="20" password-equals="auth.data.password" data-ng-model="auth.data.password_confirmation" data-user-feedback=""></div></div><div class="modal-footer"><div class="form-group form-no-required clearfix"><div class="pull-right"><button type="button" class="btn btn-default" data-ng-click="global.show(\'signin\')">Sign In</button> <button tabindex="4" type="submit" class="btn btn-primary" data-ng-click="auth.register()">Register</button></div></div><div class="text-center" show-errors="" errors="global.errors"></div></div></div></form>'),$templateCache.put("core/templates/404.html",'<div class="container"><h2 class="page-error-status">404 <small>error</small></h2><h3 class="page-error-msg">Page Not Found</h3></div>'),$templateCache.put("core/templates/index.html",'<div class="page"><div class="container"><div class="jumbotron"><h1><span class="fa fa-home"></span>Welcome</h1><h2>Test Test Test</h2><h3 show-version=""></h3><p data-ng-if="!global.isAuthenticated"><a href="" class="btn btn-lg btn-success" data-ui-sref="session.signin"><i class="fa fa-sign-in"></i> Sign In</a> <a href="" class="btn btn-lg btn-primary" data-ui-sref="session.register"><i class="fa fa-user"></i> Register</a></p><p data-ng-if="global.isAuthenticated"><i class="fa fa-user"></i> <span ng-bind="global.isAuthenticated.username"></span></p><div><p>Currency: {{ 1000 | currency }}</p><p>Date: {{1288323623006 | date:\'medium\'}}</p><p>Translate: {{ \'HEADLINE\' | translate }}</p><p>Locale: {{global.locale.id}}</p><p>Current lang: {{global.currentTranslate}}</p><p><button class="btn btn-info btn-xs" data-ng-click="global.changeLanguage(\'it\')">it</button> <button class="btn btn-info btn-xs" data-ng-click="global.changeLanguage(\'en\')">en</button></p></div></div></div></div>'),$templateCache.put("core/templates/show-errors.html",'<div class="form-group form-no-required" data-ng-if="errors"><p class="alert alert-danger repeat-animation-errors" data-ng-repeat="error in errors" data-ng-bind="error.msg"></p></div>'),$templateCache.put("core/templates/slider-info.html",'<div><h2>Hello Pageslide</h2><p>Put here whatever you want</p><button id="slider-close" class="btn btn-lg btn-success">Close</button></div>'),$templateCache.put("developers/templates/index.html",'<div class="page"><div class="container"><div class="jumbotron"><h1>Developers</h1><h2>Test Test Test developers</h2><h>Marketing stuff!<p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet.</p><p><a class="btn btn-lg btn-success" href="#" role="button">Get started today</a></p></h></div></div></div>'),$templateCache.put("screenshot/templates/index.html",'<div class="page"><div class="container"><div class="jumbotron"><h1>Wrench</h1><h2>Test Test Test</h2><h>Marketing stuff!<p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet.</p><p><a class="btn btn-lg btn-success" href="#" role="button">Get started today</a></p></h></div></div></div>'),$templateCache.put("store/templates/index.html",'<div class="page"><div class="container"><div class="jumbotron"><h1>Store</h1><h2>Test Test Test store</h2><h>Marketing stuff!<p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet.</p><p><a class="btn btn-lg btn-success" href="#" role="button">Get started today</a></p></h></div></div></div>'),$templateCache.put("support/templates/index.html",'<div class="page"><div class="container"><div class="jumbotron"><h1>Support</h1><h2>Test Test Test support</h2><h>Marketing stuff!<p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet.</p><p><a class="btn btn-lg btn-success" href="#" role="button">Get started today</a></p></h></div></div></div>'),$templateCache.put("tutorial/templates/index.html",'<div class="page"><div class="container"><div class="jumbotron"><h1>Tutorial</h1><h2>Test Test Test tutorial</h2><h>Marketing stuff!<p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet.</p><p><a class="btn btn-lg btn-success" href="#" role="button">Get started today</a></p></h></div></div></div>'),$templateCache.put("users/templates/index.html",""),$templateCache.put("users/templates/register.html",'<form name="form" class="col-md-4 col-md-offset-4 form-user" data-ng-submit="user.save()" novalidate=""><h3><span class="fa fa-sign-in"></span> Register</h3><div class="form-group"><input type="text" tabindex="1" name="username" placeholder="Username" class="form-control" required="required" data-ng-minlength="3" data-ng-maxlength="10" data-ng-model="user.data.username" data-user-feedback=""></div><div class="form-group"><input type="email" tabindex="2" name="email" placeholder="Email" class="form-control" required="required" data-ng-model="user.data.email" data-user-feedback=""></div><div class="form-group"><input type="password" tabindex="3" name="password" placeholder="Password" class="form-control" required="required" data-ng-minlength="8" data-ng-maxlength="20" data-ng-model="user.data.password" data-user-feedback=""></div><div class="form-group"><input type="password" tabindex="4" name="password_confirmation" placeholder="Retype password" class="form-control" required="required" data-ng-minlength="8" data-ng-maxlength="20" password-equals="user.data.password" data-ng-model="user.data.password_confirmation" data-user-feedback=""></div><div class="form-group form-no-required"><div class="text-right"><a data-ui-sref="session.signin">Sign in</a> <button tabindex="5" type="submit" class="btn btn-primary">Register</button></div></div><div show-errors="" errors="user.errors"></div></form>'),$templateCache.put("users/templates/session.html",'<div data-ui-view=""></div>'),$templateCache.put("users/templates/signin.html",'<form name="form" class="col-md-4 col-md-offset-4 form-user" data-ng-submit="user.save()" novalidate=""><h3><span class="fa fa-sign-in"></span> Sign In</h3><div class="form-group"><input tabindex="1" type="email" name="email" placeholder="Email" class="form-control" required="required" data-ng-model="user.data.email" data-user-feedback=""></div><div class="form-group"><input tabindex="2" type="password" name="password" placeholder="Password" class="form-control" required="required" data-ng-minlength="5" data-ng-maxlength="15" data-ng-model="user.data.password" data-user-feedback=""></div><div class="form-group form-no-required"><div class="text-right"><a data-ui-sref="session.register">Register</a> <button tabindex="3" type="submit" class="btn btn-primary">Sign In</button></div></div><div show-errors="" errors="user.errors"></div></form>'),$templateCache.put("world/templates/index.html",'<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="externals/explore/explore.html"></iframe>'),$templateCache.put("wrench/templates/index.html",'<div class="page"><div class="container"><div class="jumbotron"><h1>Wrench</h1><h2>Test Test Test</h2><h>Marketing stuff!<p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet.</p><p><a class="btn btn-lg btn-success" href="#" role="button">Get started today</a></p></h></div></div></div>')}]),function(){"use strict";function config($locationProvider,$urlRouterProvider,$logProvider,$httpProvider,DEBUG){$locationProvider.hashPrefix("!"),$urlRouterProvider.otherwise("/"),$logProvider.debugEnabled(DEBUG),$httpProvider.useApplyAsync(!0)}angular.element(document).ready(function(){angular.bootstrap(document,["app"])}),config.$inject=["$locationProvider","$urlRouterProvider","$logProvider","$httpProvider","DEBUG"],angular.module("app",["core","i18n","auth","users","world","wrench","tutorial","support","store","developers","screenshot"]).config(config)}(),function(){"use strict";function run($window,$rootScope,$state,jwtHelper,signinModal,HAS_MODAL_LOGIN,UserTokenStorage,Auth){$rootScope.global.isModalOpen=!1,$rootScope.global.errors=[],$window.onbeforeunload=function(){Auth.logout().then(function(){UserTokenStorage.del()})["catch"](function(){})},$rootScope.$on("auth-unauthorized",function(){UserTokenStorage.del(),HAS_MODAL_LOGIN&&($rootScope.global.isModalOpen=!0,signinModal.open())}),$rootScope.$on("auth-forbidden",function(){UserTokenStorage.del()}),$rootScope.$on("auth-is-authenticated",function(event,data){UserTokenStorage.set(data),$rootScope.global.isAuthenticated=jwtHelper.decodeToken(UserTokenStorage.get())}),$rootScope.global.current={},$rootScope.global.current.signin=!0,$rootScope.global.current.register=!1,$rootScope.global.show=function(current){$rootScope.global.isModalOpen||($rootScope.global.isModalOpen=!0,signinModal.open()),angular.forEach($rootScope.global.current,function(value,key){$rootScope.global.current[key]=!1}),$rootScope.global.current[current]=!0,$rootScope.global.errors.length=0},$rootScope.global.logout=function(){Auth.logout().then(function(){UserTokenStorage.del(),delete $rootScope.global.isAuthenticated,$state.go("home",{},{reload:!0})})["catch"](function(){throw new Error("Sorry, something went so wrong")})},$rootScope.global.isOwner=function(authorId){return $rootScope.global.isAuthenticated?$rootScope.global.isAuthenticated.hasAdminRole?!0:$rootScope.global.isAuthenticated.id===authorId:!1},$rootScope.global.signin=function(){return HAS_MODAL_LOGIN?void $rootScope.global.show("signin"):void $state.go("session.signin")},$rootScope.global.register=function(){return HAS_MODAL_LOGIN?void $rootScope.global.show("register"):void $state.go("session.register")}}run.$inject=["$window","$rootScope","$state","jwtHelper","signinModal","HAS_MODAL_LOGIN","UserTokenStorage","Auth"],angular.module("auth",["ui.bootstrap","ngStorage","angular-jwt","auth.services","auth.controllers","auth.routes"]).run(run)}(),function(){"use strict";function run($rootScope){$rootScope.global={},$rootScope.$on("$stateChangeSuccess",function(event,toState){$rootScope.global.currentTabIcon=toState.data.currentTabIcon})}run.$inject=["$rootScope"],angular.module("core",["ui.router","templates","ngAnimate","core.services","core.filters","core.directives","core.controllers","core.routes"]).run(run)}(),function(){"use strict";angular.module("developers",["ui.router","templates","developers.controllers","developers.routes"])}(),function(){"use strict";function config(tmhDynamicLocaleProvider,$translateProvider,LANG){tmhDynamicLocaleProvider.localeLocationPattern("scripts/i18n/angular-locale_{{locale}}.js"),$translateProvider.translations("en",{HEADLINE:"Hello there, This is my awesome app!"}).translations("it",{HEADLINE:"Ciao, questa è la mia cool app!"}),$translateProvider.preferredLanguage(LANG)}function run($rootScope,$locale,tmhDynamicLocale,$translate,LANG){$rootScope.global.changeLanguage=function(langKey){tmhDynamicLocale.set(langKey),$translate.use(langKey),$rootScope.global.currentTranslate=$translate.use()},tmhDynamicLocale.set(LANG),$rootScope.global.locale=$locale,$rootScope.global.currentTranslate=$translate.use()}config.$inject=["tmhDynamicLocaleProvider","$translateProvider","LANG"],run.$inject=["$rootScope","$locale","tmhDynamicLocale","$translate","LANG"],angular.module("i18n",["tmh.dynamicLocale","pascalprecht.translate","i18n.services"]).config(config).run(run)}(),function(){"use strict";angular.module("screenshot",["ui.router","templates","screenshot.controllers","screenshot.routes"])}(),function(){"use strict";angular.module("store",["ui.router","templates","store.controllers","store.routes"])}(),function(){"use strict";angular.module("support",["ui.router","templates","support.controllers","support.routes"])}(),function(){"use strict";angular.module("tutorial",["ui.router","templates","tutorial.controllers","tutorial.routes"])}(),function(){"use strict";angular.module("users",["ui.router","templates","users.services","users.directives","users.controllers","users.routes"])}(),function(){"use strict";angular.module("world",["ui.router","templates","world.controllers","world.routes"])}(),function(){"use strict";angular.module("wrench",["ui.router","templates","wrench.controllers","wrench.routes"])}(),function(){"use strict";function SigninModalController($rootScope,$modalInstance,Auth){var auth=this;auth.data={},auth.signin=function(){Auth.signin(auth.data).then(function(response){$rootScope.global.isModalOpen=!1,$modalInstance.close(response.data)})["catch"](function(response){alert(response.data),$rootScope.global.errors=response.data})},auth.register=function(){Auth.register(auth.data).then(function(response){$rootScope.global.isModalOpen=!1,$modalInstance.close(response.data)})["catch"](function(response){$rootScope.global.errors=response.data})},auth.forgot=function(){Auth.forgot(auth.data).then(function(response){$modalInstance.close(response.data)})["catch"](function(response){$rootScope.global.errors=response.data})},auth.cancel=function(){$rootScope.global.isModalOpen=!1,$modalInstance.dismiss("cancel")}}SigninModalController.$inject=["$rootScope","$modalInstance","Auth"],angular.module("auth.controllers",[]).controller("SigninModalController",SigninModalController)}(),function(){"use strict";function config($stateProvider,$httpProvider){$stateProvider.state("auth",{"abstract":!0,template:"<ui-view/>",resolve:{auth:["Auth",function(Auth){return Auth.isLoggedIn()}]}}),$httpProvider.interceptors.push("HttpInterceptor")}config.$inject=["$stateProvider","$httpProvider"],angular.module("auth.routes",[]).config(config)}(),function(){"use strict";function Auth($http){return{isLoggedIn:function(){return $http.get("/auth/isloggedin")},hasValidToken:function(){return $http.get("/auth/hasvalidtoken")},signin:function(data){return $http.post("/auth/signin",data)},register:function(data){return $http.post("/auth/register",data)},logout:function(){return $http.get("/auth/logout")}}}function UserTokenStorage($sessionStorage){return{set:function(token){$sessionStorage.token=token},get:function(){return $sessionStorage.token},del:function(){$sessionStorage.$reset()}}}function signinModal($rootScope,$modal,$templateCache){function successCallback(data){$rootScope.$emit("auth-is-authenticated",data.token)}function errorCallback(){}return{open:function(){var modalInstance=$modal.open({template:$templateCache.get("auth/templates/modal.html"),controller:"SigninModalController",controllerAs:"auth",size:"lg"});return modalInstance.result.then(successCallback)["catch"](errorCallback)}}}function HttpInterceptor($rootScope,$q,UserTokenStorage){return{request:function(config){var token=UserTokenStorage.get();return config.requestTimestamp=(new Date).getTime(),config.headers=config.headers||{},token&&(config.headers.Authorization="Bearer "+token),config},response:function(response){return response.config.responseTimestamp=(new Date).getTime(),response},responseError:function(rejection){return 401===rejection.status&&$rootScope.$emit("auth-unauthorized",rejection),403===rejection.status&&$rootScope.$emit("auth-forbidden",rejection),503===rejection.status&&$rootScope.$emit("auth-unauthorized",rejection),$q.reject(rejection)}}}var HAS_MODAL_LOGIN=!0;Auth.$inject=["$http"],UserTokenStorage.$inject=["$sessionStorage"],signinModal.$inject=["$rootScope","$modal","$templateCache"],HttpInterceptor.$inject=["$rootScope","$q","UserTokenStorage"],angular.module("auth.services",[]).constant("HAS_MODAL_LOGIN",HAS_MODAL_LOGIN).factory("Auth",Auth).factory("UserTokenStorage",UserTokenStorage).factory("HttpInterceptor",HttpInterceptor).factory("signinModal",signinModal)}(),function(){"use strict";function CoreController(){}angular.module("core.controllers",[]).controller("CoreController",CoreController)}(),function(){"use strict";function showVersion(VERSION){return{restrict:"A",link:function(scope,element){element.text("Version: "+VERSION)}}}function userFeedback(){return{require:"ngModel",restrict:"A",link:function(scope,element,attrs,ctrl){var $parentDiv=element.parent();element.on("blur",function(){var currentClass=$parentDiv.attr("class"),currentsClass=currentClass.split(" "),len=currentsClass.length;if(len>1)for(var i=0;len>i;i++)$parentDiv.removeClass(currentsClass[i]);$parentDiv.addClass(currentsClass[0]),$parentDiv.addClass(ctrl.$valid?"has-success":"has-error")})}}}function showErrors($templateCache){return{restrict:"AE",scope:{errors:"="},template:$templateCache.get("core/templates/show-errors.html"),link:function(){}}}function pageSlider($rootScope,$templateCache){var param={};return{restrict:"A",scope:{},link:function(scope,element,attrs){if(attrs.classname){param.className=attrs.classname;var slider=angular.element('<div class="info-slider"></div>');slider.append($templateCache.get("core/templates/slider-info.html"));var container=angular.element("body").find("#container").append(slider);element.on("click",function(e){e.preventDefault(),slider.toggleClass("info-slider-show")});var closeHandler=document.getElementById("slider-close");closeHandler&&closeHandler.addEventListener("click",function(e){e.preventDefault(),slider.removeClass("info-slider-show")}),scope.$on("$destroy",function(){element.off("click"),container.find(slider).remove()}),$rootScope.$on("$locationChangeStart",function(){slider.removeClass("info-slider-show")}),$rootScope.$on("$stateChangeStart",function(){slider.removeClass("info-slider-show")})}}}}function sliderBar(){return{restrict:"A",scope:{bartype:"@"},link:function(scope,element){var container=angular.element(document.getElementById("container")),barRightOuter=angular.element(document.getElementById("bar-right-outer")),barLeftOuter=angular.element(document.getElementById("bar-left-outer"));element.on("mouseenter",function(){{var infoSliderShow=angular.element(document.getElementsByClassName("info-slider-show"));container.hasClass("stop-slider-bar")}infoSliderShow.length||(barRightOuter.addClass("right-slider"),barLeftOuter.addClass("left-slider"))}),element.on("mouseleave",function(){var infoSliderShow=angular.element(document.getElementsByClassName("info-slider-show")),hasClass=container.hasClass("stop-slider-bar");infoSliderShow.length||hasClass||(barRightOuter.removeClass("right-slider"),barLeftOuter.removeClass("left-slider"))}),scope.$on("$destroy",function(){element.off("mouseenter"),element.off("mouseleave")})}}}function fixedBar(){return{restrict:"AE",link:function(scope,element){var toggled=!1,container=angular.element(document.getElementById("container")),span=element.find("span");element.on("click",function(e){e.preventDefault(),container.toggleClass("stop-slider-bar"),toggled?(span.removeClass("icon-bar_fixed"),span.addClass("icon-bar"),toggled=!1):(span.removeClass("icon-bar"),span.addClass("icon-bar_fixed"),toggled=!0)}),scope.$on("$destroy",function(){element.off("click")})}}}showVersion.$inject=["VERSION"],showErrors.$inject=["$templateCache"],pageSlider.$inject=["$rootScope","$templateCache"],angular.module("core.directives",[]).directive("showVersion",showVersion).directive("userFeedback",userFeedback).directive("showErrors",showErrors).directive("pageSlider",pageSlider).directive("sliderBar",sliderBar).directive("fixedBar",fixedBar)}(),function(){"use strict";function ucfirst(){return function(input){return input?input.charAt(0).toUpperCase()+input.slice(1):input}}angular.module("core.filters",[]).filter("ucfirst",ucfirst)}(),function(){"use strict";function config($stateProvider){$stateProvider.state("home",{url:"/",templateUrl:"core/templates/index.html",controller:"CoreController as core",data:{currentTabIcon:"store"}}).state("404",{url:"/404",templateUrl:"core/templates/404.html"})}config.$inject=["$stateProvider"],angular.module("core.routes",[]).config(config)}(),function(){"use strict";var DEBUG=!0,VERSION="0.0.1";angular.module("core.services",[]).constant("DEBUG",DEBUG).constant("VERSION",VERSION)}(),function(){"use strict";function DevelopersController(){}angular.module("developers.controllers",[]).controller("DevelopersController",DevelopersController)}(),function(){"use strict";function config($stateProvider){$stateProvider.state("developers",{url:"/developers",templateUrl:"developers/templates/index.html",controller:"DevelopersController as developers",data:{currentTabIcon:"developers"}})}config.$inject=["$stateProvider"],angular.module("developers.routes",[]).config(config)}(),function(){"use strict";var LANG="it";angular.module("i18n.services",[]).constant("LANG",LANG)}(),function(){"use strict";function ScreenshotController($stateParams){var screenshot=this;screenshot.id=$stateParams.id}function CameraController($location,$http,$state){var camera=this;camera.screenShot=function(){var url=$location.absUrl();$http.post("/auth/screenshot",{url:url}).then(function(response){$state.go("screenshot",{id:response.data.id})})["catch"](function(response){console.log(response)})}}ScreenshotController.$inject=["$stateParams"],CameraController.$inject=["$location","$http","$state"],angular.module("screenshot.controllers",[]).controller("ScreenshotController",ScreenshotController).controller("CameraController",CameraController)}(),function(){"use strict";function config($stateProvider){$stateProvider.state("screenshot",{url:"/screenshot/:id",templateUrl:"core/templates/screenshot.html",controller:"ScreenshotController as screenshot",data:{currentTabIcon:"screenshot"}})}config.$inject=["$stateProvider"],angular.module("screenshot.routes",[]).config(config)}(),function(){"use strict";function StoreController(){}angular.module("store.controllers",[]).controller("StoreController",StoreController)}(),function(){"use strict";function config($stateProvider){$stateProvider.state("store",{url:"/store",templateUrl:"store/templates/index.html",controller:"StoreController as store",data:{currentTabIcon:"store"}})}config.$inject=["$stateProvider"],angular.module("store.routes",[]).config(config)}(),function(){"use strict";function SupportController(){}angular.module("support.controllers",[]).controller("SupportController",SupportController)}(),function(){"use strict";function config($stateProvider){$stateProvider.state("support",{url:"/support",templateUrl:"support/templates/index.html",controller:"SupportController as support",data:{currentTabIcon:"support"}})}config.$inject=["$stateProvider"],angular.module("support.routes",[]).config(config)}(),function(){"use strict";function TutorialController(){}angular.module("tutorial.controllers",[]).controller("TutorialController",TutorialController)}(),function(){"use strict";function config($stateProvider){$stateProvider.state("tutorial",{url:"/tutorial",templateUrl:"tutorial/templates/index.html",controller:"TutorialController as tutorial",data:{currentTabIcon:"tutorial"}})}config.$inject=["$stateProvider"],angular.module("tutorial.routes",[]).config(config)}(),function(){"use strict";function UserController(){}function UserSigninController($rootScope,$state,Users){var user=this;user.data={},user.save=function(){Users.signin(user.data).then(function(response){$rootScope.$emit("auth-is-authenticated",response.data.token),$state.go("chat")})["catch"](function(response){user.errors=response.data})}}function UserRegisterController($rootScope,$state,Users){var user=this;user.data={},user.errors=[],user.save=function(){Users.register(user.data).then(function(response){$rootScope.$emit("auth-is-authenticated",response.data.token),$state.go("chat")})["catch"](function(response){user.errors=response.data})}}UserSigninController.$inject=["$rootScope","$state","Users"],UserRegisterController.$inject=["$rootScope","$state","Users"],angular.module("users.controllers",[]).controller("UserController",UserController).controller("UserSigninController",UserSigninController).controller("UserRegisterController",UserRegisterController)}(),function(){"use strict";function passwordEquals(){return{require:"ngModel",link:function(scope,element,attrs,ngModel){scope.$watch(attrs.passwordEquals,function(){ngModel.$validate()}),ngModel.$validators.isEquals=function(value){var password=scope.$eval(attrs.passwordEquals);return password&&value?value===password:!1}}}}angular.module("users.directives",[]).directive("passwordEquals",passwordEquals)}(),function(){"use strict";function config($stateProvider){$stateProvider.state("session",{"abstract":!0,templateUrl:"users/templates/session.html",resolve:{isjustlogged:["Users",function(Users){return Users.isjustlogged()}]}}).state("session.signin",{url:"/user/signin",templateUrl:"users/templates/signin.html",controllerAs:"user",controller:"UserSigninController"}).state("session.register",{url:"/user/register",templateUrl:"users/templates/register.html",controllerAs:"user",controller:"UserRegisterController"})}config.$inject=["$stateProvider","$httpProvider"],angular.module("users.routes",[]).config(config)}(),function(){"use strict";function Users($http){return{isjustlogged:function(){return $http.get("/auth/isjustlogged")},signin:function(data){return $http.post("/auth/signin",data)},register:function(data){return $http.post("/auth/register",data)},logout:function(){return $http.get("/auth/logout")}}}Users.$inject=["$http"],angular.module("users.services",[]).factory("Users",Users)}(),function(){"use strict";function WorldController(){}angular.module("world.controllers",[]).controller("WorldController",WorldController)}(),function(){"use strict";function config($stateProvider){$stateProvider.state("world",{url:"/world",templateUrl:"world/templates/index.html",controller:"WorldController as word",data:{currentTabIcon:!1}})}config.$inject=["$stateProvider"],angular.module("world.routes",[]).config(config)}(),function(){"use strict";function WrenchController(){}angular.module("wrench.controllers",[]).controller("WrenchController",WrenchController)}(),function(){"use strict";function config($stateProvider){$stateProvider.state("wrench",{url:"/wrench",templateUrl:"wrench/templates/index.html",controller:"WrenchController as wrench",data:{currentTabIcon:"wrench"}})}config.$inject=["$stateProvider"],angular.module("wrench.routes",[]).config(config)}();
//# sourceMappingURL=scripts.js.map