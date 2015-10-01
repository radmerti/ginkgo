/* Copyright (c) 2015 Tillmann Radmer - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential.
* Written by Tillmann Radmer <tillmann.radmer@gmail.com>, September 2015
*/

var express = require('express')
  , router = express.Router();



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// [GET,POST,DELETE] Endpoints exposing the users 
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// >>>>> GET <<<<<
router.get('/:id', function(request, response, next) {
	response.sendFile('static-views/article-grid.html', {root: __dirname + '/..'});
});

// >>>>> POST <<<<<
router.post('/', function(request, response, next) {
	response.sendFile('static-views/article-grid.html', {root: __dirname + '/..'});
});

router.delete('/:id', function(request, response, next) {
	return next();
});



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Export the router
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

module.exports = router;