/* GET home page */
module.exports.renderAbout = function(req, res) {
    res.render('about-page', {
        title: 'About VanDeLocator',
        content: 'VanDeLocator was created to help people find places to sit down and get a bit of work done. VanDeLocator was created to help people find places to sit down and get a bit of work done. VanDeLocator was created to help people find places to sit down and get a bit of work done. VanDeLocator was created to help people find places to sit down and get a bit of work done. VanDeLocator was created to help people find places to sit down and get a bit of work done. VanDeLocator was created to help people find places to sit down and get a bit of work done.'
    });
};

module.exports.angularApp = function(req, res) {
    res.render('layout', { title: 'VanDeLocator' });
};

