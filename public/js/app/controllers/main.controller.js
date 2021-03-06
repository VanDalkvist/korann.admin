(function (app) {
    'use strict';

    app.controller('MainController', MainController);

    MainController.$inject = ['$rootScope', 'userService', '$location', '$state'];

    function MainController($rootScope, userService, $location, $state) {
        // #region initialization

        $rootScope.init = function () {
            $rootScope.logout = _logout;
        };

        // #region private functions

        // todo: rewrite to events

        function _logout() {
            userService.logout().then(_logoutSuccess);
        }

        function _logoutSuccess() {
            delete $rootScope.user;
            console.log("Logout successful!");
            $state.go("login");
        }
    }
})(app);