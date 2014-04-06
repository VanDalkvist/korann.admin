(function (app) {
    'use strict';

    //
    app.controller("LoginCtrl", ['$rootScope', '$scope', 'userService', '$location',
        function ($rootScope, $scope, userService, $location) {

            // #region model

            $scope.model = {
                login: "",
                password: "",
                error: ""
            };

            // #region public functions

            $scope.submit = _submit;

            // #region private functions

            function _submit() {
                userService
                    .login($scope.model.login, $scope.model.password)
                    .then(function (result) {
                        console.log("Login successful!");
                        $rootScope.user = angular.extend({}, result);
                        $location.path("/");
                    },
                    function (error) {
                        console.log("Login failed! Error is ", error);
                        $scope.model.error = error.message;
                    });
            }

            function _logout() {
                userService.logout().then(function (result) {
                    console.log("Logout successful!");
                });
            }
        }]);
})(app);