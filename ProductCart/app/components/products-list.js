(function () {
    "use strict";

    var module = angular.module('app');

    module.component('productsList', {
        templateUrl: '/app/views/product-list.html',
        controllerAs: 'vm',
        controller: controller,
        bindings: {
            '$router': '<'
        }
    });

    controller.$inject = ['productRepository', 'categoryRepository'];

    function controller(productRepository, categoryRepository) {
        var vm = this;

        vm.products = [];
        vm.categories = [];

        //TODO: let user to choose pageSize.
        var pageSize = 6;
            
        vm.goToPage = function (newPage) {
            if (newPage == vm.page) return;

            var queryStr = '?page=' + newPage + '&pageSize=' + pageSize;

            //add categoryId to queryStr if category was selected by user
            var selectedCategory = _.find(vm.categories, function (c) { return c.selected; });
            if (selectedCategory)
                queryStr += '&categoryId=' + selectedCategory.id;

            if (vm.searchTxt)
                queryStr += '&searchTxt=' + vm.searchTxt;

            vm.$router.navigate(['ProductsList', { filter: queryStr }]);
        }

        vm.$routerOnActivate = function (next, prev) {
            var routeParams = next.params.filter ? parseQueryStringParams(next.params.filter) : next.params;

            categoryRepository.getAll()
               .then(function (data) {
                   angular.extend(vm.categories, data);

                   if (routeParams.categoryId)
                       setSelectedCategory(routeParams.categoryId)
               }, function (error) {
                   alert(error.statusText);
               });

            var prodsParams = {
                categoryId: routeParams.categoryId,
                searchTxt: routeParams.searchTxt,
                page: routeParams.page || 1,
                pageSize: pageSize
            };

            productRepository.get(prodsParams)
                .then(function (data) {
                    angular.extend(vm.products, data.rows);
                    vm.page = data.page;
                    vm.total = data.total;

                    if (routeParams.searchTxt)
                        setSearchTxt(routeParams.searchTxt);
                }, function (error) {
                    alert(error.statusText);
                });
        };
                
        function parseQueryStringParams(filter) {
            var queryStringParams = {};

            queryStringParams.searchTxt = parseFilter(/searchTxt=(\w+)/);
            queryStringParams.categoryId = parseFilter(/categoryId=(\d+)/);
            queryStringParams.page = parseFilter(/page=(\d+)/);
            queryStringParams.pageSize = parseFilter(/pageSize=(\d+)/);

            function parseFilter(regex) {
                var matches = filter.match(regex);
                return matches ? matches[1] : null;
            }

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
                      alert('Rating was updated successfuly.');
                  }, function (error) {
                      alert(error.statusText);
                  });
        };
    }

}());