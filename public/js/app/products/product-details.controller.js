(function (app) {
    'use strict';

    // Represents controller for creating and editing product

    ProductDetailsController.$inject = ['$scope', '$modalInstance', 'data', 'Category'];
    app.controller("ProductDetailsController", ProductDetailsController);

    function ProductDetailsController($scope, $modalInstance, data, Category) {

        // #region model

        $scope.model = ng.copy(data);
        Category.query(function (categories) {
            $scope.categories = _.map(categories, function (category) {
                category.id = category._id;
                return category;
            });
        });

        $scope.save = function (item) {
            item.category = {name: item.category.name, id: item.category.id};
            $modalInstance.close({item: item});
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        // #region initialization

        // #region public functions

        // #region private functions
    }
})(app);