(function () {
    'use strict';

    angular.module('korann.config.auth')
        .config(['$httpProvider', function ($httpProvider) {
            /*
             Set up an interceptor to watch for 401 errors.
             The server, rather than redirect to a login page (or whatever), just returns  a 401 error
             if it receives a request that should have a user session going.  Angular catches the error below
             and says what happens - in this case, we just redirect to a login page.  You can get a little more
             complex with this strategy, such as queueing up failed requests and re-trying them once the user logs in.
             Read all about it here: http://www.espeo.pl/2012/02/26/authentication-in-angularjs-application
             */
            var interceptor = [
                '$q', '$location', '$rootScope', 'cache',
                function ($q, $location, $rootScope, cache) {
                    function success(response) {
                        return response;
                    }

                    function error(response) {
                        var status = response.status;
                        if (status == 401 || status == 403) {
                            $rootScope.redirectUrl = $location.url();
                            $rootScope.user = { };
                            cache.remove('user');
                            $location.path('/login');
                        }
                        return $q.reject(response);
                    }

                    return function (promise) {
                        return promise.then(success, error);
                    }
                }
            ];
            $httpProvider.responseInterceptors.push(interceptor);
        }]);
})();