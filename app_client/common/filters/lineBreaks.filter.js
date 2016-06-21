(function(){
    angular
        .module('VanDeLocatorApp')
        .filter('lineBreaks', lineBreaks);
    function lineBreaks(){
        return function(text){
            var output = text.replace(/\n/g, '<br/>');
            return output;
        };
    }
})();