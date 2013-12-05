(function () {
    'use strict';
    angular.module('app')

    .directive('appVersion', ['config', function(config) {
        return function(scope, elm) {
            elm.text(config.version);
        };
    }])

   /**
    *  DOM effects
    *  guess i want them global, will module out when it geta big
    */
    .directive('animateProgressBar', ['$timeout',function($timeout) {
        return function(scope, elm, attrs) {
            $timeout(function(){elm.css('width', attrs.percentage)},100);
        };
    }])

    .directive('scrollUpOnClick', function() {
        return {
            restrict: 'A',
            link: function(scope, $elm) {
                $elm.on('click', function() {
                    $("html, body").animate({ scrollTop: 0 }, 700);
                });
            }
        }
    });

})();