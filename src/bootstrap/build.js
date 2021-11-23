#!/usr/bin/env node

/*--------------------------------------------------------------------------------------------------------------------*/
/* IMPORTS                                                                                                            */
/*--------------------------------------------------------------------------------------------------------------------*/

const fs = require('fs');
const path = require('path');

/*--------------------------------------------------------------------------------------------------------------------*/

const sass = require(path.resolve(__dirname, '../../node_modules/sass'));

const postcss = require(path.resolve(__dirname, '../../node_modules/postcss'));

const cssnano = require(path.resolve(__dirname, '../../node_modules/cssnano'));

const autoprefixer = require(path.resolve(__dirname, '../../node_modules/autoprefixer'));

/*--------------------------------------------------------------------------------------------------------------------*/
/* AMI-BOOTSTRAP 4                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

console.log('Building AMI-BOOTSTRAP 4...');

sass.render({file: path.resolve(__dirname, 'bootstrap4.scss')}, (err, result) => {

	if(err)
	{
		console.log(err);
	}
	else
	{
		postcss([cssnano({preset: 'default'}), autoprefixer]).process(result.css.toString(), {from: 'bootstrap4.scss', to: 'bootstrap4.min.css'}).then((result) => {

			fs.writeFile(path.resolve(__dirname, 'bootstrap4.min.css'), result.css, 'utf8', (err) => {

				if(err)
				{
					console.log(err);
				}
			});
		});
	}
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* AMI-BOOTSTRAP 5                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

console.log('Building AMI-BOOTSTRAP 5...');

sass.render({file: path.resolve(__dirname, 'bootstrap5.scss')}, (err, result) => {

	if(err)
	{
		console.log(err);
	}
	else
	{
		postcss([cssnano({preset: 'default'}), autoprefixer]).process(result.css.toString(), { from: 'bootstrap5.scss', to: 'bootstrap5.min.css'}).then((result) => {

			fs.writeFile(path.resolve(__dirname, 'bootstrap5.min.css'), result.css, 'utf8', (err) => {

				if(err)
				{
					console.log(err);
				}
			});
		});
	}
});

/*--------------------------------------------------------------------------------------------------------------------*/
