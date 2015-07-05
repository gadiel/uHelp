angular.module('app',['ngCordova','ngMaterial','ngRoute'])

.config(['$routeProvider',function($routeProvider,$location) {
	$routeProvider.when('/', {
		templateUrl: 'views/welcome.html',
		controller: 'rootCtrl'
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

.controller('rootCtrl', ['$scope', function ($scope) {
	
}])
.controller('RouteCtrl', ['$scope', function ($scope) {
	
}]);

document.addEventListener("deviceready", function() {
	angular.bootstrap(document, ["app"]);
}, false);