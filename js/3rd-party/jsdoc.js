/*!
 * AMI Web Framework
 * AMI JSDoc renderer
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global highlight
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

const jsDoc = {
	/*----------------------------------------------------------------------------------------------------------------*/

	_linkRe: /(?:\[\s*([^\s\]]+)\s*\])?{@link\s+([^\s}]+)\s*}/g,

	/*----------------------------------------------------------------------------------------------------------------*/

	_replace: function(s, oldStrs, newStrs)
	{
		const result = [];

		const l = (((s))).length;
		const m = oldStrs.length;
		const n = newStrs.length;

		if(m != n)
		{
			throw 'internal error';
		}

__l0:	for(let i = 0; i < l; i += 0)
		{
			const p = s.substring(i);

			for(let j = 0; j < m; j += 1)
			{
				if(p.indexOf(oldStrs[j]) === 0)
				{
					result.push(newStrs[j]);

					i += oldStrs[j].length;

					continue __l0;
				}
			}

			result.push(s.charAt(i++));
		}

		return result.join('');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_textToHtmlX: ['&'    , '"'     , '<'   , '>'   ],
	_textToHtmlY: ['&amp;', '&quot;', '&lt;', '&gt;'],

	textToHtml: function(s)
	{
		return this._replace(s || '', this._textToHtmlX, this._textToHtmlY);
	},

	htmlToText: function(s)
	{
		return this._replace(s || '', this._textToHtmlY, this._textToHtmlX);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeDoc: function(json)
	{
		jsDoc.json = json;

		jsDoc.makeMenu();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeMenu: function()
	{
		let s = '<a class="list-group-item list-group-item-action p-2" href=""><i class="fa fa-home"></i> Home</a>';

		s += '<div class="list-group-item list-group-item-action p-2">';

		s += this.makeSubMenu('Global', 'global');
		s += this.makeSubMenu('Namespace', 'namespaces');
		s += this.makeSubMenu('Interface', 'interfaces');
		s += this.makeSubMenu('Class', 'classes');

		s += '</div>';

		$('#jsdoc_menu').html(s);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeSubMenu: function(title, cat)
	{
		let result = '';

		/*------------------------------------------------------------------------------------------------------------*/

		let items;

		if(cat === 'global')
		{
			items = [];

			if(this.json['variables']) {
				items = items.concat(this.json['variables']);
			}

			if(this.json['functions']) {
				items = items.concat(this.json['functions']);
			}
		}
		else
		{
			items = this.json[cat];
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if(items && items.length > 0)
		{
			const id = 'jsdoc_menu_' + title.toLowerCase();

			result += '<div>';

			result += '<a href="#' + id + '" data-toggle="collapse"><i class="fa fa-book"></i> ' + title + '</a>';

			result += '<ul class="collapse mb-0" id="' +  id + '">';

			for(const i in items)
			{
				result += '<li><a href="javascript:jsDoc.makeContent(\'' + title + '\',\'' + cat + '\',\'' + items[i].name + '\');">' + items[i].name + '</a></li>';
			}

			result += '</ul>';

			result += '</div>';
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeContent: function(title, cat, name)
	{
		let s = '';

		/*------------------------------------------------------------------------------------------------------------*/

		let item;

		if(cat === 'global')
		{
			item = {
				name: 'variables and functions',
				variables: this.json['variables'],
				functions: this.json['functions'],
			};
		}
		else
		{
			item = this.json[cat].filter(function(item) {

				return item.name === name;

			})[0];
		}

		/*------------------------------------------------------------------------------------------------------------*/

		s += '<div class="card">';
		s += '<div class="card-body bg-light">';
		s += '<h1>' + title + ': ' + item.name + '</h1>';
		s += '<div>' + this.makeDesc(item) + '</div>';
		s += this.makeDetails(item);
		s += '</div>';
		s += '</div>';

		/*------------------------------------------------------------------------------------------------------------*/

		if(item.konstructor)
		{
			s += '<h3 class="mt-3">Constructor</h3>';

			s += this.makeFunction(item.konstructor);
		}

		if(item.variables)
		{
			s += '<h3 class="mt-3">Members</h3>';

			for(const i in item.variables)
			{
				s += this.makeVariable(item.variables[i]);
			}
		}

		if(item.functions)
		{
			s += '<h3 class="mt-3">Methods</h3>';

			for(const i in item.functions)
			{
				s += this.makeFunction(item.functions[i]);
			}
		}

		if(item.events)
		{
			s += '<h3 class="mt-3">Events</h3>';

			for(const i in item.events)
			{
				s += this.makeFunction(item.events[i]);
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		$('#jsdoc_content').html(s);

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeVariable: function(variable)
	{
		let result = '';

		/*------------------------------------------------------------------------------------------------------------*/

		result += '<hr id="jsdoc_variable_' + variable.name + '" />';

		result += this.makeVariableSignature(variable);

		result += '<div>' + this.makeDesc(variable) + '</div>';

		result += this.makeDetails(variable);

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeVariableSignature: function(variable)
	{
		let result = '';

		/*------------------------------------------------------------------------------------------------------------*/

		result += '<span class="signature-name">' + variable.name + '</span>';

		result += '<span class="signature-attrs">: {' + this.makeType(variable) + '}</span>';

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeFunction: function(method)
	{
		let result = '';

		/*------------------------------------------------------------------------------------------------------------*/

		result += '<hr id="jsdoc_method_' + method.name + '" />';

		result += this.makeFunctionSignature(method);

		result += '<div>' + this.makeDesc(method) + '</div>';

		result += this.makeFunctionParameters(method);

		result += this.makeDetails(method);

		result += this.makeFunctionExceptions(method);

		result += this.makeFunctionReturn(method);

		result += this.makeExamples(method);

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeFunctionSignature: function(method)
	{
		let result = '';

		/*------------------------------------------------------------------------------------------------------------*/

		result += '<span class="signature-name">' + method.name + '</span>';

		/*------------------------------------------------------------------------------------------------------------*/

		const L = [];

		for(const i in method.params)
		{
			let s = method.params[i].name;

			if(method.params[i].optional === true)
			{
				s += '<span class="signature-params-attrs">opt</span>';
			}

			L.push(s);
		}

		result += '<span class="signature-params">(' + L.join(', ') + ')</span>';

		/*------------------------------------------------------------------------------------------------------------*/

		if(method.returns)
		{
			const M = [];

			for(const j in method.returns)
			{
				M.push(this.makeType(method.returns[j]));
			}

			result += '<span class="signature-attrs"> &rarr; {' + M.join(' or ') + '}</span>';
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeFunctionParameters: function(method)
	{
		let result = '';

		/*------------------------------------------------------------------------------------------------------------*/

		if(method.params.length > 0)
		{
			/*--------------------------------------------------------------------------------------------------------*/

			const L1 = [], L2 = [], L3 = [], L4 = [], L5 = [], L6 = [];

			let cnt1 = 0, cnt2 = 0, cnt3 = 0, cnt4 = 0, cnt5 = 0, cnt6 = 0;

			for(const i in method.params)
			{
				const parameter = method.params[i];

				L1.push(parameter['name']);
				L2.push(this.makeType(parameter));
				L3.push(this.makeDesc(parameter));
				L4.push(parameter['default']);
				L5.push(parameter['optional']);
				L6.push(parameter['nullable']);

				if(parameter['name']) {
					cnt1++;
				}
				if(parameter['type']) {
					cnt2++;
				}
				if(parameter['desc']) {
					cnt3++;
				}
				if(parameter['default']) {
					cnt4++;
				}
				if(parameter['optional']) {
					cnt5++;
				}
				if(parameter['nullable']) {
					cnt6++;
				}
			}

			/*--------------------------------------------------------------------------------------------------------*/

			result += '<h5><strong>Parameters:</strong></h5>';

			result += '<table class="table table-sm table-bordered" style="width: auto;">';

			result += '<thread>';
			result += '<tr>';

			if(cnt1 > 0) {
				result += '<th>Name</th>';
			}
			if(cnt2 > 0) {
				result += '<th>Type</th>';
			}
			if(cnt4 > 0) {
				result += '<th>Default</th>';
			}
			if(cnt5 > 0) {
				result += '<th>Optional</th>';
			}
			if(cnt6 > 0) {
				result += '<th>Nullable</th>';
			}
			if(cnt3 > 0) {
				result += '<th>Description</th>';
			}

			result += '</tr>';
			result += '</thread>';

			result += '<tbody>';

			for(const i in method.params)
			{
				result += '<tr>';

				if(cnt1 > 0) {
					result += '<td><kbd>' + L1[i] + '</kbd></td>';
				}
				if(cnt2 > 0) {
					result += '<td>' + L2[i] + '</td>';
				}
				if(cnt4 > 0) {
					result += '<td>' + L4[i] + '</td>';
				}
				if(cnt5 > 0) {
					result += '<td>' + L5[i] + '</td>';
				}
				if(cnt6 > 0) {
					result += '<td>' + L6[i] + '</td>';
				}
				if(cnt3 > 0) {
					result += '<td>' + L3[i] + '</td>';
				}

				result += '</tr>';
			}

			result += '</tbody>';

			result += '</table>';

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeFunctionExceptions: function(method)
	{
		let result = '';

		/*------------------------------------------------------------------------------------------------------------*/

		for(const i in method.exceptions)
		{
			result += '<h5><strong>Throws:</strong></h5>';

			result += '<div>' + this.makeDesc(method.exceptions[i]) + '</div>';

			result += '<div>Type: ' + this.makeType(method.exceptions[i]) + '</div>';
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeFunctionReturn: function(method)
	{
		let result = '';

		/*------------------------------------------------------------------------------------------------------------*/

		for(const i in method.returns)
		{
			result += '<h5><strong>Returns:</strong></h5>';

			result += '<div>' + this.makeDesc(method.returns[i]) + '</div>';

			result += '<div>Type: ' + this.makeType(method.returns[i]) + '</div>';
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeDesc: function(x)
	{
		let result = '';

		/*------------------------------------------------------------------------------------------------------------*/

		if(x.desc)
		{
			result += this.textToHtml(x.desc).replace(this._linkRe, function(x, y, z) {

				return '<a href="' + z + '">' + (y || z) + '</a>';
			});
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeType: function(x)
	{
		let result = '';

		/*------------------------------------------------------------------------------------------------------------*/

		if(x.type)
		{
			if(x.type instanceof Array)
			{
				result += this.textToHtml(x.type.join(' or '));
			}
			else
			{
				result += this.textToHtml(x.type);
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeDetails: function(x)
	{
		let result = '';

		/*------------------------------------------------------------------------------------------------------------*/

		if(x.implements && x.implements.length > 0)
		{
			result += '<div>Implements: ' + x.implements.join(', ') + '</div>';
		}

		if(x.inherits && x.inherits.length > 0)
		{
			result += '<div>Inherits: ' + x.inherits.join(', ') + '</div>';
		}

		/*------------------------------------------------------------------------------------------------------------*/

		let version = '';
		let author = '';
		let see = '';

		if(x.version)
		{
			version += '<dt>Version:</dt><dd>' + x.version + '</dd>';
		}

		if(x.author)
		{
			for(const i in x.author)
			{
				author += '<dt>Author:</dt><dd>' + x.author[i] + '</dd>';
			}
		}

		if(x.see)
		{
			for(const i in x.see)
			{
				see += '<dt>See:</dt><dd>' + x.see[i] + '</dd>';
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if(author || version || see)
		{
			result += '<dl class="details">';
			result += version;
			result += author;
			result += see;
			result += '</dl>';
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeExamples: function(x)
	{
		let result = '';

		/*------------------------------------------------------------------------------------------------------------*/

		for(const i in x.examples)
		{
			result += '<h5><strong>Example:</strong></h5>';

			result += '<textarea class="form-editor" data-mode="javascript">' + this.textToHtml(x.examples[i]) + '</textarea>';
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
};

/*--------------------------------------------------------------------------------------------------------------------*/
