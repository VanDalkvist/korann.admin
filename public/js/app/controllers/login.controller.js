(function (app) {
    'use strict';

    //
    app.classy.controller({
        name: 'LoginController',
        inject: [ '$rootScope', '$scope', 'userService', '$log', '$state', 'settings' ],

        // #region model

        model: { login: "", password: "", error: "" },

        // #region initialization

        init: function () {
        },

        // #region public functions

        login: function () {
            this.userService
                .login(this.$.model.login, this.$.model.password)
                .then(this._loginSuccess, this._loginFailure);
        },

        // #region private functions

        _loginSuccess: function (result) {
            this.$log.debug("Login successful!");
            this.$rootScope.user = angular.extend({}, result);
            this.$state.go(this.settings.mainState);
        },
        _loginFailure: function (error) {
            this.$log.debug("Login failed! Error is ", error);
            this.$.model.error = error.message;
        }
    });
})(app);