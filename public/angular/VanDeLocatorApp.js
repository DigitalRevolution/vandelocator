var locationListCtrl = function ($scope, vandelocatorData, geolocationData) {
    $scope.message = "Checking Your Location";

    $scope.getData = function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        $scope.message = "Searching for something close to you";
        vandelocatorData.locationByCoords(lat, lng)
            .success(function (data) {
                $scope.message = data.length > 0 ? "" : "No Locations Found";
                $scope.data = {locations: data};
            })
            .error(function (err) {
                console.log(err);
                $scope.message = "Sorry, something went wrong.";
            });
    };
    $scope.showError = function(err){
        $scope.$apply(function(){
            $scope.message = err.message;
        });
    };
    $scope.unsupported = function(){
        $scope.$apply(function(){
            $scope.message = "Geolocation not supported by this browser.";
        });
    };
    geolocationData.getPosition($scope.getData, $scope.showError, $scope.unsupported);
};

var _isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function () {
    return function (distance) {
        var numDistance, unit;
        if (distance && _isNumeric(distance)) {
            if (distance > 1) {
                numDistance = parseFloat(distance) / 1609;
                numDistance = numDistance.toFixed(2);
                unit = ' miles';
            } else {
                numDistance = parseInt(distance * 5280, 10);
                unit = ' feet';
            }
            return numDistance + unit;
        } else {
            return "?";
        }
    };
};

var ratingStars = function(){
    return {
        scope: {
            thisRating : '=rating'
        },
        templateUrl : "/angular/rating-stars.html"
    };
};

var vandelocatorData = function($http){
    var locationByCoords = function(lat, lng){
        return $http.get('/api/locations/?lng=' + lng + '&lat=' + lat + '&maxDistance=10000');
    };
    return {
        locationByCoords : locationByCoords
    };
};

var geolocationData = function(){
    var getPosition = function(success, error, unsupported) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            unsupported();
        }
    };
    return { getPosition: getPosition };
};

angular
    .module('VanDeLocatorApp', [])
    .controller('locationListCtrl', locationListCtrl)
    .filter('formatDistance', formatDistance)
    .directive('ratingStars', ratingStars)
    .service('vandelocatorData', vandelocatorData)
    .service('geolocationData', geolocationData);