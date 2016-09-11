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
        //transclude: true,
        controllerAs: 'vm',
        controller: function () {
            var vm = this;
            //vm.setRating = function (value) {
            //    vm.value = value;
            //    console.log(value);
            //}
            //vm.$onChanges = () => vm.entries = new Array(vm.value);
        }
    });

}());