/* Origionally, this was an anonymous function in index.js.
// To separate concerns appropaitely, we've moved the callback 
// function (and therefore, logic) to this folder and exported it. 
// In this way, we ensure that the application sends user to the router
// which connects to the controller, which renders a response by combining 
// data with a template from the views directory. 
*/

/* GET home page */ 
module.exports.renderIndex = function(req, res, next){
	// render method marries template to JavaScript object with data for template use. 
	res.render('index', { title: 'Express', topic: 'Learning Express App Basics' }); 
};
