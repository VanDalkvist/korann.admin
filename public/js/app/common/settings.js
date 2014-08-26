(function (app) {
    'use strict';
    
    app.constant('settings', (function () {
            return {
                mainState: 'dashboard.panel'
            };
        })()
    );
})(window.app);