angular.module('app',['ngCordova','ngMaterial','ngRoute','ngMdIcons'])

.config(['$routeProvider',function($routeProvider,$location) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/welcome.html',
		controller: 'rootCtrl'
	})
	.when('/login', {
		templateUrl: 'views/login.html',
		controller: 'LoginCtrl'
	})
	.when('/dash', {
		templateUrl: 'views/dash.html',
		controller: 'RouteCtrl'
	})
	.when('/course/:id', {
		templateUrl: 'views/course.html',
		controller: 'CourseCtrl'
	})	
	.when('/signup', {
		templateUrl: 'views/signup.html',
		controller: 'SignUpCtrl'
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

.controller('SignUpCtrl', ['$scope','$http','register','$location', function ($scope,$http,register,$location) {

	$scope.user = {};
	$scope.registerFunc=function(user){
		register.addUser(user.name,user.email,user.password);
		$location.path('/login/');
	};



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
	  { id:0, course: 'Matematicas', subtitle: 'Clase 206', comments: 36, status: true },
	  { id:1, course: 'Español', subtitle: 'Clase 308', comments: 28, status: false },
	  { id:2, course: 'Informatica', subtitle: 'Clase 101', comments: 12, status: false },
	  { id:3, course: 'Psicologia', subtitle: 'Clase 102', comments: 22, status: true },
	  { id:1, course: 'Español', subtitle: 'Clase 308', comments: 28, status: false },
	  { id:2, course: 'Informatica', subtitle: 'Clase 101', comments: 12, status: false },
	  { id:3, course: 'Psicologia', subtitle: 'Clase 102', comments: 22, status: true },
	];

	$scope.navigateTo = function($id){
		$location.path('/course/' + $id);
	}
}])

.controller('LoginCtrl', ['$scope', '$http','$location', 'register', function ($scope, $http,$location,register) {
	$scope.user = {};
	
	$scope.login=function(user,password){
		if( register.isCorrectUser(user,password)){
			$location.path('/dash/');
		}	
	};
}])

.service('register', function () {
    return {
        users : [
		  { id:0, completeName: 'Raul Hernandez', email: 'raul@unitec.edu', password: "hola123"},
		  { id:1, completeName: 'Mario Skool', email: 'skooly@uth.hn', password: "hola123"},
		  { id:2, completeName: 'Monica Maria', email: 'moni@ceutec.edu', password: "hola123"},
		  { id:3, completeName: 'William Johnson', email: 'will@unitec.edu', password: "hola123"},
		],
        addUser: function (completeName,email,password) {
            this.users.push({id:1,completeName:completeName,email:email,password:password});
        },
        isCorrectUser: function(email,password) {
			var index =-1;
            for(var i = 0, len = this.users.length; i < len; i++) {
				if (this.users[i].email === email&&this.users[i].password === password) {
			        index = i;
			        break;
			    }
			}
			return index>-1?true:false;
        }
    };
})
.service('courses', function () {
    return {
        courses : [
		  { id:0, course: 'Matematicas',dificulty:0, classCode: 'Clase 206', comments: [{pregunta:"Examen 1 que tan dificil?",respuesta:"Es tranqui"}], status: true },
		  { id:1, course: 'Español',dificulty:1, classCode: 'Clase 308', comments: [{pregunta:"Examen 1 que tan dificil?",respuesta:"Es tranqui"}], status: false },
		  { id:2, course: 'Informatica',dificulty:1, classCode: 'Clase 101', comments: [{pregunta:"Examen 1 que tan dificil?",respuesta:"Es tranqui"}], status: false },
		  { id:3, course: 'Psicologia',dificulty:0, classCode: 'Clase 102', comments: [{pregunta:"Examen 1 que tan dificil?",respuesta:"Es tranqui"}], status: true },
		  { id:4, course: 'Calculo',dificulty:2, classCode: 'Clase 308', comments: [{pregunta:"Examen 1 que tan dificil?",respuesta:"Es tranqui"}], status: false },
		  { id:5, course: 'Diseño',dificulty:0, classCode: 'Clase 101', comments: [{pregunta:"Examen 1 que tan dificil?",respuesta:"Es tranqui"}], status: false },
		  { id:6, course: 'Programacion',dificulty:2, classCode: 'Clase 102', comments: [{pregunta:"Examen 1 que tan dificil?",respuesta:"Es tranqui"}], status: true },
		],
        addCourse: function (course,classCode,dificulty) {
            this.courses.push({id:7,course:course,dificulty:dificulty,classCode:classCode,comments:0,status:false});
        },
        getCourseById: function(id) {
			var index =-1;
            for(var i = 0, len = this.courses.length; i < len; i++) {
				if (this.courses[i].id === id) {
			        index = i;
			        break;
			    }
			}
			return this.courses[index];
        }
    };
});

document.addEventListener("deviceready", function() {
	angular.bootstrap(document, ["app"]);
}, false);