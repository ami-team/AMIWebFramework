/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/
$AMIClass('SimpleSearchCtrl', {
  /*----------------------------------------------------------------------------------------------------------------*/
  $extends: ami.Control,

  /*----------------------------------------------------------------------------------------------------------------*/
  $init: function $init(parent, owner) {
    this.$super.$init(parent, owner);
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  onReady: function onReady() {
    return amiWebApp.loadResources([amiWebApp.originURL + '/controls/SimpleSearch/twig/SimpleSearchCtrl.twig', 'ctrl:tab'], {
      context: this
    }).done(function (data) {
      this.fragmentSimpleSearch = data[0];
      this.tabCtrl = data[1];
    });
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  render: function render(selector, settings) {
    var result = $.Deferred();
    /*------------------------------------------------------------------------------------------------------------*/

    var fn = function fn(catalog, entity, fields, value) {
      var select = fields.length === 0 ? ['0 = 1'] : value.indexOf('%') < 0 ? fields.map(function (field) {
        return field + ' = \'' + amiWebApp.textToSQL(value) + '\'';
      }) : fields.map(function (field) {
        return field + ' LIKE \'' + amiWebApp.textToSQL(value) + '\'';
      });
      return 'BrowseQuery' + ' -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -mql="SELECT * WHERE ' + select.join(' OR ') + '"';
    };
    /*------------------------------------------------------------------------------------------------------------*/


    var _amiWebApp$setup = amiWebApp.setup(['context', 'placeholder', 'catalog', 'defaultCatalog', 'entity', 'defaultEntity', 'fields', 'criteria', 'searchCommandFunc', 'card'], [result, '% for wildcarding', '', '', '', '', [], [], fn, false], settings),
        context = _amiWebApp$setup[0],
        placeholder = _amiWebApp$setup[1],
        catalog = _amiWebApp$setup[2],
        defaultCatalog = _amiWebApp$setup[3],
        entity = _amiWebApp$setup[4],
        defaultEntity = _amiWebApp$setup[5],
        fields = _amiWebApp$setup[6],
        criteria = _amiWebApp$setup[7],
        searchCommandFunc = _amiWebApp$setup[8],
        card = _amiWebApp$setup[9];
    /*------------------------------------------------------------------------------------------------------------*/


    this.ctx = {};

    for (var key in settings) {
      this.ctx[key] = settings[key];
    }
    /*------------------------------------------------------------------------------------------------------------*/


    this.ctx.isEmbedded = amiWebApp.isEmbedded();
    this.ctx.endpoint = amiCommand.endpoint;
    this.ctx.context = context;
    this.ctx.placeholder = placeholder;
    this.ctx.catalog = defaultCatalog ? defaultCatalog : catalog;
    this.ctx.entity = defaultEntity ? defaultEntity : entity;
    this.ctx.fields = criteria.length > 0 ? criteria.filter(function (criterion) {
      return criterion.more.simple_search;
    }).map(function (criterion) {
      return '`' + criterion.catalog + '`.`' + criterion.entity + '`.`' + criterion.field + '`';
    }) : fields;
    this.ctx.searchCommandFunc = searchCommandFunc;
    this.ctx.card = card;
    /*------------------------------------------------------------------------------------------------------------*/

    this._render(result, selector);
    /*------------------------------------------------------------------------------------------------------------*/


    return result;
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  _render: function _render(result, selector) {
    var _this = this;

    if (this.getParent().$name !== 'TabCtrl') {
      var tab = new this.tabCtrl(null, this);
      tab.render(selector, this.ctx).done(function () {
        tab.appendItem('<i class="fa fa-search"></i> ' + _this.ctx.entity, {
          closable: false,
          firstVisible: false
        }).done(function (selector) {
          _this.setParent(tab);

          _this.__render(result, selector);
        });
      });
    } else {
      this.__render(result, selector);
    }
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  __render: function __render(result, selector) {
    var _this2 = this;

    this.replaceHTML(selector, this.fragmentSimpleSearch, {
      dict: this.ctx
    }).done(function () {
      /*--------------------------------------------------------------------------------------------------------*/
      $(_this2.patchId('#E8F152B0_66C6_132C_0155_955D36654C13')).submit(function (e) {
        e.preventDefault();
        var value = $(_this2.patchId('#F8D8C2FB_81D9_F7A0_121B_6FB2949F8DB6')).val().trim();

        if (value) {
          _this2.search(value);
        }
      });
      /*--------------------------------------------------------------------------------------------------------*/

      result.resolveWith(_this2.ctx.context);
      /*--------------------------------------------------------------------------------------------------------*/
    });
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  search: function search(value) {
    return amiWebApp.createControlInContainer(this.getParent(), this, 'table', [this.ctx.searchCommandFunc(this.ctx.catalog, this.ctx.entity, this.ctx.fields, value)], {}, this.ctx, 'table', this.ctx.entity);
  }
  /*----------------------------------------------------------------------------------------------------------------*/

});
/*--------------------------------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpbXBsZVNlYXJjaEN0cmwuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiQ29udHJvbCIsIiRpbml0IiwicGFyZW50Iiwib3duZXIiLCIkc3VwZXIiLCJvblJlYWR5IiwiYW1pV2ViQXBwIiwibG9hZFJlc291cmNlcyIsIm9yaWdpblVSTCIsImNvbnRleHQiLCJkb25lIiwiZGF0YSIsImZyYWdtZW50U2ltcGxlU2VhcmNoIiwidGFiQ3RybCIsInJlbmRlciIsInNlbGVjdG9yIiwic2V0dGluZ3MiLCJyZXN1bHQiLCIkIiwiRGVmZXJyZWQiLCJmbiIsImNhdGFsb2ciLCJlbnRpdHkiLCJmaWVsZHMiLCJ2YWx1ZSIsInNlbGVjdCIsImxlbmd0aCIsImluZGV4T2YiLCJtYXAiLCJmaWVsZCIsInRleHRUb1NRTCIsInRleHRUb1N0cmluZyIsImpvaW4iLCJzZXR1cCIsInBsYWNlaG9sZGVyIiwiZGVmYXVsdENhdGFsb2ciLCJkZWZhdWx0RW50aXR5IiwiY3JpdGVyaWEiLCJzZWFyY2hDb21tYW5kRnVuYyIsImNhcmQiLCJjdHgiLCJrZXkiLCJpc0VtYmVkZGVkIiwiZW5kcG9pbnQiLCJhbWlDb21tYW5kIiwiZmlsdGVyIiwiY3JpdGVyaW9uIiwibW9yZSIsInNpbXBsZV9zZWFyY2giLCJfcmVuZGVyIiwiZ2V0UGFyZW50IiwiJG5hbWUiLCJ0YWIiLCJhcHBlbmRJdGVtIiwiY2xvc2FibGUiLCJmaXJzdFZpc2libGUiLCJzZXRQYXJlbnQiLCJfX3JlbmRlciIsInJlcGxhY2VIVE1MIiwiZGljdCIsInBhdGNoSWQiLCJzdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJ2YWwiLCJ0cmltIiwic2VhcmNoIiwicmVzb2x2ZVdpdGgiLCJjcmVhdGVDb250cm9sSW5Db250YWluZXIiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQVdBO0FBRUFBLFNBQVMsQ0FBQyxrQkFBRCxFQUFxQjtBQUU3QjtBQUVBQyxFQUFBQSxR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RUEsUUFBQUEsQ0FBQyxDQUFDQyxjQUFGO0FBRUEsWUFBTXZDLEtBQUssR0FBR04sQ0FBQyxDQUFDLE1BQUksQ0FBQzBDLE9BQUwsQ0FBYSx1Q0FBYixDQUFELENBQUQsQ0FBeURJLEdBQXpELEdBQStEQyxJQUEvRCxFQUFkOztBQUVBLFlBQUd6QyxLQUFILEVBQ0E7QUFDQyxVQUFBLE1BQUksQ0FBQzBDLE1BQUwsQ0FBWTFDLEtBQVo7QUFDQTtBQUNELE9BVkQ7QUFZQTs7QUFFQVAsTUFBQUEsTUFBTSxDQUFDa0QsV0FBUCxDQUFtQixNQUFJLENBQUMzQixHQUFMLENBQVMvQixPQUE1QjtBQUVBO0FBQ0EsS0FyQkQ7QUFzQkEsR0F2SzRCOztBQXlLN0I7QUFFQXlELEVBQUFBLE1BQU0sRUFBRSxnQkFBUzFDLEtBQVQsRUFDUjtBQUNDLFdBQU9sQixTQUFTLENBQUM4RCx3QkFBVixDQUFtQyxLQUFLbEIsU0FBTCxFQUFuQyxFQUFxRCxJQUFyRCxFQUEyRCxPQUEzRCxFQUFvRSxDQUFDLEtBQUtWLEdBQUwsQ0FBU0YsaUJBQVQsQ0FBMkIsS0FBS0UsR0FBTCxDQUFTbkIsT0FBcEMsRUFBNkMsS0FBS21CLEdBQUwsQ0FBU2xCLE1BQXRELEVBQThELEtBQUtrQixHQUFMLENBQVNqQixNQUF2RSxFQUErRUMsS0FBL0UsQ0FBRCxDQUFwRSxFQUE2SixFQUE3SixFQUFpSyxLQUFLZ0IsR0FBdEssRUFBMkssT0FBM0ssRUFBb0wsS0FBS0EsR0FBTCxDQUFTbEIsTUFBN0wsQ0FBUDtBQUNBO0FBRUQ7O0FBaEw2QixDQUFyQixDQUFUO0FBbUxBIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29ya1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1YWFhYIFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSUNsYXNzKCdTaW1wbGVTZWFyY2hDdHJsJywge1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGV4dGVuZHM6IGFtaS5Db250cm9sLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIpXG5cdHtcblx0XHR0aGlzLiRzdXBlci4kaW5pdChwYXJlbnQsIG93bmVyKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9TaW1wbGVTZWFyY2gvdHdpZy9TaW1wbGVTZWFyY2hDdHJsLnR3aWcnLFxuXHRcdFx0J2N0cmw6dGFiJyxcblx0XHRdLCB7Y29udGV4dDogdGhpc30pLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuXG5cdFx0XHR0aGlzLmZyYWdtZW50U2ltcGxlU2VhcmNoID0gZGF0YVswXTtcblxuXHRcdFx0dGhpcy50YWJDdHJsID0gZGF0YVsxXTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oc2VsZWN0b3IsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZm4gPSAoY2F0YWxvZywgZW50aXR5LCBmaWVsZHMsIHZhbHVlKSA9PiB7XG5cblx0XHRcdGNvbnN0IHNlbGVjdCA9IGZpZWxkcy5sZW5ndGggPT09IDAgPyBbJzAgPSAxJ11cblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAodmFsdWUuaW5kZXhPZignJScpIDwgMCkgPyBmaWVsZHMubWFwKGZpZWxkID0+IGZpZWxkICsgJyA9IFxcJycgKyBhbWlXZWJBcHAudGV4dFRvU1FMKHZhbHVlKSArICdcXCcnKVxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZpZWxkcy5tYXAoZmllbGQgPT4gZmllbGQgKyAnIExJS0UgXFwnJyArIGFtaVdlYkFwcC50ZXh0VG9TUUwodmFsdWUpICsgJ1xcJycpXG5cdFx0XHQ7XG5cblx0XHRcdHJldHVybiAnQnJvd3NlUXVlcnknICsgJyAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGNhdGFsb2cpICsgJ1wiIC1lbnRpdHk9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhlbnRpdHkpICsgJ1wiIC1tcWw9XCJTRUxFQ1QgKiBXSEVSRSAnICsgc2VsZWN0LmpvaW4oJyBPUiAnKSArICdcIic7XG5cdFx0fTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IFtcblx0XHRcdGNvbnRleHQsXG5cdFx0XHRwbGFjZWhvbGRlcixcblx0XHRcdGNhdGFsb2csIGRlZmF1bHRDYXRhbG9nLFxuXHRcdFx0ZW50aXR5LCBkZWZhdWx0RW50aXR5LFxuXHRcdFx0ZmllbGRzLCBjcml0ZXJpYSxcblx0XHRcdHNlYXJjaENvbW1hbmRGdW5jLFxuXHRcdFx0Y2FyZFxuXHRcdF0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbXG5cdFx0XHRcdCdjb250ZXh0Jyxcblx0XHRcdFx0J3BsYWNlaG9sZGVyJyxcblx0XHRcdFx0J2NhdGFsb2cnLCAnZGVmYXVsdENhdGFsb2cnLFxuXHRcdFx0XHQnZW50aXR5JywgJ2RlZmF1bHRFbnRpdHknLFxuXHRcdFx0XHQnZmllbGRzJywgJ2NyaXRlcmlhJyxcblx0XHRcdFx0J3NlYXJjaENvbW1hbmRGdW5jJyxcblx0XHRcdFx0J2NhcmQnLFxuXHRcdFx0XSxcblx0XHRcdFtcblx0XHRcdFx0cmVzdWx0LFxuXHRcdFx0XHQnJSBmb3Igd2lsZGNhcmRpbmcnLFxuXHRcdFx0XHQnJywgJycsXG5cdFx0XHRcdCcnLCAnJyxcblx0XHRcdFx0W10sIFtdLFxuXHRcdFx0XHRmbixcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5jdHggPSB7fTtcblxuXHRcdGZvcihsZXQga2V5IGluIHNldHRpbmdzKVxuXHRcdHtcblx0XHQgICAgdGhpcy5jdHhba2V5XSA9IHNldHRpbmdzW2tleV07XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5jdHguaXNFbWJlZGRlZCA9IGFtaVdlYkFwcC5pc0VtYmVkZGVkKCk7XG5cblx0XHR0aGlzLmN0eC5lbmRwb2ludCA9IGFtaUNvbW1hbmQuZW5kcG9pbnQ7XG5cblx0XHR0aGlzLmN0eC5jb250ZXh0ID0gY29udGV4dDtcblxuXHRcdHRoaXMuY3R4LnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG5cblx0XHR0aGlzLmN0eC5jYXRhbG9nID0gZGVmYXVsdENhdGFsb2cgPyBkZWZhdWx0Q2F0YWxvZyA6IGNhdGFsb2c7XG5cdFx0dGhpcy5jdHguZW50aXR5ID0gZGVmYXVsdEVudGl0eSA/IGRlZmF1bHRFbnRpdHkgOiBlbnRpdHk7XG5cblx0XHR0aGlzLmN0eC5maWVsZHMgPSBjcml0ZXJpYS5sZW5ndGggPiAwID8gY3JpdGVyaWEuZmlsdGVyKGNyaXRlcmlvbiA9PiBjcml0ZXJpb24ubW9yZS5zaW1wbGVfc2VhcmNoKS5tYXAoY3JpdGVyaW9uID0+ICdgJyArIGNyaXRlcmlvbi5jYXRhbG9nICsgJ2AuYCcgKyBjcml0ZXJpb24uZW50aXR5ICsgJ2AuYCcgKyBjcml0ZXJpb24uZmllbGQgKyAnYCcpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZpZWxkc1xuXHRcdDtcblxuXHRcdHRoaXMuY3R4LnNlYXJjaENvbW1hbmRGdW5jID0gc2VhcmNoQ29tbWFuZEZ1bmM7XG5cblx0XHR0aGlzLmN0eC5jYXJkID0gY2FyZDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIHNlbGVjdG9yKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcmVuZGVyOiBmdW5jdGlvbihyZXN1bHQsIHNlbGVjdG9yKVxuXHR7XG5cdFx0aWYodGhpcy5nZXRQYXJlbnQoKS4kbmFtZSAhPT0gJ1RhYkN0cmwnKVxuXHRcdHtcblx0XHRcdGNvbnN0IHRhYiA9IG5ldyB0aGlzLnRhYkN0cmwobnVsbCwgdGhpcyk7XG5cblx0XHRcdHRhYi5yZW5kZXIoc2VsZWN0b3IsIHRoaXMuY3R4KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHR0YWIuYXBwZW5kSXRlbSgnPGkgY2xhc3M9XCJmYSBmYS1zZWFyY2hcIj48L2k+ICcgKyB0aGlzLmN0eC5lbnRpdHksIHtjbG9zYWJsZTogZmFsc2UsIGZpcnN0VmlzaWJsZTogZmFsc2V9KS5kb25lKChzZWxlY3RvcikgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5zZXRQYXJlbnQodGFiKTtcblxuXHRcdFx0XHRcdHRoaXMuX19yZW5kZXIocmVzdWx0LCBzZWxlY3Rvcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aGlzLl9fcmVuZGVyKHJlc3VsdCwgc2VsZWN0b3IpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9fcmVuZGVyOiBmdW5jdGlvbihyZXN1bHQsIHNlbGVjdG9yKVxuXHR7XG5cdFx0dGhpcy5yZXBsYWNlSFRNTChzZWxlY3RvciwgdGhpcy5mcmFnbWVudFNpbXBsZVNlYXJjaCwge2RpY3Q6IHRoaXMuY3R4fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0U4RjE1MkIwXzY2QzZfMTMyQ18wMTU1Xzk1NUQzNjY1NEMxMycpKS5zdWJtaXQoKGUpID0+IHtcblxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0Y29uc3QgdmFsdWUgPSAkKHRoaXMucGF0Y2hJZCgnI0Y4RDhDMkZCXzgxRDlfRjdBMF8xMjFCXzZGQjI5NDlGOERCNicpKS52YWwoKS50cmltKCk7XG5cblx0XHRcdFx0aWYodmFsdWUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLnNlYXJjaCh2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKHRoaXMuY3R4LmNvbnRleHQpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNlYXJjaDogZnVuY3Rpb24odmFsdWUpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lcih0aGlzLmdldFBhcmVudCgpLCB0aGlzLCAndGFibGUnLCBbdGhpcy5jdHguc2VhcmNoQ29tbWFuZEZ1bmModGhpcy5jdHguY2F0YWxvZywgdGhpcy5jdHguZW50aXR5LCB0aGlzLmN0eC5maWVsZHMsIHZhbHVlKV0sIHt9LCB0aGlzLmN0eCwgJ3RhYmxlJywgdGhpcy5jdHguZW50aXR5KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
