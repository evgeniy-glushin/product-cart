(function () {
    "use strict";

    angular.module("app", ['ngComponentRouter'])
           .value('$routerRootComponent', 'productCartApp');


    //configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

    //function configRoutes($stateProvider, $urlRouterProvider) {
    //    $stateProvider
    //        .state('home', {
    //            url: '/',
    //            template: '<products-list></products-list>'
    //        })
    ////}
    //angular.module("app", ['ngComponentRouter']) //['ui.router']
    //    .config(configRoutes);
}());