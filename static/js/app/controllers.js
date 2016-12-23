'use strict';

var finderControllers = angular.module('finderControllers',[]);
finderControllers.controller('StepController', ['$scope','$location','$http','$rootScope','share', function($scope, $location, $http, $rootScope, share){
    $scope.base_href = document.location.pathname; //for github pages
    $http({
            method: 'GET',
            url: 'static/game_data.json'
            }).success(function(data){
            $scope.data = data;
            $scope.all_elements = Object.keys(data["elements"]);
            $scope.all_levels = Object.keys(data["levels"]);
        });

    $scope.dialog_win_content = 'static/templates/dialog_win_content.html';
    $scope.dialog_fail_content = 'static/templates/dialog_fail_content.html';
    $scope.step_1 = function(number_of_players){
        $scope.players = number_of_players;
        $scope.steps = 'step_2'
    };
    $scope.step_2 = function(difficulty){
        $scope.level = difficulty;
        $scope.steps = 'step_3'
    };
    $scope.step_3 = function(play_element){
        $scope.element = play_element;
        $scope.steps = 'step_4'
    };
    $scope.startgame = function(){
        $scope.steps = 'step_5';
        var path = '/startgame/'+ $scope.players+'/'+$scope.level+'/'+$scope.element+'/';
        $location.path( path );
        var elements_list = $scope.data.elements[$scope.element],
            count_elements = $scope.data.levels[$scope.level][0];
        $scope.game_field = doubling_and_shuffle_elements(elements_list, count_elements);
        share.setScores($scope.data.levels[$scope.level][1])
    };
    $scope.alertContent={}
    }]);
finderControllers.controller('OnePlayerController', ['$scope','$rootScope','$timeout','$dialog','share', function($scope,$rootScope,$timeout,$dialog, share) {
    $scope.score = share.score;
    $scope.subtractScore = share.subtractScore;
    $scope.open_list = []; //cells which was opened and will be disabled
    $scope.show_list = []; // cells which was showed and will be checked
    $scope.indexInShowList = function(index){
            return $scope.show_list.includes(index)
        };
    $scope.indexInOpenList = function(index){
            return $scope.open_list.includes(index)
        };
    $scope.showCell = function(index){
            return ($scope.show_list.includes(index) || $scope.open_list.includes(index))
        };
    $scope.openCell = function(index){
        if (!$scope.show_list.includes(index) && !$scope.open_list.includes(index)
            && $scope.show_list.length <= 1){
            $scope.show_list.push(index);
            if ($scope.show_list.length == 2){
                var first_val = $scope.game_field[$scope.show_list[0]],
                    second_val = $scope.game_field[$scope.show_list[1]];
                if (first_val == second_val){
                    $scope.open_list.push($scope.show_list[0], $scope.show_list[1]);
                    $scope.show_list = [];
                    if ($scope.open_list.length == $scope.game_field.length) {
                            $scope.content = $scope.dialog_win_content;
                            $dialog($scope.content);
                        }
                }
                else {
                    $timeout(function () {
                        $scope.show_list = [];
                        $scope.score = $scope.subtractScore();
                            if ($scope.score == 0) {
                                $scope.content = $scope.dialog_fail_content;
                                $dialog($scope.content);
                            }
                    }, 1000)
                }
            }
        }
    };
}]);
finderControllers.controller('TwoPlayersController', ['$scope', '$timeout', '$dialog', 'share', function($scope, $timeout, $dialog, share) {
    $scope.first_player = { player : '1\'st', score : 0 , pl_name : '1'};
    $scope.second_player = { player : '2\'st', score : 0 , pl_name : '2'};
    $scope.current_player = $scope.first_player;
    $scope.showPlayerAnimate = function(){
        $scope.showPlayerClass = true;
        $timeout(function() {
            $scope.showPlayerClass = false;
        }, 1000)
    };
    $scope.showPlayerAnimate();
    $scope.open_list = []; //cells which was opened and will be disabled
    $scope.show_list = []; // cells which was showed and will be checked
    $scope.indexInShowList = function(index){
            return $scope.show_list.includes(index)
        };
    $scope.indexInOpenList = function(index){
            return $scope.open_list.includes(index)
        };
    $scope.showCell = function(index){
            return ($scope.show_list.includes(index) || $scope.open_list.includes(index))
        };
    $scope.changePlayerAndShowCurrent = function(){
        $scope.current_player = ($scope.current_player == $scope.first_player ?
            $scope.second_player : $scope.first_player);
        $scope.showPlayerAnimate();
    };
    $scope.openCell = function(index){
        if (!$scope.show_list.includes(index) && !$scope.open_list.includes(index)
            && $scope.show_list.length <= 1){
            $scope.show_list.push(index);
            if ($scope.show_list.length == 2){
                var first_val = $scope.game_field[$scope.show_list[0]],
                    second_val = $scope.game_field[$scope.show_list[1]];
                if (first_val == second_val){
                    $scope.open_list.push($scope.show_list[0], $scope.show_list[1]);
                    $scope.show_list = [];
                    $scope.current_player.score += 1;
                    if ($scope.open_list.length == $scope.game_field.length){
                        if ($scope.first_player.score == $scope.second_player.score){
                            share.winner = 'Dead heat!'
                        }
                        else {
                            share.winner = ($scope.first_player.score > $scope.second_player.score ?
                                $scope.first_player.player : $scope.second_player.player) + ' won!';
                        }
                            $scope.winner = share.winner;
                        $scope.content = $scope.dialog_win_content;
                        $dialog($scope.content);
                    }
                }
                else {
                    $scope.changePlayerAndShowCurrent();
                    $timeout(function () {
                        $scope.show_list = [];
                    }, 1000)
                }
            }
        }
    }
}]);
finderControllers.controller('ParallaxController', ['$scope', function($scope) {
    var tempX = 0;
    var tempY = 0;
    $scope.change_x = function(e){
        tempX = e.pageX;
        tempY = e.pageY;
        document.getElementById('layer1').style.left =tempX*(-0.03)+'px';
        document.getElementById('layer1').style.top =tempY*(-0.03)+'px';
        document.getElementById('layer2').style.left =tempX*(-0.06)+'px';
        document.getElementById('layer2').style.top =tempY*(-0.06)+'px';
        document.getElementById('layer3').style.left =tempX*(-0.2)+'px';
        document.getElementById('layer3').style.top =tempY*(-0.2)+'px';
    };
}]);