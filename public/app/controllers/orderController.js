angular.module('app').controller('orderController', ['$scope','Items', 'Order', 'util', '$modal', function ($scope, Items, Order, util, $modal) {

    $scope.order = [];
    $scope.categories = [{name:"Beer"},{name:"Liquor"},{name:"Food"},{name:"Merch"}];

    $scope.addToOrder = function(item){
        util.logger.info(item.name);
        //Order.addToOrder(item);
        Order.customerOrder.addItem(item.sku, item.name, item.price, +1)
    };

    $scope.findItems = function(query) {
        Items.query(query, function(items) {
            $scope.items = items;
            $scope.appInit();
        });
    };
}]);