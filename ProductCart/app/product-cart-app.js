(() => {
    angular.module('app')
           .component('productCartApp', {
               templateUrl: '/app/views/product-cart-app.html',
               $routeConfig: [
                   { path: '/:filter', component: 'productsList', name: 'ProductsList' },
                   { path: '/**', redirectTo: ['ProductsList', { filter: '' }] }
               ]
           });

})();