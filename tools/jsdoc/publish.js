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

function nameHelper(name)
{
	return name.replace(/\//g, '.');
}

/*-------------------------------------------------------------------------*/

function typeHelper(type)
{
	return type ? (type.names.length === 1 ? type.names[0] : type.names) : '';
}

/*-------------------------------------------------------------------------*/

function graft(parentNode, childNodes, parentLongName, parentName)
{
	childNodes.filter(function(element) {

		return element.memberof === parentLongName;

	}).forEach(function(element, index) {

		var i;

		/*---------------------------------------------------------*/
		/* NAMESPACE                                               */
		/*---------------------------------------------------------*/

		/**/ if(element.kind === 'namespace')
		{
			/*-------------------------------------------------*/
			/* THIS                                            */
			/*-------------------------------------------------*/

			var thisNamespace = {
				'name': nameHelper(element.name),
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

			graft(thisNamespace, childNodes, element.longname, element.name);

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
				'name': nameHelper(element.name),
				'desc': element.description || '',
				'implements': element.implements ? element.implements.map(nameHelper) : [],
				'inherits': element.augments ? element.augments.map(nameHelper) : [],
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
					'name': nameHelper(element.name),
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
			}

			/*-------------------------------------------------*/

			graft(thisClass, childNodes, element.longname, element.name);

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
				'name': nameHelper(element.name),
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
				'name': nameHelper(element.name),
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
					'name': nameHelper(element.params[i].name),
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
}

/*-------------------------------------------------------------------------*/

exports.publish = function(data, opts) {

	data({undocumented: true}).remove();

	var docs = data().get();

	var root = {};

	graft(root, docs);

	if(opts.destination === 'console')
	{
		console.log(JSON.stringify(root, null, 4));
	}
	else
	{
		console.log('This template only supports output to the console. Use the option "-d console" when you run JSDoc.');
	}
};

/*-------------------------------------------------------------------------*/
