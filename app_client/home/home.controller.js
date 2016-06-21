(function(){
    angular
        .module('VanDeLocatorApp')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', 'vandelocatorData','geolocationData']; // protect dependencies in minification by injecting as strings.
    function homeCtrl ($scope, vandelocatorData, geolocationData) {
                        // $scope === this at this point.
        var vm = this;  // Best practices dictate the we reserve the usage of $scope to when it is completely necessary.
                        // We achieve this by assigning a variable to 'this' at the top of the function's scope.
        vm.pageHeader = {
            title: 'VanDeLocator',
            strapline: 'Find a place to eat in Denver.'
        };
        vm.sidebar = {
            content: "VanDelocator is a mobile responsive, location aware MEAN stack application that showcases proficiency with multiple aspects of MEAN development."
        };
        vm.message = "Checking your location";
        vm.getData = function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            vm.message = "Searching for something close to you";
            vandelocatorData.locationByCoords(lat, lng)
                .success(function (data) {
                    vm.message = data.length > 0 ? "" : "No Locations Found";
                    vm.data = {locations: data};
                })
                .error(function (err) {
                    console.log(err);
                    vm.message = "Sorry, something went wrong.";
                });
        };
        vm.showError = function(err){
            $scope.$apply(function(){
                vm.message = err.message;
            });
        };
        vm.unsupported = function(){
            $scope.$apply(function(){
                vm.message = "Geolocation not supported by this browser.";
            });
        };
        geolocationData.getPosition(vm.getData, vm.showError, vm.unsupported);
    }
})();