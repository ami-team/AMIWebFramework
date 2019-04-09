module.exports = function(grunt) {
	/*---------------------------------------------------------------------*/

    var AMI_VERSION = '0.0.1-SNAPSHOT';

	/*---------------------------------------------------------------------*/

	var CURRENT_YEAR = grunt.template.today("yyyy");

	/*---------------------------------------------------------------------*/

	var browserslist = [
		">= 1%",
		"last 1 major version",
		"not dead",
		"Chrome >= 45",
		"Firefox >= 38",
		"Edge >= 12",
		"Explorer >= 10",
		"iOS >= 9",
		"Safari >= 9",
		"Android >= 4.4",
		"Opera >= 30"
	];

	grunt.log.writeln('Building AWF for: ' + browserslist.join(', '));

	/*---------------------------------------------------------------------*/

	function findES6Files(paths)
	{
		var result = {};

		paths.forEach(function(path) {

			grunt.file.expand(path + '/*.es6.js').forEach(function(file) {

				result[file.substring(0, file.length - 6) + 'js'] = file;
			});
		});

		return result;
	}

	/*---------------------------------------------------------------------*/

	grunt.initConfig({
		/*-----------------------------------------------------------------*/

		"pkg": grunt.file.readJSON("package.json"),

		/*-----------------------------------------------------------------*/

		"jsdoc": {
			"js": {
				"options": {
					"template": "./tools/jsdoc"
				},
				"src": [
					"js/AMI/AMIExtension.js",
					"js/AMI/AMIObject.js",
					"js/AMI/AMIRouter.js",
					"js/AMI/AMIWebApp.js",
					"js/AMI/AMIInterface.js",
					"js/AMI/AMICommand.js",
					"js/AMI/AMILogin.js"
				],
				"dest": "js/AMI"
			},
		},

		/*-----------------------------------------------------------------*/

		"concat": {
			"js": {
				"options": {
					"banner": "'use strict';\n\n",

					"process": function(src) {

						return src.replace(/\'use strict\'\s*;\n*/g, "")
						          .replace(/\"use strict\"\s*;\n*/g, "")
						          .replace(/{{AMI_VERSION}}/g, AMI_VERSION)
						          .replace(/{{CURRENT_YEAR}}/g, CURRENT_YEAR)
						;
					}
				},
				"src": [
					"js/AMI/external/ami-twig.es6.js",
					"js/AMI/external/jspath.js",
					"js/AMI/AMIExtension.js",
					"js/AMI/AMIObject.js",
					"js/AMI/AMIRouter.js",
					"js/AMI/AMIWebApp.js",
					"js/AMI/AMIInterface.js",
					"js/AMI/AMICommand.js",
					"js/AMI/AMILogin.js",
					"js/AMI/AMIDoc.js"
				],
				"dest": "js/ami.es6.js"
			},
			"css": {
				"src": [
					"css/AMI/general.css",
					"css/AMI/bootstrap.css",
					"css/AMI/jsdoc.css",
					"css/AMI/ami.css"
				],
				"dest": "css/ami.css"
			}
		},

		/*-----------------------------------------------------------------*/

		"autoprefixer": {
			"options": {
				"browserslist": browserslist
			},
			"build": {
				"files": {
					"css/ami.css": "css/ami.css"
				}
			}
		},

		/*-----------------------------------------------------------------*/

		"eslint": {
			"target": [
				"js/ami.es6.js"
			]
		},

		/*-----------------------------------------------------------------*/

		"babel": {
			"js": {
				"options": {
					"sourceMap": false,
					"presets": [["@babel/preset-env", {
						"debug": false,
						"loose": true,
						"modules": false,
						"targets": {
							"browsers": browserslist
						}
					}]]
				},
				"files": findES6Files([
					'./js',
					'./controls/**',
					'./subapps/**'
				])
			}
		},

		/*-----------------------------------------------------------------*/

		"cssmin": {
			"css": {
				"options": {
					"banner": "/*!\n * AMI Web Framework\n *\n * Copyright (c) 2014-" + CURRENT_YEAR + " The AMI Team / LPSC / IN2P3\n *\n * This file must be used under the terms of the CeCILL-C:\n * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html\n * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html\n *\n */\n",
					"compress": true
				},
				"files": {
					"css/ami.min.css": "css/ami.css"
				}
			}
		},

		/*-----------------------------------------------------------------*/

		"uglify": {
			"js": {
				"options": {
					"banner": "/*!\n * AMI Web Framework\n *\n * Copyright (c) 2014-" + CURRENT_YEAR + " The AMI Team / LPSC / IN2P3\n *\n * This file must be used under the terms of the CeCILL-C:\n * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html\n * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html\n *\n */\n",
					"compress": true
				},
				"files": {
					"js/ami.es6.min.js": "js/ami.es6.js",
					"js/ami.min.js": "js/ami.js"
				}
			}
		}

		/*-----------------------------------------------------------------*/
	});

	/*---------------------------------------------------------------------*/

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-uglify-es");

	/**/

	grunt.loadNpmTasks("grunt-jsdoc");
	grunt.loadNpmTasks("grunt-autoprefixer");
	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-babel");

	/*---------------------------------------------------------------------*/

	grunt.registerTask("build", ["jsdoc", "concat", "autoprefixer", "eslint", "babel", "cssmin", "uglify"]);

	/*---------------------------------------------------------------------*/
};
