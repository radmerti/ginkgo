module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				compress: {
					dead_code: true,
					properties: true,
					sequences: true,
					drop_debugger: true,
					unsafe: true,
					conditionals: true,
					comparisons: true,
					evaluate: true,
					booleans: true,
					loops: true,
					unused: true,
					hoist_funs: true,
					hoist_vars: true,
					if_return: true,
					join_vars: true,
					cascade: true,
					negate_iife: true,
					drop_console: true
				}
			},
			library: {
				files: { 
					'public/javascript/libs.min.js': [
						'source/javascript/lib/highlight-8.8.0.min.js',
						'source/javascript/lib/jquery-2.1.4.js',
						'source/javascript/lib/marked-0.3.5.js'
						]
				}
			},
			front_end: {
				files: {
					'public/javascript/index.min.js': [
						'source/javascript/index.js'
					]
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['uglify']);

};