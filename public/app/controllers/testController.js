(function() {
    'use strict';

    angular.module('app').controller('testController',
    ['$scope', '$routeParams', 'logger', testController]);
    
    function testController($scope, $routeParams, dataservice, logger) {
        logger.log("testController created") ;
    };

})();