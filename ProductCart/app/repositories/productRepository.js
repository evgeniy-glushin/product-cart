(function () {

    angular.module('app')
        .factory('productRepository', productRepository);

    productRepository.$inject = ['$http', '$q'];

    function productRepository($http, $q) {

        function get(pagams) {
            var deffer = $q.defer();

            $http({
                url: 'api/products',
                method: "GET",
                params: pagams
            })
              .then(function (response) {
                  deffer.resolve(response.data);
              }, function (error) {
                  deffer.reject(error);
              });

            return deffer.promise;
        }

        function setRating(product) {
            var deffer = $q.defer();

            $http.post('api/products', { id: product.id, value: product.rating })
                  .then(function (response) {
                      deffer.resolve(response.data);
                  }, function (error) {
                      deffer.reject(error);
                  });

            return deffer.promise;
        }


        return {
            get: get,
            setRating: setRating
        };
    }

})();