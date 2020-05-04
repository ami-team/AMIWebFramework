module.exports = function(grunt) {
	/*----------------------------------------------------------------------------------------------------------------*/

    const PACKAGE_JSON = grunt.file.readJSON("package.json");

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

	grunt.initConfig({
		/*------------------------------------------------------------------------------------------------------------*/

		"pkg": PACKAGE_JSON,

		/*------------------------------------------------------------------------------------------------------------*/

		"eslint": {
			"target": [
			]
		},

		/*------------------------------------------------------------------------------------------------------------*/

		"babel": {
			"js": {
				"options": {
					"sourceMap": true,
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
					"./controls/**",
					"./subapps/**"
				])
			}
		},

		/*------------------------------------------------------------------------------------------------------------*/
	});

	/*----------------------------------------------------------------------------------------------------------------*/

	grunt.loadNpmTasks("grunt-babel");
	grunt.loadNpmTasks("grunt-eslint");

	/*----------------------------------------------------------------------------------------------------------------*/

	grunt.registerTask("build", ["eslint", "babel"]);

	/*----------------------------------------------------------------------------------------------------------------*/
};
