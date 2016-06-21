(function(){
    angular
        .module('VanDeLocatorApp')
        .filter('formatDistance', formatDistance);

    var _isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    function formatDistance() {
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
    }
})();