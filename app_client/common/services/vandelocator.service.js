(function(){
    angular
        .module('VanDeLocatorApp')
        .service('vandelocatorData', vandelocatorData);
    vandelocatorData.$inject = ['$http']; // protect dependencies from being undefined after minification

    function vandelocatorData($http){
        var locationByCoords = function(lat, lng){
            return $http.get('/api/locations/?lng=' + lng + '&lat=' + lat + '&maxDistance=10000');
        };
        var locationById = function (locationid) {
            return $http.get('/api/locations/' + locationid);
        };
        var addReviewById = function(locationid, data){
            return $http.post('api/locations/' + locationid + '/review', data)
        };
        return {
            locationByCoords : locationByCoords,
            locationById : locationById,
            addReviewById : addReviewById
        };
    }
})();
