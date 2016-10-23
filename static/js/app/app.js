'use strict';

var Game = angular.module('Game', ['ngRoute','finderControllers']);

    Game.config(function($routeProvider, $locationProvider) {
        $routeProvider.when('/startgame/one/:level/:element/',
           {
               templateUrl: 'static/js/app/views/one_pl.html',
               controller: 'OnePlayerController'
           });
        $routeProvider.when('/startgame/two/:level/:element/',
           {
               templateUrl: 'static/js/app/views/two_pl.html',
               controller: 'TwoPlayersController'
           });
        $routeProvider.otherwise({ redirectTo: '/'});
        $locationProvider.html5Mode(true);
});


