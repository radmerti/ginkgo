/* Copyright (c) 2015 Tillmann Radmer - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential.
* Written by Tillmann Radmer <tillmann.radmer@gmail.com>, September 2015
*/

// Default logging levels:
// npmConfig.levels = {
	// silly: 0,
	// debug: 1,
	// verbose: 2,
	// info: 3,
	// warn: 4,
	// error: 5
// };

// Default logging colors:
// npmConfig.colors = {
	// silly: 'magenta',
	// verbose: 'cyan',
	// debug: 'blue',
	// info: 'green',
	// warn: 'yellow',
	// error: 'red'
// };

var winston = require('winston');



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Configure the Logger Winston before doing more work
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

winston.emitErrs = true;

var logger = new winston.Logger({
	transports: [
		// everything below 'debug' will be logged to console
		new winston.transports.Console({
			level: 'debug',
			handleExceptions: false,
			json: false,
			colorize: true
		}),
		// everything below 'info' will be logged to a file with 5*5MB file rotation
		new winston.transports.File({
			name: 'info-file',
			level: 'info',
			filename: __dirname + '/../logs/info.log',
			handleExceptions: false,
			json: true,
			maxsize: 5242880, // 5MB
			maxFiles: 10, // 10*5MB = 50MB
			colorize: false
		}),
		// warn are logged into an extra file so they don't get swamped out with other logs
		new winston.transports.File({
			name: 'warn-file',
			level: 'warn',
			filename: __dirname + '/../logs/warn.log',
			handleExceptions: false,
			json: true,
			maxsize: 10485760, // 10MB
			maxFiles: 20, // 20*10MB = 200MB
			colorize: false
		}),
	],
	exitOnError: true
});


// provide a stream for other middleware, e.g. morgan http logger.
logger.Stream = {
	write: function(message, encoding) {
		logger.verbose(message.slice(0, -1));
	}
};



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Export winston
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

exports.Logger = logger;