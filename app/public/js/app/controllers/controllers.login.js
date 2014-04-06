(function (app) {
    'use strict';

    //
    app.controller("LoginCtrl", ['$scope', 'userService',
        function ($scope, userService) {

            // #region model

            $scope.model = {
                login: "",
                password: ""
            };

            // #region initialization

            // #region public functions

            $scope.submit = _submit;

            // #region private functions

            function _submit() {
                userService.login($scope.model.login, $scope.model.password).then(function (result) {
                    console.log("Login successful!");
                });
            }

            function _logout() {
                userService.logout().then(function (result) {
                    console.log("Logout successful!");
                });
            }
        }]);
})(app);