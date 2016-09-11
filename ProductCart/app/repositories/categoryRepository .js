(function () {

    angular.module('app')
        .factory('categoryRepository', categoryRepository);

    categoryRepository.$inject = ['$http', '$q'];

    function categoryRepository($http, $q) {
        function getAll() {
            var deffer = $q.defer();

            $http.get('api/categories')
              .then(function (response) {
                  deffer.resolve(response.data);
              }, function (error) {
                  deffer.reject(error);
              })

            return deffer.promise;
        }

        return {
            getAll: getAll
        };
    }

})();