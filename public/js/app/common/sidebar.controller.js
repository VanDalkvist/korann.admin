(function (app) {
    'use strict';

    // 
    app.classy.controller({
        name: 'SidebarController',
        inject: [ '$scope', '$state' ],

        // #region model

        model: {
        },

        // #region initialization

        init: function () {
            this.$.state = this.$state.current.name;
        }

        // #region public functions

        // #region private functions (_ prefixed)

    });
})(app);