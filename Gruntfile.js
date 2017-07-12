module.exports = function(grunt) {
	/*-----------------------------------------------------------------*/

	grunt.initConfig({
		/*---------------------------------------------------------*/

		"pkg": grunt.file.readJSON("package.json"),

		/*---------------------------------------------------------*/

		"jsdoc": {
			"js": {
				"options": {
					"template": "./tools/jsdoc"
				},
				"src": [
					"js/AMI/AMIObject.js",
					"js/AMI/AMIExtension.js",
					"js/AMI/AMIWebApp.js",
					"js/AMI/AMIInterface.js",
					"js/AMI/AMICommand.js",
					"js/AMI/AMILogin.js"
				],
				"dest": "js/AMI"
			},
		},

		/*---------------------------------------------------------*/

		"concat": {
			"js": {
				"options": {
					"banner": "'use strict';\n\n"
				},
				"src": [
					"js/AMI/external/ami-twig.js",
					"js/AMI/external/jspath.js",
					"js/AMI/AMIObject.js",
					"js/AMI/AMIExtension.js",
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
					"css/AMI/ami.css"
				],
				"dest": "css/ami.css"
			}
		},

		/*---------------------------------------------------------*/

		"string-replace": {
			"js": {
				"options": {
					"replacements": [
						{
							"pattern": /(?!^)\'use strict\'\s*;\n*/g,
							"replacement": ""
						},
						{
							"pattern": /(?!^)\"use strict\"\s*;\n*/g,
							"replacement": ""
						},
						{
							"pattern": /{{YEAR}}/g,
							"replacement": grunt.template.today('yyyy')
						}
					]
				},
				"files": {
					"js/ami.es6.js": "js/ami.es6.js"
				}
			}
		},

		/*---------------------------------------------------------*/

		"babel": {
			"js": {
				"options": {
					"presets": ["babel-preset-es2015"]
				},
				"files": {
					"js/ami.js": "js/ami.es6.js"
				}
			}
		},

		/*---------------------------------------------------------*/

		"uglify": {
			"js": {
				"options": {
					"banner": "/*!\n * AMI Web Framework\n *\n * Copyright (c) 2014-<%= grunt.template.today('yyyy') %> The AMI Team / LPSC / IN2P3\n *\n * This file must be used under the terms of the CeCILL-C:\n * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html\n * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html\n *\n */\n",
					"compress": true
				},
				"files": {
					"js/ami.es6.min.js": "js/ami.es6.js",
					"js/ami.min.js": "js/ami.js"
				}
			}
		},

		/*---------------------------------------------------------*/

		"eslint": {
			"target": ["js/ami.es6.js"]
		}

		/*---------------------------------------------------------*/
	});

	/*-----------------------------------------------------------------*/

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-string-replace");

	/**/

	grunt.loadNpmTasks("grunt-jsdoc");
	grunt.loadNpmTasks("grunt-babel");
	grunt.loadNpmTasks("grunt-eslint");

	/*-----------------------------------------------------------------*/

	grunt.registerTask("build", ["jsdoc", "concat", "string-replace", "eslint", "babel", "uglify"]);

	/*-----------------------------------------------------------------*/
};
