(function (app) {
    'use strict';

    // todo: add module
    app.controller('CategoryListController', [
        '$scope', '$modal', '$log', 'Dialog', 'Category',
        function ($scope, $modal, $log, Dialog, Category) {

            // #region initialization

            ng.extend($scope, {
                model: {
                    categories: Category.query(),
                    refresh: _refresh,
                    remove: _remove,
                    edit: _edit,
                    create: _create
                }
            });

            // #region public functions

            // #region private functions

            function _refresh() {
                $scope.model.categories = Category.query();
            }

            function _remove(category) {
                Category.remove({ id: category._id }, function () {
                    _refresh();
                });
            }

            function _edit(category) {
                Dialog.open('category-details', category, { title: 'Редактирование категории' }).then(function (updated) {
                    Category.update({ id: updated.item._id }, updated.item, function () {
                        $log.debug("category updated");
                        _refresh();
                    });
                });
            }

            function _create() {
                Dialog.open('category-details', new Category(), { title: 'Создание категории' }).then(function (result) {
                    result.item.$save(function (created) {
                        $scope.model.categories.push(created);
                    });
                });
            }
        }
    ]);
})(app);