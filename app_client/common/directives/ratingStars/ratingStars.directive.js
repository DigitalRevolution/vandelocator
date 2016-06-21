(function(){
    angular
        .module('VanDeLocatorApp')
        .directive('ratingStars', ratingStars);
    function ratingStars () {
        return {
            restrict: 'EA', // only use ratingStars when rating-stars is in an element or attribute
            scope: {
                thisRating : '=rating'
            },
            templateUrl: '/common/directives/ratingStars/ratingStars.template.html'
        };
    }
})();