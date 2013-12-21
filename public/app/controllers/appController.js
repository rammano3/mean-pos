(function() {
    'use strict';
    
    angular.module('app').controller('appController',
        ['$rootScope', '$scope', 'logger', 'util', controller]);
    
    function controller($rootScope, $scope, logger, util) {

        $rootScope.name = "app";
        $scope.MainMenuToggled = true; //setting to true because it immediately reverses boolean. want it to hide on default.
        $scope.SideRightToggled = true; //setting to false true it immediately reverses boolean. want it to show on default.
        $scope.classes = {body_right_margin : "body-right-margin"};

        util.logger.info("App Initialized");

        //route change event handlers
        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
            var reason = rejection || "failed to change routes";
            logger.log(reason);
        });

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            var leaving = current ? "Leaving " + current.path + ". " : "";
            logger.log(leaving + "Going to " + next.path);
        });

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            logger.log("Route change succeeded; arriving at " + current.path);
        });

        $rootScope.$on('$routeUpdate', function (event) {
            logger.log("Reloading the route with different query params, keeping the same controller instance");
        });//init in normal menu mode

        $scope.init = function(){
            $scope.toggleMainMenu();
        }

        $scope.toggleMainMenu = function(){
            $scope.MainMenuToggled = !$scope.MainMenuToggled;
            if($scope.MainMenuToggled){
                $scope.classes.sidebar_mini = "";
                $scope.classes.page_content = "";
                $scope.classes.sidebar_scrollup = "";
            }else{
                $scope.classes.sidebar_mini = "mini";
                $scope.classes.page_content = "condensed";
                $scope.classes.sidebar_scrollup = "to-edge";
            }
        }

        $scope.toggleSideRight = function(){
            $scope.SideRightToggled = !$scope.SideRightToggled;
            if($scope.SideRightToggled){
                $scope.classes.body_right_margin = "body-right-margin";
            }else{
               $scope.classes.body_right_margin = "";
            }
        }
    }
})();
