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
          
            element.bind('keyup', function(event){
                var box = angular.element(document.getElementById('counter'));
                var len = element.val().length;
                var toType = (to - len);
                var boxClasses = box[0].className.split(/\s+/);
                var baseClass = boxClasses.shift();
                boxClasses.forEach(function(cls){
                    box.removeClass(cls);
                });
                box.addClass(baseClass);
                box.text(toType);
                box.toggleClass('warning', (to - len) <= 10);
                box.toggleClass('danger', (len < from));
            });
            element.bind('keypress', function(event){
                // Once the limit has been met or exceeded, prevent all keypresses from working
                 console.log('from',from,to);
                   console.log('is',element.val().length >= to);
                if (element.val().length >= to){
                    // Except backspace
                    if (event.keyCode !== 8){
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
angular.module('support.directives', [])
  .directive('charLimit', charLimit)
  .directive('showDate', showDate);
})();

