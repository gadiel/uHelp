angular.module('app',['ngCordova','ngMaterial','ngRoute','ngMdIcons'])

.config(['$routeProvider',function($routeProvider,$location) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/welcome.html',
		controller: 'rootCtrl'
	})
	.when('/login', {
		templateUrl: 'views/login.html',
		controller: 'RouteCtrl'
	})
	.when('/dash', {
		templateUrl: 'views/dash.html',
		controller: 'RouteCtrl'
	})
	.when('/course/:id', {
		templateUrl: 'views/course.html',
		controller: 'CourseCtrl'
	})
	.otherwise({ redirectTo: '/login' });
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
.controller('CourseCtrl', ['$scope','$routeParams', '$mdBottomSheet', function ($scope, $routeParams, $mdBottomSheet) {
	$scope.courseId = $routeParams.id;

	$scope.courses = [
	  { id:00, course: 'Matematicas', subtitle: 'Clase 206', comments: 36, status: true },
	  { id:01, course: 'Español', subtitle: 'Clase 308', comments: 28, status: false },
	  { id:02, course: 'Informatica', subtitle: 'Clase 101', comments: 12, status: false },
	  { id:03, course: 'Psicologia', subtitle: 'Clase 102', comments: 22, status: true },
	];

	$scope.messages = [{
		face : 'img/ppl/100-0.jpeg',
		what: 'Brunch this weekend?',
		who: 'Min Li Chan',
		when: '3:08PM',
		notes: " I'll be in your neighborhood doing errands"
	}, {
		face : 'img/ppl/100-1.jpeg',
		what: 'Brunch this weekend?',
		who: 'Min Li Chan',
		when: '3:08PM',
		notes: " I'll be in your neighborhood doing errands"
	}, {
		face : 'img/ppl/100-2.jpeg',
		what: 'Brunch this weekend?',
		who: 'Min Li Chan',
		when: '3:08PM',
		notes: " I'll be in your neighborhood doing errands"
	}];

	$scope.sendComm = function(){
		var temp = {
			face : 'img/ppl/100-2.jpeg',
			what: $scope.comm.title,
			who: 'Anonimo',
			when: '3:08PM',
			notes: $scope.comm.text
		}

		$scope.messages.push(temp);
	}

	$scope.showListBottomSheet = function($event) {
		$mdBottomSheet.show({
			templateUrl: 'views/comments.html',
			controller: 'CourseCtrl',
			targetEvent: $event
		});
	};
}])
.controller('RouteCtrl', ['$scope', '$location', function ($scope, $location) {
	$scope.courses = [
	  { id:00, course: 'Matematicas', subtitle: 'Clase 206', comments: 36, status: true },
	  { id:01, course: 'Español', subtitle: 'Clase 308', comments: 28, status: false },
	  { id:02, course: 'Informatica', subtitle: 'Clase 101', comments: 12, status: false },
	  { id:03, course: 'Psicologia', subtitle: 'Clase 102', comments: 22, status: true },
	];

	$scope.navigateTo = function($id){
		$location.path('/course/' + $id);
	}
}]);

document.addEventListener("deviceready", function() {
	angular.bootstrap(document, ["app"]);
}, false);