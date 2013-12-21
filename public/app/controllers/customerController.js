(function() {
    'use strict';
    angular.module('app')
        .controller('customerController', ['$scope','util', customerController]);

    function customerController ($scope, util) {
        $scope.name = "customerController";
    };
})();