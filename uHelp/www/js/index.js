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

.controller('CourseCtrl', ['$scope','$routeParams', '$mdBottomSheet', 'courses', function ($scope, $routeParams, $mdBottomSheet, courses) {
	$scope.course = courses.getCourseById($routeParams.id);

	console.log($scope.course);

	$scope.sendComm = function(){
		courses.addCommentByCourse($routeParams.id, $scope.comm);
		$scope.comm = {};
		$mdBottomSheet.hide();
	}

	$scope.showListBottomSheet = function($event) {
		$mdBottomSheet.show({
			templateUrl: 'views/comments.html',
			controller: 'CourseCtrl',
			targetEvent: $event
		});
	};

	$scope.closeComm = function(){
		$mdBottomSheet.hide();
	}
}])

.controller('RouteCtrl', ['$scope', '$location', 'courses', function ($scope, $location, courses) {
	$scope.courses = courses.courses;

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
		  { id:0, course: 'Matematicas',dificulty:0, classCode: 'Clase 206', comments: [{pregunta:"Examen 1 que tan dificil?",respuesta:"Es tranqui", who: 'Min Li Chan', face: "img/ppl/100-2.jpeg"}], status: true },
		  { id:1, course: 'Español',dificulty:1, classCode: 'Clase 308', comments: [{pregunta:"Examen 1 que tan dificil?",respuesta:"Es tranqui", who: 'Min Li Chan', face: "img/ppl/100-2.jpeg"}], status: false },
		  { id:2, course: 'Informatica',dificulty:1, classCode: 'Clase 101', comments: [{pregunta:"Examen 1 que tan dificil?",respuesta:"Es tranqui", who: 'Min Li Chan', face: "img/ppl/100-2.jpeg"}], status: false },
		  { id:3, course: 'Psicologia',dificulty:0, classCode: 'Clase 102', comments: [{pregunta:"Examen 1 que tan dificil?",respuesta:"Es tranqui", who: 'Min Li Chan', face: "img/ppl/100-2.jpeg"}], status: true },
		  { id:4, course: 'Calculo',dificulty:2, classCode: 'Clase 308', comments: [{pregunta:"Examen 1 que tan dificil?",respuesta:"Es tranqui", who: 'Min Li Chan', face: "img/ppl/100-2.jpeg"}], status: false },
		  { id:5, course: 'Diseño',dificulty:0, classCode: 'Clase 101', comments: [{pregunta:"Examen 1 que tan dificil?",respuesta:"Es tranqui", who: 'Min Li Chan', face: "img/ppl/100-2.jpeg"}], status: false },
		  { id:6, course: 'Programacion',dificulty:2, classCode: 'Clase 102', comments: [{pregunta:"Examen 1 que tan dificil?",respuesta:"Es tranqui", who: 'Min Li Chan', face: "img/ppl/100-2.jpeg"}], status: true },
		],
        addCourse: function (course,classCode,dificulty) {
            this.courses.push({id:7,course:course,dificulty:dificulty,classCode:classCode,comments:0,status:false});
        },
        getCourseById: function(id) {
			var index =-1;
            for(var i = 0, len = this.courses.length; i < len; i++) {
				if (this.courses[i].id == id) {
			        index = i;
			        break;
			    }
			}
			return this.courses[index];
        },
        addCommentByCourse: function(id, comm){
        	var index =-1;
            for(var i = 0, len = this.courses.length; i < len; i++) {
				if (this.courses[i].id == id) {
			        index = i;
			        break;
			    }
			}
			this.courses[index].comments.push({pregunta:comm.question,respuesta:comm.ans, who: 'Anonimus', face: "img/ppl/100-1.jpeg"});
        }
    };
});

document.addEventListener("deviceready", function() {
	angular.bootstrap(document, ["app"]);
}, false);