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
function _svgRoundedRect(x, y, w, h, r, tl, tr, bl, br) {
  var result = 'M' + (x + r) + ',' + y;
  result += 'h' + (w - 2 * r);

  if (tr) {
    result += 'a' + r + ',' + r + ' 0 0 1 ' + +r + ',' + +r;
  } else {
    result += 'h' + +r;
    result += 'v' + +r;
  }

  result += 'v' + (h - 2 * r);

  if (br) {
    result += 'a' + r + ',' + r + ' 0 0 1 ' + -r + ',' + +r;
  } else {
    result += 'v' + +r;
    result += 'h' + -r;
  }

  result += 'h' + (2 * r - w);

  if (bl) {
    result += 'a' + r + ',' + r + ' 0 0 1 ' + -r + ',' + -r;
  } else {
    result += 'h' + -r;
    result += 'v' + -r;
  }

  result += 'v' + (2 * r - h);

  if (tl) {
    result += 'a' + r + ',' + r + ' 0 0 1 ' + +r + ',' + -r;
  } else {
    result += 'v' + -r;
    result += 'h' + +r;
  }

  return result + 'z';
}
/*-------------------------------------------------------------------------*/


function _intToStr(v) {
  v = Math.abs(v);

  if (v < 256) {
    var _V = v.toString(16);

    return v < 16 ? '0' + _V :
    /*-*/
    _V;
  }

  return 0;
}
/*-------------------------------------------------------------------------*/


function _getL(color) {
  var r = parseInt(color.substring(1, 3), 16);
  var g = parseInt(color.substring(3, 5), 16);
  var b = parseInt(color.substring(5, 7), 16);
  return (Math.min(r, g, b) + Math.max(r, g, b)) / (2.0 * 255.0);
}
/*-------------------------------------------------------------------------*/


function _getStroke(color) {
  var r = parseInt(color.substring(1, 3), 16);
  var g = parseInt(color.substring(3, 5), 16);
  var b = parseInt(color.substring(5, 7), 16);
  return '#' + _intToStr(Math.round(0.75 * r)) + _intToStr(Math.round(0.75 * g)) + _intToStr(Math.round(0.75 * b));
}
/*-------------------------------------------------------------------------*/


