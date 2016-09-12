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
        var pageSize = 6;

        vm.goToPage = function (newPage) {
            if (newPage == vm.page) return;

            var filter = '?page=' + newPage + '&pageSize=' + pageSize;

            var selectedCategory = _.find(vm.categories, function (c) { return c.selected; });
            if (selectedCategory)
                filter += '&categoryId=' + selectedCategory.id;

            if (vm.searchTxt)
                filter += '&searchTxt=' + vm.searchTxt;

            vm.$router.navigate(['ProductsList', { filter: filter }]);
        }

        vm.$routerOnActivate = function (next, prev) {
            var routeParams = next.params.filter ? parseQueryStringParams(next.params.filter) : next.params;

            categoryRepository.getAll()
               .then(function (data) {
                   angular.extend(vm.categories, data);

                   if (routeParams.categoryId)
                       setSelectedCategory(routeParams.categoryId)
               }, function (error) {

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
                }, function (error) {

                });
        };

        function parseQueryStringParams(filter) {
            var queryStringParams = {};

            var searchTxtRegex = /searchTxt=(\w+)/;
            var searchTxtRegexMatch = filter.match(searchTxtRegex);
            if (searchTxtRegexMatch)
                queryStringParams.searchTxt = searchTxtRegexMatch[1];

            var categoryIdRegex = /categoryId=(\d+)/;
            var categoryIdRegexMatch = filter.match(categoryIdRegex);
            if (categoryIdRegexMatch)
                queryStringParams.categoryId = categoryIdRegexMatch[1];

            var pageRegex = /page=(\d+)/;
            var pageRegexMatch = filter.match(pageRegex);
            if (pageRegexMatch)
                queryStringParams.page = pageRegexMatch[1];

            var pageSizeRegex = /pageSize=(\d+)/;
            var pageSizeRegexMatch = filter.match(pageSizeRegex);
            if (pageSizeRegexMatch)
                queryStringParams.pageSize = pageSizeRegexMatch[1];

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