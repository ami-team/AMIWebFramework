/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global _, joint
 *
 */

/*-------------------------------------------------------------------------*/

function _my_rounded_rect(x, y, w, h, r, tl, tr, bl, br)
{
	var result = 'M' + (x + r) + ',' + y;

	result += 'h' + (w - 2 * r);
	if(tr) {
		result += 'a' + r + ',' + r + ' 0 0 1 ' + (+r) + ',' + (+r);
	} else {
		result += 'h' + (+r);
		result += 'v' + (+r);
	}

	result += 'v' + (h - 2 * r);
	if(br) {
		result += 'a' + r + ',' + r + ' 0 0 1 ' + (-r) + ',' + (+r);
	}
	else {
		result += 'v' + (+r);
		result += 'h' + (-r);
	}

	result += 'h' + (2 * r - w);
	if(bl) {
		result += 'a' + r + ',' + r + ' 0 0 1 ' + (-r) + ',' + (-r);
	}
	else {
		result += 'h' + (-r);
		result += 'v' + (-r);
	}

	result += 'v' + (2 * r - h);
	if(tl) {
		result += 'a' + r + ',' + r + ' 0 0 1 ' + (+r) + ',' + (-r);
	} else {
		result += 'v' + (-r);
		result += 'h' + (+r);
	}

	return result + 'z';
}

/*-------------------------------------------------------------------------*/

function _dec2hex(dec)
{
	return dec.toString(16).substr(-4).toUpperCase();
}

/*-------------------------------------------------------------------------*/

function _get_l(color)
{
	var r = parseInt('0x' + color.substring(1, 3));
	var g = parseInt('0x' + color.substring(3, 5));
	var b = parseInt('0x' + color.substring(5, 7));

	return (Math.min(r, g, b) + Math.max(r, g, b)) / (2.0 * 255.0);
}

/*-------------------------------------------------------------------------*/

function _get_stroke(color)
{
	var r = parseInt('0x' + color.substring(1, 3));
	var g = parseInt('0x' + color.substring(3, 5));
	var b = parseInt('0x' + color.substring(5, 7));

	return '#' + _dec2hex(Math.round(0.85 * r)) + _dec2hex(Math.round(0.85 * g)) + _dec2hex(Math.round(0.85 * b));
}

/*-------------------------------------------------------------------------*/

joint.shapes.sql = {}

/*-------------------------------------------------------------------------*/

