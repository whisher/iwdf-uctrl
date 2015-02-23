(function() {
'use strict';

function showVersion(VERSION) {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.text('Version: ' + VERSION);
    }
  };
}

function userFeedback() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, element, attrs, ctrl) {
      var $parentDiv = element.parent();
     	element.on('blur',function() {
        var currentClass = $parentDiv.attr('class');
        var currentsClass = currentClass.split(' ');
        var len = currentsClass.length;
        if(len > 1){
	     for (var i = 0; i < len; i++){
		  $parentDiv.removeClass(currentsClass[i]);
		}		
        }
        $parentDiv.addClass(currentsClass[0]);
        if(ctrl.$valid){
          $parentDiv.addClass('has-success');
        }
        else{
          $parentDiv.addClass('has-error');
        }
      });
    }
  };
}

function showErrors($templateCache) {
  return {
    restrict: 'AE',
    scope:{
      errors: '='
    },
    template: $templateCache.get('core/templates/show-errors.html'),
    link: function(scope, elm, attrs) {
    }
  };
}

function pageslide($rootScope, $templateCache){
        var defaults = {};

        /* Return directive definition object */

        return {
            restrict: "EA",
            replace: false,
            transclude: false,
            scope: {
                psOpen: "=?"
            },
             link: function ($scope, el, attrs) {
                /* Inspect */
                //console.log($scope);
                //console.log(el);
                //console.log(attrs);
                var toogle = false;
                /* parameters */
                var param = {};
                param.side = attrs.pageslide || 'right';
                param.speed = attrs.psSpeed || '0.5';
                param.size = attrs.psSize || '300px';
                param.className = attrs.psClass || 'ng-pageslide';
                var container = el;
                container.append($templateCache.get('core/templates/slider-info.html'));
                content =  document.getElementById(attrs.psTarget.substr(1));
              
                
              console.log(content);  
                // Check for content
                if (!content) 
                    throw new Error('You have to elements inside the <pageslide> or you have not specified a target href');
                var slider = document.createElement('div');
                slider.className = param.className;

                /* Style setup */
                slider.style.transitionDuration = param.speed + 's';
                slider.style.webkitTransitionDuration = param.speed + 's';
                slider.style.zIndex = 1000;
                slider.style.position = 'fixed';
                slider.style.display = 'none';
               
                slider.style.transitionProperty = 'width, height';

                switch (param.side){
                    case 'right':
                        slider.style.top = attrs.psCustomTop ||  '0px';
                        slider.style.bottom = attrs.psCustomBottom ||  '0px';
                        slider.style.right = attrs.psCustomRight ||  '0px';
                        break;
                    case 'left':
                        slider.style.top = attrs.psCustomTop || '0px';
                        slider.style.bottom = attrs.psCustomBottom || '0px';
                        slider.style.left = attrs.psCustomLeft || '0px';
                        break;
                    case 'top':
                        slider.style.left = attrs.psCustomLeft || '0px';
                        slider.style.top = attrs.psCustomTop || '0px';
                        slider.style.right = attrs.psCustomRight || '0px';
                        break;
                    case 'bottom':
                        slider.style.bottom = attrs.psCustomBottom || '0px';
                        slider.style.left = attrs.psCustomLeft || '0px';
                        slider.style.right = attrs.psCustomRight || '0px';
                        break;
                }

                /* Append */
                document.body.appendChild(slider);
                slider.appendChild(content);

                /* Closed */
                function psClose(slider,param){
                    if (slider.style.width !== 0 ){
                      content.style.display = 'none';
                        switch (param.side){
                            case 'right':
                                slider.style.width = '0px'; 
                                break;
                            case 'left':
                                slider.style.width = '0px';
                                break;
                            case 'top':
                                slider.style.height = '0px'; 
                                break;
                            case 'bottom':
                                slider.style.height = '0px'; 
                                break;
                        }
                    }
                    $scope.psOpen = false;
                }

                /* Open */
                function psOpen(slider,param){
                    if (slider.style.width !== 0 ){
                        switch (param.side){
                            case 'right':
                                slider.style.width = param.size; 
                                break;
                            case 'left':
                                slider.style.width = param.size; 
                                break;
                            case 'top':
                                slider.style.height = param.size; 
                                break;
                            case 'bottom':
                                slider.style.height = param.size; 
                                break;
                        }
                        setTimeout(function(){
                            slider.style.display = 'block';
                            content.style.display = 'block';
                        },(param.speed * 1000));

                    }
                }

                /*
                * Watchers
                * */

                $scope.$watch("psOpen", function (value){
                    if (!!value) {
                        // Open
                        psOpen(slider,param);
                    } else {
                        // Close
                        psClose(slider,param);
                    }
                });

                
                    $rootScope.$on("$locationChangeStart", function(){
                        psClose(slider, param);
                    });
                    $rootScope.$on("$stateChangeStart", function(){
                        psClose(slider, param);
                    });
              



                /*
                * Events
                * */

                $scope.$on('$destroy', function() {
                    document.body.removeChild(slider);
                });

                var close_handler = document.getElementById(attrs.psTarget.substr(1) + '-close');
                el.on('click',function(e){
                        e.preventDefault();
                        if(!toogle){
                            psOpen(slider,param);  
                            toogle = true;
                        }
                        else{
                            psClose(slider,param);
                            toogle = false;
                        }
                                          
                });
                if (close_handler){
                        close_handler.addEventListener('click', function(e){
                            e.preventDefault();
                            psClose(slider,param);
                        });
                }
                

            }
        };
    }

function sliderBar() {
  return {
    restrict: 'A',
    scope:{
        bartype: '@'
    },
    link: function(scope, element) {
        var barRight = angular.element(document.getElementById('bar-right'));
        var barLeft = angular.element(document.getElementById('bar-left'));
        element.on('mouseenter',function(e){
             barLeft.addClass('slide-out-left');
             barRight.addClass('slide-out-right');
        });
        element.on('mouseleave',function(e){
             barRight.removeClass('slide-out-right');
             barLeft.removeClass('slide-out-left');
        });
        scope.$on('$destroy', function() {
            element.off('mouseenter');
            element.off('mouseleave');
        });
    }
  };
}

angular.module('core.directives', [])
    .directive('showVersion', showVersion)
    .directive('userFeedback', userFeedback)
    .directive('showErrors', showErrors)
    .directive('pageslide', pageslide)
     .directive('sliderBar', sliderBar);
})();

