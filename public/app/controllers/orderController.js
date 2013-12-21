angular.module('app').controller('orderController', ['$scope','Items', 'util', '$modal', function ($scope, Items, util, $modal) {

    $scope.order = [];

    $scope.addToOrder = function(item){
        util.logger.info("addToOrder "+item.name);
        /*var newItem = true;
        angular.forEach($scope.order, function(orderItem) {
            if(item.name == orderItem.name)
            {
              orderItem.quantity += 1;
              newItem = false;
            }
        });
        if(newItem){
            $scope.order.push({name: item.name, quantity: 1});
        }*/
    };

    $scope.findItems = function(query) {
        Items.query(query, function(items) {
            $scope.items = items;
        });
    };
}]);