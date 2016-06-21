(function(){
    angular
        .module('VanDeLocatorApp')
        .controller('aboutCtrl', aboutCtrl);

    function aboutCtrl() {
        var vm = this;

        vm.pageHeader = {
            title: 'About VanDeLocator'
        };
        vm.main = {
            content: 'VanDelocator is a mobile responsive, location aware MEAN stack application that showcases proficiency with all aspects of MEAN development.'
        }
    }
})();