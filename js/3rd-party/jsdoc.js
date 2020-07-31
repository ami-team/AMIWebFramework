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
 */

/*--------------------------------------------------------------------------------------------------------------------*/

const jsDoc = {
	/*----------------------------------------------------------------------------------------------------------------*/
	/*----------------------------------------------------------------------------------------------------------------*/

	_linkRe: /(?:\[\s*([^\s\]]+)\s*\])?{@link\s+([^\s}]+)\s*}/g,

	/*----------------------------------------------------------------------------------------------------------------*/
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
	/*----------------------------------------------------------------------------------------------------------------*/

	makeDoc: function(json)
	{
		jsDoc.json = json;

		jsDoc.makeMenu();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeMenu: function()
	{
		const s = [];

		s.push('<a class="list-group-item list-group-item-action p-2" href=""><i class="fa fa-home"></i> Home</a>');

		s.push('<div class="list-group-item list-group-item-action p-2">');

		s.push(this.makeSubMenu('Global', 'global'));
		s.push(this.makeSubMenu('Namespace', 'namespaces'));
		s.push(this.makeSubMenu('Interface', 'interfaces'));
		s.push(this.makeSubMenu('Class', 'classes'));

		s.push('</div>');

		$('#jsdoc_menu').html(s.join(''));
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeSubMenu: function(title, cat)
	{
		const result = [];

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

			result.push('<div>');

			result.push('<a href="#' + id + '" data-toggle="collapse"><i class="fa fa-book"></i> ' + title + '</a>');

			result.push('<ul class="collapse mb-0" id="' +  id + '">');

			for(const i in items)
			{
				result.push('<li><a href="javascript:jsDoc.makeContent(\'' + title + '\',\'' + cat + '\',\'' + items[i].name + '\');">' + items[i].name + '</a></li>');
			}

			result.push('</ul>');

			result.push('</div>');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeContent: function(title, cat, name)
	{
		const s = [];

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

		s.push('<div class="card">');
		s.push('<div class="card-body bg-light">');
		s.push('<h1>' + title + ': ' + item.name + '</h1>');
		s.push('<div>' + this.makeDesc(item) + '</div>');
		s.push(this.makeDetails(item));
		s.push('</div>');
		s.push('</div>');

		/*------------------------------------------------------------------------------------------------------------*/

		if(item.konstructor)
		{
			s.push('<h3 class="mt-3">Constructor</h3>');

			s.push(this.makeFunction(item.konstructor));
		}

		if(item.variables)
		{
			s.push('<h3 class="mt-3">Members</h3>');

			for(const i in item.variables)
			{
				s.push(this.makeVariable(item.variables[i]));
			}
		}

		if(item.functions)
		{
			s.push('<h3 class="mt-3">Methods</h3>');

			for(const i in item.functions)
			{
				s.push(this.makeFunction(item.functions[i]));
			}
		}

		if(item.events)
		{
			s.push('<h3 class="mt-3">Events</h3>');

			for(const i in item.events)
			{
				s.push(this.makeFunction(item.events[i]));
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		$('#jsdoc_content').html(s.join(''));

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeVariable: function(variable)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		result.push('<hr id="jsdoc_variable_' + variable.name + '" />');

		result.push(this.makeVariableSignature(variable));

		result.push('<div>' + this.makeDesc(variable) + '</div>');

		result.push(this.makeDetails(variable));

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeVariableSignature: function(variable)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		result.push('<span class="signature-name">' + variable.name + '</span>');

		result.push('<span class="signature-attrs">: {' + this.makeType(variable) + '}</span>');

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeFunction: function(method)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		result.push('<hr id="jsdoc_method_' + method.name + '" />');

		result.push(this.makeFunctionSignature(method));

		result.push('<div>' + this.makeDesc(method) + '</div>');

		result.push(this.makeFunctionParameters(method));

		result.push(this.makeDetails(method));

		result.push(this.makeFunctionExceptions(method));

		result.push(this.makeFunctionReturn(method));

		result.push(this.makeExamples(method), 'javascript');

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeFunctionSignature: function(method)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		result.push('<span class="signature-name">' + method.name + '</span>');

		/*------------------------------------------------------------------------------------------------------------*/

		const L = [];

		for(const i in method.params)
		{
			const s = [method.params[i].name];

			if(method.params[i].optional === true)
			{
				s.push('<span class="signature-params-attrs">opt</span>');
			}

			L.push(s);
		}

		result.push('<span class="signature-params">(' + L.join(', ') + ')</span>');

		/*------------------------------------------------------------------------------------------------------------*/

		if(method.returns)
		{
			const M = [];

			for(const j in method.returns)
			{
				M.push(this.makeType(method.returns[j]));
			}

			result.push('<span class="signature-attrs"> &rarr; {' + M.join(' or ') + '}</span>');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeFunctionParameters: function(method)
	{
		let result = [];

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

			result.push('<h5><strong>Parameters:</strong></h5>');

			result.push('<table class="table table-sm table-bordered" style="width: auto;">');

			result.push('<thread>');
			result.push('<tr>');

			if(cnt1 > 0) {
				result.push('<th>Name</th>');
			}
			if(cnt2 > 0) {
				result.push('<th>Type</th>');
			}
			if(cnt4 > 0) {
				result.push('<th>Default</th>');
			}
			if(cnt5 > 0) {
				result.push('<th>Optional</th>');
			}
			if(cnt6 > 0) {
				result.push('<th>Nullable</th>');
			}
			if(cnt3 > 0) {
				result.push('<th>Description</th>');
			}

			result.push('</tr>');
			result.push('</thread>');

			result.push('<tbody>');

			for(const i in method.params)
			{
				result.push('<tr>');

				if(cnt1 > 0) {
					result.push('<td><kbd>' + L1[i] + '</kbd></td>');
				}
				if(cnt2 > 0) {
					result.push('<td>' + L2[i] + '</td>');
				}
				if(cnt4 > 0) {
					result.push('<td>' + L4[i] + '</td>');
				}
				if(cnt5 > 0) {
					result.push('<td>' + L5[i] + '</td>');
				}
				if(cnt6 > 0) {
					result.push('<td>' + L6[i] + '</td>');
				}
				if(cnt3 > 0) {
					result.push('<td>' + L3[i] + '</td>');
				}

				result.push('</tr>');
			}

			result.push('</tbody>');

			result.push('</table>');

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeFunctionExceptions: function(method)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		for(const i in method.exceptions)
		{
			result.push('<h5><strong>Throws:</strong></h5>');

			result.push('<div>' + this.makeDesc(method.exceptions[i]) + '</div>');

			result.push('<div>Type: ' + this.makeType(method.exceptions[i]) + '</div>');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeFunctionReturn: function(method)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		for(const i in method.returns)
		{
			result.push('<h5><strong>Returns:</strong></h5>');

			result.push('<div>' + this.makeDesc(method.returns[i]) + '</div>');

			result.push('<div>Type: ' + this.makeType(method.returns[i]) + '</div>');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('')
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeDesc: function(x)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		if(x.desc)
		{
			result.push(this.textToHtml(x.desc).replace(this._linkRe, function(x, y, z) {

				return '<a href="' + z + '">' + (y || z) + '</a>';
			}));
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeType: function(x)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		if(x.type)
		{
			if(x.type instanceof Array)
			{
				result.push(this.textToHtml(x.type.join(' or ')));
			}
			else
			{
				result.push(this.textToHtml(x.type));
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeDetails: function(x)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		if(x.implements && x.implements.length > 0)
		{
			result.push('<div>Implements: ' + x.implements.join(', ') + '</div>');
		}

		if(x.inherits && x.inherits.length > 0)
		{
			result.push('<div>Inherits: ' + x.inherits.join(', ') + '</div>');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		const version = [];
		const author = [];
		const see = [];

		if(x.version)
		{
			version.push('<dt>Version:</dt><dd>' + x.version + '</dd>');
		}

		if(x.author)
		{
			for(const i in x.author)
			{
				author.push('<dt>Author:</dt><dd>' + x.author[i] + '</dd>');
			}
		}

		if(x.see)
		{
			for(const i in x.see)
			{
				see.push('<dt>See:</dt><dd>' + x.see[i] + '</dd>');
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if(author.length > 0 || version.length > 0 || see.length > 0)
		{
			result.push('<dl class="details">');
			result.push(version.join(''));
			result.push(author.join(''));
			result.push(see.join(''));
			result.push('</dl>');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeExamples: function(x, mode)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		for(const i in x.examples)
		{
			result.push('<h5><strong>Example:</strong></h5>');

			result.push('<textarea class="form-editor" data-mode="' + mode + '">' + this.textToHtml(x.examples[i]) + '</textarea>');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	},

	/*----------------------------------------------------------------------------------------------------------------*/
};

/*--------------------------------------------------------------------------------------------------------------------*/
