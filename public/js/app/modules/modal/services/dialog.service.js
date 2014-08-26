(function () {
    'use strict';

    // modal Module
    angular.module('korann.modal')
        .service("Dialog", ['$modal', 'modalMap',
            function ($modal, modalMap) {
                return {
                    open: function (id, data) {
                        var dialogContext = modalMap[id];

                        return $modal.open({
                            templateUrl: dialogContext.templateUrl,
                            controller: dialogContext.controller,
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