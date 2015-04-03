(function() {
'use strict';

function charLimit() {
    return {
        restrict: 'A',
        scope:{
            from:'@',
            to: '@'
        },
        link: function(scope, element){
            var from = scope.from;
            var to = scope.to;
            var box = angular.element(document.getElementById('counter'));
            element.bind('keyup', function(event){
                var len = element.val().length;
                var toType = (len> 0)?(to - len):'';
                var boxClasses = box[0].className.split(/\s+/);
                var baseClass = boxClasses.shift();
                boxClasses.forEach(function(cls){
                    box.removeClass(cls);
                });
                box.addClass(baseClass);
                box.text(toType);
                box.toggleClass('danger', (len < from) || (len > to));
                box.toggleClass('warning', (to - len) <= 10);
            });
            element.bind('keypress', function(event){
                if ( (element.val().length < from) || (element.val().length > to)){
                   if (event.keyCode === 13){
                        event.preventDefault();
                   }
                }
            });
        }
    };
}
function showDate($filter) {
  return {
    restrict: 'A',
    scope:{
        input: '@'
    },
    link: function(scope, element) {
        var supportDateFilter = $filter('supportDate');
        var chuncks = supportDateFilter(scope.input).split(' ');
        element.html(chuncks[0] + '<br>' + chuncks[1]);
    }
  };
}
function showOverflow($timeout) {
    return {
        restrict: 'A',
        scope:{
            gap:'@',
            message: '='
        },
        link: function(scope, element){
            var docHeight =  $('#content').height();
            var $element = $(element[0]);
            /* admin*/
            if(scope.message){
                scope.$watch('message', function(newValue, oldValue) {
                    if (newValue){
                        var elHeight = $element.height();
                        var viewport = docHeight - scope.gap;
                        if(elHeight > viewport){
                            $element.css('overflow','auto');
                            $element.height(viewport);
                        }
                    }
                });
            }
            /* user */
            else{
                $timeout(function () {
                    var $element = $(element[0]);
                    var elHeight = $element.height();
                    var viewport = docHeight - scope.gap;
                    if(elHeight > viewport){
                        $element.css('overflow','auto');
                        $element.height(viewport);
                    }
                });
            }
        }
    };
}
angular.module('support.directives', [])
  .directive('charLimit', charLimit)
  .directive('showDate', showDate)
  .directive('showOverflow', showOverflow);
})();

