'use strict';

var finderDirectives = angular.module('finderDirectives', []);

finderDirectives.directive('goPage',[
    function($location){
        return function($scope, $element, $attrs){
            var path;
            $attrs.$observe('goPage', function(value){
                path = value;
            });
            $element.bind('click', function(){
                $scope.$apply(function(){
                    $location.path(path);
                })
            })
        }
    }
])