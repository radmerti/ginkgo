/* Copyright (c) 2015 Tillmann Radmer - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential.
* Written by Tillmann Radmer <tillmann.radmer@gmail.com>, September 2015
*/

var mongoose = require('mongoose')
	, fs = require('fs')
	, jade = require('jade'),
	ArticleModel = require('./../models').Articles;


// TODO: [QST] Is this function only used in the jade daemon? Move it there!

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Functions for watching and compiling jade files in views dir.
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var ArticleMongooseQuery = ArticleModel.find().sort({published_on: -1}).limit(10);

// compiled jade function for the article grid
var ArticleGridJadeFunction;

var CompileViews = function(fileName, sourceDir, targetDir, callback) {
	if(fileName && !fileName.match('__')) {
		// we have to recompile that file with the respective locales.

		// read the jade file
		fs.readFile(sourceDir + fileName, 'utf8', function (error, data) {
			// generate a new jade-compile-function for that file
			// TODO: [NEW] Save the jade-function for later use with updated locals
			var fn = jade.compile(data, {filename: sourceDir + fileName});

			// update the file with the respective locals.
			switch(fileName) {
				case "index.jade":
					var html = fn({title:"Ginkgo"});
					writeFileName = fileName.replace('jade', 'html');
					fs.writeFile(targetDir + writeFileName, html, 'utf8', function(error){});
					break;
				case "article-grid.jade":
					ArticleGridJadeFunction = fn;
					ArticleMongooseQuery.exec(function(error, articles) {
						// logger.log('info', 'Following articles were found\n' + articles);
					});
					// GinkgoDB.collection('articles', function(error, article_collection) {
					// 		article_collection.find().toArray(function(error, posts) {
					// 			if( error ) {
					// 				console.log(error);
					// 				return 0;
					// 			}
					// 			if( !posts ) console.log('No Articles in DB.');
					// 			var html = fn({articles:posts});
					// 			writeFileName = fileName.replace('jade', 'html');
					// 			fs.writeFile(targetDir + writeFileName, html, 'utf8', function(error){});
					// 		});
					// 	});
					break;
				default:
					var html = fn();
					writeFileName = fileName.replace('jade', 'html');
					fs.writeFile(targetDir + writeFileName, html, 'utf8', function(error){});
			}
		});
	} else {} // excluding __files
};



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Export.
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

exports.CompileViews = CompileViews;