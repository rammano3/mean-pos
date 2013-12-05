(function () {
    'use strict';
    angular.module('app').factory('util',       
        ['config','logger','$timeout','$rootScope', util]);

    function util(config, logger, $timeout, $rootScope) {

        
        var service = {
            // bundle these so util clients don't have to get them
            $timeout: $timeout,
            config: config,
            logger: logger,
  
            // actual utilities
            $apply: $apply,
            $broadcast: $broadcast,
            keyArray: keyArray
        };
        
        return service;
        
        function $broadcast() {
            return $rootScope.$broadcast.apply($rootScope, arguments);
        }
        
        /*********************************************************
        * @method $apply {Void} easy access to $rootScope.$apply
        * @param [func]{function} optional niladic function to call
        *********************************************************/
        function $apply() {
            if ($rootScope.$$phase) {
                // from http://docs.angularjs.org/api/ng.$rootScope.Scope
                if (arguments[0]) {
                    try {
                        $rootScope.$eval(arguments[0]);
                    } catch(e) {
                        logger.error(e);
                    }
                }
            } else {
                $rootScope.$apply.apply($rootScope, arguments);
            }           
        }

        /*********************************************************
        // Convert an array into an object.  The returned object has keys defined by the keyfn,
        // and values from the original array.  If there are duplicate keys, the resulting object
        // has the value of the last key.
        // arr: array of objects
        // keyfn: function to get the desired group key from each object
        // See utilSpec.js for an example.
        *********************************************************/
        function keyArray(arr, keyfn) {
            var map = {};
            arr.forEach(function (o) {
                var key = keyfn(o);
                map[key] = o;
            });
            return map;
        }

    }
})();