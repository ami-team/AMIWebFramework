module.exports = function(grunt) {
	/*---------------------------------------------------------------------*/

	var PACKAGE_JSON = {
	  "devDependencies": {
		"@babel/core": "^7.4.3",
		"@babel/preset-env": "^7.4.3",
		"eslint-plugin-ami": "^1.0.6",
		"grunt": "^1.0.4",
		"grunt-babel": "^8.0.0",
		"grunt-eslint": "^21.0.0",
	  }
	};

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

	grunt.log.writeln("Building AWF for: " + browserslist.join(", "));

	/*---------------------------------------------------------------------*/

	function findES6Files(paths)
	{
		var result = {};

		paths.forEach(function(path) {

			grunt.file.expand(path + "/*.es6.js").forEach(function(file) {

				result[file.substring(0, file.length - 6) + "js"] = file;
			});
		});

		return result;
	}

	/*---------------------------------------------------------------------*/

	grunt.initConfig({
		/*-----------------------------------------------------------------*/

		"pkg": PACKAGE_JSON,

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
					"sourceMap": true,
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
					"./controls/**",
					"./subapps/**"
				])
			}
		},

		/*-----------------------------------------------------------------*/
	});

	/*---------------------------------------------------------------------*/

	grunt.loadNpmTasks("grunt-babel");
	grunt.loadNpmTasks("grunt-eslint");

	/*---------------------------------------------------------------------*/

	grunt.registerTask("build", ["eslint", "babel"]);

	/*---------------------------------------------------------------------*/
};