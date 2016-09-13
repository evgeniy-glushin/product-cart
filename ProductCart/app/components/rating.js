(function () {
    "use strict";

    var module = angular.module('app');

    module.component('rating', {
        templateUrl: '/app/views/rating.html',
        bindings: {
            value: '<',
            max: '<',
            setRating: '&'
        },
        controllerAs: 'vm',
        controller: function () {
          
        }
    });

}());