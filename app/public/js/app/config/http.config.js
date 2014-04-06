(function () {
    'use strict';

    angular.module('korann.config.http')
        .config(['$httpProvider', function ($httpProvider) {
            var interceptor = ['$q', function ($q) {
                function success(response) {
                    var contentType = response.headers()['content-type'];

                    if (contentType === "application/json; charset=utf-8")
                        return response.data;

                    return response;
                }

                function error(response) {
                    return $q.reject(response.data && response.data.error);
                }

                return function (promise) {
                    return promise.then(success, error);
                }
            }];

            $httpProvider.responseInterceptors.push(interceptor);
        }]);
})();