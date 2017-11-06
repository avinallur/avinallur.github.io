var app = angular.module('webApp', ['ngMaterial', 'ngAnimate', 'duScroll', 'ngRoute', 'wu.masonry', 'angular-scroll-animate']);

app.controller('AppCtrl', function($scope, $window) {
    $scope.scrollPosition = 0;
    $scope.fabOpen = "false";
    
    angular.element($window).bind(
       "scroll", function() {
         if(window.pageYOffset > 0) {
           $scope.scrollPosition = window.pageYOffset;
         } else {
           $scope.scrollPosition = window.pageYOffset;
         }
         $scope.$apply();
   });
    
    $scope.animateIn = function($el) {
    $el.removeClass('hidden');
    $el.addClass('fade-in');
  };
 
    $scope.animateOut = function($el) {
    $el.addClass('hidden');
    $el.removeClass('fade-in');
  };
});

app.directive('pageTitle', function() {
    return {
        restrict: 'EA',
        link: function($scope, $element) {
            var el = $element[0];
            el.hidden = true; // So the text not actually visible on the page

            var text = function() {
                return el.innerHTML;
            };
            var setTitle = function(title) {
                document.title = title;
            };
            $scope.$watch(text, setTitle);
        }
    };
});

app.directive('resize', function ($window) {
	return function (scope, element) {
		var w = angular.element($window);
		scope.$watch(function () {
			return { 'h': w.innerHeight(), 'w': w.innerWidth() };
		}, function (newValue, oldValue) {
			scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;
            
            scope.style = function () {
				return { 
                    'height': (newValue.h) + 'px',
                    'width': (newValue.w) + 'px' 
                };
			};
            
		}, true);
	
		w.bind('resize', function () {
			scope.$apply();
		});
	}
});

app.filter('stripFlickrCustomText', function() {
  return function(input) {
    input = input || '';
    var out = "";
    
      var split_text = input.split('~');
      out = split_text[1];
    
    // conditional based on optional argument
    return out;
  };
});

app.value('duScrollOffset', 125).value('duScrollBottomSpy', true).value('duScrollActiveClass', 'sidebarActiveSection').value('duScrollGreedy', true).value('duScrollDuration', 2000);
