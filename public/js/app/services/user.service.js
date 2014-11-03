(function () {
    'use strict';

    angular
        .module('korann.user', ['korann.cache'])
        .service('userService', userService);

    userService.$inject = ['$http', '$location', 'cache', '$state'];

    function userService($http, $location, cache, $state) {

        // #region initialization

        return {
            current: _get,
            login: _login,
            logout: _logout
        };

        // #region private functions

        function _get() {
            return $http.get('/user/session').then(function (res) {
                if (res) {
                    cache.put("user", res);
                    return res;
                }

                cache.remove("user");
                $state.go("login");

                return res;
            });
        }

        function _login(login, password) {
            var url = '/user/login';

            return $http.post(url, {login: login, password: password}).then(function (res) {
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
    }
})();