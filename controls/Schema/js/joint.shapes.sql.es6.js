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

function _svgRoundedRect(x, y, w, h, r, tl, tr, bl, br)
{
	let result = 'M' + (x + r) + ',' + y;

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

function _intToStr(v)
{
	v = Math.abs(v);

	if(v < 256)
	{
		const V = v.toString(16);

		return (v < 16) ? '0' + V
		                : /*-*/ V
		;
	}

	return 0;
}

/*-------------------------------------------------------------------------*/

function _getL(color)
{
	const r = parseInt(color.substring(1, 3), 16);
	const g = parseInt(color.substring(3, 5), 16);
	const b = parseInt(color.substring(5, 7), 16);

	return (Math.min(r, g, b) + Math.max(r, g, b)) / (2.0 * 255.0);
}

/*-------------------------------------------------------------------------*/

function _getStroke(color)
{
	const r = parseInt(color.substring(1, 3), 16);
	const g = parseInt(color.substring(3, 5), 16);
	const b = parseInt(color.substring(5, 7), 16);

	return '#' + _intToStr(Math.round(0.75 * r)) + _intToStr(Math.round(0.75 * g)) + _intToStr(Math.round(0.75 * b));
}

/*-------------------------------------------------------------------------*/

joint.shapes.sql = {}

/*-------------------------------------------------------------------------*/

joint.dia.Element.define('sql.Entity', {
	/*---------------------------------------------------------------------*/

	entity: 'N/A',
	showShowTool: false,
	showEditTool: false,
	color: '#0066CC',
	grideSize: 10,
	fields: [],

	/*---------------------------------------------------------------------*/

	attrs: {
		/*-----------------------------------------------------------------*/
		'.sql-entity-top': {
			'ref-x': 0.0,
			'ref-y': 0.0,
			'stroke-width': 1,
		},
		'.sql-entity-body': {
			'ref-x': 0.0,
			'ref-y': 20.0,
			'stroke-width': 1,
		},
		/*-----------------------------------------------------------------*/
		'.sql-entity-show-text': {
			'ref-x': '2%',
			'ref-y': 5.0,
			'text-anchor': 'start',
			'fill': 'white',
			'font-family': 'FontAwesome',
			'font-weight': 'normal',
			'font-size': 12,
		},
		'.sql-entity-name-text': {
			'ref-x': '50%',
			'ref-y': 2.5,
			'text-anchor': 'middle',
			'fill': 'white',
			'font-family': 'Courier New',
			'font-weight': 'normal',
			'font-size': 14,
		},
		'.sql-entity-edit-text': {
			'ref-x': '98%',
			'ref-y': 5.0,
			'text-anchor': 'end',
			'fill': 'white',
			'font-family': 'FontAwesome',
			'font-weight': 'normal',
			'font-size': 12,
		},
		/*-----------------------------------------------------------------*/
		'.sql-fields': {
			'ref-x': 0.0,
			'ref-y': 25.0,
		},
		/*-----------------------------------------------------------------*/
		'.sql-field-text': {
			'ref-x': 0.03,
			'fill': 'black',
			'font-family': 'Courier New',
			'font-weight': 'normal',
			'font-size': 14,
		}
		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/
}, {
	/*---------------------------------------------------------------------*/

	markup: [
		'<g>',
			'<path class="sql-entity-top" />',
			'<path class="sql-entity-body" />',
			'<a class="sql-entity-show-link" xlink:href="#" data-entity="">',
				'<text class="sql-entity-show-text" />',
			'</a>',
			'<text class="sql-entity-name-text" />',
			'<a class="sql-entity-edit-link" xlink:href="#" data-entity="">',
				'<text class="sql-entity-edit-text" />',
			'</a>',
			'<g class="sql-fields"></g>',
		'</g>',
	].join(''),

	/*---------------------------------------------------------------------*/

	fieldMarkup: [
		'<g class="sql-field">',
			'<a class="sql-field-link" xlink:href="#" data-entity="" data-field="">',
				'<text class="sql-field-text">N/A</text>',
			'</a>',
		'</g>'
	].join(''),

	/*---------------------------------------------------------------------*/

	initialize: function()
	{
		joint.dia.Element.prototype.initialize.apply(this, arguments);

		this.on('change:entity', this.onEntityChange, this);
		this.on('change:showShowTool', this.onEntityChange, this);
		this.on('change:showEditTool', this.onEntityChange, this);
		this.on('change:color', this.onColorChange, this);
		this.on('change:grideSize', this.onFieldsChange, this);
		this.on('change:fields', this.onFieldsChange, this);

		this.onEntityChange();
		this.onColorChange();
		this.onFieldsChange();
	},

	/*---------------------------------------------------------------------*/

	setPosition: function(position)
	{
		this.set('position', position);
	},

	getPosition: function()
	{
		return this.get('position');
	},

	/*---------------------------------------------------------------------*/

	setTable: function(entity)
	{
		this.set('entity', entity);
	},

	getTable: function()
	{
		return this.get('entity');
	},

	/*---------------------------------------------------------------------*/

	setColor: function(color)
	{
		this.set('color', color);
	},

	getColor: function()
	{
		return this.get('color');
	},

	/*---------------------------------------------------------------------*/

	setGrideSize: function(grideSize)
	{
		this.set('grideSize', grideSize);
	},

	getGrideSize: function()
	{
		return this.get('grideSize');
	},

	/*---------------------------------------------------------------------*/

	appendField: function(field)
	{
		let fields = _.clone(this.get('fields'));
		fields.push(field);
		this.set('fields', fields);
	},

	/*---------------------------------------------------------------------*/

	onEntityChange: function()
	{
		/*-----------------------------------------------------------------*/

		const entity = this.get('entity');

		this.attr('.sql-entity-show-link/data-entity', entity);
		this.attr('.sql-entity-edit-link/data-entity', entity);

		/*-----------------------------------------------------------------*/

		this.attr('.sql-entity-show-text/text', this.get('showShowTool') ? ''
		                                                                : ''
		);

		/*-----------------------------------------------------------------*/

		this.attr('.sql-entity-name-text/text', entity.length > 23 ? entity.substring(0, 21) + '…'
		                                                         : entity
		);

		/*-----------------------------------------------------------------*/

		this.attr('.sql-entity-edit-text/text', this.get('showEditTool') ? ''
		                                                                : ''
		);

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	onColorChange: function()
	{
		/*-----------------------------------------------------------------*/

		const color = this.get('color');

		/*-----------------------------------------------------------------*/

		const toolColor = _getL(color) > 0.75 ? '#000000' : '#FFFFFF';

		this.attr('.sql-entity-show/fill', toolColor);
		this.attr('.sql-entity-name/fill', toolColor);
		this.attr('.sql-entity-edit/fill', toolColor);

		/*-----------------------------------------------------------------*/

		const strokeColor = _getStroke(color);

		this.attr('.sql-entity-top/fill', color);
		this.attr('.sql-entity-top/stroke', strokeColor);

		this.attr('.sql-entity-body/fill', '#FFFFFF');
		this.attr('.sql-entity-body/stroke', strokeColor);

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	onFieldsChange: function()
	{
		/*-----------------------------------------------------------------*/

		const entity = this.get('entity');

		/*-----------------------------------------------------------------*/

		let width = 230;
		let height = 0x0;

		this.get('fields').forEach((field) => {

			let text = field.field + ': ' + field.type;

			/**/ if(field.hidden) {
				text = '❌' + text;
			}
			else if(field.adminOnly) {
				text = '🚫' + text;
			}
			else if(field.crypted) {
				text = '🔐' + text;
			}
			else if(field.primary) {
				text = '🔑' + text;
			}
			else if(field.created || field.createdBy
			        ||
			        field.modified || field.modifiedBy
			 ) {
				text = '⚙️' + text;
			}

			field.entity = entity;
			field.text = (text.length > 26) ? text.substring(0, 24) + '…' : text;
			field.offset = height;

			height += 15;
		});

		height += 15;

		/*-----------------------------------------------------------------*/

		const grideSize = this.get('grideSize');

		width = Math.ceil(width / grideSize) * grideSize;
		height = Math.ceil(height / grideSize) * grideSize;

		this.resize(width, height);

		this.attr('.sql-entity-top/d', _svgRoundedRect(0.75, 0.5, width, 20, 8, true, true, false, false));
		this.attr('.sql-entity-body/d', _svgRoundedRect(0.75, 0.5, width, height, 3, false, false, true, true));

		/*-----------------------------------------------------------------*/
	}

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/

joint.shapes.sql.EntityView = joint.dia.ElementView.extend({
	/*---------------------------------------------------------------------*/

	initialize: function()
	{
		/*-----------------------------------------------------------------*/

		joint.dia.ElementView.prototype.initialize.apply(this, arguments);

		/*-----------------------------------------------------------------*/

		this.listenTo(this.model, 'change:fields', this.renderFields, this);

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	renderMarkup: function()
	{
		/*-----------------------------------------------------------------*/

		joint.dia.ElementView.prototype.renderMarkup.apply(this, arguments);

		/*-----------------------------------------------------------------*/

		this.src = V(this.model.fieldMarkup);

		this.dst = this.$('.sql-fields');

		/*-----------------------------------------------------------------*/

		this.renderFields();

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	renderFields: function()
	{
		/*-----------------------------------------------------------------*/

		this.dst.empty();

		/*-----------------------------------------------------------------*/

		this.model.get('fields').forEach((field) => {

			let clone = this.src.clone().addClass(field.selector);

			clone.attr('transform', 'translate(0, ' + field.offset + ')');

			clone.find('.sql-field-link')[0].attr('data-entity', field.entity)
			                                .attr('data-field', field.field)
			;

			clone.find('.sql-field-text')[0].text(field.text);

			this.dst.append(clone.node);
		});

		/*-----------------------------------------------------------------*/

		this.update();

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/

joint.dia.Graph.prototype.newEntity = function(entity)
{
	let result = new joint.shapes.sql.Entity(entity);

	this.addCell(result);

	return result;
};

/*-------------------------------------------------------------------------*/

joint.dia.Graph.prototype.newForeignKey = function(fkEntityId, pkEntityId)
{
	let result = new joint.dia.Link({
		source: {id: fkEntityId},
		target: {id: pkEntityId},
		attrs: {
			'.connection': {'stroke': '#707070', 'stroke-width': 3},
			'.marker-source': {'stroke': '#707070', 'fill': '#707070', 'd': 'm 14.456044,15.990164 1.23e-4,7.500564 0,-7.179668 -9.0002053,5.179668 0,-11.000206 9.0000823,5.178745 1.23e-4,-7.178745 z'}
		}
	});

	this.addCell(result);

	return result;
};

/*-------------------------------------------------------------------------*/
