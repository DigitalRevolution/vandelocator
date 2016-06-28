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
            .when('/location/:locationid', { // this is
                templateUrl: '/locationDetail/locationDetail.view.html',
                controller: 'locationDetailCtrl',
                controllerAs: 'vm'
            })
            .when('/register', { // this is in ap_client
                templateUrl: '/auth/register/register.view.html',
                controller: 'registerCtrl',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: '/auth/login/login.view.html',
                controller: 'loginCtrl',
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