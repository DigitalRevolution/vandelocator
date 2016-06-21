(function(){
    angular.module('VanDeLocatorApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

    function config ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm' // alias the controller $scope
            })
            .when('/about', {
                templateUrl: '/common/views/genericText.view.html',
                controller: 'aboutCtrl',
                controllerAs: 'vm'
            })
            .when('/location/:locationid', {
                templateUrl: '/locationDetail/locationDetail.view.html',
                controller: 'locationDetailCtrl',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo:'/'});
        $locationProvider.html5Mode({
            enabled: true
        });
    }

    angular
        .module('VanDeLocatorApp')
        .config(['$routeProvider', '$locationProvider', config]);
})();