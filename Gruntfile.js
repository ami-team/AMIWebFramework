module.exports = function(grunt) {
	/*-----------------------------------------------------------------*/

	var year = grunt.template.today("yyyy");

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

		/*---------------------------------------------------------*/

		"concat": {
			"js": {
				"options": {
					"banner": "'use strict';\n\n",

					"process": function(src) {

						return src.replace(/\'use strict\'\s*;\n*/g, "")
						          .replace(/\"use strict\"\s*;\n*/g, "")
						          .replace(/{{YEAR}}/g, year)
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
					"css/AMI/ami.css"
				],
				"dest": "css/ami.css"
			}
		},

		/*---------------------------------------------------------*/

		"eslint": {
			"target": [
				"js/ami.es6.js"
			]
		},

		/*---------------------------------------------------------*/

		"babel": {
			"js": {
				"options": {
					"sourceMap": false,
					"presets": [["@babel/preset-env", {"loose": true}]]
				},
				"files": {
					"js/ami.js": "js/ami.es6.js"
				}
			}
		},

		/*---------------------------------------------------------*/

		"cssmin": {
			"css": {
				"options": {
					"banner": "/*!\n * AMI Web Framework\n *\n * Copyright (c) 2014-" + year + " The AMI Team / LPSC / IN2P3\n *\n * This file must be used under the terms of the CeCILL-C:\n * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html\n * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html\n *\n */\n",
					"compress": true
				},
				"files": {
					"css/ami.min.css": "css/ami.css"
				}
			}
		},

		/*---------------------------------------------------------*/

		"uglify": {
			"js": {
				"options": {
					"banner": "/*!\n * AMI Web Framework\n *\n * Copyright (c) 2014-" + year + " The AMI Team / LPSC / IN2P3\n *\n * This file must be used under the terms of the CeCILL-C:\n * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html\n * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html\n *\n */\n",
					"compress": true
				},
				"files": {
					"js/ami.es6.min.js": "js/ami.es6.js",
					"js/ami.min.js": "js/ami.js"
				}
			}
		}

		/*---------------------------------------------------------*/
	});

	/*-----------------------------------------------------------------*/

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-uglify-es");

	/**/

	grunt.loadNpmTasks("grunt-jsdoc");
	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-babel");

	/*-----------------------------------------------------------------*/

	grunt.registerTask("build", ["jsdoc", "concat", "eslint", "babel", "cssmin", "uglify"]);

	/*-----------------------------------------------------------------*/
};
