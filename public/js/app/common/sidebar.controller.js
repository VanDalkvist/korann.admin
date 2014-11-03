(function (app) {
    'use strict';

    app.controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$scope', '$state'];

    function SidebarController($scope, $state) {
        // #region model

        $scope.model = {};

        // #region initialization

        $scope.init = function () {
            $scope.state = $state.current.name;
        };

        // #region public functions

        // #region private functions
    }
})(app);