angular.module("templates",[]).run(["$templateCache",function(e){e.put("auth/templates/modal.html",'<form name="form" class="col-md-8 col-md-offset-2 form-auth" novalidate=""><button type="button" class="btn btn-default pick-right" data-ng-click="auth.cancel()"><span class="fa fa-times"></span></button><div data-ng-if="global.current.signin"><div class="modal-header"><h3 class="text-left"><span class="fa fa-sign-in"></span> Sign In</h3></div><div class="modal-body"><div class="form-group"><input tabindex="1" type="email" name="email" placeholder="Email" class="form-control" required="required" data-ng-model="auth.data.email" data-user-feedback=""></div><div class="form-group"><input tabindex="2" type="password" name="password" placeholder="Password" class="form-control" required="required" data-ng-minlength="5" data-ng-maxlength="15" data-ng-model="auth.data.password" data-user-feedback=""></div></div><div class="modal-footer"><div class="form-group form-no-required clearfix"><div class="pull-right"><button tabindex="3" type="button" class="btn btn-default" data-ng-click="global.show(\'register\')">Register</button> <button tabindex="4" type="submit" class="btn btn-primary" data-ng-click="auth.signin()">Sign In</button></div></div><div class="text-center" show-errors="" errors="global.errors"></div></div></div><div data-ng-if="global.current.register"><div class="modal-header"><h3 class="text-left"><span class="fa fa-user"></span> Register</h3></div><div class="modal-body"><div class="form-group"><input type="text" tabindex="1" name="username" placeholder="Username" class="form-control" required="required" data-ng-minlength="3" data-ng-maxlength="10" data-ng-model="auth.data.username" data-user-feedback=""></div><div class="form-group"><input type="email" tabindex="2" name="email" placeholder="Email" class="form-control" required="required" data-ng-model="auth.data.email" data-user-feedback=""></div><div class="form-group"><input type="password" tabindex="3" name="password" placeholder="Password" class="form-control" required="required" data-ng-minlength="8" data-ng-maxlength="20" data-ng-model="auth.data.password" data-user-feedback=""></div><div class="form-group"><input type="password" tabindex="4" name="password_confirmation" placeholder="Retype password" class="form-control" required="required" data-ng-minlength="8" data-ng-maxlength="20" password-equals="auth.data.password" data-ng-model="auth.data.password_confirmation" data-user-feedback=""></div></div><div class="modal-footer"><div class="form-group form-no-required clearfix"><div class="pull-right"><button type="button" class="btn btn-default" data-ng-click="global.show(\'signin\')">Sign In</button> <button tabindex="4" type="submit" class="btn btn-primary" data-ng-click="auth.register()">Register</button></div></div><div class="text-center" show-errors="" errors="global.errors"></div></div></div></form>'),e.put("chat/templates/index.html",'<div class="container"><toaster-container toaster-options="{\'position-class\': \'toast-top-full-width\'}"></toaster-container><div class="row"><div class="col-xs-12 col-md-6"><ul class="rooms"><li data-ng-repeat="room in chat.rooms"><button class="btn btn-default" type="submit" data-ng-class="{active: chat.room===room}" data-ng-click="chat.switchRoom(room)">{{room}}</button></li></ul></div><div class="col-md-6 hide-mobile"><ul class="chat-status"><li><span class="fa fa-plug"></span> Room: <b class="text-info">{{chat.room}}</b></li><li><button class="btn btn-primary" type="button">Users <span class="badge">{{chat.usersNum}}</span></button></li><li><button class="btn btn-primary" type="button">Messages <span class="badge">{{chat.msgNum}}</span></button></li></ul></div></div><div class="row"><div class="col-md-12"><hr></div></div><div class="row"><div class="col-md-3 hide-mobile"><h3 class="text-left chat-header"><span class="fa fa-users"></span> Users</h3><ul class="list-unstyled"><li class="chat-user" data-ng-repeat="user in chat.users"><b>{{user}}</b></li></ul></div><div class="col-xs-12 col-md-9"><h3 class="text-left chat-header"><span class="fa fa-comment"></span> Chat</h3><ul class="list-unstyled"><li class="chat-message" data-ng-repeat="message in chat.messages track by $index"><b>{{message.user.username}}</b>: {{message.msg}}</li></ul></div></div></div><div class="footer navbar-fixed-bottom"><div class="container"><form name="form" class="form-chat" data-ng-submit="chat.send(form)" novalidate=""><div class="form-group-chat form-no-required"><div class="input-group"><span class="input-group-addon fa fa-pencil"></span> <input type="text" tabindex="1" name="message" placeholder="Type your message (at least two characters)" class="form-control input-lg" autocomplete="off" data-ng-minlength="2" data-ng-maxlength="255" data-ng-model="chat.data.message"></div></div></form></div></div>'),e.put("core/templates/404.html",'<div class="container"><h2 class="page-error-status">404 <small>error</small></h2><h3 class="page-error-msg">Page Not Found</h3></div>'),e.put("core/templates/gmgrid.html",'<base target="_blank"><iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="/modules/gmgrid/gmgrid.html"></iframe><br>'),e.put("core/templates/index.html",'<div class="page"><div class="container"><div class="jumbotron"><h1><span class="fa fa-home"></span>Welcome</h1><h2>Test Test Test</h2><h3 show-version=""></h3><p data-ng-if="!global.isAuthenticated"><a href="" class="btn btn-lg btn-success" data-ui-sref="session.signin"><i class="fa fa-sign-in"></i> Sign In</a> <a href="" class="btn btn-lg btn-primary" data-ui-sref="session.register"><i class="fa fa-user"></i> Register</a></p><p data-ng-if="global.isAuthenticated"><i class="fa fa-user"></i> <span ng-bind="global.isAuthenticated.username"></span></p></div></div></div>'),e.put("core/templates/screenshot.html",'<div class="page"><div class="container" style="margin-top:0;padding-top:0;"><div class="jumbotron" style="margin:0;padding:0;text-align:center;"><img src="screenshots/{{screenshot.id}}.png" alt="{{screenshot.id}}"></div></div></div>'),e.put("core/templates/search.html",'<div class="page"><div class="container"><div class="jumbotron"><h1>Search</h1><h2>Test Test Test<a href="#">Inbox <span class="badge"><i class="fa fa-user"></i></span></a></h2><p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p><p><a class="btn btn-lg btn-success" href="#" role="button">Sign up today</a></p></div></div></div>'),e.put("core/templates/show-errors.html",'<div class="form-group form-no-required" data-ng-if="errors"><p class="alert alert-danger repeat-animation-errors" data-ng-repeat="error in errors" data-ng-bind="error.msg"></p></div>'),e.put("core/templates/slider-info.html",'<div id="info"><h2>Hello Pageslide</h2><p>Put here whatever you want</p><button id="info-close" class="btn btn-lg btn-success">Close</button></div>'),e.put("core/templates/wrench.html",'<div class="page"><div class="container"><div class="jumbotron"><h1>Wrench</h1><h2>Test Test Test</h2><h>Marketing stuff!<p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet.</p><p><a class="btn btn-lg btn-success" href="#" role="button">Get started today</a></p></h></div></div></div>'),e.put("users/templates/index.html",""),e.put("users/templates/register.html",'<form name="form" class="col-md-4 col-md-offset-4 form-user" data-ng-submit="user.save()" novalidate=""><h3><span class="fa fa-sign-in"></span> Register</h3><div class="form-group"><input type="text" tabindex="1" name="username" placeholder="Username" class="form-control" required="required" data-ng-minlength="3" data-ng-maxlength="10" data-ng-model="user.data.username" data-user-feedback=""></div><div class="form-group"><input type="email" tabindex="2" name="email" placeholder="Email" class="form-control" required="required" data-ng-model="user.data.email" data-user-feedback=""></div><div class="form-group"><input type="password" tabindex="3" name="password" placeholder="Password" class="form-control" required="required" data-ng-minlength="8" data-ng-maxlength="20" data-ng-model="user.data.password" data-user-feedback=""></div><div class="form-group"><input type="password" tabindex="4" name="password_confirmation" placeholder="Retype password" class="form-control" required="required" data-ng-minlength="8" data-ng-maxlength="20" password-equals="user.data.password" data-ng-model="user.data.password_confirmation" data-user-feedback=""></div><div class="form-group form-no-required"><div class="text-right"><a data-ui-sref="session.signin">Sign in</a> <button tabindex="5" type="submit" class="btn btn-primary">Register</button></div></div><div show-errors="" errors="user.errors"></div></form>'),e.put("users/templates/session.html",'<div data-ui-view=""></div>'),e.put("users/templates/signin.html",'<form name="form" class="col-md-4 col-md-offset-4 form-user" data-ng-submit="user.save()" novalidate=""><h3><span class="fa fa-sign-in"></span> Sign In</h3><div class="form-group"><input tabindex="1" type="email" name="email" placeholder="Email" class="form-control" required="required" data-ng-model="user.data.email" data-user-feedback=""></div><div class="form-group"><input tabindex="2" type="password" name="password" placeholder="Password" class="form-control" required="required" data-ng-minlength="5" data-ng-maxlength="15" data-ng-model="user.data.password" data-user-feedback=""></div><div class="form-group form-no-required"><div class="text-right"><a data-ui-sref="session.register">Register</a> <button tabindex="3" type="submit" class="btn btn-primary">Sign In</button></div></div><div show-errors="" errors="user.errors"></div></form>')}]),function(){"use strict";function e(e,t,s,a,r){e.hashPrefix("!"),t.otherwise("/"),s.debugEnabled(r),a.useApplyAsync(!0)}function t(e){e.debug("App is running!")}angular.element(document).ready(function(){angular.bootstrap(document,["app"])}),e.$inject=["$locationProvider","$urlRouterProvider","$logProvider","$httpProvider","DEBUG"],t.$inject=["$log"],angular.module("app",["ngAnimate","anim-in-out","core","auth","users"]).config(e).run(t)}(),function(){"use strict";function e(e,t,s,a,r,o,n,i){t.global={},t.global.isModalOpen=!1,t.global.errors=[],e.onbeforeunload=function(){},t.$on("auth-unauthorized",function(){n.del(),o&&(t.global.isModalOpen=!0,r.open())}),t.$on("auth-forbidden",function(){n.del()}),t.$on("auth-is-authenticated",function(e,s){n.set(s),t.global.isAuthenticated=a.decodeToken(n.get())}),t.global.current={},t.global.current.signin=!0,t.global.current.register=!1,t.global.show=function(e){t.global.isModalOpen||(t.global.isModalOpen=!0,r.open()),angular.forEach(t.global.current,function(e,s){t.global.current[s]=!1}),t.global.current[e]=!0,t.global.errors.length=0};var l=n.get();l&&(l=a.decodeToken(l)),t.global.isAuthenticated=l,t.global.logout=function(){i.logout().then(function(){n.del(),delete t.global.isAuthenticated,s.go("home")})["catch"](function(){throw new Error("Sorry, something went so wrong")})},t.global.isOwner=function(e){return t.global.isAuthenticated?t.global.isAuthenticated.hasAdminRole?!0:t.global.isAuthenticated.id===e:!1},t.global.signin=function(){return o?void t.global.show("signin"):void s.go("session.signin")},t.global.register=function(){return o?void t.global.show("register"):void s.go("session.register")}}e.$inject=["$window","$rootScope","$state","jwtHelper","signinModal","HAS_MODAL_LOGIN","UserTokenStorage","Auth"],angular.module("auth",["ui.bootstrap","ngStorage","angular-jwt","auth.services","auth.controllers","auth.routes"]).run(e)}(),function(){"use strict";angular.module("core",["ui.router","templates","core.services","core.directives","core.controllers","core.routes"])}(),function(){"use strict";angular.module("chat",["ui.router","templates","btford.socket-io","toaster","auth.services","chat.services","chat.controllers","chat.routes"])}(),function(){"use strict";angular.module("users",["ui.router","templates","users.services","users.directives","users.controllers","users.routes"])}(),function(){"use strict";function e(e,t,s){var a=this;a.data={},a.signin=function(){s.signin(a.data).then(function(e){t.close(e.data)})["catch"](function(t){alert(t.data),e.global.errors=t.data})},a.register=function(){s.register(a.data).then(function(e){t.close(e.data)})["catch"](function(t){e.global.errors=t.data})},a.forgot=function(){s.forgot(a.data).then(function(e){t.close(e.data)})["catch"](function(t){e.global.errors=t.data})},a.cancel=function(){e.global.isModalOpen=!1,t.dismiss("cancel")}}e.$inject=["$rootScope","$modalInstance","Auth"],angular.module("auth.controllers",[]).controller("SigninModalController",e)}(),function(){"use strict";function e(e,t){e.state("auth",{"abstract":!0,template:"<ui-view/>",resolve:{auth:["Auth",function(e){return e.isLoggedIn()}]}}),t.interceptors.push("HttpInterceptor")}e.$inject=["$stateProvider","$httpProvider"],angular.module("auth.routes",[]).config(e)}(),function(){"use strict";function e(e){return{isLoggedIn:function(){return e.get("/auth/isloggedin")},hasValidToken:function(){return e.get("/auth/hasvalidtoken")},signin:function(t){return e.post("/auth/signin",t)},register:function(t){return e.post("/auth/register",t)},logout:function(){return e.get("/auth/logout")}}}function t(e){return{set:function(t){e.token=t},get:function(){return e.token},del:function(){e.$reset()}}}function s(e,t,s){function a(t){e.$emit("auth-is-authenticated",t.token)}function r(){}return{open:function(){var e=t.open({template:s.get("auth/templates/modal.html"),controller:"SigninModalController",controllerAs:"auth",size:"lg"});return e.result.then(a)["catch"](r)}}}function a(e,t,s){return{request:function(e){var t=s.get();return e.requestTimestamp=(new Date).getTime(),e.headers=e.headers||{},t&&(e.headers.Authorization="Bearer "+t),e},response:function(e){return e.config.responseTimestamp=(new Date).getTime(),e},responseError:function(s){return 401===s.status&&e.$emit("auth-unauthorized",s),403===s.status&&e.$emit("auth-forbidden",s),t.reject(s)}}}var r=!0;e.$inject=["$http"],t.$inject=["$sessionStorage"],s.$inject=["$rootScope","$modal","$templateCache"],a.$inject=["$rootScope","$q","UserTokenStorage"],angular.module("auth.services",[]).constant("HAS_MODAL_LOGIN",r).factory("Auth",e).factory("UserTokenStorage",t).factory("HttpInterceptor",a).factory("signinModal",s)}(),function(){"use strict";function e(){}function t(){}function s(){}function a(){}function r(){}function o(e,t,s){var a=this;a.screenShot=function(){var a=e.absUrl();t.post("/auth/screenshot",{url:a}).then(function(e){s.go("screenshot",{id:e.data.id})})["catch"](function(){console.log("error")}),console.log(a)}}function n(e){var t=this;t.id=e.id,console.log(t.id)}o.$inject=["$location","$http","$state"],n.$inject=["$stateParams"],angular.module("core.controllers",[]).controller("CoreController",e).controller("GmgridController",t).controller("SearchController",s).controller("WrenchController",a).controller("SegretController",r).controller("CameraController",o).controller("ScreenshotController",n)}(),function(){"use strict";function e(e){return{restrict:"A",link:function(t,s){s.text("Version: "+e)}}}function t(){return{require:"ngModel",restrict:"A",link:function(e,t,s,a){var r=t.parent();t.on("blur",function(){var e=r.attr("class"),t=e.split(" "),s=t.length;if(s>1)for(var o=0;s>o;o++)r.removeClass(t[o]);r.addClass(t[0]),r.addClass(a.$valid?"has-success":"has-error")})}}}function s(e){return{restrict:"AE",scope:{errors:"="},template:e.get("core/templates/show-errors.html"),link:function(){}}}function a(e,t){return{restrict:"EA",replace:!1,transclude:!1,scope:{psOpen:"=?"},link:function(s,a,r){function o(e,t){if(0!==e.style.width)switch(content.style.display="none",t.side){case"right":e.style.width="0px";break;case"left":e.style.width="0px";break;case"top":e.style.height="0px";break;case"bottom":e.style.height="0px"}s.psOpen=!1}function n(e,t){if(0!==e.style.width){switch(t.side){case"right":e.style.width=t.size;break;case"left":e.style.width=t.size;break;case"top":e.style.height=t.size;break;case"bottom":e.style.height=t.size}setTimeout(function(){e.style.display="block",content.style.display="block"},1e3*t.speed)}}var i=!1,l={};l.side=r.pageslide||"right",l.speed=r.psSpeed||"0.5",l.size=r.psSize||"300px",l.className=r.psClass||"ng-pageslide";var c=a;if(c.append(t.get("core/templates/slider-info.html")),content=document.getElementById(r.psTarget.substr(1)),console.log(content),!content)throw new Error("You have to elements inside the <pageslide> or you have not specified a target href");var u=document.createElement("div");switch(u.className=l.className,u.style.transitionDuration=l.speed+"s",u.style.webkitTransitionDuration=l.speed+"s",u.style.zIndex=1e3,u.style.position="fixed",u.style.display="none",u.style.transitionProperty="width, height",l.side){case"right":u.style.top=r.psCustomTop||"0px",u.style.bottom=r.psCustomBottom||"0px",u.style.right=r.psCustomRight||"0px";break;case"left":u.style.top=r.psCustomTop||"0px",u.style.bottom=r.psCustomBottom||"0px",u.style.left=r.psCustomLeft||"0px";break;case"top":u.style.left=r.psCustomLeft||"0px",u.style.top=r.psCustomTop||"0px",u.style.right=r.psCustomRight||"0px";break;case"bottom":u.style.bottom=r.psCustomBottom||"0px",u.style.left=r.psCustomLeft||"0px",u.style.right=r.psCustomRight||"0px"}document.body.appendChild(u),u.appendChild(content),s.$watch("psOpen",function(e){e?n(u,l):o(u,l)}),e.$on("$locationChangeStart",function(){o(u,l)}),e.$on("$stateChangeStart",function(){o(u,l)}),s.$on("$destroy",function(){document.body.removeChild(u)});var d=document.getElementById(r.psTarget.substr(1)+"-close");a.on("click",function(e){e.preventDefault(),i?(o(u,l),i=!1):(n(u,l),i=!0)}),d&&d.addEventListener("click",function(e){e.preventDefault(),o(u,l)})}}}function r(){return{restrict:"A",link:function(){for(var e=document.body.getElementsByTagName("*"),t=0;t<e.length;t++){var s=e[t];s.dataset.ngShow&&-1===s.dataset.ngShow.indexOf("!")&&(console.log(s.setAttribute("data-ng-show","false")),s.style.display="display",s.dataset.ngShow=!0)}}}}e.$inject=["VERSION"],s.$inject=["$templateCache"],a.$inject=["$rootScope","$templateCache"],r.$inject=["VERSION"],angular.module("core.directives",[]).directive("showVersion",e).directive("userFeedback",t).directive("showErrors",s).directive("pageslide",a).directive("my",r)}(),function(){"use strict";function e(e){e.state("home",{url:"/",templateUrl:"core/templates/index.html",controller:"CoreController as core"}).state("gmgrid",{url:"/gmgrid",templateUrl:"core/templates/gmgrid.html",controller:"GmgridController as gmgrid"}).state("search",{url:"/search",templateUrl:"core/templates/search.html",controller:"SearchController as search"}).state("wrench",{url:"/wrench",templateUrl:"core/templates/wrench.html",controller:"WrenchController as wrench"}).state("segret",{url:"/segret",templateUrl:"partials/segret",controller:"SegretController as segret"}).state("screenshot",{url:"/screenshot/:id",templateUrl:"core/templates/screenshot.html",controller:"ScreenshotController as screenshot"}).state("404",{url:"/404",templateUrl:"core/templates/404.html"})}e.$inject=["$stateProvider"],angular.module("core.routes",[]).config(e)}(),function(){"use strict";var e=!0,t="1.0.0";angular.module("core.services",[]).constant("DEBUG",e).constant("VERSION",t)}(),function(){"use strict";function e(e,t,s,a,r,o,n){var i=this;i.data={},i.users=o.getUsers(),i.usersNum=i.users.length,i.rooms=o.getRooms(),i.room=o.getRoom(),i.messages=o.getMessages(i.room),i.msgNum=i.messages.length,a.removeAllListeners(),a.on("connect",function(){a.emit("authenticate")}),a.on("error",function(e){return"UnauthorizedError"===e.type||"invalid_token"===e.code?t.go("home"):void 0}),a.on("rooms",function(e){i.rooms=e,o.setRooms(i.rooms)}),a.on("room",function(e){i.room=e,o.setRoom(i.room)}),a.on("update users",function(e){var t=[];angular.forEach(e[i.room],function(e){this.unshift(e.username)},t),i.users=t,i.usersNum=i.users.length,o.setUsers(i.users)}),a.on("toaster leave",function(e){n.pop("success","chat",e.user.username+": "+r.leave+" "+e.room)}),a.on("toaster join",function(e){n.pop("success","chat",e.user.username+": "+r.join+" "+e.room)}),a.on("chat message",function(e){i.msgNum=o.addMessage(i.room,e),i.messages=o.getMessages(i.room)}),i.send=function(){i.data.message&&a.emit("chat message",i.data.message),i.data.message=""},i.switchRoom=function(e){a.emit("switch room",e),i.room=e,o.setRoom(i.room),i.messages=o.getMessages(i.room),i.msgNum=i.messages.length}}e.$inject=["$rootScope","$state","hasvalidtoken","chatSocket","chatMsg","chatData","toaster"],angular.module("chat.controllers",[]).controller("ChatController",e)}(),function(){"use strict";function e(e){e.state("chat",{url:"/chat",templateUrl:"chat/templates/index.html",controller:"ChatController as chat",resolve:{hasvalidtoken:["Auth",function(e){return e.hasValidToken()}]}})}e.$inject=["$stateProvider"],angular.module("chat.routes",[]).config(e)}(),function(){"use strict";function e(e,t){var s=io.connect("?token="+t.get()),a=e({ioSocket:s});return a}function t(){var e={users:[],rooms:[],room:"",messages:{}};return{getUsers:function(){return e.users},setUsers:function(t){e.users=t},getRooms:function(){return e.rooms},setRooms:function(t){e.rooms=t},getRoom:function(){return e.room},setRoom:function(t){e.room=t},getMessages:function(t){return e.messages[t]||(e.messages[t]=[]),e.messages[t]},addMessage:function(t,s){return e.messages[t]||(e.messages[t]=[]),e.messages[t].unshift(s)}}}var s={join:"has joined the chat",leave:"has left the chat"};e.$inject=["socketFactory","UserTokenStorage"],angular.module("chat.services",[]).constant("chatMsg",s).factory("chatSocket",e).factory("chatData",t)}(),function(){"use strict";function e(){}function t(e,t,s){var a=this;a.data={},a.save=function(){s.signin(a.data).then(function(s){e.$emit("auth-is-authenticated",s.data.token),t.go("chat")})["catch"](function(e){a.errors=e.data})}}function s(e,t,s){var a=this;a.data={},a.errors=[],a.save=function(){s.register(a.data).then(function(s){e.$emit("auth-is-authenticated",s.data.token),t.go("chat")})["catch"](function(e){a.errors=e.data})}}t.$inject=["$rootScope","$state","Users"],s.$inject=["$rootScope","$state","Users"],angular.module("users.controllers",[]).controller("UserController",e).controller("UserSigninController",t).controller("UserRegisterController",s)}(),function(){"use strict";function e(){return{require:"ngModel",link:function(e,t,s,a){e.$watch(s.passwordEquals,function(){a.$validate()}),a.$validators.isEquals=function(t){var a=e.$eval(s.passwordEquals);return a&&t?t===a:!1}}}}angular.module("users.directives",[]).directive("passwordEquals",e)}(),function(){"use strict";function e(e){e.state("session",{"abstract":!0,templateUrl:"users/templates/session.html",resolve:{isjustlogged:["Users",function(e){return e.isjustlogged()}]}}).state("session.signin",{url:"/user/signin",templateUrl:"users/templates/signin.html",controllerAs:"user",controller:"UserSigninController"}).state("session.register",{url:"/user/register",templateUrl:"users/templates/register.html",controllerAs:"user",controller:"UserRegisterController"})}e.$inject=["$stateProvider","$httpProvider"],angular.module("users.routes",[]).config(e)}(),function(){"use strict";function e(e){return{isjustlogged:function(){return e.get("/auth/isjustlogged")},signin:function(t){return e.post("/auth/signin",t)},register:function(t){return e.post("/auth/register",t)},logout:function(){return e.get("/auth/logout")}}}e.$inject=["$http"],angular.module("users.services",[]).factory("Users",e)}();