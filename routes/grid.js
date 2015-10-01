/* Copyright (c) 2015 Tillmann Radmer - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential.
* Written by Tillmann Radmer <tillmann.radmer@gmail.com>, September 2015
*/

var express = require('express')
  , router = express.Router();

var Articles = require('./../models').Articles
  , Logger = require('./../methods').Winston.Logger;

var RoundUp100 = function(toRound) {
	var rest = toRound % 100;
	return toRound - rest + (100 * Math.ceil(rest*0.01));
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// [GET] Grid endpoints
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// >>>>> GET <<<<<
router.get('/', function(request, response, next) {
	var query = request.query;
	// set defaults
	var page = 100;
	var topic = '';
	if( query.p )  page = RoundUp100(parseInt(query.p));
	if( query.f && query.f.t) topic = query.f.t;

	Logger.info('/g detected topic: ' + topic );

	if( topic == '' ) {			// not filtered -> search in Articles
		Articles.find()
			.sort({ published_on: -1 })
			.limit(100)
			.skip(page-100)
			.select('grid_type title thumbnail_color')
			.exec(function(error, articles) {
				if(error) {
					Logger.error(error);
					return next();
				} else {
					response.json(articles);
				}
			});
	} else {					// filtered -> retrieve list of articles from Topics	

	}
});



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Export the router
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

module.exports = router;