(function (app) {
    'use strict';

    // represents controller for creating and editing product
    app.controller("ProductCreateController", [
        '$scope', '$modalInstance', 'data', 'mode', 'Category',
        function ($scope, $modalInstance, data, mode, Category) {

            // #region model

            $scope.model = ng.copy(data);
            $scope.mode = mode;
            $scope.categories = Category.query();

            $scope.save = function (item) {
                $modalInstance.close({ item: item });
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            // #region initialization

            // #region public functions

            // #region private functions
        }
    ]);
})(app);