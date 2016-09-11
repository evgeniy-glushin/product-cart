(() => {
    angular
        .module('app')
        .filter('range', range);

    function range() {
        return (arr, count) => _.range(count);
    }
})();