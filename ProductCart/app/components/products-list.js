(function () {
    "use strict";

    var module = angular.module('app');
    
    module.component('productsList', {
        templateUrl: '/app/views/product-list.html',
        controllerAs: 'vm',
        controller: controller
    });

    controller.$inject = ['productRepository', 'categoryRepository'];

    function controller(productRepository, categoryRepository) {
        var vm = this;

        vm.products = [];
        vm.categories = [];
     
        vm.$routerOnActivate = function (next, prev) {
            var params = next.params.filter ? parseQueryStringParams(next.params.filter) : next.params;

            categoryRepository.getAll()
               .then(function (data) {
                   angular.extend(vm.categories, data);

                   if (params.categoryId)
                       setSelectedCategory(params.categoryId)
               }, function (error) {

               });

            var filterValue = params.categoryId || params.searchTxt;            
            if (filterValue)
                productRepository.get(filterValue)
                      .then(function (data) {
                          vm.products = [];
                          angular.extend(vm.products, data);

                          if (params.searchTxt)
                              setSearchTxt(params.searchTxt);
                      }, function (error) {

                      });
            else
                productRepository.getAll()
                    .then(function (data) {
                        angular.extend(vm.products, data);
                    }, function (error) {

                    });
        };
        
        function parseQueryStringParams(filter) {
            var queryStringParams = { searchTxt: '', categoryId: 0 };

            var searchTxtRegex = /searchTxt=(\w+)/;
            var searchTxtRegexMatch = filter.match(searchTxtRegex);
            if (searchTxtRegexMatch)
                queryStringParams.searchTxt = searchTxtRegexMatch[1];

            var categoryIdRegex = /categoryId=(\d+)/;
            var categoryIdRegexMatch = filter.match(categoryIdRegex);
            if (categoryIdRegexMatch)
                queryStringParams.categoryId = categoryIdRegexMatch[1];

            return queryStringParams;
        }

        function setSelectedCategory(categoryId) {
            var category = _.find(vm.categories, function (c) { return c.id == categoryId });
            if (category)
                category.selected = true;
        }

        function setSearchTxt(searchTxt) {
            vm.searchTxt = searchTxt;
        }

        vm.setRating = function (product, rating) {
            product.rating = rating;

            productRepository.setRating(product)
                  .then(function (data) {

                  }, function (error) {

                  });
        };
    }

}());