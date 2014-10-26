(function (app) {
    'use strict';

    // #region controller initialization

    LoginController.$inject = ['$rootScope', '$scope', '$log', '$state', 'userService', 'settings'];
    app.controller('LoginController', LoginController);

    function LoginController($rootScope, $scope, $log, $state, userService, settings) {
        // #region model

        $scope.model = {login: "", password: "", error: ""};

        // #region initialization

        $scope.init = function () {
        };

        // #region public functions

        $scope.login = function () {
            userService
                .login($scope.model.login, $scope.model.password)
                .then(_loginSuccess, _loginFailure);
        };

        // #region private functions

        function _loginSuccess(result) {
            $log.debug("Login successful!");
            $rootScope.user = angular.extend({}, result);
            $state.go(settings.mainState);
        }

        function _loginFailure(error) {
            $log.debug("Login failed! Error is ", error);
            $scope.model.error = error.message;
        }
    }
})(app);