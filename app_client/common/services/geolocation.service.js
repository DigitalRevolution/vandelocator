(function(){
    angular
        .module('VanDeLocatorApp')
        .service('geolocationData', geolocationData);

    function geolocationData(){
        var getPosition = function(success, error, unsupported) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
            } else {
                unsupported();
            }
        };
        return { getPosition: getPosition };
    }
})();