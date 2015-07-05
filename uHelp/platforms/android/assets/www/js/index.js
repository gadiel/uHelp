angular.module('app',['ngCordova','ngMaterial', 'ngAnimate','ngRoute'])

.config(['$routeProvider',function($routeProvider,$timeout,$location) {
	$routeProvider.when('/', {
		templateUrl: 'views/welcome.html',
		controller: function($scope){
			$timeout(function(){
				$location.path( "/route" );
				},5000);
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