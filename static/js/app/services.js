'use strict';


var finderServices = angular.module('finderServices', []);
finderServices.factory('share', function(){
    var data = {};
    data.winner = '';
    data.score = 0;
    data.setScores = function(scores) {
        data.score = scores;
    };
    data.subtractScore = function() {
        data.score = data.score - 1;
        return data.score
    };
    return data

});
finderServices.service('$dialog',['$compile','$timeout','$rootScope', function($compile,$timeout, $rootScope){
    return function(content){
        var $dialogw = angular.element('<div dialog-window="'+content+'"></div>');
        angular.element(document.body).append($dialogw);

        $timeout(function() {
             var newScope = $rootScope.$new(true);
             $compile($dialogw)(newScope);
         });
    }
}]);
