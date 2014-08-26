(function (app) {
    'use strict';

    // todo: add module
    app.controller('CategoriesController', [
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
                category.$remove(function () {
                    // todo: delete from list
                    _refresh();
                });
            }

            function _edit(category) {
                Dialog.open('category-edit', category).then(function (updated) {
                    Category.update({ id: updated.item._id }, updated.item, function () {
                        $log.debug("category updated");
                        _refresh();
                    });
                });
            }

            function _create() {
                Dialog.open('category-create', new Category()).then(function (updated) {
                    Category.update({ id: updated.item._id }, updated.item, function () {
                        _refresh();
                    });
                });
            }
        }
    ]);
})(app);