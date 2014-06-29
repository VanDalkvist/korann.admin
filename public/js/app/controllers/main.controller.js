(function (app) {
    'use strict';

    app.classy.controller({
        name: 'MainController',
        inject: ['$rootScope', 'userService', '$location', '$state'],

        // #region initialization

        init: function () {
            this.$rootScope.logout = this._logout;
        },

        // #region private functions

        _logout: function () {
            this.userService.logout().then(this._logoutSuccess);
        },

        _logoutSuccess: function () {
            delete this.$rootScope.user;
            console.log("Logout successful!");
            this.$state.go("login");
        }
    });
})(app);