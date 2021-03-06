var request = require('request');
var apiOptions = {
    server : "http://localhost:3333"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://vandelocator.herokuapp.com";
}

var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Woah! You lost me, sorry about that.";
    } else if (status === 500) {
        title = "500, internal server error";
        content = "Well, this is awkward... There's a problem with our server.";
    } else {
        title = status + ", something's gone wrong";
        content = "I'm not entirely sure where this thing derailed, but something is amiss.";
    }
    res.status(status);
    res.render('generic-text', {
        title : title,
        content : content
    });
};

var renderHomepage = function(req, res, responseBody){
    var message;
    //if (!(responseBody instanceof Array)) {
    //    console.log('response body not array');
    //    message = "API lookup error";
    //    responseBody = [];
    //} else {
    //    if (!responseBody.length) {
    //        message = "No places found nearby";
    //    }
    //}
    //console.log(responseBody, '<- response body'); // empty array
    res.render('locations-list', {
        title: 'VanDeLocator',
        pageHeader: {
            title: 'VanDeLocator',
            strapline: 'Find a place to work.'
        },
        sidebar: "Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
        // locations: responseBody,
        // message: message
    });
};

/* GET 'home' page */
module.exports.homelist = function(req, res){
    var requestOptions, path;
    path = '/api/locations';
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {},
        qs : {
            lng : -104.961461,
            lat : 39.6967667,
            maxDistance : 1609
        }
    };
    request(
        requestOptions,
        function(err, response, body) {
            var i, data;
            data = body;
            if (response.statusCode === 200 && data.length) {
                for (i=0; i<data.length; i++) {
                    data[i].distance = data[i].distance;
                }
            }
            // console.log(requestOptions);
            renderHomepage(req, res, data);
        }
    );
};

var getLocationInfo = function (req, res, callback) {
    var requestOptions, path;
    path = "/api/locations/" + req.params.locationid;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
    request(
        requestOptions,
        function(err, response, body) {
            var data = body;
            if (response.statusCode === 200) {
                data.coords = {
                    lng : body.coords[0],
                    lat : body.coords[1]
                };
                callback(req, res, data);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

var renderDetailPage = function (req, res, locDetail) {
    res.render('location-info', {
        title: locDetail.name,
        pageHeader: {title: locDetail.name},
        sidebar: {
            context: 'is on VanDeLocator because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: locDetail
    });
};

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res){
    getLocationInfo(req, res, function(req, res, responseData) {
        renderDetailPage(req, res, responseData);
    });
};

var renderReviewForm = function (req, res, locDetail) {
    res.render('location-review-form', {
        title: 'Review ' + locDetail.name + ' on VanDeLocator',
        pageHeader: { title: 'Review ' + locDetail.name },
        error: req.query.err,
        url: req.originalUrl
    });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res){
    getLocationInfo(req, res, function(req, res, responseData) {
        renderReviewForm(req, res, responseData);
    });
};

/* POST 'Add review' page */
module.exports.doAddReview = function(req, res){
    var requestOptions, path, locationid, postdata;
    locationid = req.params.locationid;
    path = "/api/locations/" + locationid + '/review';
    postdata = {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
    };
    requestOptions = {
        url : apiOptions.server + path,
        method : "POST",
        json : postdata
    };
    // Add Application Input Verification
    if (!postdata.author || !postdata.rating || !postdata.reviewText) {
        res.redirect('/location/' + locationid + '/review/new?err=val');
    } else {
        request(
            requestOptions,
            // Handle Database Input Verification
            function(err, response, body) {
                if (response.statusCode === 201) {
                    res.redirect('/location/' + locationid);
                } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
                    res.redirect('/location/' + locationid + '/review/new?err=val');
                } else {
                    console.log(body);
                    _showError(req, res, response.statusCode);
                }
            }
        );
    }
};