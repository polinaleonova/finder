'use strict';

var Game = angular.module('Game', ['ngAnimate', 'ngRoute','finderControllers','finderDirectives','finderServices']);

    Game.config(function($routeProvider, $locationProvider) {
        $routeProvider.when('/',
           {
               templateUrl: 'static/js/app/views/home.html',
               controller: 'MainController'
           });
        $routeProvider.when('/set_game/',
           {
               templateUrl: 'static/js/app/views/steps_settings.html',
               controller: 'StepController'
           });
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


