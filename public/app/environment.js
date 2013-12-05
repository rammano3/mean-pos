(function () {
    'use strict';

    var app = angular.module('app');

    var environment = {
        environment: 'Development',
        server: "Express"
    };
    app.constant('environment', environment);

})();