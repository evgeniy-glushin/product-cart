(function () {

    angular.module('app')
        .factory('productRepository', productRepository);

    productRepository.$inject = ['$http', '$q'];

    function productRepository($http, $q) {

        function getAll() {
            var deffer = $q.defer();

            $http.get('api/products')
              .then(function (response) {
                  deffer.resolve(response.data);
              }, function (error) {
                  deffer.reject(error);
              })

            return deffer.promise;
        }

        function get(categoryId) {
            var deffer = $q.defer();

            $http.get('api/products/' + categoryId)
              .then(function (response) {
                  deffer.resolve(response.data);
              }, function (error) {
                  deffer.reject(error);
              })

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
            getAll: getAll,
            get: get,
            setRating: setRating
        };
    }

})();