(function () {
    'use strict';
    
    // configure toastr for this app
    toastr.options.timeOut = 2000; // 2 second toast timeout
    toastr.options.positionClass = 'toast-bottom-right';

    var app = angular.module('app');
    
    app.factory('config', ['environment', config]);
    
    function config(environment) {
        return {
            version: '0.0.1',
            server: environment.server,
            environment: environment.environment,
            serverTimeoutMs: 5000 // 5 seconds should be long enough
        };
    }
    
})();