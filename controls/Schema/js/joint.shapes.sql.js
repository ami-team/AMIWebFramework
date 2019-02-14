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

joint.dia.Element.define('sql.Table', {
  /*---------------------------------------------------------------------*/
  table: 'N/A',
  showShowTool: false,
  showEditTool: false,
  color: '#0066CC',
  grideSize: 10,
  columns: [],

  /*---------------------------------------------------------------------*/
  attrs: {
    /*-----------------------------------------------------------------*/
    '.sql-table-top': {
      'ref-x': 0.0,
      'ref-y': 0.0,
      'stroke-width': 1
    },
    '.sql-table-body': {
      'ref-x': 0.0,
      'ref-y': 20.0,
      'stroke-width': 1
    },

    /*-----------------------------------------------------------------*/
    '.sql-table-show-text': {
      'ref-x': '2%',
      'ref-y': 5.0,
      'text-anchor': 'start',
      'fill': 'white',
      'font-family': 'FontAwesome',
      'font-weight': 'normal',
      'font-size': 12
    },
    '.sql-table-name-text': {
      'ref-x': '50%',
      'ref-y': 2.5,
      'text-anchor': 'middle',
      'fill': 'white',
      'font-family': 'Courier New',
      'font-weight': 'normal',
      'font-size': 14
    },
    '.sql-table-edit-text': {
      'ref-x': '98%',
      'ref-y': 5.0,
      'text-anchor': 'end',
      'fill': 'white',
      'font-family': 'FontAwesome',
      'font-weight': 'normal',
      'font-size': 12
    },

    /*-----------------------------------------------------------------*/
    '.sql-columns': {
      'ref-x': 0.0,
      'ref-y': 25.0
    },

    /*-----------------------------------------------------------------*/
    '.sql-column-text': {
      'ref-x': 0.03,
      'fill': 'black',
      'font-family': 'Courier New',
      'font-weight': 'normal',
      'font-size': 14
      /*-----------------------------------------------------------------*/

    }
  }
  /*---------------------------------------------------------------------*/

}, {
  /*---------------------------------------------------------------------*/
  markup: ['<g>', '<path class="sql-table-top" />', '<path class="sql-table-body" />', '<a class="sql-table-show-link" xlink:href="#" data-table="">', '<text class="sql-table-show-text" />', '</a>', '<text class="sql-table-name-text" />', '<a class="sql-table-edit-link" xlink:href="#" data-table="">', '<text class="sql-table-edit-text" />', '</a>', '<g class="sql-columns"></g>', '</g>'].join(''),

  /*---------------------------------------------------------------------*/
  columnMarkup: ['<g class="sql-column">', '<a class="sql-column-link" xlink:href="#" data-table="" data-column="">', '<text class="sql-column-text">N/A</text>', '</a>', '</g>'].join(''),

  /*---------------------------------------------------------------------*/
  initialize: function initialize() {
    joint.dia.Element.prototype.initialize.apply(this, arguments);
    this.on('change:table', this.onTableChange, this);
    this.on('change:showShowTool', this.onTableChange, this);
    this.on('change:showEditTool', this.onTableChange, this);
    this.on('change:color', this.onColorChange, this);
    this.on('change:grideSize', this.onColumnsChange, this);
    this.on('change:columns', this.onColumnsChange, this);
    this.onTableChange();
    this.onColorChange();
    this.onColumnsChange();
  },

  /*---------------------------------------------------------------------*/
  setPosition: function setPosition(position) {
    this.set('position', position);
  },
  getPosition: function getPosition() {
    return this.get('position');
  },

  /*---------------------------------------------------------------------*/
  setTable: function setTable(table) {
    this.set('table', table);
  },
  getTable: function getTable() {
    return this.get('table');
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
  appendColumn: function appendColumn(column) {
    var columns = _.clone(this.get('columns'));

    columns.push(column);
    this.set('columns', columns);
  },

  /*---------------------------------------------------------------------*/
  onTableChange: function onTableChange() {
    /*-----------------------------------------------------------------*/
    var table = this.get('table');
    this.attr('.sql-table-show-link/data-table', table);
    this.attr('.sql-table-edit-link/data-table', table);
    /*-----------------------------------------------------------------*/

    this.attr('.sql-table-show-text/text', this.get('showShowTool') ? '' : '');
    /*-----------------------------------------------------------------*/

    this.attr('.sql-table-name-text/text', table.length > 23 ? table.substring(0, 21) + '…' : table);
    /*-----------------------------------------------------------------*/

    this.attr('.sql-table-edit-text/text', this.get('showEditTool') ? '' : '');
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  onColorChange: function onColorChange() {
    /*-----------------------------------------------------------------*/
    var color = this.get('color');
    /*-----------------------------------------------------------------*/

    var toolColor = _getL(color) > 0.75 ? '#000000' : '#FFFFFF';
    this.attr('.sql-table-show/fill', toolColor);
    this.attr('.sql-table-name/fill', toolColor);
    this.attr('.sql-table-edit/fill', toolColor);
    /*-----------------------------------------------------------------*/

    var strokeColor = _getStroke(color);

    this.attr('.sql-table-top/fill', color);
    this.attr('.sql-table-top/stroke', strokeColor);
    this.attr('.sql-table-body/fill', '#FFFFFF');
    this.attr('.sql-table-body/stroke', strokeColor);
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  onColumnsChange: function onColumnsChange() {
    /*-----------------------------------------------------------------*/
    var table = this.get('table');
    /*-----------------------------------------------------------------*/

    var width = 230;
    var height = 0x0;

    _.each(this.get('columns'), function (column) {
      var text = column.name + ': ' + column.type;
      /**/

      if (column.hidden) {
        text = '❌' + text;
      } else if (column.adminOnly) {
        text = '🚫' + text;
      } else if (column.crypted) {
        text = '🔐' + text;
      } else if (column.primary) {
        text = '🔑' + text;
      } else if (column.created || column.createdBy || column.modified || column.modifiedBy) {
        text = '⚙️' + text;
      }

      column.table = table;
      column.text = text.length > 26 ? text.substring(0, 24) + '…' : text;
      column.offset = height;
      height += 15;
    }, this);

    height += 15;
    /*-----------------------------------------------------------------*/

    var grideSize = this.get('grideSize');
    width = Math.ceil(width / grideSize) * grideSize;
    height = Math.ceil(height / grideSize) * grideSize;
    this.resize(width, height);
    this.attr('.sql-table-top/d', _svgRoundedRect(0.75, 0.5, width, 20, 8, true, true, false, false));
    this.attr('.sql-table-body/d', _svgRoundedRect(0.75, 0.5, width, height, 3, false, false, true, true));
    /*-----------------------------------------------------------------*/
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/

joint.shapes.sql.TableView = joint.dia.ElementView.extend({
  /*---------------------------------------------------------------------*/
  initialize: function initialize() {
    /*-----------------------------------------------------------------*/
    joint.dia.ElementView.prototype.initialize.apply(this, arguments);
    /*-----------------------------------------------------------------*/

    this.listenTo(this.model, 'change:columns', this.renderColumns, this);
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  renderMarkup: function renderMarkup() {
    /*-----------------------------------------------------------------*/
    joint.dia.ElementView.prototype.renderMarkup.apply(this, arguments);
    /*-----------------------------------------------------------------*/

    this.src = V(this.model.columnMarkup);
    this.dst = this.$('.sql-columns');
    /*-----------------------------------------------------------------*/

    this.renderColumns();
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  renderColumns: function renderColumns() {
    /*-----------------------------------------------------------------*/
    this.dst.empty();
    /*-----------------------------------------------------------------*/

    _.each(this.model.get('columns'), function (column) {
      var clone = this.src.clone().addClass(column.selector);
      clone.attr('transform', 'translate(0, ' + column.offset + ')');
      clone.find('.sql-column-link')[0].attr('data-table', column.table).attr('data-column', column.name);
      clone.find('.sql-column-text')[0].text(column.text);
      this.dst.append(clone.node);
    }, this);
    /*-----------------------------------------------------------------*/


    this.update();
    /*-----------------------------------------------------------------*/
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/

joint.dia.Graph.prototype.newTable = function (table) {
  var result = new joint.shapes.sql.Table(table);
  this.addCell(result);
  return result;
};
/*-------------------------------------------------------------------------*/


joint.dia.Graph.prototype.newForeignKey = function (fkTableId, pkTableId) {
  var result = new joint.dia.Link({
    source: {
      id: fkTableId
    },
    target: {
      id: pkTableId
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
