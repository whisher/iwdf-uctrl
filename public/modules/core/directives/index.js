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

function pageSlider($rootScope, $templateCache){
        var param = {};
        return {
            restrict: "A",
            scope: {},
            link: function (scope, element, attrs) {
                if(!attrs.classname){
                    return;
                }
                param.className = attrs.classname;
                var slider = angular.element('<div class="info-slider"></div>');
                slider.append($templateCache.get('core/templates/slider-info.html'));
                var container = angular.element('body').find('#container').append(slider);
                element.on('click',function(e){
                    e.preventDefault();
                    slider.toggleClass('info-slider-show');
                });
                var closeHandler = document.getElementById('slider-close');
                if (closeHandler){
                        closeHandler.addEventListener('click', function(e){
                            e.preventDefault();
                            slider.removeClass('info-slider-show');
                        });
                }
                scope.$on('$destroy', function() {
                    element.off('click');
                    container.find(slider).remove();
                });
                $rootScope.$on('$locationChangeStart', function(){
                        slider.removeClass('info-slider-show'); 
                });
                $rootScope.$on('$stateChangeStart', function(){
                        slider.removeClass('info-slider-show'); 
                });
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
        var barRightOuter = angular.element(document.getElementById('bar-right-outer'));
        var barLeftOuter = angular.element(document.getElementById('bar-left-outer'));
        element.on('mouseenter',function(e){
            barRightOuter.addClass('right-slider');
            barLeftOuter.addClass('left-slider');
        });
        element.on('mouseleave',function(e){
            barRightOuter.removeClass('right-slider');
            barLeftOuter.removeClass('left-slider');
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
    .directive('pageSlider', pageSlider)
     .directive('sliderBar', sliderBar);
})();

