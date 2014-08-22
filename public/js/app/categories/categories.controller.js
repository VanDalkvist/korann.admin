(function (app) {
    'use strict';

    // todo: add module
    app.controller('CategoriesController', [
        '$scope', 'Category', '$modal', '$log',
        function ($scope, Category, $modal, $log) {
            // #region initialization

            $scope.model = {
                categories: Category.query()
            };

            // #region public functions

            $scope.refresh = function refresh() {
                $scope.model.categories = Category.query();
            };
            $scope.save = function save(category) {
                category.$update();
            };
            $scope.edit = function edit(category) {
                var modalInstance = $modal.open({
                    templateUrl: '/views/widgets/category-edit.html',
                    controller: 'CategoryCreateController',
                    resolve: {
                        data: function () {
                            return ng.copy(category);
                        },
                        mode: function () {
                            return 'edit';
                        }
                    }
                });
                modalInstance.result.then(function (updated) {
                    Category.update({ id: updated.item._id }, updated.item, function () {
                        // todo: updated notification
                        $log.debug("category updated");
                    });
                })
            };
            $scope.remove = function remove(category) {
                category.$remove();
            };
            $scope.newCategory = function newCategory() {
                $scope.createModel = new Category();
                var modalInstance = $modal.open({
                    templateUrl: '/views/widgets/category-edit.html',
                    controller: 'CategoryCreateController',
                    resolve: {
                        data: function () {
                            return $scope.createModel;
                        },
                        mode: function () {
                            return 'create';
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    //                $scope.selected = selectedItem;
                });
            };

            $scope.create = function create() {
                $scope.createModel.$save();
            };

            // #region private functions (_ prefixed)
        }
    ]);
})(app);