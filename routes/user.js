/* Copyright (c) 2015 Tillmann Radmer - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential.
* Written by Tillmann Radmer <tillmann.radmer@gmail.com>, September 2015
*/

var express = require('express'),
	router = express.Router(),
	bodyParser = require('body-parser');

var Logger = require('./../methods').Winston.Logger;
var Users = require('./../models').Users;



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// '/' endpoints
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// >>>>> POST <<<<<
router.post('/', bodyParser.json(), function(request, response, next) {
	var bodyJSON = request.body;

	Users.findOne({ title_url: ConvertToSlug(articleJSON.title) })
});



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// '/:id endpoints
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// >>>>> GET <<<<<
router.get('/:id', function(request, response, next) {
	var id = request.params.id;

	if( id ) {
		var jsonResponse = {};
		jsonResponse['status'] = 'error';
		Users.findOne({ '_id': id })
		.exec(function(error, article) {
			if( error ) {
				Logger.error(error);
				jsonResponse['message'] = 'Error finding object in DB.';
			} else {
				if( article ) {
					response.json(article);
				} else {
					response.json({ success: false, found: false });
				}
			}
		});
	} else return next();
});

// >>>>> POST <<<<<
router.post('/:id', bodyParser.json(), function(request, response, next) {
	var id = request.params.id;
	var bodyJSON = request.body;
	
	if (id) {
		var jsonResponse = {};
		jsonResponse['status'] = 'error';
		if (bodyJSON) {
			Users.findOne({ '_id': id })
			.exec(function(error, articleDocument) {
				if (error) {
					Logger.error(error);
					jsonResponse['message'] = 'Error finding article in DB.';
				} else if (articleDocument) {
					var oneMissing = 0;
					for (var key in bodyJSON) {
						if (bodyJSON.hasOwnProperty(key)) {
							if (articleDocument.get(key)) {
								articleDocument.set(key,bodyJSON[key]);
								jsonResponse[key] = 'updated';
							} else {
								jsonResponse[key] = 'no-match';
								var oneMissing = 1;
							}
						}
					}
					if (oneMissing === 0) {
						articleDocument.save(function(error, article, numAffected) {
							if (error) {
								Logger.error(error);
								jsonResponse['message'] = 'Error saving changes to DB.';
							} else {
								jsonResponse['status'] = 'success';
							}
							response.json(jsonResponse);
						});
					} else {
						jsonResponse['message'] = 'One or more keys couldn\'t be matched.';
						response.json(jsonResponse);
					}
				} else {
					jsonResponse['message'] = 'No object with ID ' + id + '.';
					response.json(jsonResponse);
				}
			});
		} else {
			jsonResponse['message'] = 'Couldn\'t extract object from request.';
			response.json(jsonResponse);
		}
	} else return next();
});

// >>>>> DELETE <<<<<
router.delete('/:id', function(request, response, next) {
	var id = request.params.id;

	if( id ) {
		var jsonResponse = {};
		jsonResponse['status'] = 'error';
		Users.findOne({ '_id': id }, function(error, article) {
			if( error ) {
				Logger.error(error);
				jsonResponse['message'] = 'Error finding object in DB.';
				response.json(jsonResponse);
			} else if ( article ) {
				article.remove(function(error, number_removed) {
					if( error ) {
						Logger.error(error);
						jsonResponse['message'] = 'Error removing the object in DB.';
					} else {
						jsonResponse['status'] = 'success';
					}
					response.json(jsonResponse);
				});
			} else {
				jsonResponse['message'] = 'Error removing the object in DB.';
				response.json(jsonResponse);
			}
		});
	} else return next(); // can't handle without id,... next().
});



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Export the router
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

module.exports = router;