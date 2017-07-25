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

var filename = 'AMIDoc.js';

/*-------------------------------------------------------------------------*/

var path = require('jsdoc/path');
var  fs  = require( 'jsdoc/fs' );

/*-------------------------------------------------------------------------*/

function typeHelper(type)
{
	return type ? (type.names.length === 1 ? type.names[0] : type.names) : '';
}

/*-------------------------------------------------------------------------*/

function process(done, parentNode, childNodes, parentLongName)
{
	childNodes.forEach(function(element, index) {

		var i;

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

			var thisNamespace = {
				'name': element.longname,
				'desc': element.description || '',
			};

			if(!parentNode.namespaces)
			{
				parentNode.namespaces = [];
			}

			parentNode.namespaces.push(thisNamespace);

			/*-------------------------------------------------*/
			/* DETAILS                                         */
			/*-------------------------------------------------*/

			if(element.version)
			{
				thisNamespace.see = element.version;
			}

			if(element.author)
			{
				thisNamespace.see = element.author;
			}

			if(element.see)
			{
				thisNamespace.see = element.see;
			}

			/*-------------------------------------------------*/

			process(done, thisNamespace, childNodes, element.longname);

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

			var thisClass = {
				'name': element.longname,
				'desc': element.description || '',
				'implements': element.implements ? element.implements : [],
				'inherits': element.augments ? element.augments : [],
			};

			/**/ if(element.kind === 'class')
			{
				if(!parentNode.classes)
				{
					parentNode.classes = [];
				}

				parentNode.classes.push(thisClass);
			}
			else if(element.kind === 'interface')
			{
				if(!parentNode.interfaces)
				{
					parentNode.interfaces = [];
				}

				parentNode.interfaces.push(thisClass);
			}

			/*-------------------------------------------------*/
			/* DETAILS                                         */
			/*-------------------------------------------------*/

			if(element.version)
			{
				thisClass.see = element.version;
			}

			if(element.author)
			{
				thisClass.see = element.author;
			}

			if(element.see)
			{
				thisClass.see = element.see;
			}

			/*-------------------------------------------------*/

			if(element.kind === 'class')
			{
				/*-----------------------------------------*/
				/* CONSTRUCTOR                             */
				/*-----------------------------------------*/

				thisClass.konstructor = {
					'name': element.name,
					'params': [],
				};

				/*-----------------------------------------*/
				/* PARAMETERS                              */
				/*-----------------------------------------*/

				for(var i in element.params)
				{
					thisClass.konstructor.params.push({
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
					thisClass.konstructor.exceptions = [];

					for(var i in element.exceptions)
					{
						thisClass.konstructor.exceptions.push({
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
					thisClass.konstructor.examples = [];

					for(var i in element.examples)
					{
						thisClass.konstructor.examples.push(element.examples[i]);
					}
				}

				/*-----------------------------------------*/
				/* INHERITED METHODS                       */
				/*-----------------------------------------*/

				if(element.implements)
				{
					for(var i in element.implements)
					{
						process(done, thisClass, childNodes, element.implements[i]);
					}
				}

				/*-----------------------------------------*/

				if(element.augments)
				{
					for(var i in element.augments)
					{
						process(done, thisClass, childNodes, element.augments[i]);
					}
				}

				/*-----------------------------------------*/
			}

			/*-------------------------------------------------*/

			process(done, thisClass, childNodes, element.longname);

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

			var thisVariable = {
				'name': element.name,
				'type': typeHelper(element.type),
				'desc': element.description || '',
			};

			if(!parentNode.variables)
			{
				parentNode.variables = [];
			}

			parentNode.variables.push(thisVariable);

			/*-------------------------------------------------*/
			/* DETAILS                                         */
			/*-------------------------------------------------*/

			if(element.version)
			{
				thisVariable.see = element.version;
			}

			if(element.author)
			{
				thisVariable.see = element.author;
			}

			if(element.see)
			{
				thisVariable.see = element.see;
			}

			/*-------------------------------------------------*/
			/* EXAMPLES                                        */
			/*-------------------------------------------------*/

			if(element.examples)
			{
				thisVariable.examples = [];

				for(var i in element.examples)
				{
					thisVariable.examples.push(element.examples[i]);
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

			var thisFunction = {
				'name': element.name,
				'desc': element.description || '',
				'params': [],
			};

			if(element.kind === 'function')
			{
				if(!parentNode.functions)
				{
					parentNode.functions = [];
				}

				parentNode.functions.push(thisFunction);
			}

			if(element.kind === 'event')
			{
				if(!parentNode.events)
				{
					parentNode.events = [];
				}

				parentNode.events.push(thisFunction);
			}

			/*-------------------------------------------------*/
			/* DETAILS                                         */
			/*-------------------------------------------------*/

			if(element.version)
			{
				thisFunction.see = element.version;
			}

			if(element.author)
			{
				thisFunction.see = element.author;
			}

			if(element.see)
			{
				thisFunction.see = element.see;
			}

			/*-------------------------------------------------*/
			/* PARAMETERS                                      */
			/*-------------------------------------------------*/

			for(i in element.params)
			{
				thisFunction.params.push({
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
				thisFunction.exceptions = [];

				for(i in element.exceptions)
				{
					thisFunction.exceptions.push({
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
				thisFunction.returns = [];

				for(var i in element.returns)
				{
					thisFunction.returns.push({
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
				thisFunction.examples = [];

				for(var i in element.examples)
				{
					thisFunction.examples.push(element.examples[i]);
				}
			}

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	});

	return parentNode;
}

/*-------------------------------------------------------------------------*/

exports.publish = function(data, opts)
{
	/*-----------------------------------------------------------------*/

	data({
		undocumented: true
	}).remove();

	/*-----------------------------------------------------------------*/

	var docs = data().get();

	var root = process({}, {}, docs);

	/*-----------------------------------------------------------------*/

	var result = [
		'/*!',
		' * AMI Web Framework - ' + filename,
		' *',
		' * Copyright (c) 2014-{{YEAR}} The AMI Team / LPSC / IN2P3',
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

		var dirname = path.normalize(opts.destination);

		/*---------------------------------------------------------*/

		fs.mkPath(dirname);

		fs.writeFileSync(path.join(dirname, filename), result, 'utf8');

		/*---------------------------------------------------------*/
	}

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
