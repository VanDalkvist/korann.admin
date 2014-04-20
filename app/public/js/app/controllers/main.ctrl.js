(function (app) {
    'use strict';

    // 
    app.controller("MainCtrl", ['$rootScope', 'userService', '$location',
        function ($rootScope, userService, $location) {

            // #region initialization

            var savedUser = userService.current();

            if (!savedUser) return;

            $rootScope.user = {
                username: savedUser.username
            };

            // #region public functions

            $rootScope.logout = _logout;

            // #region private functions

            function _logout() {
                userService.logout().then(function () {
                    delete $rootScope.user;
                    console.log("Logout successful!");
                    $location.path("/login");
                });
            }
        }]);
})(app);