angular.module('app', ['ngRoute', 'controller'])

.config(function($routeProvider) {
    $routeProvider
    /*.when('/', {
        templateUrl: 'templates/test.html'
    })*/
	.when('/mission', {
		templateUrl: 'templates/MissionStartup.html'
	})
	.when('/multiplayer', {
		templateUrl: 'templates/MultiplayerStartup.html',
		controller: 'MPController'
	})
	.otherwise({
		templateUrl: 'templates/404.html'
	})
})