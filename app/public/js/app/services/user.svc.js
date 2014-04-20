(function () {
    'use strict';

    angular.module('korann.user', ['korann.cache'])
        .service('userService', ['$http', '$location', 'cache',
            function ($http, $location, cache) {

                // #region initialization

                return {
                    current: _get,
                    login: _login,
                    logout: _logout
                };

                // #region private functions

                function _get() {
                    var user = cache.get("user");

                    if (user) return user;

                    $location.path("/login");
                }

                function _login(login, password) {
                    var url = '/user/login';

                    return $http.post(url, { login: login, password: password }).then(function (res) {
                        cache.put("user", res);
                        return res;
                    });
                }

                function _logout() {
                    var url = '/user/logout';
                    return $http.post(url, {}).then(function () {
                        cache.remove("user");
                    });
                }
            }]);
})();