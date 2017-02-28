/*!
 * AMI Web Framework
 * AMI JSDoc renderer
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/

var jsDoc = {
	/*-----------------------------------------------------------------*/

	linkRe: /\{@link\s+([^\s\}]+)\s*\}/g,

	/*-----------------------------------------------------------------*/

	makeDoc: function(url)
	{
		$.ajax({url: url, cache: false, dataType: 'json'}).done(function(data) {

			jsDoc.json = data;

			jsDoc.makeMenu();

		}).fail(function() {

			$('#jsdoc_content').html('<div class="alert alert-danger">Could not open `' + url + '!`!</div>');
		});
	},

	/*-----------------------------------------------------------------*/

	makeMenu: function()
	{
		var s = '<h5><a href=""><i class="fa fa-home"></i> Home</a></h5><hr />';

		s += this.makeSubMenu('Global', 'global');
		s += this.makeSubMenu('Namespace', 'namespaces');
		s += this.makeSubMenu('Interface', 'interfaces');
		s += this.makeSubMenu('Class', 'classes');

		$('#jsdoc_menu').html(s);
	},

	/*-----------------------------------------------------------------*/

	makeSubMenu: function(title, cat)
	{
		var result = '';

		/*---------------------------------------------------------*/

		var items;

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

		/*---------------------------------------------------------*/

		if(items && items.length > 0)
		{
			var id = 'jsdoc_menu_' + title.toLowerCase();

			result += '<h5><a href="#' + id + '" data-toggle="collapse"><i class="fa fa-book"></i> ' + title + '</a></h5>';

			result += '<ul class="collapse" id="' +  id + '">';

			for(var i in items)
			{
				result += '<li><a href="javascript:jsDoc.makeContent(\'' + title + '\',\'' + cat + '\',\'' + items[i].name + '\');">' + items[i].name + '</a></li>';
			}

			result += '</ul>';
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	makeContent: function(title, cat, name)
	{
		var s = '';

		/*---------------------------------------------------------*/

		var item;

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

		/*---------------------------------------------------------*/

		s += '<div class="well">';
		s += '<h1>' + title + ': ' + item.name + '</h1>';
		s += '<div>' + this.makeDesc(item) + '</div>';
		s += this.makeDetails(item);
		s += '</div>';

		/*---------------------------------------------------------*/

		if(item.konstructor)
		{
			s += '<h3>Constructor</h3>';

			s += this.makeFunction(item.konstructor);
		}

		if(item.variables)
		{
			s += '<h3>Members</h3>';

			for(var i in item.variables)
			{
				s += this.makeVariable(item.variables[i]);
			}
		}

		if(item.functions)
		{
			s += '<h3>Methods</h3>';

			for(var i in item.functions)
			{
				s += this.makeFunction(item.functions[i]);
			}
		}

		if(item.events)
		{
			s += '<h3>Events</h3>';

			for(var i in item.events)
			{
				s += this.makeFunction(item.events[i]);
			}
		}

		/*---------------------------------------------------------*/

		$('#jsdoc_content').html(s);

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	makeVariable: function(variable)
	{
		var result = '';

		/*---------------------------------------------------------*/

		result += '<hr />';

		result += this.makeVariableSignature(variable);

		result += '<div>' + this.makeDesc(variable) + '</div>';

		result += this.makeDetails(variable);

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	makeVariableSignature: function(variable)
	{
		var result = '';

		/*---------------------------------------------------------*/

		result += '<span class="signature-name">' + variable.name + '</span>';

		result += '<span class="signature-attrs">: {' + this.makeType(variable) + '}</span>';

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	makeFunction: function(method)
	{
		var result = '';

		/*---------------------------------------------------------*/

		result += '<hr />';

		result += this.makeFunctionSignature(method);

		result += '<div>' + this.makeDesc(method) + '</div>';

		result += this.makeFunctionParameters(method);

		result += this.makeDetails(method);

		result += this.makeFunctionExceptions(method);

		result += this.makeFunctionReturn(method);

		result += this.makeExamples(method);

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	makeFunctionSignature: function(method)
	{
		var result = '';

		/*---------------------------------------------------------*/

		result += '<span class="signature-name">' + method.name + '</span>';

		/*---------------------------------------------------------*/

		var L = [];

		for(var i in method.params)
		{
			var s = method.params[i].name;

			if(method.params[i].optional === true)
			{
				s += '<span class="signature-params-attrs">opt</span>';
			}

			L.push(s);
		}

		result += '<span class="signature-params">(' + L.join(', ') + ')</span>';

		/*---------------------------------------------------------*/

		if(method.returns)
		{
			var M = [];

			for(var i in method.returns)
			{
				M.push(this.makeType(method.returns[i]));
			}

			result += '<span class="signature-attrs"> &rarr; {' + M.join(' or ') + '}</span>';
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	makeFunctionParameters: function(method)
	{
		var result = '';

		/*---------------------------------------------------------*/

		if(method.params.length > 0)
		{
			/*-------------------------------------------------*/

			var L1 = [], L2 = [], L3 = [], L4 = [], L5 = [], L6 = [];

			var cnt1 = 0, cnt2 = 0, cnt3 = 0, cnt4 = 0, cnt5 = 0, cnt6 = 0;

			for(var i in method.params)
			{
				var parameter = method.params[i];

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

			/*-------------------------------------------------*/

			result += '<h5><strong>Parameters:</strong></h5>';

			result += '<table class="table table-condensed table-bordered table-striped" style="width: auto;">';

			result += '<thread>';
			result += '<tr>';

			if(cnt1 > 0) {
				result += '<td>Name</td>';
			}
			if(cnt2 > 0) {
				result += '<td>Type</td>';
			}
			if(cnt4 > 0) {
				result += '<td>Default</td>';
			}
			if(cnt5 > 0) {
				result += '<td>Optional</td>';
			}
			if(cnt6 > 0) {
				result += '<td>Nullable</td>';
			}
			if(cnt3 > 0) {
				result += '<td>Description</td>';
			}

			result += '</tr>';
			result += '</thread>';

			result += '<tbody>';

			for(var i in method.params)
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

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	makeFunctionExceptions: function(method)
	{
		var result = '';

		/*---------------------------------------------------------*/

		for(var i in method.exceptions)
		{
			result += '<h5><strong>Throws:</strong></h5>';

			result += '<div>' + this.makeDesc(method.exceptions[i]) + '</div>';

			result += '<div>Type: ' + this.makeType(method.exceptions[i]) + '</div>';
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	makeFunctionReturn: function(method)
	{
		var result = '';

		/*---------------------------------------------------------*/

		for(var i in method.returns)
		{
			result += '<h5><strong>Returns:</strong></h5>';

			result += '<div>' + this.makeDesc(method.returns[i]) + '</div>';

			result += '<div>Type: ' + this.makeType(method.returns[i]) + '</div>';
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	makeDesc: function(x)
	{
		var result = '';

		/*---------------------------------------------------------*/

		if(x.desc)
		{
			result += x.desc.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(this.linkRe, function(x, y) {

				return '<a href="' + y + '">' + y + '</a>';
			});
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	makeType: function(x)
	{
		var result = '';

		/*---------------------------------------------------------*/

		if(x.type)
		{
			if(x.type instanceof Array)
			{
				result += x.type.join(' or ').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			}
			else
			{
				result += x.type.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			}
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	makeDetails: function(x)
	{
		var result = '';

		/*---------------------------------------------------------*/

		if(x.implements && x.implements.length > 0)
		{
			result += '<div>Implements: ' + x.implements.join(', ') + '</div>';
		}

		if(x.inherits && x.inherits.length > 0)
		{
			result += '<div>Inherits: ' + x.inherits.join(', ') + '</div>';
		}

		/*---------------------------------------------------------*/

		var version = '';
		var author = '';
		var see = '';

		if(x.version)
		{
			version += '<dt>Version:</dt><dd>' + x.version + '</dd>';
		}

		if(x.author)
		{
			for(var i in x.author)
			{
				author += '<dt>Author:</dt><dd>' + x.author[i] + '</dd>';
			}
		}

		if(x.see)
		{
			for(var i in x.see)
			{
				see += '<dt>See:</dt><dd>' + x.see[i] + '</dd>';
			}
		}

		/*---------------------------------------------------------*/

		if(author || version || see)
		{
			result += '<dl class="details">';
			result += version;
			result += author;
			result += see;
			result += '</dl>';
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	makeExamples: function(x)
	{
		var result = '';

		/*---------------------------------------------------------*/

		for(var i in x.examples)
		{
			result += '<h5><strong>Example:</strong></h5>';

			result += '<pre class="ami-code"><code>' + highlight.highlight(x.examples[i], 'js') + '</code></pre>';
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
