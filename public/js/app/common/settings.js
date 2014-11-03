(function (app) {
    'use strict';

    app.constant('settings', settings());

    function settings() {
        return {
            mainState: 'dashboard.panel'
        };
    }
})(window.app);