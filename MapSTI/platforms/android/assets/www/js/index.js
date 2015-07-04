angular.module('app',['ngCordova', 'ngAnimate','ngMap'])

.controller('MainController', function($scope, $cordovaGeolocation, $http){
	$scope.title = "NetSTI";

	$('body').addClass('loaded');

	var posOptions = {
		timeout: 10000, 
		enableHighAccuracy: true
	};

	$cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
		$scope.lat = position.coords.latitude;
		$scope.lon = position.coords.longitude;

		alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');

		$scope.map = { 
			center: [
				position.coords.latitude, 
				position.coords.longitude 
			],
			marker: [
				position.coords.latitude, 
				position.coords.longitude 
			],
			zoom: 16,
			options: {
				disableDefaultUI: true
			},
			icon: {
				animation: google.maps.Animation.BOUNCE
			}
		};

		// $http({method: 'GET', url: 'http://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&lat='+$scope.lat+'&lon='+$scope.lng})
		// .success(function(data, status, headers, config) {
		// 	$scope.location = data.weather[0];
		// 	$scope.weather = data.main.temp.toFixed();
		// 	$scope.wicon = data.code;

		// 	$('.weather').addClass('loaded');
		// })
		// .error(function(data, status, headers, config) {
		// 	throw new Error('Unable to get weather');
		// });
	}, function(err) {
		//ERROR
	});
})

document.addEventListener("deviceready", function() {
	angular.bootstrap(document, ["app"]);
}, false);