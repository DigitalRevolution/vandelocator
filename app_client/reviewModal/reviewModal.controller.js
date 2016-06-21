(function(){
    angular
        .module('VanDeLocatorApp')
        .controller('reviewModalCtrl', reviewModalCtrl);
    reviewModalCtrl.$inject = ['$uibModalInstance', 'vandelocatorData', 'locationData'];
    function reviewModalCtrl ($uibModalInstance, vandelocatorData, locationData) {
        var vm = this;
        vm.locationData = locationData;

        vm.onSubmit = function(){
            vm.formError = "";
            if(!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
                vm.formError = "All fields must be completed to submit a review";
                return false;
            } else {
                vm.doAddReview(vm.locationData.locationid, vm.formData);
            }
        };
        vm.doAddReview = function(locationid, formData){
            vandelocatorData.addReviewById(locationid, {
                author : formData.name,
                rating : formData.rating,
                reviewText : formData.reviewText
            })
                .success(function(data){
                    console.log("Success!")
                    vm.modal.close(data);
                })
                .error(function(data){
                    vm.formError = "There was some problem saving your review, please try again.";
                });
            return false;
        };

        vm.modal = {
            cancel : function(){
                $uibModalInstance.dismiss('cancel');
            },
            close : function(result){
                $uibModalInstance.close(result);
            }
        };
    }
})();