joint.shapes.sql.Table = joint.shapes.basic.Generic.extend({
	/*---------------------------------------------------------------------*/

	markup: [
		'<g>',
			'<path class="sql-table-top" />',
			'<path class="sql-table-body" />',
			'<a class="sql-table-show-link" xlink:href="#" data-table=""><text class="sql-table-show"></text></a>',
			'<text class="sql-table-name" />',
			'<a class="sql-table-edit-link" xlink:href="#" data-table=""><text class="sql-table-edit"></text></a>',
			'<text class="sql-table-columns" />',
		'</g>',
	].join(''),

	/*---------------------------------------------------------------------*/

	defaults: joint.util.deepSupplement({

		type: 'sql.Table',

		size: {
			width: 0,
			height: 0,
		},

		attrs: {
			'.sql-table-top': {
				'stroke-width': 1,
			},
			'.sql-table-body': {
				'stroke-width': 1,
			},
			'.sql-table-show': {
				'ref': '.sql-table-top',
				'ref-x': 0.015,
				'ref-y': 0.50,
				'x-alignment': 'left',
				'y-alignment': 'middle',
				'fill': 'white',
				'font-family': 'FontAwesome',
				'font-weight': 'normal',
				'font-size': 12,
			},
			'.sql-table-name': {
				'ref': '.sql-table-top',
				'ref-x': 0.50,
				'ref-y': 0.50,
				'x-alignment': 'middle',
				'y-alignment': 'middle',
				'fill': 'white',
				'font-family': 'Courier New',
				'font-weight': 'normal',
				'font-size': 14,
			},
			'.sql-table-edit': {
				'ref': '.sql-table-top',
				'ref-x': 0.930,
				'ref-y': 0.50,
				'x-alignment': 'left',
				'y-alignment': 'middle',
				'fill': 'white',
				'font-family': 'FontAwesome',
				'font-weight': 'normal',
				'font-size': 12,
			},
				'.sql-table-columns': {
				'ref': '.sql-table-body',
				'ref-x': 10,
				'ref-y': 7.5,
				'fill': 'black',
				'font-family': 'Courier New',
				'font-weight': 'normal',
				'font-size': 14,
			},
		},

		table: 'N/A',
		titleColor: '#0066CC',
		bodyColor: '#FFFFFF',
		strokeColor: '#0057AD',
		showShowTool: false,
		showEditTool: false,
		grideSize: 10,
		columns: [],

	}, joint.shapes.basic.Generic.prototype.defaults),

	/*---------------------------------------------------------------------*/

	initialize: function()
	{
		this.on({
			'change:table': this.updateTable,
			'change:color': this.updateColors,
			'change:columns': this.updateFields,

		}, this);

		this.updateTable();
		this.updateColors();
		this.updateFields();

		joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
	},

	/*---------------------------------------------------------------------*/

	getTable: function()
	{
		return this.get('table');
	},

	setTable: function(table)
	{
		this.set('table', table);

		this.updateTable();
	},

	/*---------------------------------------------------------------------*/

	getColor: function()
	{
		return this.get('titleColor');
	},

	setColor: function(color)
	{
		this.set('titleColor', color);
		color = _get_stroke(color);
		this.set('strokeColor', color);

		this.updateColors();
	},

	/*---------------------------------------------------------------------*/

	appendField: function(item)
	{
		var columns = this.get('columns');
		columns.push(item);
		this.set('columns', columns);

		this.updateFields();
	},

	removeField: function(index)
	{
		var columns = this.get('columns');
		columns.splice(index, 1);
		this.set('columns', columns);

		this.updateFields();
	},

	getField: function(index)
	{
		return this.get('columns')[index];
	},

	setField: function(index, item)
	{
		var columns = this.get('columns');
		columns[index] = item;
		this.set('columns', columns);

		this.updateFields();
	},

	/*---------------------------------------------------------------------*/

	getPosition: function()
	{
		return this.get('position');
	},

	/*---------------------------------------------------------------------*/

	updateTable: function()
	{
		/*-----------------------------------------------------------------*/

		var table = this.get('table');

		this.attr('.sql-table-show-link/data-table', table);
		this.attr('.sql-table-edit-link/data-table', table);

		/*-----------------------------------------------------------------*/

		var tool = this.get('showShowTool') ? ''
		                                    : ''
		;

		this.attr('.sql-table-show/text', tool);

		/*-----------------------------------------------------------------*/

		var name = table.toUpperCase();

		if(name.length > 23)
		{
			name = name.substring(0, 21) + '…';
		}

		this.attr('.sql-table-name/text', name);

		/*-----------------------------------------------------------------*/

		var edit = this.get('showEditTool') ? ''
		                                    : ''
		;

		this.attr('.sql-table-edit/text', edit);

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	updateColors: function()
	{
		/*-----------------------------------------------------------------*/

		var toolColor = _get_l(this.get('titleColor')) > 0.75 ? '#000000' : '#FFFFFF';

		this.attr('.sql-table-show/fill', toolColor);
		this.attr('.sql-table-name/fill', toolColor);
		this.attr('.sql-table-edit/fill', toolColor);

		/*-----------------------------------------------------------------*/

		this.attr('.sql-table-top/fill', this.get('titleColor'));
		this.attr('.sql-table-top/stroke', this.get('strokeColor'));

		this.attr('.sql-table-body/fill', this.get('bodyColor'));
		this.attr('.sql-table-body/stroke', this.get('strokeColor'));

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	updateFields: function()
	{
		/*-----------------------------------------------------------------*/

		var text = '';
		var width = 230;
		var height = 20;

		_.each(this.get('columns'), function(column) {

			var line = column.name + ': ' + column.type;

			/**/ if(column.hidden)
			{
				line = '❌' + line;
			}
			else if(column.adminOnly)
			{
				line = '🚫' + line;
			}
			else if(column.crypted)
			{
				line = '🔐' + line;
			}
			else if(column.primary)
			{
				line = '🔑' + line;
			}
			else if(column.created
			        ||
			        column.createdBy
			        ||
			        column.modified
			        ||
			        column.modifiedBy
			 ) {
				line = '⚙️' + line;
			}

			if(line.length > 26)
			{
				line = line.substring(0, 24) + '…';
			}

			text += line + '\n';

			height += 14;
		});

		/*-----------------------------------------------------------------*/

		var grideSize = this.get('grideSize');

		width = Math.ceil(width / grideSize) * grideSize;
		height = Math.ceil(height / grideSize) * grideSize;

		this.resize(width, height);

		this.attr('.sql-table-top/d', _my_rounded_rect(0.75, 0.5, width, 20, 8, true, true, false, false));
		this.attr('.sql-table-body/d', _my_rounded_rect(0.75, 20.5, width, height, 3, false, false, true, true));

		this.attr('.sql-table-columns/text', text);

		/*-----------------------------------------------------------------*/
	}

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/

joint.dia.Graph.prototype.newTable = function(table)
{
	var result = new joint.shapes.sql.Table(table);

	this.addCell(result);

	return result;
};

/*-------------------------------------------------------------------------*/

joint.dia.Graph.prototype.newForeignKey = function(fkTableId, pkTableId)
{
	var result = new joint.dia.Link({
		source: {id: fkTableId},
		target: {id: pkTableId},
		attrs: {
			'.connection': {'stroke': '#707070', 'stroke-width': 3},
			'.marker-source': {'stroke': '#707070', 'fill': '#707070', 'd': 'm 14.456044,15.990164 1.23e-4,7.500564 0,-7.179668 -9.0002053,5.179668 0,-11.000206 9.0000823,5.178745 1.23e-4,-7.178745 z'}
		}
	});

	this.addCell(result);

	return result;
};

/*-------------------------------------------------------------------------*/
