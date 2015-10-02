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
		},
		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				eqnull: true,
				freeze: true,
				latedef: true,
				noarg: true,
				nonew: true,
				singleGroups: true,
				strict: false,
				undef: false,
				unused: false,
				laxcomma: false,
				varstmt: false,
				shadow: "inner"
			},
			build_browser: {
				options: {
					node: false,
					browser: true,
					jquery: true
				},
				files: {
					src: ['source/javascript/*.js']
				}
			},
			build_nodejs: {
				options: {
					node: true,
					browser: false,
					jquery: false
				},
				files: {
					src: [
						'*.js',
						'daemons/**/*.js',
						'methods/**/*.js',
						'middleware/**/*.js',
						'models/**/*.js',
						'routes/**/*.js']
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Default task(s).
	grunt.registerTask('default', ['uglify', 'jshint']);

};