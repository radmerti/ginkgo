/* Copyright (c) 2015 Tillmann Radmer - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential.
* Written by Tillmann Radmer <tillmann.radmer@gmail.com>, September 2015
*/

var mongoose = require('mongoose');


// Mongoose connect is called once by the app.js & connection established
// No need to include it elsewhere, so no export.
mongoose.connect('mongodb://localhost:27017/GinkgoDB');

// produce an error when connection fails
var GinkgoDB = mongoose.connection;
GinkgoDB.on('error', console.error.bind(console, 'connection error:'));