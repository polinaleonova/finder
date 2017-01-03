'use strict';


var finderServices = angular.module('finderServices', []);

finderServices.factory('share', function($http){
    var game_data; // data for directive carousel
    var share_data = {winner:'', game_field:[], score: 0};
    share_data.getData = function() {
        var request = {
            method: 'GET',
            url: 'static/game_data.json'
            };
        $http(request).then(function (resp) {
            game_data = resp.data;
            share_data.all_elements = Object.keys(game_data["elements"]);
            share_data.all_levels = Object.keys(game_data["levels"]);

        });
    };
    share_data.setGameParametrs = function (players, selected_difficulty_level, selected_element) {
        var elements_list = game_data.elements[selected_element],
            count_elements = game_data.levels[selected_difficulty_level][0];
        share_data.game_field = doubling_and_shuffle_elements(elements_list, count_elements);
        share_data.score = game_data.levels[selected_difficulty_level][1];
        share_data.cells_size = 100/(Math.sqrt(count_elements))-1; //for calculation width and height of cells
    };
    share_data.getGameList = function() {
        return share_data.game_field
    };
    share_data.subtractScore = function() {
        share_data.score = share_data.score - 1;
        return share_data.score
    };
    return share_data

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
