angular.module('app').controller('itemsController', ['$scope', '$routeParams', '$location', 'Items', 'util', function ($scope, $routeParams, $location, Items, util) {

    $scope.create = function() {
        var item = new Items({
            name: this.name,
            price: this.price,
            category: this.category
        });
        item.$save(function(response) {
            //$location.path("items/" + response._id);
            $location.path("/");
        });

        this.name = "";
        this.price = "";
        this.category = "";
    };

    $scope.remove = function(item) {
        item.$remove();

        for (var i in $scope.items) {
            if ($scope.items[i] == article) {
                $scope.items.splice(i, 1);
            }
        }
    };

    $scope.update = function() {
        var item = $scope.item;
        if (!item.updated) {
            item.updated = [];
        }
        item.updated.push(new Date().getTime());

        item.$update(function() {
            $location.path('items/' + item._id);
        });
    };

    $scope.find = function(query) {
        Items.query(query, function(items) {
            $scope.items = items;
        });
    };

    $scope.findOne = function() {
        Items.get({
            itemId: $routeParams.itemId
        }, function(item) {
            $scope.item = item;
        });
    };
}]);