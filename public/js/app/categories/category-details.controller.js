(function (app) {
    'use strict';

    /**
     * represents controller for creating and editing category
     */
    app.controller("CategoryDetailsController", [
        '$scope', '$modalInstance', 'data', 'Category',
        function ($scope, $modalInstance, data, Category) {

            // #region model

            $scope.model = ng.copy(data);
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