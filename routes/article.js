/* Copyright (c) 2015 Tillmann Radmer - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential.
* Written by Tillmann Radmer <tillmann.radmer@gmail.com>, September 2015
*/

var express = require('express')
  , router = express.Router();

var Articles = require('./../models').Articles;


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
// Helper Functions
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

var ConvertToSlug = function(Text) {
	return Text.toString().toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
}



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// [GET,POST,DELETE] Endpoints exposing articles
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// >>>>> GET <<<<<
router.get('/:id', function(request, response, next) {
	var id = request.params.id;

	if( id ) {
		Articles.findOne({ '_id': id })
			.exec(function(error, article) {
				response.json(article);
			});
	} else return next();
});

router.get('/:id/c', function(request, response, next) {
	var id = request.params.id;

	if( id ) {
		Articles.findOne({ '_id': id }, 'content')
			.exec(function(error, article) {
				response.json(article);
			});
	} else return next();
});

// >>>>> POST <<<<<
router.post('/', function(request, response, next) {
	response.status(204).send();
});

// >>>>> DELETE <<<<<
router.delete('/:id', function(request, response, next) {
	var id = request.params.id;

	if( id ) {
		Articles.findOne({ '_id': id }, function(error, article) {
			if( error ) {
				response.json({ success: false, error: error });
			} else if ( article ) {
				article.remove(function(error, number_removed) {
					if( error ) {
						response.json({ success: false, error: error });
					} else {
						response.json({ success: true });
					}
				});
			} else {
				response.json({ success: false, error: "no-article-found" });
			}
		});
	} else return next(); // can't handle without id,... next().
});



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Export the router
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

module.exports = router;