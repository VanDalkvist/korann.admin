(function (app) {
    'use strict';

    // 
    app.classy.controller({
        name: 'ProductsController',
        inject: ['$scope'],

        // #region model

        model: {
//            products:
        },

        // #region initialization

        init: function () {
            this.$.model = {
                products: [
                    {
                        id: '1',
                        name: 'Масло',
                        description: 'Hello, Масло!'
                    },
                    {
                        id: '2',
                        name: 'Шампунь',
                        description: 'Hello, Шампунь!'
                    },
                    {
                        id: '3',
                        name: 'Крем',
                        description: 'Hello, Крем!'
                    },
                    {
                        id: '4',
                        name: 'Маска',
                        description: 'Hello, Маска!'
                    },
                    {
                        id: '5',
                        name: 'Зубная паста',
                        description: 'Hello, Зубная паста!'
                    }
                ]
            };
        }

        // #region public functions

        // #region private functions (_ prefixed)

    });
})(app);