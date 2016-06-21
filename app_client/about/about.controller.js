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
            content: 'VanDelocator is a mobile responsive, location aware MEAN stack application that showcases proficiency with multiple aspects of MEAN development. Specifically, this application utilizes the following:',
            tags: ['RESTful API Design & implementation','MongoDB','Mongoose','NodeJS','Bootstrap','Angular','Location','Express','Authentication','JavaScript', 'MVC'],
        }
    }
})();