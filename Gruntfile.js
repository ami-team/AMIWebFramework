module.exports = function(grunt) {
	/*----------------------------------------------------------------------------------------------------------------*/

	const PACKAGE_JSON = grunt.file.readJSON("package.json");

	/*----------------------------------------------------------------------------------------------------------------*/

	const CURRENT_YEAR = grunt.template.today("yyyy");

	/*----------------------------------------------------------------------------------------------------------------*/

	const AMI_VERSION = PACKAGE_JSON["version"];

	/*----------------------------------------------------------------------------------------------------------------*/

	const browserslist = [
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

	grunt.log.writeln("Building AWF for: " + browserslist.join(", "));

	/*----------------------------------------------------------------------------------------------------------------*/

	function findES6Files(paths)
	{
		let result = {};

		paths.forEach((path) => {

			grunt.file.expand(path + "/*.es6.js").forEach((file) => {

				result[file.substring(0, file.length - 6) + "js"] = file;
			});
		});

		return result;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	grunt.initConfig({
		/*-----------------------------------------------------------------*/

		"pkg": PACKAGE_JSON,

		/*-----------------------------------------------------------------*/

		"exec": {
			"awf_build": "python tools/awf_build.py"
		},

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
			"css": {
				"options": {
					"sourceMap": true,
					"sourceMapStyle": "inline"
				},
				"src": [
					"css/AMI/general.css",
					"css/AMI/bootstrap.css",
					"css/AMI/jsdoc.css",
					"css/AMI/ami.css"
				],
				"dest": "css/ami.css"
			},
			"js": {
				"options": {
					"sourceMap": true,
					"sourceMapStyle": "inline",

					"stripBanners": true,
					"banner": "'use strict';\n\n",

					"process": function(src) {

						return src.replace(/\'use strict\'\s*;\n*/g, "")
						          .replace(/\"use strict\"\s*;\n*/g, "")
						          .replace(/{{CURRENT_YEAR}}/g, CURRENT_YEAR)
						          .replace(/{{AMI_VERSION}}/g, AMI_VERSION)
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
			}
		},

		/*-----------------------------------------------------------------*/

		"autoprefixer": {
			"options": {
				"browserslist": browserslist,
				"cascade": false,
				"map": "inline"
			},
			"build": {
				"files": {
					"<%= concat.css.dest %>": "<%= concat.css.dest %>"
				}
			}
		},

		/*-----------------------------------------------------------------*/

		"eslint": {
			"target": [
				"<%= concat.js.dest %>"
			]
		},

		/*-----------------------------------------------------------------*/

		"babel": {
			"js1": {
				"options": {
					"inputSourceMap": true,
					"sourceMaps": "inline",
					"compact": false,
					"minified": false,
					"shouldPrintComment": (txt) => /Copyright/.test(txt),
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
					"./js/"
				])
			},
			"js2": {
				"options": {
					"inputSourceMap": true,
					"sourceMaps": "inline",
					"compact": true,
					"minified": true,
					"shouldPrintComment": (txt) => /Copyright/.test(txt),
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
					"./controls/**/",
					"./subapps/**/"
				])
			}
		},

		/*-----------------------------------------------------------------*/

		"cssmin": {
			"css": {
				"options": {
					"banner": "/*!\n * AMI Web Framework\n *\n * Copyright (c) 2014-" + CURRENT_YEAR + " The AMI Team / LPSC / CNRS\n *\n * This file must be used under the terms of the CeCILL-C:\n * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html\n * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html\n *\n */\n",
					"compress": true
				},
				"files": {
					"css/ami.min.css": "css/ami.css"
				}
			}
		},

		/*-----------------------------------------------------------------*/

		"uglify": {
			"s": {
				"options": {
					"banner": "/*!\n * AMI Web Framework\n *\n * Copyright (c) 2014-" + CURRENT_YEAR + " The AMI Team / LPSC / CNRS\n *\n * This file must be used under the terms of the CeCILL-C:\n * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html\n * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html\n *\n */\n",
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

	/*----------------------------------------------------------------------------------------------------------------*/

	grunt.loadNpmTasks("grunt-autoprefixer");
	grunt.loadNpmTasks("grunt-babel");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-uglify-es");
	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-exec");
	grunt.loadNpmTasks("grunt-jsdoc");

	/*----------------------------------------------------------------------------------------------------------------*/

	grunt.registerTask("build", ["exec", "jsdoc", "concat", "autoprefixer", "eslint", "babel", "cssmin", "uglify"]);

	/*----------------------------------------------------------------------------------------------------------------*/
};
