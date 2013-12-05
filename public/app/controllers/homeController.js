(function() {
    'use strict';
    angular.module('app')
        .controller('homeController', ['$scope','util','$modal', homecontroller]);

    /**
     *
     * @param $scope
     * @param util - utilities service, using the logger here
     * @param $modal - bootstrap ui modal service.
     */
    function homecontroller ($scope, util, $modal) {
        $scope.name = "home";

        /**
         * General modal instance. A test right now... would be nice to
         * have a modal used for prompts, wizards, form interaction
         */
        $scope.configModal = function () {
            $scope.message = {
               title: "Widget Config",
               message: "This is a general prompt message",
               items: ['item1', 'item2', 'item3']
            };

            var modalInstance = $modal.open({
                templateUrl: 'modalGeneral.html',
                controller: ModalGeneralCtrl,
                resolve: {
                    message: function () {
                        console.log('init message1 ',$scope.message);
                        return $scope.message;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
                util.logger.info("selected "+selectedItem);
            }, function () {

            });
        };
    };

    /**
     *
     * @param $scope
     * @param $modalInstance
     * @param message
     */
    var ModalGeneralCtrl = function ($scope, $modalInstance, message) {
        $scope.items = message.items;
        $scope.title = message.title;
        $scope.message = message.message;

        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };
})();
