/*!
 * AMI Web Framework
 * AMI JSDoc template
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/

'use strict';

/*-------------------------------------------------------------------------*/

const filename = 'AMIDoc.js';

/*-------------------------------------------------------------------------*/

const path = require('jsdoc/path');
const  fs  = require( 'jsdoc/fs' );

/*-------------------------------------------------------------------------*/

function typeHelper(type)
{
	return type ? (type.names.length === 1 ? type.names[0] : type.names) : '';
}

/*-------------------------------------------------------------------------*/

function process(done, nodes, parentDescr, parentLongName)
{
	nodes.forEach(function(element, index) {

		if(parentLongName)
		{
			if(parentLongName !== element.memberof)
			{
				return;
			}
		}
		else
		{
			if(element.memberof && (element.kind !== 'namespace' && element.kind !== 'interface' && element.kind !== 'class'))
			{
				return;
			}
		}

		/*---------------------------------------------------------*/
		/* NAMESPACE                                               */
		/*---------------------------------------------------------*/

		/**/ if(element.kind === 'namespace')
		{
			/*-------------------------------------------------*/
			/* THIS                                            */
			/*-------------------------------------------------*/

			const descr = {
				'name': element.longname,
				'desc': element.description || '',
			};

			if(!parentDescr.namespaces)
			{
				parentDescr.namespaces = [];
			}

			parentDescr.namespaces.push(descr);

			/*-------------------------------------------------*/
			/* DETAILS                                         */
			/*-------------------------------------------------*/

			if(element.version)
			{
				descr.see = element.version;
			}

			if(element.author)
			{
				descr.see = element.author;
			}

			if(element.see)
			{
				descr.see = element.see;
			}

			/*-------------------------------------------------*/

			process(done, nodes, descr, element.longname);

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
		/* CLASS                                                   */
		/*---------------------------------------------------------*/

		else if(element.kind === 'class'
		        ||
		        element.kind === 'interface'
		 ) {
			/*-------------------------------------------------*/
			/* THIS                                            */
			/*-------------------------------------------------*/

			const descr = {
				'name': element.longname,
				'desc': element.description || '',
				'implements': element.implements ? element.implements : [],
				'inherits': element.augments ? element.augments : [],
			};

			/**/ if(element.kind === 'class')
			{
				if(!parentDescr.classes)
				{
					parentDescr.classes = [];
				}

				parentDescr.classes.push(descr);
			}
			else if(element.kind === 'interface')
			{
				if(!parentDescr.interfaces)
				{
					parentDescr.interfaces = [];
				}

				parentDescr.interfaces.push(descr);
			}

			/*-------------------------------------------------*/
			/* DETAILS                                         */
			/*-------------------------------------------------*/

			if(element.version)
			{
				descr.see = element.version;
			}

			if(element.author)
			{
				descr.see = element.author;
			}

			if(element.see)
			{
				descr.see = element.see;
			}

			/*-------------------------------------------------*/

			if(element.kind === 'class')
			{
				/*-----------------------------------------*/
				/* CONSTRUCTOR                             */
				/*-----------------------------------------*/

				descr.konstructor = {
					'name': element.name,
					'params': [],
				};

				/*-----------------------------------------*/
				/* PARAMETERS                              */
				/*-----------------------------------------*/

				for(const i in element.params)
				{
					descr.konstructor.params.push({
						'name': element.params[i].name,
						'type': typeHelper(element.params[i].type),
						'desc': element.params[i].description || '',
						'default': element.params[i].defaultvalue || '',
						'optional': typeof element.params[i].optional === 'boolean' ? element.params[i].optional : '',
						'nullable': typeof element.params[i].nullable === 'boolean' ? element.params[i].nullable : '',
					});
				}

				/*-----------------------------------------*/
				/* EXCEPTIONS                              */
				/*-----------------------------------------*/

				if(element.exceptions)
				{
					descr.konstructor.exceptions = [];

					for(const i in element.exceptions)
					{
						descr.konstructor.exceptions.push({
							'type': typeHelper(element.exceptions[i].type),
							'desc': element.exceptions[i].description || '',
						});
					}
				}

				/*-----------------------------------------*/
				/* EXAMPLES                                */
				/*-----------------------------------------*/

				if(element.examples)
				{
					descr.konstructor.examples = [];

					for(const i in element.examples)
					{
						descr.konstructor.examples.push(element.examples[i]);
					}
				}

				/*-----------------------------------------*/
				/* INHERITED METHODS                       */
				/*-----------------------------------------*/

				if(element.implements)
				{
					for(const i in element.implements)
					{
						process(done, nodes, descr, element.implements[i]);
					}
				}

				/*-----------------------------------------*/

				if(element.augments)
				{
					for(const i in element.augments)
					{
						process(done, nodes, descr, element.augments[i]);
					}
				}

				/*-----------------------------------------*/
			}

			/*-------------------------------------------------*/

			process(done, nodes, descr, element.longname);

			/*-------------------------------------------------*/
	 	}

		/*---------------------------------------------------------*/
		/* VARIABLE                                                */
		/*---------------------------------------------------------*/

		else if(element.kind === 'member')
		{
			/*-------------------------------------------------*/
			/* THIS                                            */
			/*-------------------------------------------------*/

			const descr = {
				'name': element.name,
				'type': typeHelper(element.type),
				'desc': element.description || '',
			};

			if(!parentDescr.variables)
			{
				parentDescr.variables = [];
			}

			parentDescr.variables.push(descr);

			/*-------------------------------------------------*/
			/* DETAILS                                         */
			/*-------------------------------------------------*/

			if(element.version)
			{
				descr.see = element.version;
			}

			if(element.author)
			{
				descr.see = element.author;
			}

			if(element.see)
			{
				descr.see = element.see;
			}

			/*-------------------------------------------------*/
			/* EXAMPLES                                        */
			/*-------------------------------------------------*/

			if(element.examples)
			{
				descr.examples = [];

				for(const i in element.examples)
				{
					descr.examples.push(element.examples[i]);
				}
			}

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
		/* FUNCTION                                                */
		/*---------------------------------------------------------*/

		else if(element.kind === 'function'
		        ||
		        element.kind === 'event'
		 ) {
			/*-------------------------------------------------*/
			/* THIS                                            */
			/*-------------------------------------------------*/

			const descr = {
				'name': element.name,
				'desc': element.description || '',
				'params': [],
			};

			/**/ if(element.kind === 'function')
			{
				if(!parentDescr.functions)
				{
					parentDescr.functions = [];
				}

				parentDescr.functions.push(descr);
			}
			else if(element.kind === 'event')
			{
				if(!parentDescr.events)
				{
					parentDescr.events = [];
				}

				parentDescr.events.push(descr);
			}

			/*-------------------------------------------------*/
			/* DETAILS                                         */
			/*-------------------------------------------------*/

			if(element.version)
			{
				descr.see = element.version;
			}

			if(element.author)
			{
				descr.see = element.author;
			}

			if(element.see)
			{
				descr.see = element.see;
			}

			/*-------------------------------------------------*/
			/* PARAMETERS                                      */
			/*-------------------------------------------------*/

			for(const i in element.params)
			{
				descr.params.push({
					'name': element.params[i].name,
					'type': typeHelper(element.params[i].type),
					'desc': element.params[i].description || '',
					'default': element.params[i].defaultvalue || '',
					'optional': typeof element.params[i].optional === 'boolean' ? element.params[i].optional : '',
					'nullable': typeof element.params[i].nullable === 'boolean' ? element.params[i].nullable : '',
				});
			}

			/*-------------------------------------------------*/
			/* EXCEPTIONS                                      */
			/*-------------------------------------------------*/

			if(element.exceptions)
			{
				descr.exceptions = [];

				for(const i in element.exceptions)
				{
					descr.exceptions.push({
						'type': typeHelper(element.exceptions[i].type),
						'desc': element.exceptions[i].description || '',
					});
				}
			}

			/*-------------------------------------------------*/
			/* RETURNS                                         */
			/*-------------------------------------------------*/

			if(element.returns)
			{
				descr.returns = [];

				for(const i in element.returns)
				{
					descr.returns.push({
						'type': typeHelper(element.returns[i].type),
						'desc': element.returns[i].description || '',
					});
				}
			}

			/*-------------------------------------------------*/
			/* EXAMPLES                                        */
			/*-------------------------------------------------*/

			if(element.examples)
			{
				descr.examples = [];

				for(const i in element.examples)
				{
					descr.examples.push(element.examples[i]);
				}
			}

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	});

	return parentDescr;
}

/*-------------------------------------------------------------------------*/

exports.publish = function(data, opts)
{
	/*-----------------------------------------------------------------*/

	data({
		undocumented: true
	}).remove();

	/*-----------------------------------------------------------------*/

	const docs = data().get();

	const root = process({}, docs, {});

	/*-----------------------------------------------------------------*/

	const result = [
		'/*!',
		' * AMI Web Framework - ' + filename,
		' *',
		' * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team / LPSC / IN2P3',
		' *',
		' * This file must be used under the terms of the CeCILL-C:',
		' * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html',
		' * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html',
		' *',
		' */',
		'',
		'\'use strict\';',
		'',
		'/*-------------------------------------------------------------------------*/',
		'',
		'/* eslint-disable */',
		'',
		'var amiDoc = ' + JSON.stringify(root) + ';',
		'',
		'/* eslint-enable */',
		'',
		'/*-------------------------------------------------------------------------*/',

	].join('\n');

	/*-----------------------------------------------------------------*/

	if(opts.destination === 'console')
	{
		console.log(result);
	}
	else
	{
		/*---------------------------------------------------------*/

		const dirname = path.normalize(opts.destination);

		/*---------------------------------------------------------*/

		fs.mkPath(dirname);

		fs.writeFileSync(path.join(dirname, filename), result, 'utf8');

		/*---------------------------------------------------------*/
	}

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
