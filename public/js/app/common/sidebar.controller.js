(function (app) {
    'use strict';

    SidebarController.$inject = ['$scope', '$state'];
    app.controller('SidebarController', SidebarController);

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