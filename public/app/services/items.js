//Articles service used for articles REST endpoint
angular.module('app').factory("Items", ['$resource', function($resource) {
    return $resource('items/:itemId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);