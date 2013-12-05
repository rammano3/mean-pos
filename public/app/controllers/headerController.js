(function() {
    'use strict';
    angular.module('app')
        .controller('headerController', ['$scope','util', headerController]);

    function headerController ($scope, util) {
        $scope.name = "home";
    };
})();