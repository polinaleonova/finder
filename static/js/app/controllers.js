'use strict';

var finderControllers = angular.module('finderControllers',[]);
finderControllers.controller('StepController', ['$scope','$location','$http','$rootScope', function($scope, $location, $http, $rootScope){
    $scope.base_href = document.location.pathname; //for github pages
    $http({
            method: 'GET',
            url: 'static/game_data.json'
            }).success(function(data){
            $scope.data = data;
            $scope.all_elements = $scope.data["elements"];
            $scope.all_levels = $scope.data["levels"];
        });

    $scope.step_1 = function(p){
        $scope.players = p;
        $scope.steps = 'step_2'
    };
    $scope.step_2 = function(l){
        $scope.level = l;
        $scope.steps = 'step_3'
    };
    $scope.step_3 = function(e){
        $scope.element = e;
        $scope.steps = 'step_4'
    };
    $scope.startgame = function(p, l, e){
        $scope.steps = 'step_5';
        var path = '/startgame/'+ $scope.players+'/'+$scope.level+'/'+$scope.element+'/';
        $location.path( path );
        var elements_list = $scope.data.elements[$scope.element],
            count_elements = $scope.data.levels[$scope.level][0];
        $rootScope.game_field = doubling_and_shuffle_elements(elements_list, count_elements);
        $rootScope.score   = $scope.data.levels[$scope.level][1]
    };
    $scope.set_to_start = function(){
       $scope.steps = 'step_1';
       $rootScope.win = false;
       $rootScope.fail = false
    };
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
    }
    }]);
finderControllers.controller('OnePlayerController', ['$scope','$rootScope','$timeout',function($scope,$rootScope,$timeout) {
        $rootScope.win = false;
        $rootScope.fail = false;
        $scope.cell_opened = false;
        $scope.show_list = [];
        $scope.indexInShowList = function(index){
            return index in $scope.show_list
        };
        $scope.clickHandler = function(index){
            var current_element = angular.element(document.getElementById('id_' + index));
                if (!current_element.hasClass('open') && !current_element.hasClass('col')
                    && angular.element(document.getElementsByClassName('col')).length <= 1) {
                    $scope.show_list.push(index);
                    current_element.addClass('col');
                    document.getElementById('id_' + index).innerHTML = '<img class="img_cell" src="' + $rootScope.game_field[index] + '">';
                    //                $timeout(function () {
                    var showed_elements = angular.element(document.getElementsByClassName('col'));
                    var count_showed_cells = showed_elements.length;
                    if (count_showed_cells == 2) {

                        var first_cell_content = showed_elements[0].innerHTML;
                        var second_cell_content = showed_elements[1].innerHTML;
                        if (first_cell_content == second_cell_content) {
                            showed_elements[0].classList.add('open');
                            showed_elements[0].classList.remove('col');
                            showed_elements[1].classList.add('open');
                            showed_elements[1].classList.remove('col');
                            if (angular.element(document.getElementsByClassName('open')).length == $rootScope.game_field.length) {
                                $rootScope.win = true;
                            }
                        }
                        else {
                            $timeout(function () {
                                showed_elements[0].classList.remove('col');
                                showed_elements[1].classList.remove('col');
                                showed_elements[0].innerHTML = '';
                                showed_elements[1].innerHTML = '';
                                $rootScope.score -= 1;
                                if ($rootScope.score == 0) {
                                    $rootScope.fail = true;
                                }
                            }, 1000)
                        }
                        $scope.show_list = []
                    }
                    //                }, 5, index)
                }
            }

}]);