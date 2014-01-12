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

        $scope.customerfilterFn = function(orderTab){
          console.log("customerfilerFN ",$scope.customerFilter);
          var found = orderTab.customer.customerName.search('/'+$scope.customerFilter+'blue/i');
          if(found >= 0) {
              return true;
          }else{
              return false;
          }
        };
    };


})();