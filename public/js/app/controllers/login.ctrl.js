(function (app) {
    'use strict';

    //
    app.classy.controller({
        name: 'LoginCtrl',
        inject: ['$rootScope', '$scope', 'userService', '$location'],

        // #region model

        model: {
            login: "",
            password: "",
            error: ""
        },

        // #region initialization

        init: function () {
        },

        // #region public functions

        submit: function () {
            this.userService
                .login(this.$.model.login, this.$.model.password)
                .then(this._loginSuccess, this._loginFailure);
        },

        // #region public functions

        _loginSuccess: function (result) {
            console.log("Login successful!");
            this.$rootScope.user = angular.extend({}, result);
            this.$location.path("/");
        },
        _loginFailure: function (error) {
            console.log("Login failed! Error is ", error);
            this.$.model.error = error.message;
        }
    });
})(app);