angular.module('app',['ngCordova', 'ngAnimate','ngRoute'])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/welcome.html',
		controller: function($scope){
			// 
		}
	}).when('/route', {
		templateUrl: 'views/route.html',
		controller: 'RouteCtrl'
	})
}])

.directive('fx', [function () {
	return {
		restrict: 'AC',
		link: function (scope, el, attrs) {
			$(el).addClass('animated');
		}
	};
}])

.controller('RouteCtrl', ['$scope', function ($scope) {
	
}]);

document.addEventListener("deviceready", function() {
	angular.bootstrap(document, ["app"]);
}, false);