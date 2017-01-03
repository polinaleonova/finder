'use strict';

var finderDirectives = angular.module('finderDirectives', []);

finderDirectives.directive('miniCarousel', ['share', function(share) {

    return {
        restrict: "E",
        scope: {selectorsCarousel: "=selectors",
                leftb: "@lftBtn",
                rightb: "@rghtBtn",
                okHandler: "&"
                },
        link: function($scope){
            $scope.current_selector_index = 0;
            $scope.preElement = function(){
                if ($scope.current_selector_index <= 0){
                    $scope.current_selector_index = $scope.selectorsCarousel.length - 1;
                }
                else{
                    $scope.current_selector_index--
                }
            };
            $scope.nextElement = function() {
                if ($scope.current_selector_index >= $scope.selectorsCarousel.length - 1) {
                    $scope.current_selector_index = 0;
                }
                else {
                    $scope.current_selector_index++
                }
            };
            $scope.OkHandler = function(){
                $scope.current_selector = $scope.selectorsCarousel[$scope.current_selector_index];
                $scope.okHandler()($scope.current_selector);
            }

        },
            templateUrl: "static/templates/mini_carousel.html"
    }

}]);
finderDirectives.directive('makeFrame', function() {
    return {
        restrict: "A",
        replace: false,
        template: '<div><div class="frame_top_left"></div><div class="frame_bottom_right"></div></div>'
    }

});

finderDirectives.directive('dialogWindow',['$timeout', '$compile','$location', 'share', function($timeout, $compile, $location, share) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: "static/templates/make_alert.html",
        link: function($scope, $element, $attrs) {
            $scope.winner = share.winner;
            $scope.visible = true;
            $scope.content = $attrs.dialogWindow;
            $scope.$overlay = angular.element('<div class="dialog-overlay ng-hide" ng-show="visible"></div>');
            angular.element(document.body).append($scope.$overlay);
            $compile($scope.$overlay)($scope);
            $scope.set_to_start = function(){
                $scope.visible = false;
                $location.path('/');
                window.location.reload();
            };
            $scope.end_game = function(){
                $scope.visible = false;
               $location.path('/parallax_page/');
    //            window.location.reload();
            };
    }


  }
}]);