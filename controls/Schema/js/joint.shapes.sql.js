/*-------------------------------------------------------------------------*/

function _my_rounded_rect(x, y, w, h, r, tl, tr, bl, br)
{
	var retval = 'M' + (x + r) + ',' + y;

	retval += 'h' + (w - 2 * r);
	if(tr) {
		retval += 'a' + r + ',' + r + ' 0 0 1 ' + (+r) + ',' + (+r);
	} else {
		retval += 'h' + (+r);
		retval += 'v' + (+r);
	}

	retval += 'v' + (h - 2 * r);
	if(br) {
		retval += 'a' + r + ',' + r + ' 0 0 1 ' + (-r) + ',' + (+r);
	}
	else {
		retval += 'v' + (+r);
		retval += 'h' + (-r);
	}

	retval += 'h' + (2 * r - w);
	if(bl) {
		retval += 'a' + r + ',' + r + ' 0 0 1 ' + (-r) + ',' + (-r);
	}
	else {
		retval += 'h' + (-r);
		retval += 'v' + (-r);
	}

	retval += 'v' + (2 * r - h);
	if(tl) {
		retval += 'a' + r + ',' + r + ' 0 0 1 ' + (+r) + ',' + (-r);
	} else {
		retval += 'v' + (-r);
		retval += 'h' + (+r);
	}

	return retval + 'z';
}

/*-------------------------------------------------------------------------*/

function _get_l(color)
{
	var r = parseInt('0x' + color.substring(1, 3));
	var g = parseInt('0x' + color.substring(3, 5));
	var b = parseInt('0x' + color.substring(5, 7));

	return (Math.min(r, g, b) + Math.max(r, g, b)) / (2.0 * 255);
}

/*-------------------------------------------------------------------------*/

joint.shapes.sql = {}

/*-------------------------------------------------------------------------*/

joint.shapes.sql.Table = joint.shapes.basic.Generic.extend({
	/*-----------------------------------------------------------------*/

	markup: [
		'<g>',
		  '<path class="sql-table-top" />',
		  '<path class="sql-table-body" />',
		  '<a xlink:href="" target="_blank"><text class="sql-table-tool">🔍</text></a><text class="sql-table-name" />',
		'<text class="sql-table-columns" />',
		'</g>',
	].join(''),

	/*-----------------------------------------------------------------*/

	defaults: joint.util.deepSupplement({

		type: 'sql.Table',

		size: {
			width: 228,
			height: 14,
		},

		attrs: {
			'.sql-table-top': {
				'stroke-width': 2,
			},
			'.sql-table-body': {
				'stroke-width': 2,
			},
			'.sql-table-tool': {
				'ref': '.sql-table-top',
				'ref-y': 0.55,
				'ref-x': 0.05,
				'x-alignment': 'middle',
				'y-alignment': 'middle',
				'fill': 'white',
				'font-family': 'Courier New',
				'font-weight': 'bold',
				'font-size': 14,
			},
			'.sql-table-name': {
				'ref': '.sql-table-top',
				'ref-x': 0.50,
				'ref-y': 0.55,
				'x-alignment': 'middle',
				'y-alignment': 'middle',
				'fill': 'white',
				'font-family': 'Courier New',
				'font-weight': 'bold',
				'font-size': 14,
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

		catalog: '',
		table: '',
		topColor: '#0066CC',
		bodyColor: '#FFFFFF',
		strokeColor: '#0057AD',
		columns: [],

	}, joint.shapes.basic.Generic.prototype.defaults),

	/*-----------------------------------------------------------------*/

	initialize: function()
	{
		this.on({
			'change:table': this.updateTable,
			'change:topColor': this.updateColors,
			'change:bodyColor': this.updateColors,
			'change:strokeColor': this.updateColors,
			'change:columns': this.updateFields,

		}, this);

		this.updateTable();
		this.updateColors();
		this.updateFields();

		joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
	},

	/*-----------------------------------------------------------------*/

	getCatalog: function()
	{
		return this.get('catalog');
	},

	setCatalog: function(name)
	{
		this.set('catalog', name);

/*		this.updateTable();
 */	},

	/*-----------------------------------------------------------------*/

	getTable: function()
	{
		return this.get('table');
	},

	setTable: function(table)
	{
		this.set('table', table);

		this.updateTable();
	},

	/*-----------------------------------------------------------------*/

	getTopColor: function()
	{
		return this.get('topColor');
	},

	setTopColor: function(color)
	{
		this.attr('.sql-table-name/fill', _get_l(color) > 0.5 ? '#000000' : '#FFFFFF');
		this.set('topColor', color);

		this.updateColors();
	},

	/*-----------------------------------------------------------------*/

	getBodyColor: function()
	{
		return this.get('bodyColor');
	},

	setBodyColor: function(color)
	{
		this.attr('sql-table-columns/fill', _get_l(color) > 0.5 ? '#000000' : '#FFFFFF');
		this.set('bodyColor', color);

		this.updateColors();
	},

	/*-----------------------------------------------------------------*/

	getStrokeColor: function()
	{
		return this.get('strokeColor');
	},

	setStrokeColor: function(color)
	{
		this.set('strokeColor', color);

		this.updateColors();
	},

	/*-----------------------------------------------------------------*/

	getFields: function()
	{
		return this.get('columns');
	},

	setFields: function(columns)
	{
		this.set('columns', columns);

		this.updateFields();
	},

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

	updateTable: function()
	{
		var catalog = this.get('catalog');
		var table = this.get('table');

		var name = table.toUpperCase();

		if(name.length > 22)
		{
			name = name.substring(0, 20) + '…';
		}

		this.attr('.sql-table-name/text', name);

		this.attr('.sql-table-tool/href', '?subapp=tableViewer&amp;userdata=' + encodeURIComponent(
			'{'
			+
			'"catalog":"' + catalog + '",' + '"entity":"' + table + '",' + '"query":"SELECT `' + catalog + '`.`' + table + '`.*"'
			+
			'}'
		));
	},

	/*-----------------------------------------------------------------*/

	updateColors: function()
	{
		this.attr('.sql-table-top/fill', this.get('topColor'));
		this.attr('.sql-table-top/stroke', this.get('strokeColor'));

		this.attr('.sql-table-body/fill', this.get('bodyColor'));
		this.attr('.sql-table-body/stroke', this.get('strokeColor'));
	},

	/*-----------------------------------------------------------------*/

	updateFields: function()
	{
		var cnt = 0
		var text = '';

		_.each(this.get('columns'), function(column) {

			cnt++;

			var line = column.name + ': ' + column.type;

			if(column.primary)
			{
				line = '🔑' + line;
			}

			if(line.length > 26)
			{
				line = line.substring(0, 24) + '…';
			}

			text += line + '\n';
		});

		var width = this.get('size').width;
		var height = Math.ceil((cnt * 14 + 20) / 10.0) * 10 - 2;

		this.resize(width, height);

		width += 2; // For nice overlap (stroke)
		height += 2; // For nice overlap (stroke)

		this.attr('.sql-table-top/d', _my_rounded_rect(0, 0, width, 20, 8, true, true, false, false));
		this.attr('.sql-table-body/d', _my_rounded_rect(0, 20, width, height, 2, false, false, true, true));

		this.attr('.sql-table-columns/text', text);
	}

	/*-----------------------------------------------------------------*/
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
