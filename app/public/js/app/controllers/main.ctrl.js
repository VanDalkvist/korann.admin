(function (app) {
    'use strict';

    // 
    app.classy.controller({
        name: 'MainCtrl',
        inject: ['$rootScope', 'userService', '$location'],

        // #region initialization
        init: function () {
            var savedUser = this.userService.current();

            if (!savedUser) return;

            this.$rootScope.user = {
                username: savedUser.username
            };

            // #region public functions

            this.$rootScope.logout = this._logout;
        },

        // #region private functions
        _logout: function () {
            this.userService.logout().then(this._logoutSuccess);
        },

        _logoutSuccess: function () {
            delete this.$rootScope.user;
            console.log("Logout successful!");
            this.$location.path("/login");
        }
    });
})(app);