(function(){
    angular
        .module('VanDeLocatorApp')
        .directive('genericFooter', genericFooter);

    function genericFooter () {
        return {
            restrict: 'EA',
            templateUrl: '/common/directives/genericFooter/genericFooter.template.html'
        };
    }
})();