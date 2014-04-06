(function () {
    'use strict';

    // services Module
    angular.module('korann.user', [])
        .service('userService', ['$http', function ($http) {

            // #region initialization

            return {
                get: _get,
                login: _login,
                logout: _logout
            };

            // #region private functions

            function _get() {
                var url = '/user';

                // todo: fill headers
                return $http.get(url);
            }

            function _login(login, password) {
                var url = '/user/login';

                // todo: save data to session storage
                return $http.post(url, { login: login, password: password });
            }

            function _logout() {
                var url = '/user/logout';

                // todo: delete data from session storage
                return $http.post(url, {});
            }
        }]);
})();