joint.shapes.sql = {};
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
      'stroke-width': 1
    },
    '.sql-entity-body': {
      'ref-x': 0.0,
      'ref-y': 20.0,
      'stroke-width': 1
    },

    /*-----------------------------------------------------------------*/
    '.sql-entity-show-text': {
      'ref-x': '2%',
      'ref-y': 5.0,
      'text-anchor': 'start',
      'fill': 'white',
      'font-family': 'FontAwesome',
      'font-weight': 'normal',
      'font-size': 12
    },
    '.sql-entity-name-text': {
      'ref-x': '50%',
      'ref-y': 2.5,
      'text-anchor': 'middle',
      'fill': 'white',
      'font-family': 'Courier New',
      'font-weight': 'normal',
      'font-size': 14
    },
    '.sql-entity-edit-text': {
      'ref-x': '98%',
      'ref-y': 5.0,
      'text-anchor': 'end',
      'fill': 'white',
      'font-family': 'FontAwesome',
      'font-weight': 'normal',
      'font-size': 12
    },

    /*-----------------------------------------------------------------*/
    '.sql-fields': {
      'ref-x': 0.0,
      'ref-y': 25.0
    },

    /*-----------------------------------------------------------------*/
    '.sql-field-text': {
      'ref-x': 0.03,
      'fill': 'black',
      'font-family': 'Courier New',
      'font-weight': 'normal',
      'font-size': 14
    }
    /*-----------------------------------------------------------------*/

  }
  /*---------------------------------------------------------------------*/

}, {
  /*---------------------------------------------------------------------*/
  markup: ['<g>', '<path class="sql-entity-top" />', '<path class="sql-entity-body" />', '<a class="sql-entity-show-link" xlink:href="#" data-entity="">', '<text class="sql-entity-show-text" />', '</a>', '<text class="sql-entity-name-text" />', '<a class="sql-entity-edit-link" xlink:href="#" data-entity="">', '<text class="sql-entity-edit-text" />', '</a>', '<g class="sql-fields"></g>', '</g>'].join(''),

  /*---------------------------------------------------------------------*/
  fieldMarkup: ['<g class="sql-field">', '<a class="sql-field-link" xlink:href="#" data-entity="" data-field="">', '<text class="sql-field-text">N/A</text>', '</a>', '</g>'].join(''),

  /*---------------------------------------------------------------------*/
  initialize: function initialize() {
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
  setPosition: function setPosition(position) {
    this.set('position', position);
  },
  getPosition: function getPosition() {
    return this.get('position');
  },

  /*---------------------------------------------------------------------*/
  setTable: function setTable(entity) {
    this.set('entity', entity);
  },
  getTable: function getTable() {
    return this.get('entity');
  },

  /*---------------------------------------------------------------------*/
  setColor: function setColor(color) {
    this.set('color', color);
  },
  getColor: function getColor() {
    return this.get('color');
  },

  /*---------------------------------------------------------------------*/
  setGrideSize: function setGrideSize(grideSize) {
    this.set('grideSize', grideSize);
  },
  getGrideSize: function getGrideSize() {
    return this.get('grideSize');
  },

  /*---------------------------------------------------------------------*/
  appendField: function appendField(field) {
    var fields = _.clone(this.get('fields'));

    fields.push(field);
    this.set('fields', fields);
  },

  /*---------------------------------------------------------------------*/
  onEntityChange: function onEntityChange() {
    /*-----------------------------------------------------------------*/
    var entity = this.get('entity');
    this.attr('.sql-entity-show-link/data-entity', entity);
    this.attr('.sql-entity-edit-link/data-entity', entity);
    /*-----------------------------------------------------------------*/

    this.attr('.sql-entity-show-text/text', this.get('showShowTool') ? '' : '');
    /*-----------------------------------------------------------------*/

    this.attr('.sql-entity-name-text/text', entity.length > 23 ? entity.substring(0, 21) + '…' : entity);
    /*-----------------------------------------------------------------*/

    this.attr('.sql-entity-edit-text/text', this.get('showEditTool') ? '' : '');
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  onColorChange: function onColorChange() {
    /*-----------------------------------------------------------------*/
    var color = this.get('color');
    /*-----------------------------------------------------------------*/

    var toolColor = _getL(color) > 0.75 ? '#000000' : '#FFFFFF';
    this.attr('.sql-entity-show/fill', toolColor);
    this.attr('.sql-entity-name/fill', toolColor);
    this.attr('.sql-entity-edit/fill', toolColor);
    /*-----------------------------------------------------------------*/

    var strokeColor = _getStroke(color);

    this.attr('.sql-entity-top/fill', color);
    this.attr('.sql-entity-top/stroke', strokeColor);
    this.attr('.sql-entity-body/fill', '#FFFFFF');
    this.attr('.sql-entity-body/stroke', strokeColor);
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  onFieldsChange: function onFieldsChange() {
    /*-----------------------------------------------------------------*/
    var entity = this.get('entity');
    /*-----------------------------------------------------------------*/

    var width = 230;
    var height = 0x0;
    this.get('fields').forEach(function (field) {
      var text = field.field + ': ' + field.type;

      if (field.hidden) {
        text = '❌' + text;
      }

      if (field.adminOnly) {
        text = '🚫' + text;
      }

      if (field.crypted) {
        text = '🔐' + text;
      }

      if (field.primary) {
        text = '🔑' + text;
      }

      if (field.created || field.createdBy || field.modified || field.modifiedBy) {
        text = '⚙️' + text;
      }

      field.entity = entity;
      field.text = text.length > 26 ? text.substring(0, 24) + '…' : text;
      field.offset = height;
      height += 15;
    });
    height += 15;
    /*-----------------------------------------------------------------*/

    var grideSize = this.get('grideSize');
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
  initialize: function initialize() {
    /*-----------------------------------------------------------------*/
    joint.dia.ElementView.prototype.initialize.apply(this, arguments);
    /*-----------------------------------------------------------------*/

    this.listenTo(this.model, 'change:fields', this.renderFields, this);
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  renderMarkup: function renderMarkup() {
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
  renderFields: function renderFields() {
    var _this = this;

    /*-----------------------------------------------------------------*/
    this.dst.empty();
    /*-----------------------------------------------------------------*/

    this.model.get('fields').forEach(function (field) {
      var clone = _this.src.clone().addClass(field.selector);

      clone.attr('transform', 'translate(0, ' + field.offset + ')');
      clone.find('.sql-field-link')[0].attr('data-entity', field.entity).attr('data-field', field.field);
      clone.find('.sql-field-text')[0].text(field.text);

      _this.dst.append(clone.node);
    });
    /*-----------------------------------------------------------------*/

    this.update();
    /*-----------------------------------------------------------------*/
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/

joint.dia.Graph.prototype.newEntity = function (entity) {
  var result = new joint.shapes.sql.Entity(entity);
  this.addCell(result);
  return result;
};
/*-------------------------------------------------------------------------*/


joint.dia.Graph.prototype.newForeignKey = function (fkEntityId, pkEntityId) {
  var result = new joint.dia.Link({
    source: {
      id: fkEntityId
    },
    target: {
      id: pkEntityId
    },
    attrs: {
      '.connection': {
        'stroke': '#707070',
        'stroke-width': 3
      },
      '.marker-source': {
        'stroke': '#707070',
        'fill': '#707070',
        'd': 'm 14.456044,15.990164 1.23e-4,7.500564 0,-7.179668 -9.0002053,5.179668 0,-11.000206 9.0000823,5.178745 1.23e-4,-7.178745 z'
      }
    }
  });
  this.addCell(result);
  return result;
};
/*-------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW50LnNoYXBlcy5zcWwuZXM2LmpzIl0sIm5hbWVzIjpbIl9zdmdSb3VuZGVkUmVjdCIsIngiLCJ5IiwidyIsImgiLCJyIiwidGwiLCJ0ciIsImJsIiwiYnIiLCJyZXN1bHQiLCJfaW50VG9TdHIiLCJ2IiwiTWF0aCIsImFicyIsIlYiLCJ0b1N0cmluZyIsIl9nZXRMIiwiY29sb3IiLCJwYXJzZUludCIsInN1YnN0cmluZyIsImciLCJiIiwibWluIiwibWF4IiwiX2dldFN0cm9rZSIsInJvdW5kIiwiam9pbnQiLCJzaGFwZXMiLCJzcWwiLCJkaWEiLCJFbGVtZW50IiwiZGVmaW5lIiwiZW50aXR5Iiwic2hvd1Nob3dUb29sIiwic2hvd0VkaXRUb29sIiwiZ3JpZGVTaXplIiwiZmllbGRzIiwiYXR0cnMiLCJtYXJrdXAiLCJqb2luIiwiZmllbGRNYXJrdXAiLCJpbml0aWFsaXplIiwicHJvdG90eXBlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJvbiIsIm9uRW50aXR5Q2hhbmdlIiwib25Db2xvckNoYW5nZSIsIm9uRmllbGRzQ2hhbmdlIiwic2V0UG9zaXRpb24iLCJwb3NpdGlvbiIsInNldCIsImdldFBvc2l0aW9uIiwiZ2V0Iiwic2V0VGFibGUiLCJnZXRUYWJsZSIsInNldENvbG9yIiwiZ2V0Q29sb3IiLCJzZXRHcmlkZVNpemUiLCJnZXRHcmlkZVNpemUiLCJhcHBlbmRGaWVsZCIsImZpZWxkIiwiXyIsImNsb25lIiwicHVzaCIsImF0dHIiLCJsZW5ndGgiLCJ0b29sQ29sb3IiLCJzdHJva2VDb2xvciIsIndpZHRoIiwiaGVpZ2h0IiwiZm9yRWFjaCIsInRleHQiLCJ0eXBlIiwiaGlkZGVuIiwiYWRtaW5Pbmx5IiwiY3J5cHRlZCIsInByaW1hcnkiLCJjcmVhdGVkIiwiY3JlYXRlZEJ5IiwibW9kaWZpZWQiLCJtb2RpZmllZEJ5Iiwib2Zmc2V0IiwiY2VpbCIsInJlc2l6ZSIsIkVudGl0eVZpZXciLCJFbGVtZW50VmlldyIsImV4dGVuZCIsImxpc3RlblRvIiwibW9kZWwiLCJyZW5kZXJGaWVsZHMiLCJyZW5kZXJNYXJrdXAiLCJzcmMiLCJkc3QiLCIkIiwiZW1wdHkiLCJhZGRDbGFzcyIsInNlbGVjdG9yIiwiZmluZCIsImFwcGVuZCIsIm5vZGUiLCJ1cGRhdGUiLCJHcmFwaCIsIm5ld0VudGl0eSIsIkVudGl0eSIsImFkZENlbGwiLCJuZXdGb3JlaWduS2V5IiwiZmtFbnRpdHlJZCIsInBrRW50aXR5SWQiLCJMaW5rIiwic291cmNlIiwiaWQiLCJ0YXJnZXQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O0FBYUE7QUFFQSxTQUFTQSxlQUFULENBQXlCQyxDQUF6QixFQUE0QkMsQ0FBNUIsRUFBK0JDLENBQS9CLEVBQWtDQyxDQUFsQyxFQUFxQ0MsQ0FBckMsRUFBd0NDLEVBQXhDLEVBQTRDQyxFQUE1QyxFQUFnREMsRUFBaEQsRUFBb0RDLEVBQXBELEVBQ0E7QUFDQyxNQUFJQyxNQUFNLEdBQUcsT0FBT1QsQ0FBQyxHQUFHSSxDQUFYLElBQWdCLEdBQWhCLEdBQXNCSCxDQUFuQztBQUVBUSxFQUFBQSxNQUFNLElBQUksT0FBT1AsQ0FBQyxHQUFHLElBQUlFLENBQWYsQ0FBVjs7QUFDQSxNQUFHRSxFQUFILEVBQU87QUFDTkcsSUFBQUEsTUFBTSxJQUFJLE1BQU1MLENBQU4sR0FBVSxHQUFWLEdBQWdCQSxDQUFoQixHQUFvQixTQUFwQixHQUFpQyxDQUFDQSxDQUFsQyxHQUF1QyxHQUF2QyxHQUE4QyxDQUFDQSxDQUF6RDtBQUNBLEdBRkQsTUFFTztBQUNOSyxJQUFBQSxNQUFNLElBQUksTUFBTyxDQUFDTCxDQUFsQjtBQUNBSyxJQUFBQSxNQUFNLElBQUksTUFBTyxDQUFDTCxDQUFsQjtBQUNBOztBQUVESyxFQUFBQSxNQUFNLElBQUksT0FBT04sQ0FBQyxHQUFHLElBQUlDLENBQWYsQ0FBVjs7QUFDQSxNQUFHSSxFQUFILEVBQU87QUFDTkMsSUFBQUEsTUFBTSxJQUFJLE1BQU1MLENBQU4sR0FBVSxHQUFWLEdBQWdCQSxDQUFoQixHQUFv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LENBQWFDLEdBQWIsQ0FBaUI0RSxNQUFyQixDQUE0QnhFLE1BQTVCLENBQWI7QUFFQSxPQUFLeUUsT0FBTCxDQUFhaEcsTUFBYjtBQUVBLFNBQU9BLE1BQVA7QUFDQSxDQVBEO0FBU0E7OztBQUVBaUIsS0FBSyxDQUFDRyxHQUFOLENBQVV5RSxLQUFWLENBQWdCNUQsU0FBaEIsQ0FBMEJnRSxhQUExQixHQUEwQyxVQUFTQyxVQUFULEVBQXFCQyxVQUFyQixFQUMxQztBQUNDLE1BQUluRyxNQUFNLEdBQUcsSUFBSWlCLEtBQUssQ0FBQ0csR0FBTixDQUFVZ0YsSUFBZCxDQUFtQjtBQUMvQkMsSUFBQUEsTUFBTSxFQUFFO0FBQUNDLE1BQUFBLEVBQUUsRUFBRUo7QUFBTCxLQUR1QjtBQUUvQkssSUFBQUEsTUFBTSxFQUFFO0FBQUNELE1BQUFBLEVBQUUsRUFBRUg7QUFBTCxLQUZ1QjtBQUcvQnZFLElBQUFBLEtBQUssRUFBRTtBQUNOLHFCQUFlO0FBQUMsa0JBQVUsU0FBWDtBQUFzQix3QkFBZ0I7QUFBdEMsT0FEVDtBQUVOLHdCQUFrQjtBQUFDLGtCQUFVLFNBQVg7QUFBc0IsZ0JBQVEsU0FBOUI7QUFBeUMsYUFBSztBQUE5QztBQUZaO0FBSHdCLEdBQW5CLENBQWI7QUFTQSxPQUFLb0UsT0FBTCxDQUFhaEcsTUFBYjtBQUVBLFNBQU9BLE1BQVA7QUFDQSxDQWREO0FBZ0JBIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29ya1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1YWFhYIFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqIEBnbG9iYWwgXywgam9pbnRcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZnVuY3Rpb24gX3N2Z1JvdW5kZWRSZWN0KHgsIHksIHcsIGgsIHIsIHRsLCB0ciwgYmwsIGJyKVxue1xuXHRsZXQgcmVzdWx0ID0gJ00nICsgKHggKyByKSArICcsJyArIHk7XG5cblx0cmVzdWx0ICs9ICdoJyArICh3IC0gMiAqIHIpO1xuXHRpZih0cikge1xuXHRcdHJlc3VsdCArPSAnYScgKyByICsgJywnICsgciArICcgMCAwIDEgJyArICgrcikgKyAnLCcgKyAoK3IpO1xuXHR9IGVsc2Uge1xuXHRcdHJlc3VsdCArPSAnaCcgKyAoK3IpO1xuXHRcdHJlc3VsdCArPSAndicgKyAoK3IpO1xuXHR9XG5cblx0cmVzdWx0ICs9ICd2JyArIChoIC0gMiAqIHIpO1xuXHRpZihicikge1xuXHRcdHJlc3VsdCArPSAnYScgKyByICsgJywnICsgciArICcgMCAwIDEgJyArICgtcikgKyAnLCcgKyAoK3IpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHJlc3VsdCArPSAndicgKyAoK3IpO1xuXHRcdHJlc3VsdCArPSAnaCcgKyAoLXIpO1xuXHR9XG5cblx0cmVzdWx0ICs9ICdoJyArICgyICogciAtIHcpO1xuXHRpZihibCkge1xuXHRcdHJlc3VsdCArPSAnYScgKyByICsgJywnICsgciArICcgMCAwIDEgJyArICgtcikgKyAnLCcgKyAoLXIpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHJlc3VsdCArPSAnaCcgKyAoLXIpO1xuXHRcdHJlc3VsdCArPSAndicgKyAoLXIpO1xuXHR9XG5cblx0cmVzdWx0ICs9ICd2JyArICgyICogciAtIGgpO1xuXHRpZih0bCkge1xuXHRcdHJlc3VsdCArPSAnYScgKyByICsgJywnICsgciArICcgMCAwIDEgJyArICgrcikgKyAnLCcgKyAoLXIpO1xuXHR9IGVsc2Uge1xuXHRcdHJlc3VsdCArPSAndicgKyAoLXIpO1xuXHRcdHJlc3VsdCArPSAnaCcgKyAoK3IpO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdCArICd6Jztcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZnVuY3Rpb24gX2ludFRvU3RyKHYpXG57XG5cdHYgPSBNYXRoLmFicyh2KTtcblxuXHRpZih2IDwgMjU2KVxuXHR7XG5cdFx0Y29uc3QgViA9IHYudG9TdHJpbmcoMTYpO1xuXG5cdFx0cmV0dXJuICh2IDwgMTYpID8gJzAnICsgVlxuXHRcdCAgICAgICAgICAgICAgICA6IC8qLSovIFZcblx0XHQ7XG5cdH1cblxuXHRyZXR1cm4gMDtcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZnVuY3Rpb24gX2dldEwoY29sb3IpXG57XG5cdGNvbnN0IHIgPSBwYXJzZUludChjb2xvci5zdWJzdHJpbmcoMSwgMyksIDE2KTtcblx0Y29uc3QgZyA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZygzLCA1KSwgMTYpO1xuXHRjb25zdCBiID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDUsIDcpLCAxNik7XG5cblx0cmV0dXJuIChNYXRoLm1pbihyLCBnLCBiKSArIE1hdGgubWF4KHIsIGcsIGIpKSAvICgyLjAgKiAyNTUuMCk7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIF9nZXRTdHJva2UoY29sb3IpXG57XG5cdGNvbnN0IHIgPSBwYXJzZUludChjb2xvci5zdWJzdHJpbmcoMSwgMyksIDE2KTtcblx0Y29uc3QgZyA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZygzLCA1KSwgMTYpO1xuXHRjb25zdCBiID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDUsIDcpLCAxNik7XG5cblx0cmV0dXJuICcjJyArIF9pbnRUb1N0cihNYXRoLnJvdW5kKDAuNzUgKiByKSkgKyBfaW50VG9TdHIoTWF0aC5yb3VuZCgwLjc1ICogZykpICsgX2ludFRvU3RyKE1hdGgucm91bmQoMC43NSAqIGIpKTtcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuam9pbnQuc2hhcGVzLnNxbCA9IHt9XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmpvaW50LmRpYS5FbGVtZW50LmRlZmluZSgnc3FsLkVudGl0eScsIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGVudGl0eTogJ04vQScsXG5cdHNob3dTaG93VG9vbDogZmFsc2UsXG5cdHNob3dFZGl0VG9vbDogZmFsc2UsXG5cdGNvbG9yOiAnIzAwNjZDQycsXG5cdGdyaWRlU2l6ZTogMTAsXG5cdGZpZWxkczogW10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGF0dHJzOiB7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0Jy5zcWwtZW50aXR5LXRvcCc6IHtcblx0XHRcdCdyZWYteCc6IDAuMCxcblx0XHRcdCdyZWYteSc6IDAuMCxcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAxLFxuXHRcdH0sXG5cdFx0Jy5zcWwtZW50aXR5LWJvZHknOiB7XG5cdFx0XHQncmVmLXgnOiAwLjAsXG5cdFx0XHQncmVmLXknOiAyMC4wLFxuXHRcdFx0J3N0cm9rZS13aWR0aCc6IDEsXG5cdFx0fSxcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQnLnNxbC1lbnRpdHktc2hvdy10ZXh0Jzoge1xuXHRcdFx0J3JlZi14JzogJzIlJyxcblx0XHRcdCdyZWYteSc6IDUuMCxcblx0XHRcdCd0ZXh0LWFuY2hvcic6ICdzdGFydCcsXG5cdFx0XHQnZmlsbCc6ICd3aGl0ZScsXG5cdFx0XHQnZm9udC1mYW1pbHknOiAnRm9udEF3ZXNvbWUnLFxuXHRcdFx0J2ZvbnQtd2VpZ2h0JzogJ25vcm1hbCcsXG5cdFx0XHQnZm9udC1zaXplJzogMTIsXG5cdFx0fSxcblx0XHQnLnNxbC1lbnRpdHktbmFtZS10ZXh0Jzoge1xuXHRcdFx0J3JlZi14JzogJzUwJScsXG5cdFx0XHQncmVmLXknOiAyLjUsXG5cdFx0XHQndGV4dC1hbmNob3InOiAnbWlkZGxlJyxcblx0XHRcdCdmaWxsJzogJ3doaXRlJyxcblx0XHRcdCdmb250LWZhbWlseSc6ICdDb3VyaWVyIE5ldycsXG5cdFx0XHQnZm9udC13ZWlnaHQnOiAnbm9ybWFsJyxcblx0XHRcdCdmb250LXNpemUnOiAxNCxcblx0XHR9LFxuXHRcdCcuc3FsLWVudGl0eS1lZGl0LXRleHQnOiB7XG5cdFx0XHQncmVmLXgnOiAnOTglJyxcblx0XHRcdCdyZWYteSc6IDUuMCxcblx0XHRcdCd0ZXh0LWFuY2hvcic6ICdlbmQnLFxuXHRcdFx0J2ZpbGwnOiAnd2hpdGUnLFxuXHRcdFx0J2ZvbnQtZmFtaWx5JzogJ0ZvbnRBd2Vzb21lJyxcblx0XHRcdCdmb250LXdlaWdodCc6ICdub3JtYWwnLFxuXHRcdFx0J2ZvbnQtc2l6ZSc6IDEyLFxuXHRcdH0sXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0Jy5zcWwtZmllbGRzJzoge1xuXHRcdFx0J3JlZi14JzogMC4wLFxuXHRcdFx0J3JlZi15JzogMjUuMCxcblx0XHR9LFxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdCcuc3FsLWZpZWxkLXRleHQnOiB7XG5cdFx0XHQncmVmLXgnOiAwLjAzLFxuXHRcdFx0J2ZpbGwnOiAnYmxhY2snLFxuXHRcdFx0J2ZvbnQtZmFtaWx5JzogJ0NvdXJpZXIgTmV3Jyxcblx0XHRcdCdmb250LXdlaWdodCc6ICdub3JtYWwnLFxuXHRcdFx0J2ZvbnQtc2l6ZSc6IDE0LFxuXHRcdH1cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59LCB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRtYXJrdXA6IFtcblx0XHQnPGc+Jyxcblx0XHRcdCc8cGF0aCBjbGFzcz1cInNxbC1lbnRpdHktdG9wXCIgLz4nLFxuXHRcdFx0JzxwYXRoIGNsYXNzPVwic3FsLWVudGl0eS1ib2R5XCIgLz4nLFxuXHRcdFx0JzxhIGNsYXNzPVwic3FsLWVudGl0eS1zaG93LWxpbmtcIiB4bGluazpocmVmPVwiI1wiIGRhdGEtZW50aXR5PVwiXCI+Jyxcblx0XHRcdFx0Jzx0ZXh0IGNsYXNzPVwic3FsLWVudGl0eS1zaG93LXRleHRcIiAvPicsXG5cdFx0XHQnPC9hPicsXG5cdFx0XHQnPHRleHQgY2xhc3M9XCJzcWwtZW50aXR5LW5hbWUtdGV4dFwiIC8+Jyxcblx0XHRcdCc8YSBjbGFzcz1cInNxbC1lbnRpdHktZWRpdC1saW5rXCIgeGxpbms6aHJlZj1cIiNcIiBkYXRhLWVudGl0eT1cIlwiPicsXG5cdFx0XHRcdCc8dGV4dCBjbGFzcz1cInNxbC1lbnRpdHktZWRpdC10ZXh0XCIgLz4nLFxuXHRcdFx0JzwvYT4nLFxuXHRcdFx0JzxnIGNsYXNzPVwic3FsLWZpZWxkc1wiPjwvZz4nLFxuXHRcdCc8L2c+Jyxcblx0XS5qb2luKCcnKSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZmllbGRNYXJrdXA6IFtcblx0XHQnPGcgY2xhc3M9XCJzcWwtZmllbGRcIj4nLFxuXHRcdFx0JzxhIGNsYXNzPVwic3FsLWZpZWxkLWxpbmtcIiB4bGluazpocmVmPVwiI1wiIGRhdGEtZW50aXR5PVwiXCIgZGF0YS1maWVsZD1cIlwiPicsXG5cdFx0XHRcdCc8dGV4dCBjbGFzcz1cInNxbC1maWVsZC10ZXh0XCI+Ti9BPC90ZXh0PicsXG5cdFx0XHQnPC9hPicsXG5cdFx0JzwvZz4nXG5cdF0uam9pbignJyksXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGpvaW50LmRpYS5FbGVtZW50LnByb3RvdHlwZS5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cblx0XHR0aGlzLm9uKCdjaGFuZ2U6ZW50aXR5JywgdGhpcy5vbkVudGl0eUNoYW5nZSwgdGhpcyk7XG5cdFx0dGhpcy5vbignY2hhbmdlOnNob3dTaG93VG9vbCcsIHRoaXMub25FbnRpdHlDaGFuZ2UsIHRoaXMpO1xuXHRcdHRoaXMub24oJ2NoYW5nZTpzaG93RWRpdFRvb2wnLCB0aGlzLm9uRW50aXR5Q2hhbmdlLCB0aGlzKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2U6Y29sb3InLCB0aGlzLm9uQ29sb3JDaGFuZ2UsIHRoaXMpO1xuXHRcdHRoaXMub24oJ2NoYW5nZTpncmlkZVNpemUnLCB0aGlzLm9uRmllbGRzQ2hhbmdlLCB0aGlzKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2U6ZmllbGRzJywgdGhpcy5vbkZpZWxkc0NoYW5nZSwgdGhpcyk7XG5cblx0XHR0aGlzLm9uRW50aXR5Q2hhbmdlKCk7XG5cdFx0dGhpcy5vbkNvbG9yQ2hhbmdlKCk7XG5cdFx0dGhpcy5vbkZpZWxkc0NoYW5nZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRQb3NpdGlvbjogZnVuY3Rpb24ocG9zaXRpb24pXG5cdHtcblx0XHR0aGlzLnNldCgncG9zaXRpb24nLCBwb3NpdGlvbik7XG5cdH0sXG5cblx0Z2V0UG9zaXRpb246IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmdldCgncG9zaXRpb24nKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0VGFibGU6IGZ1bmN0aW9uKGVudGl0eSlcblx0e1xuXHRcdHRoaXMuc2V0KCdlbnRpdHknLCBlbnRpdHkpO1xuXHR9LFxuXG5cdGdldFRhYmxlOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5nZXQoJ2VudGl0eScpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRDb2xvcjogZnVuY3Rpb24oY29sb3IpXG5cdHtcblx0XHR0aGlzLnNldCgnY29sb3InLCBjb2xvcik7XG5cdH0sXG5cblx0Z2V0Q29sb3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmdldCgnY29sb3InKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0R3JpZGVTaXplOiBmdW5jdGlvbihncmlkZVNpemUpXG5cdHtcblx0XHR0aGlzLnNldCgnZ3JpZGVTaXplJywgZ3JpZGVTaXplKTtcblx0fSxcblxuXHRnZXRHcmlkZVNpemU6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmdldCgnZ3JpZGVTaXplJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGFwcGVuZEZpZWxkOiBmdW5jdGlvbihmaWVsZClcblx0e1xuXHRcdGxldCBmaWVsZHMgPSBfLmNsb25lKHRoaXMuZ2V0KCdmaWVsZHMnKSk7XG5cdFx0ZmllbGRzLnB1c2goZmllbGQpO1xuXHRcdHRoaXMuc2V0KCdmaWVsZHMnLCBmaWVsZHMpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvbkVudGl0eUNoYW5nZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBlbnRpdHkgPSB0aGlzLmdldCgnZW50aXR5Jyk7XG5cblx0XHR0aGlzLmF0dHIoJy5zcWwtZW50aXR5LXNob3ctbGluay9kYXRhLWVudGl0eScsIGVudGl0eSk7XG5cdFx0dGhpcy5hdHRyKCcuc3FsLWVudGl0eS1lZGl0LWxpbmsvZGF0YS1lbnRpdHknLCBlbnRpdHkpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmF0dHIoJy5zcWwtZW50aXR5LXNob3ctdGV4dC90ZXh0JywgdGhpcy5nZXQoJ3Nob3dTaG93VG9vbCcpID8gJ++Agidcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuYXR0cignLnNxbC1lbnRpdHktbmFtZS10ZXh0L3RleHQnLCBlbnRpdHkubGVuZ3RoID4gMjMgPyBlbnRpdHkuc3Vic3RyaW5nKDAsIDIxKSArICfigKYnXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBlbnRpdHlcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmF0dHIoJy5zcWwtZW50aXR5LWVkaXQtdGV4dC90ZXh0JywgdGhpcy5nZXQoJ3Nob3dFZGl0VG9vbCcpID8gJ++BgCdcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25Db2xvckNoYW5nZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBjb2xvciA9IHRoaXMuZ2V0KCdjb2xvcicpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB0b29sQ29sb3IgPSBfZ2V0TChjb2xvcikgPiAwLjc1ID8gJyMwMDAwMDAnIDogJyNGRkZGRkYnO1xuXG5cdFx0dGhpcy5hdHRyKCcuc3FsLWVudGl0eS1zaG93L2ZpbGwnLCB0b29sQ29sb3IpO1xuXHRcdHRoaXMuYXR0cignLnNxbC1lbnRpdHktbmFtZS9maWxsJywgdG9vbENvbG9yKTtcblx0XHR0aGlzLmF0dHIoJy5zcWwtZW50aXR5LWVkaXQvZmlsbCcsIHRvb2xDb2xvcik7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHN0cm9rZUNvbG9yID0gX2dldFN0cm9rZShjb2xvcik7XG5cblx0XHR0aGlzLmF0dHIoJy5zcWwtZW50aXR5LXRvcC9maWxsJywgY29sb3IpO1xuXHRcdHRoaXMuYXR0cignLnNxbC1lbnRpdHktdG9wL3N0cm9rZScsIHN0cm9rZUNvbG9yKTtcblxuXHRcdHRoaXMuYXR0cignLnNxbC1lbnRpdHktYm9keS9maWxsJywgJyNGRkZGRkYnKTtcblx0XHR0aGlzLmF0dHIoJy5zcWwtZW50aXR5LWJvZHkvc3Ryb2tlJywgc3Ryb2tlQ29sb3IpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uRmllbGRzQ2hhbmdlOiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGVudGl0eSA9IHRoaXMuZ2V0KCdlbnRpdHknKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHdpZHRoID0gMjMwO1xuXHRcdGxldCBoZWlnaHQgPSAweDA7XG5cblx0XHR0aGlzLmdldCgnZmllbGRzJykuZm9yRWFjaCgoZmllbGQpID0+IHtcblxuXHRcdFx0bGV0IHRleHQgPSBmaWVsZC5maWVsZCArICc6ICcgKyBmaWVsZC50eXBlO1xuXG5cdFx0XHRpZihmaWVsZC5oaWRkZW4pIHtcblx0XHRcdFx0dGV4dCA9ICfinYwnICsgdGV4dDtcblx0XHRcdH1cblx0XHRcdGlmKGZpZWxkLmFkbWluT25seSkge1xuXHRcdFx0XHR0ZXh0ID0gJ/CfmqsnICsgdGV4dDtcblx0XHRcdH1cblx0XHRcdGlmKGZpZWxkLmNyeXB0ZWQpIHtcblx0XHRcdFx0dGV4dCA9ICfwn5SQJyArIHRleHQ7XG5cdFx0XHR9XG5cdFx0XHRpZihmaWVsZC5wcmltYXJ5KSB7XG5cdFx0XHRcdHRleHQgPSAn8J+UkScgKyB0ZXh0O1xuXHRcdFx0fVxuXHRcdFx0aWYoZmllbGQuY3JlYXRlZCB8fCBmaWVsZC5jcmVhdGVkQnlcblx0XHRcdCAgIHx8XG5cdFx0XHQgICBmaWVsZC5tb2RpZmllZCB8fCBmaWVsZC5tb2RpZmllZEJ5XG5cdFx0XHQgKSB7XG5cdFx0XHRcdHRleHQgPSAn4pqZ77iPJyArIHRleHQ7XG5cdFx0XHR9XG5cblx0XHRcdGZpZWxkLmVudGl0eSA9IGVudGl0eTtcblx0XHRcdGZpZWxkLnRleHQgPSAodGV4dC5sZW5ndGggPiAyNikgPyB0ZXh0LnN1YnN0cmluZygwLCAyNCkgKyAn4oCmJyA6IHRleHQ7XG5cdFx0XHRmaWVsZC5vZmZzZXQgPSBoZWlnaHQ7XG5cblx0XHRcdGhlaWdodCArPSAxNTtcblx0XHR9KTtcblxuXHRcdGhlaWdodCArPSAxNTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZ3JpZGVTaXplID0gdGhpcy5nZXQoJ2dyaWRlU2l6ZScpO1xuXG5cdFx0d2lkdGggPSBNYXRoLmNlaWwod2lkdGggLyBncmlkZVNpemUpICogZ3JpZGVTaXplO1xuXHRcdGhlaWdodCA9IE1hdGguY2VpbChoZWlnaHQgLyBncmlkZVNpemUpICogZ3JpZGVTaXplO1xuXG5cdFx0dGhpcy5yZXNpemUod2lkdGgsIGhlaWdodCk7XG5cblx0XHR0aGlzLmF0dHIoJy5zcWwtZW50aXR5LXRvcC9kJywgX3N2Z1JvdW5kZWRSZWN0KDAuNzUsIDAuNSwgd2lkdGgsIDIwLCA4LCB0cnVlLCB0cnVlLCBmYWxzZSwgZmFsc2UpKTtcblx0XHR0aGlzLmF0dHIoJy5zcWwtZW50aXR5LWJvZHkvZCcsIF9zdmdSb3VuZGVkUmVjdCgwLjc1LCAwLjUsIHdpZHRoLCBoZWlnaHQsIDMsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSkpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuam9pbnQuc2hhcGVzLnNxbC5FbnRpdHlWaWV3ID0gam9pbnQuZGlhLkVsZW1lbnRWaWV3LmV4dGVuZCh7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpbml0aWFsaXplOiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGpvaW50LmRpYS5FbGVtZW50Vmlldy5wcm90b3R5cGUuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmxpc3RlblRvKHRoaXMubW9kZWwsICdjaGFuZ2U6ZmllbGRzJywgdGhpcy5yZW5kZXJGaWVsZHMsIHRoaXMpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlbmRlck1hcmt1cDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRqb2ludC5kaWEuRWxlbWVudFZpZXcucHJvdG90eXBlLnJlbmRlck1hcmt1cC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnNyYyA9IFYodGhpcy5tb2RlbC5maWVsZE1hcmt1cCk7XG5cblx0XHR0aGlzLmRzdCA9IHRoaXMuJCgnLnNxbC1maWVsZHMnKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5yZW5kZXJGaWVsZHMoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW5kZXJGaWVsZHM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5kc3QuZW1wdHkoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5tb2RlbC5nZXQoJ2ZpZWxkcycpLmZvckVhY2goKGZpZWxkKSA9PiB7XG5cblx0XHRcdGxldCBjbG9uZSA9IHRoaXMuc3JjLmNsb25lKCkuYWRkQ2xhc3MoZmllbGQuc2VsZWN0b3IpO1xuXG5cdFx0XHRjbG9uZS5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsICcgKyBmaWVsZC5vZmZzZXQgKyAnKScpO1xuXG5cdFx0XHRjbG9uZS5maW5kKCcuc3FsLWZpZWxkLWxpbmsnKVswXS5hdHRyKCdkYXRhLWVudGl0eScsIGZpZWxkLmVudGl0eSlcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtZmllbGQnLCBmaWVsZC5maWVsZClcblx0XHRcdDtcblxuXHRcdFx0Y2xvbmUuZmluZCgnLnNxbC1maWVsZC10ZXh0JylbMF0udGV4dChmaWVsZC50ZXh0KTtcblxuXHRcdFx0dGhpcy5kc3QuYXBwZW5kKGNsb25lLm5vZGUpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnVwZGF0ZSgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmpvaW50LmRpYS5HcmFwaC5wcm90b3R5cGUubmV3RW50aXR5ID0gZnVuY3Rpb24oZW50aXR5KVxue1xuXHRsZXQgcmVzdWx0ID0gbmV3IGpvaW50LnNoYXBlcy5zcWwuRW50aXR5KGVudGl0eSk7XG5cblx0dGhpcy5hZGRDZWxsKHJlc3VsdCk7XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmpvaW50LmRpYS5HcmFwaC5wcm90b3R5cGUubmV3Rm9yZWlnbktleSA9IGZ1bmN0aW9uKGZrRW50aXR5SWQsIHBrRW50aXR5SWQpXG57XG5cdGxldCByZXN1bHQgPSBuZXcgam9pbnQuZGlhLkxpbmsoe1xuXHRcdHNvdXJjZToge2lkOiBma0VudGl0eUlkfSxcblx0XHR0YXJnZXQ6IHtpZDogcGtFbnRpdHlJZH0sXG5cdFx0YXR0cnM6IHtcblx0XHRcdCcuY29ubmVjdGlvbic6IHsnc3Ryb2tlJzogJyM3MDcwNzAnLCAnc3Ryb2tlLXdpZHRoJzogM30sXG5cdFx0XHQnLm1hcmtlci1zb3VyY2UnOiB7J3N0cm9rZSc6ICcjNzA3MDcwJywgJ2ZpbGwnOiAnIzcwNzA3MCcsICdkJzogJ20gMTQuNDU2MDQ0LDE1Ljk5MDE2NCAxLjIzZS00LDcuNTAwNTY0IDAsLTcuMTc5NjY4IC05LjAwMDIwNTMsNS4xNzk2NjggMCwtMTEuMDAwMjA2IDkuMDAwMDgyMyw1LjE3ODc0NSAxLjIzZS00LC03LjE3ODc0NSB6J31cblx0XHR9XG5cdH0pO1xuXG5cdHRoaXMuYWRkQ2VsbChyZXN1bHQpO1xuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
