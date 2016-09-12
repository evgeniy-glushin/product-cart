(function () {
    "use strict";

    var module = angular.module('app');

    module.component('pagination', {
        templateUrl: '/app/views/pagination.html',
        bindings: {
            page: '<',
            total: '<',
            goToPage: '&'
        },
        controllerAs: 'vm',
        controller: function () {

        }
    });

}());