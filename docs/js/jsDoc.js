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

	make: function(url)
	{
		$.ajax({url: url, cache: false, dataType: 'json'}).done(function(data) {

			jsDoc.json = data;

			jsDoc.makeMenu();

		}).fail(function() {

			$('#jsdoc_content').html('<div class="alert alert-danger">Could nor open `' + url + '!`!</div>');
		});
	},

	/*-----------------------------------------------------------------*/

	makeMenu: function()
	{
		var s = '<h5><a href=""><i class="fa fa-home"></i> Home</a></h5>';

		s += this.makeSubMenu('Global', '.functions', true);
		s += this.makeSubMenu('Namespace', '.namespaces', false);
		s += this.makeSubMenu('Interface', '.interfaces', false);
		s += this.makeSubMenu('Class', '.classes', false);

		$('#jsdoc_menu').html(s);
	},

	/*-----------------------------------------------------------------*/

	makeSubMenu: function(category, path, sep)
	{
		var result = '';

		/*---------------------------------------------------------*/

		var items = JSPath.apply(path, this.json);

		if(items.length > 0)
		{
			if(sep)
			{
				result += '<hr />';
			}

			result += '<h5><a href="#jsdoc_menu_' + category.toLowerCase() + '" data-toggle="collapse"><i class="fa fa-book"></i> ' + category + '</a></h5>';

			result += '<ul class="collapse" id="jsdoc_menu_' + category.toLowerCase() + '">';

			for(i in items)
			{
				result += '<li><a href="javascript:jsDoc.makeContent(\'' + category + '\', \'' + path + '{.name===&quot;' + items[i].name + '&quot;}\');">' + items[i].name + '</a></li>';
			}

			result += '</ul>';
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	makeContent: function(category, path)
	{
		var s = '';

		/*---------------------------------------------------------*/

		var item = JSPath.apply(path, this.json)[0];

		/*---------------------------------------------------------*/

		s += '<div class="well">';
		s += '<h1>' + category + ': ' + item.name + '</h1>';
		s += '<div>' + this.makeDesc(item.desc) + '</div>';
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

		result += '<span class="signature-name">' + variable.name + '</span>';

		result += '<span class="signature-attrs">: {' + this.makeType(variable.type) + '}</span>';

		result += '<div>' + this.makeDesc(variable.desc) + '</div>';

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

		result += '<div>' + this.makeDesc(method.desc) + '</div>';

		result += this.makeFunctionParameters(method);

		result += this.makeDetails(method);

		result += this.makeFunctionExceptions(method);

		result += this.makeFunctionReturn(method);

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

		for(var i in method.parameters)
		{
			var s = method.parameters[i].name;

			if(method.parameters[i].optional === true)
			{
				s += '<span class="signature-params-attrs">opt</span>'
			}

			L.push(s);
		}

		result += '<span class="signature-params">(' + L.join(', ') + ')</span>';

		/*---------------------------------------------------------*/

		if(method.returns && method.returns.type)
		{
			result += '<span class="signature-attrs"> → {' + this.makeType(method.returns.type) + '}</span>';
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	makeFunctionParameters: function(method)
	{
		var result = '';

		/*---------------------------------------------------------*/

		if(method.parameters.length > 0)
		{
			/*-------------------------------------------------*/

			var L1 = [], L2 = [], L3 = [], L4 = [], L5 = [], L6 = [];

			var cnt1 = 0, cnt2 = 0, cnt3 = 0, cnt4 = 0, cnt5 = 0, cnt6 = 0;

			for(var i in method.parameters)
			{
				var parameter = method.parameters[i];

				L1.push(parameter.name);
		        	L2.push(this.makeType(parameter.type));
		        	L3.push(this.makeDesc(parameter.desc));
		        	L4.push(parameter.default);
		        	L5.push(parameter.optional);
		        	L6.push(parameter.nullable);

				if(parameter.name) {
					cnt1++;
				}
				if(parameter.type) {
					cnt2++;
				}
				if(parameter.desc) {
					cnt3++;
				}
				if(parameter.default) {
					cnt4++;
				}
				if(parameter.optional) {
					cnt5++;
				}
				if(parameter.nullable) {
					cnt6++;
				}
			}

			/*-------------------------------------------------*/

			result += '<h5>Parameters:</h5>';

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

			for(var i in method.parameters)
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

	makeFunctionExceptions(method)
	{
		var result = '';

		/*---------------------------------------------------------*/

		if(method.exceptions)
		{
			for(var i in method.exceptions)
			{
				result += '<h5>Throws:</h5>';

				result += '<div>' + this.makeDesc(method.exceptions[i].desc) + '</div>';

				result += '<div>Type: ' + this.makeType(method.exceptions[i].type) + '</div>';
			}
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	makeFunctionReturn: function(method)
	{
		var result = '';

		/*---------------------------------------------------------*/

		if(method.returns)
		{
			for(var i in method.returns)
			{
				result += '<h5>Returns:</h5>';

				result += '<div>' + this.makeDesc(method.returns[i].desc) + '</div>';

				result += '<div>Type: ' + this.makeType(method.returns[i].type) + '</div>';
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

		if(see)
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

	makeDesc: function(desc)
	{
		var result = '';

		/*---------------------------------------------------------*/

		if(desc)
		{
			result += desc.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(this.linkRe, function(x, y) {

				return '<a href="' + y + '">' + y + '</a>';
			});
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	makeType: function(type)
	{
		if(type instanceof Array)
		{
			return type.join(' or ').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		}
		else
		{
			return type.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		}
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
