'use strict';

var finderDirectives = angular.module('finderDirectives', []);

finderDirectives.directive('miniCarousel', function($compile) {

    return {
        restrict: "E",
//        replace: true,
//        transclude: true,
        scope: {selectorsCarousel: "=selectors",
                leftb: "@lftBtn",
                rightb: "@rghtBtn",
                okHandler: "&"
                },
        // todo :review later-- use controller when you want to expose an API to other directives. Otherwise use link
//        controller: ['$scope', function($scope){
//            $scope.current_selector_index = 0;
//            $scope.preElement = function(){
//                if ($scope.current_selector_index <= 0){
//                    $scope.current_selector_index = $scope.selectorsCarusel.length - 1;
//                }
//                else{
//                    $scope.current_selector_index--
//                }
//            };
//            $scope.nextElement = function() {
//                if ($scope.current_selector_index >= $scope.selectorsCarusel.length - 1) {
//                    $scope.current_selector_index = 0;
//                }
//                else {
//                    $scope.current_selector_index++
//                }
//            }

//        }],
        link: function(scope){
            scope.current_selector_index = 0;
            scope.preElement = function(){
                if (scope.current_selector_index <= 0){
                    scope.current_selector_index = scope.selectorsCarousel.length - 1;
                }
                else{
                    scope.current_selector_index--
                }
            };
            scope.nextElement = function() {
                if (scope.current_selector_index >= scope.selectorsCarousel.length - 1) {
                    scope.current_selector_index = 0;
                }
                else {
                    scope.current_selector_index++
                }
            };
            scope.OkHandler = function(){
                scope.current_selector = scope.selectorsCarousel[scope.current_selector_index];
                scope.okHandler()(scope.current_selector);
            }

        },
            templateUrl: "static/templates/mini_carousel.html"
    }

});