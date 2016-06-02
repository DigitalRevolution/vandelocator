var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main'); 

/* THIS IS HOW THE APP STARTED */
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
/* END APP ORIGIONAL CODE */ 

/* We split controller from router below -- this is now moved to the controllers directory */ 
/* CONTROLLER */ 
// var renderIndex = function(req, res, next){
// 	res.render('index', { title: 'Express', topic: 'Learning Express App Basics' }); 
// }



/* ROUTER */ 
router.get('/', ctrlMain.renderIndex); 

module.exports = router;
