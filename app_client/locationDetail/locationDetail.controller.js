(function () {
    angular
        .module('VanDeLocatorApp')
        .controller('locationDetailCtrl', locationDetailCtrl);
    locationDetailCtrl.$inject = ['$routeParams', '$location', '$uibModal', 'vandelocatorData', 'authentication'];
    function locationDetailCtrl ($routeParams, $location, $uibModal, vandelocatorData, authentication) {
        var vm = this;
        vm.locationid = $routeParams.locationid;
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentPath = $location.path();
        vandelocatorData.locationById(vm.locationid)
            .success(function(data) {
                vm.data = { location: data };
                vm.pageHeader = {
                    title: vm.data.location.name
                };
            })
            .error(function (err) {
                console.log(err);
            });

        vm.popupReviewForm = function(){
            //console.log('fire SPA review function');
            var modalInstance = $uibModal.open({
                templateUrl: '/reviewModal/reviewModal.view.html',
                controller: 'reviewModalCtrl as vm',
                resolve : {
                    locationData : function() {
                        return {
                            locationid : vm.locationid,
                            locationName : vm.data.location.name
                        };
                    }
                }
            });
            modalInstance.result.then(function(data){
                vm.data.location.reviews.push(data);
            })
        };
    }
})();