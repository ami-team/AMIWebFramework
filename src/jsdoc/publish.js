/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/

const borrowsExp = /@borrows\s+([a-zA-Z0-9_$]+)(?:\s+as\s+([a-zA-Z0-9_$]+))?/g;

/*--------------------------------------------------------------------------------------------------------------------*/

const filename = 'AMIDoc.js';

/*--------------------------------------------------------------------------------------------------------------------*/

const path = require('path');
const  fs  = require('fs');

/*--------------------------------------------------------------------------------------------------------------------*/

function typeHelper(type)
{
	return Array.isArray(type?.names) ? type.names : [];
}

/*--------------------------------------------------------------------------------------------------------------------*/

function borrowsHelper(node)
{
	const result = {};

	for(let m; (m = borrowsExp.exec(node.comment)) !== null;)
	{
		result[m[1]] = m[2] || m[1];
	}

	return result;
}

/*--------------------------------------------------------------------------------------------------------------------*/

function process(nodes, borrowDict, parentDescr, parentLongName)
{
	nodes.forEach((element) => {

		/*------------------------------------------------------------------------------------------------------------*/

		if(element.access === 'private')
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if(element.ignore && !(element.name in borrowDict))
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if(parentLongName)
		{
			if(parentLongName.toLowerCase() !== (element.memberof || '').toLowerCase())
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

		/*------------------------------------------------------------------------------------------------------------*/
		/* NAMESPACE, INTERFACE, CLASS                                                                                */
		/*------------------------------------------------------------------------------------------------------------*/

		/**/ if(element.kind === 'namespace'
		        ||
		        element.kind === 'interface'
		        ||
		        element.kind === 'class'
		 ) {
			/*--------------------------------------------------------------------------------------------------------*/
			/* THIS                                                                                                   */
			/*--------------------------------------------------------------------------------------------------------*/

			const borrowDict = borrowsHelper(element);

			/*--------------------------------------------------------------------------------------------------------*/

			const descr = {
				'name': element.longname,
				'alias': element.alias || '',
				'desc': element.description || '',
				'implements': element.implements ? element.implements : [],
				'inherits': element.augments ? element.augments : [],
			};

			/*--------------------------------------------------------------------------------------------------------*/

			/**/ if(element.kind === 'namespace')
			{
				if(!Array.isArray(parentDescr.namespaces))
				{
					parentDescr.namespaces = [];
				}

				parentDescr.namespaces.push(descr);
			}
			else if(element.kind === 'interface')
			{
				if(!Array.isArray(parentDescr.interfaces))
				{
					parentDescr.interfaces = [];
				}

				parentDescr.interfaces.push(descr);
			}
			else if(element.kind === 'class')
			{
				if(!Array.isArray(parentDescr.classes))
				{
					parentDescr.classes = [];
				}

				parentDescr.classes.push(descr);
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* DETAILS                                                                                                */
			/*--------------------------------------------------------------------------------------------------------*/

			if(element.version) {
				descr.see = element.version;
			}

			if(element.author) {
				descr.see = element.author;
			}

			if(element.see) {
				descr.see = element.see;
			}

			/*--------------------------------------------------------------------------------------------------------*/

			if(element.kind === 'class')
			{
				/*----------------------------------------------------------------------------------------------------*/
				/* CONSTRUCTOR                                                                                        */
				/*----------------------------------------------------------------------------------------------------*/

				descr.konstructor = {
					'name': element.name,
					'params': [],
				};

				/*----------------------------------------------------------------------------------------------------*/
				/* PARAMETERS                                                                                         */
				/*----------------------------------------------------------------------------------------------------*/

				for(const i in element.params)
				{
					descr.konstructor.params.push({
						'name': element.params[i].name,
						'type': typeHelper(element.params[i].type),
						'desc': element.params[i].description || '',
						'default': element.params[i].defaultvalue !== 'undefined' ? element.params[i].defaultvalue : '',
						'optional': typeof element.params[i].optional === 'boolean' ? element.params[i].optional : '',
						'nullable': typeof element.params[i].nullable === 'boolean' ? element.params[i].nullable : '',
					});
				}

				/*----------------------------------------------------------------------------------------------------*/
				/* EXCEPTIONS                                                                                         */
				/*----------------------------------------------------------------------------------------------------*/

				if(Array.isArray(element.exceptions))
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

				/*----------------------------------------------------------------------------------------------------*/
				/* EXAMPLES                                                                                           */
				/*----------------------------------------------------------------------------------------------------*/

				if(Array.isArray(element.examples))
				{
					descr.konstructor.examples = element.examples;
				}

				/*----------------------------------------------------------------------------------------------------*/
				/* INHERITED METHODS                                                                                  */
				/*----------------------------------------------------------------------------------------------------*/

				if(Array.isArray(element.implements))
				{
					for(const i in element.implements)
					{
						process(nodes, borrowDict, descr, element.implements[i]);
					}
				}

				/*----------------------------------------------------------------------------------------------------*/

				if(Array.isArray(element.augments))
				{
					for(const i in element.augments)
					{
						process(nodes, borrowDict, descr, element.augments[i]);
					}
				}

				/*----------------------------------------------------------------------------------------------------*/
			}

			/*--------------------------------------------------------------------------------------------------------*/

			process(nodes, borrowDict, descr, element.longname);

			/*--------------------------------------------------------------------------------------------------------*/
	 	}

		/*------------------------------------------------------------------------------------------------------------*/
		/* VARIABLE                                                                                                   */
		/*------------------------------------------------------------------------------------------------------------*/

		else if(element.kind === 'member')
		{
			/*--------------------------------------------------------------------------------------------------------*/
			/* THIS                                                                                                   */
			/*--------------------------------------------------------------------------------------------------------*/

			const descr = {
				'name': element.name,
				'alias': element.alias || '',
				'type': typeHelper(element.type),
				'desc': element.description || '',
			};

			/*--------------------------------------------------------------------------------------------------------*/

			if(!Array.isArray(parentDescr.variables))
			{
				parentDescr.variables = [];
			}

			parentDescr.variables.push(descr);

			/*--------------------------------------------------------------------------------------------------------*/
			/* DETAILS                                                                                                */
			/*--------------------------------------------------------------------------------------------------------*/

			if(element.version) {
				descr.see = element.version;
			}

			if(element.author) {
				descr.see = element.author;
			}

			if(element.see) {
				descr.see = element.see;
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* EXAMPLES                                                                                               */
			/*--------------------------------------------------------------------------------------------------------*/

			if(Array.isArray(element.examples))
			{
				descr.examples = element.examples;
			}

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/
		/* FUNCTION                                                                                                   */
		/*------------------------------------------------------------------------------------------------------------*/

		else if(element.kind === 'function'
		        ||
		        element.kind === 'event'
		 ) {
			/*--------------------------------------------------------------------------------------------------------*/
			/* THIS                                                                                                   */
			/*--------------------------------------------------------------------------------------------------------*/

			const descr = {
				'name': element.name,
				'alias': element.alias || '',
				'desc': element.description || '',
				'params': [],
			};

			/*--------------------------------------------------------------------------------------------------------*/

			/**/ if(element.kind === 'function')
			{
				if(!Array.isArray(parentDescr.functions))
				{
					parentDescr.functions = [];
				}

				parentDescr.functions.push(descr);
			}
			else if(element.kind === 'event')
			{
				if(!Array.isArray(parentDescr.events))
				{
					parentDescr.events = [];
				}

				parentDescr.events.push(descr);
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* DETAILS                                                                                                */
			/*--------------------------------------------------------------------------------------------------------*/

			if(element.version) {
				descr.see = element.version;
			}

			if(element.author) {
				descr.see = element.author;
			}

			if(element.see) {
				descr.see = element.see;
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* PARAMETERS                                                                                             */
			/*--------------------------------------------------------------------------------------------------------*/

			for(const i in element.params)
			{
				descr.params.push({
					'name': element.params[i].name,
					'type': typeHelper(element.params[i].type),
					'desc': element.params[i].description || '',
					'default': typeof element.params[i].defaultvalue !== 'undefined' ? element.params[i].defaultvalue : '',
					'optional': typeof element.params[i].optional === 'boolean' ? element.params[i].optional : '',
					'nullable': typeof element.params[i].nullable === 'boolean' ? element.params[i].nullable : '',
				});
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* EXCEPTIONS                                                                                             */
			/*--------------------------------------------------------------------------------------------------------*/

			if(Array.isArray(element.exceptions))
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

			/*--------------------------------------------------------------------------------------------------------*/
			/* RETURNS                                                                                                */
			/*--------------------------------------------------------------------------------------------------------*/

			if(Array.isArray(element.returns))
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

			/*--------------------------------------------------------------------------------------------------------*/
			/* EXAMPLES                                                                                               */
			/*--------------------------------------------------------------------------------------------------------*/

			if(Array.isArray(element.examples))
			{
				descr.examples = element.examples;
			}

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/
	});

	return parentDescr;
}

/*--------------------------------------------------------------------------------------------------------------------*/

exports.publish = function(data, opts)
{
	/*----------------------------------------------------------------------------------------------------------------*/

	data({
		undocumented: true
	}).remove();

	/*----------------------------------------------------------------------------------------------------------------*/

	const docs = data().get();

	const root = process(docs, {}, {}, '');

	/*----------------------------------------------------------------------------------------------------------------*/

	const result = `/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/

/* eslint-disable */

export default ${JSON.stringify(root)};

/* eslint-enable */

/*--------------------------------------------------------------------------------------------------------------------*/
`;

	/*----------------------------------------------------------------------------------------------------------------*/

	if(opts.destination === 'console')
	{
		console.log(result);
	}
	else
	{
		/*------------------------------------------------------------------------------------------------------------*/

		const dirname = path.normalize(opts.destination);

		/*------------------------------------------------------------------------------------------------------------*/

		fs.writeFileSync(path.join(dirname, filename), result, 'utf8');

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/
};

/*--------------------------------------------------------------------------------------------------------------------*/
