(function (app) {
    'use strict';

    // represents controller for creating and editing product
    app.controller("ProductDetailsController", [
        '$scope', '$modalInstance', 'data', 'Category',
        function ($scope, $modalInstance, data, Category) {

            // #region model

            $scope.model = ng.copy(data);
            Category.query(function (categories) {
                $scope.categories = _.map(categories, function (category) {
                    category.id = category._id;
                    return category;
                });
            });

            $scope.save = function (item) {
                item.category = { name: item.category.name, id: item.category.id };
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