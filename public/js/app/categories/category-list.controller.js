(function (app) {
    'use strict';

    CategoryListController.$inject = ['$scope', '$log', 'Dialog', 'Category'];
    app.controller("CategoryListController", CategoryListController);

    function CategoryListController($scope, $log, Dialog, Category) {

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
            var result = confirm("Вы уверены?");

            if (!result) return;

            Category.remove({id: category._id}, _refresh);
        }

        function _edit(category) {
            Dialog
                .open('category-details', category, {title: 'Редактирование категории'})
                .then(function (dialogItem) {
                    Category.update({id: dialogItem.item._id}, dialogItem.item, _refresh);
                });
        }

        function _create() {
            Dialog
                .open('category-details', new Category(), {title: 'Создание категории'})
                .then(function (result) {
                    result.item.$save(function (created) {
                        $scope.model.categories.push(created);
                    });
                });
        }
    }
})(app);