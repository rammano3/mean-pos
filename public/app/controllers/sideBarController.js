(function() {
    'use strict';
    angular.module('app')
        .controller('sideBarController', ['$scope','util', sideBarController]);

    function sideBarController ($scope, util) {
        $scope.name = "home";

        $scope.scrollUp = function(){
            $("html, body").animate({ scrollTop: 0 }, 700);
            return false;
        }
    };
})();