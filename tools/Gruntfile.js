module.exports = function(grunt) {
	/*----------------------------------------------------------------------------------------------------------------*/

	const PACKAGE_JSON = grunt.file.readJSON("package.json");

	/*----------------------------------------------------------------------------------------------------------------*/

	const BROWSER_LIST = [
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

	grunt.log.writeln("Building AWF for: " + BROWSER_LIST.join(", "));

	/*----------------------------------------------------------------------------------------------------------------*/

	function findES6Files(paths)
	{
		const result = {};

		paths.forEach((path) => {

			grunt.file.expand(path + "/*.es6.js").forEach((file) => {

				result[file.substring(0, file.length - 6) + "js"] = file;
			});
		});

		return result;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	ES6_FILES = findES6Files([
		"./controls/**/",
		"./subapps/**/"
	]);

	/*----------------------------------------------------------------------------------------------------------------*/

	grunt.initConfig({
		/*------------------------------------------------------------------------------------------------------------*/

		"pkg": PACKAGE_JSON,

		/*------------------------------------------------------------------------------------------------------------*/

		"eslint": {
			"options": {
				"configFile": ".eslintrc.json",
				"failOnError": false,
			},
			"target": Object.values(ES6_FILES)
		},

		/*------------------------------------------------------------------------------------------------------------*/

		"babel": {
			"js": {
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
							"browsers": BROWSER_LIST
						}
					}]]
				},
				"files": ES6_FILES
			}
		},

		/*------------------------------------------------------------------------------------------------------------*/
	});

	/*----------------------------------------------------------------------------------------------------------------*/

	grunt.loadNpmTasks("grunt-babel");
	grunt.loadNpmTasks("grunt-eslint");

	/*----------------------------------------------------------------------------------------------------------------*/

	grunt.registerTask("lint", ["eslint"]);

	grunt.registerTask("build", ["eslint", "babel"]);

	/*----------------------------------------------------------------------------------------------------------------*/
};
