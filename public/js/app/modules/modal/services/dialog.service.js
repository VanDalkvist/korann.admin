(function () {
    'use strict';

    // modal Module
    angular.module('korann.modal')
        .service("Dialog", ['$rootScope', '$modal', 'modalMap',
            function ($rootScope, $modal, modalMap) {
                return {
                    open: function (id, data) {
                        var dialogContext = modalMap[id];

                        return $modal.open({
                            templateUrl: dialogContext.templateUrl,
                            controller: dialogContext.controller,
                            scope: $rootScope.$new(),
                            resolve: {
                                data: function () {
                                    return ng.copy(data);
                                },
                                title: dialogContext.title
                            }
                        }).result;
                    }
                };
            }
        ]);
})();