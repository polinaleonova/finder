'use strict';

var finderControllers = angular.module('finderControllers',[]);
finderControllers.controller('StepController', ['$scope','$location','$http','$rootScope', function($scope, $location, $http, $rootScope){
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
        $http({
            method: 'GET',
            url: 'static/game_data.json'
            }).success(function(data){
            var elements_list = data.elements[$scope.element],
                count_elements = data.levels[$scope.level][0];
            $rootScope.game_field = doubling_and_shuffle_elements(elements_list, count_elements);
            $rootScope.score   = data.levels[$scope.level][1]
        })
    };

    }]);
finderControllers.controller('OnePlayerController', ['$scope','$rootScope','$timeout',function($scope,$rootScope,$timeout) {
//        $scope.game_field = [1,2,2,1];
//        $scope.score = 2;
        $rootScope.win = false;
        $rootScope.fail = false;
        $scope.cell_opened = false;
        $scope.show_list = [];
        $scope.indexInShowList = function(index){
            return index in $scope.show_list
        };
        $scope.clickHandler = function(index){
            var current_element = angular.element(document.getElementById('id_' + index));
            if (!current_element.hasClass('open') && !current_element.hasClass('col')) {
                $scope.show_list.push(index);
                current_element.addClass('col');
                document.getElementById('id_' + index).innerHTML = $rootScope.game_field[index];
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
            };
//        $scope.open_cell = function(e) {
//            var current_element = angular.element(e.target);
//            if (!(current_element.hasClass('disable_cell') || current_element.hasClass('not_active'))){
//                var value = $scope.game_field[this.$index];
//                this.result = current_element.html(value);
//                current_element.addClass("opened_cell");
//                var opened_cells_count = angular.element('.opened_cell').length;
//                if (opened_cells_count == 2) {
////                    var make_element_not_active = true
//                    angular.element('.field_cell').addClass('not_active');
//                    var first_value = angular.element('.opened_cell')[0].innerHTML,
//                        second_value = angular.element('.opened_cell')[1].innerHTML,
//                        a = angular.element('.opened_cell');
//                    angular.element('.field_cell').addClass('not_active');
//                    if (first_value == second_value) {
//
//                        a.addClass('disable_cell').removeClass('opened_cell');
//                        angular.element('.field_cell').removeClass('not_active');
//                        if (angular.element('.disable_cell').length == $scope.game_field.length){
//                            $scope.win = true;
//    //                    попап с рестартом и сообщением
//                        }
//                    }
//                    else {
//    //                    $scope.max_steps -=1;
//                        $scope.score -= 1;
//                        if ($scope.score == 0){
//                            $scope.fail = true;
//
////                            alert('you lose');
//    //                        попап с рестартом и сообщением
//                        }
//                        $timeout(function() {
//                            angular.element('.field_cell').removeClass('not_active');
//                            a[0].innerHTML = '';
//                            a[1].innerHTML = '';
//                            a.removeClass('opened_cell')
//                        }, 1000)
//                    }
//                }
//            }
//        }

}]);