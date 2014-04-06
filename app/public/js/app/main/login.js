(function (app) {
    'use strict';

    // 
    app.controller("LoginCtrl", ['$scope', function ($scope) {

        // #region model

        console.log("login");

        $scope.on('routeChangeSuccess', function () {
            console.log("routeChangeSuccess");
        });

        $scope.on('routeChangeError', function () {
            console.log("routeChangeError");
        });

        $scope.on('routeUpdate', function () {
            console.log("routeUpdate");
        });

        $scope.on('routeChangeSuccess', function () {
            console.log("routeChangeSuccess");
        });

        // #region initialization

        // #region public functions

        // #region private functions

    }]);
})(app);