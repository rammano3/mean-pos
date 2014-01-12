(function() {
    'use strict';
    angular.module('app')
        .controller('customerController', ['$scope','util','Global','Order', customerController]);

    function customerController ($scope, util, Global, Order) {
        $scope.name = "customerController";
        $scope.activeCustomer = "";
        //def will come from DB check on next open id and such
        $scope.sequence = 10;
        $scope.activeOrder = "";
        $scope.orders = Order.order;
        $scope.customers = [];

        $scope.selectCustomer = function(customer){
            if($scope.activeOrder.activeClass == "active")
            {
              $scope.activeOrder.activeClass = "";
            }

            Order.selectCustomer(customer);
            $scope.activeCustomer = customer;
            $scope.activeOrder = Order.customerOrder;
            //console.log('selectCustomer activeOrder',$scope.activeOrder);
        };

        $scope.addCustomer = function(){
            $scope.sequence++;
            var addCustomer = {customerID: $scope.sequence, customerName: "C"+$scope.sequence};
            $scope.customers.push(addCustomer);
            $scope.selectCustomer(addCustomer);
        };

        //playing w/ filters
        $scope.filters = {
            name: ""
        };
    };

    // nested in Customer controller, ng repeat controller for customer tabs
    angular.module('app').controller(
        "customerListController",
        function( $scope ) {
            // I determine if the current line item should be
            // hidden from view due to the current search filter.
            $scope.isExcludedByFilter = applySearchFilter();
            // ---
            // WATCHERS.
            // ---
            // Any time the search filter changes, we may have to
            // alter the visual exlcusion of our line item.
            $scope.$watch(
                "filters.name",
                function( newName, oldName ) {
                    if ( newName === oldName ) {
                        return;
                    }
                    applySearchFilter();
                }
            );
            // ---
            // PRIVATE METHODS.
            // ---
            // I apply the current search filter to the friend
            // controlled by this line item.
            function applySearchFilter() {
                var filter = $scope.filters.name.toLowerCase();
                var name = $scope.orderTab.customer.customerName.toLowerCase();
                var isSubstring = ( name.indexOf( filter ) !== -1 );

                // If the filter value is not a substring of the
                // name, we have to exclude it from view.
                $scope.isExcludedByFilter = ! isSubstring;

            }
        }

    );

})();

