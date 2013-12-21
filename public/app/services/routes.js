(function() {
    'use strict';

    var viewBase = 'app/views/';
    
    // Declare all the routes.  
    // Those with a name will be visible in the navigation bar.
    // Those with a token (e.g., :tag) are used for sub-navigation within a view.
    var navRoutes = [
        //{ name: 'Home', path: '/', templateUrl: viewBase + 'home.html', controller: 'homeController' },
        { name: 'Home', path: '/', templateUrl: viewBase + '/dash/order.html', controller: 'orderController' },

        { name: 'form_elements', path: '/form_elements', templateUrl: viewBase + 'form_elements.html' },

        { name: 'About', path: '/about', templateUrl: viewBase + 'about.html' },

        { path: '/test/', templateUrl: viewBase + 'test.html', controller: 'testController' },
        { path: '/test/:id', templateUrl: viewBase + 'test.html', controller: 'testController' }
    ];
    
    var routes = {
        navRoutes: navRoutes,
        // visible routes are those that have a (display) name
        visibleNavRoutes: navRoutes.filter(function (item) { return item.name; }),
    };

    var app = angular.module('app')
        .value('routes', routes)
        .config(['$routeProvider', function ($routeProvider) {
            navRoutes.forEach(function (route) {
                setRouteResolve(route);
                $routeProvider.when(route.path, route);
            });
        $routeProvider.otherwise({ redirectTo: '/' });
    }]);
    
    function setRouteResolve(route) {
        var controllerName = route.controller;
        var resolve = app.routeResolve[controllerName];
        if (resolve) {
            doSomethingBeforeRoute();
            route.resolve = resolve;
        }

        function doSomethingBeforeRoute() {

        }
    }

})();