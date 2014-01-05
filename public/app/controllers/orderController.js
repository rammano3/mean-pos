angular.module('app').controller('orderController', ['$scope','Items', 'Order', 'util', '$modal', function ($scope, Items, Order, util, $modal) {

    $scope.order = [];

    $scope.addToOrder = function(item){
        util.logger.info(item.name);
        Order.addToOrder(item);
    };

    $scope.findItems = function(query) {
        Items.query(query, function(items) {
            $scope.items = items;
        });
    };
}]);