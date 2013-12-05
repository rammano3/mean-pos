(function() {
    'use strict';
    
    angular.module('app').run(['util',
        function (util) {
            util.logger.log("app module is loaded and running on " + util.config.server);
    }]);

})();