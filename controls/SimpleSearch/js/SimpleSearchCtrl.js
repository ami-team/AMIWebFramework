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

/*-------------------------------------------------------------------------*/
$AMIClass('SimpleSearchCtrl', {
  /*---------------------------------------------------------------------*/
  $extends: ami.Control,

  /*---------------------------------------------------------------------*/
  $init: function $init(parent, owner) {
    this.$super.$init(parent, owner);
  },

  /*---------------------------------------------------------------------*/
  onReady: function onReady() {
    return amiWebApp.loadResources([amiWebApp.originURL + '/controls/SimpleSearch/twig/SimpleSearchCtrl.twig', 'ctrl:table'], {
      context: this
    }).done(function (data) {
      this.fragmentSimpleSearch = data[0];
      this._tableCtrl = data[1];
    });
  },

  /*---------------------------------------------------------------------*/
  render: function render(selector, settings) {
    var result = $.Deferred();
    /*-----------------------------------------------------------------*/

    var fn = function fn(catalog, entity, field, value) {
      return 'BrowseQuery' + ' -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -mql="SELECT * WHERE `' + field + '` = \'' + value + '\'"';
    };
    /*-----------------------------------------------------------------*/


    var _amiWebApp$setup = amiWebApp.setup(['context', 'catalog', 'entity', 'field', 'searchCommandFunc', 'card'], [result, '', '', '', fn, false], settings),
        context = _amiWebApp$setup[0],
        catalog = _amiWebApp$setup[1],
        entity = _amiWebApp$setup[2],
        field = _amiWebApp$setup[3],
        searchCommandFunc = _amiWebApp$setup[4],
        card = _amiWebApp$setup[5];
    /*-----------------------------------------------------------------*/


    this.ctx.context = context;
    this.ctx.catalog = catalog;
    this.ctx.entity = entity;
    this.ctx.field = field;
    this.ctx.searchCommandFunc = searchCommandFunc;
    this.ctx.card = card;
    /*-----------------------------------------------------------------*/

    this._render(result, selector);
    /*-----------------------------------------------------------------*/


    return result;
  },

  /*---------------------------------------------------------------------*/
  _render: function _render(result, selector) {
    var _this = this;

    if (this.getParent().$name !== 'TabCtrl') {
      var tab = new this.tabCtor(null, this);
      tab.render(selector, this.ctx).done(function () {
        tab.appendItem('<i class="fa fa-table"></i> ' + _this.ctx.entity, {
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

  /*---------------------------------------------------------------------*/
  __render: function __render(result, selector) {
    var _this2 = this;

    this.replaceHTML(selector, this.fragmentSimpleSearch, settings).done(function () {
      /*-------------------------------------------------------------*/
      $(_this2.patchId('#E8F152B0_66C6_132C_0155_955D36654C13')).submit(function (e) {
        e.preventDefault();

        _this2.search();
      });
      /*-------------------------------------------------------------*/

      result.resolveWith(_this2.ctx.context);
      /*-------------------------------------------------------------*/
    });
  },

  /*---------------------------------------------------------------------*/
  search: function search() {
    return new this._tableCtrl(parent, this).render(selector, this.ctx.searchCommandFunc(this.ctx.catalog, this.ctx.entity, this.ctx.field), this.ctx);
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpbXBsZVNlYXJjaEN0cmwuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiQ29udHJvbCIsIiRpbml0IiwicGFyZW50Iiwib3duZXIiLCIkc3VwZXIiLCJvblJlYWR5IiwiYW1pV2ViQXBwIiwibG9hZFJlc291cmNlcyIsIm9yaWdpblVSTCIsImNvbnRleHQiLCJkb25lIiwiZGF0YSIsImZyYWdtZW50U2ltcGxlU2VhcmNoIiwiX3RhYmxlQ3RybCIsInJlbmRlciIsInNlbGVjdG9yIiwic2V0dGluZ3MiLCJyZXN1bHQiLCIkIiwiRGVmZXJyZWQiLCJmbiIsImNhdGFsb2ciLCJlbnRpdHkiLCJmaWVsZCIsInZhbHVlIiwidGV4dFRvU3RyaW5nIiwic2V0dXAiLCJzZWFyY2hDb21tYW5kRnVuYyIsImNhcmQiLCJjdHgiLCJfcmVuZGVyIiwiZ2V0UGFyZW50IiwiJG5hbWUiLCJ0YWIiLCJ0YWJDdG9yIiwiYXBwZW5kSXRlbSIsImNsb3NhYmxlIiwiZmlyc3RWaXNpYmxlIiwic2V0UGFyZW50IiwiX19yZW5kZXIiLCJyZXBsYWNlSFRNTCIsInBhdGNoSWQiLCJzdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJzZWFyY2giLCJyZXNvbHZlV2l0aCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBV0E7QUFFQUEsU0FBUyxDQUFDLGtCQUFELEVBQXFCO0FBQzdCO0FBRUFDLEVBQUFBLFFBQVEsRUFBRUMsR0FBRyxDQUFDQyxPQUhlOztBQUs3QjtBQUVBQyxFQUFBQSxLQUFLLEVBQUUsZUFBU0MsTUFBVCxFQUFpQkMsS0FBakIsRUFDUDtBQUNDLFNBQUtDLE1BQUwsQ0FBWUgsS0FBWixDQUFrQkMsTUFBbEIsRUFBMEJDLEtBQTFCO0FBQ0EsR0FWNEI7O0FBWTdCO0FBRUFFLEVBQUFBLE9BQU8sRUFBRSxtQkFDVDtBQUNDLFdBQU9DLFNBQVMsQ0FBQ0MsYUFBVixDQUF3QixDQUM5QkQsU0FBUyxDQUFDRSxTQUFWLEdB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Q0MsV0FBS3dCLFFBQUwsQ0FBY3RCLE1BQWQsRUFBc0JGLFFBQXRCO0FBQ0E7QUFDRCxHQXpHNEI7O0FBMkc3QjtBQUVBd0IsRUFBQUEsUUFBUSxFQUFFLGtCQUFTdEIsTUFBVCxFQUFpQkYsUUFBakIsRUFDVjtBQUFBOztBQUNDLFNBQUt5QixXQUFMLENBQWlCekIsUUFBakIsRUFBMkIsS0FBS0gsb0JBQWhDLEVBQXNESSxRQUF0RCxFQUFnRU4sSUFBaEUsQ0FBcUUsWUFBTTtBQUUxRTtBQUVBUSxNQUFBQSxDQUFDLENBQUMsTUFBSSxDQUFDdUIsT0FBTCxDQUFhLHVDQUFiLENBQUQsQ0FBRCxDQUF5REMsTUFBekQsQ0FBZ0UsVUFBQ0MsQ0FBRCxFQUFPO0FBRXRFQSxRQUFBQSxDQUFDLENBQUNDLGNBQUY7O0FBRUEsUUFBQSxNQUFJLENBQUNDLE1BQUw7QUFDQSxPQUxEO0FBT0E7O0FBRUE1QixNQUFBQSxNQUFNLENBQUM2QixXQUFQLENBQW1CLE1BQUksQ0FBQ2pCLEdBQUwsQ0FBU3BCLE9BQTVCO0FBRUE7QUFDQSxLQWhCRDtBQWlCQSxHQWhJNEI7O0FBa0k3QjtBQUVBb0MsRUFBQUEsTUFBTSxFQUFFLGtCQUNSO0FBQ0MsV0FBTyxJQUFJLEtBQUtoQyxVQUFULENBQW9CWCxNQUFwQixFQUE0QixJQUE1QixFQUFrQ1ksTUFBbEMsQ0FBeUNDLFFBQXpDLEVBQW1ELEtBQUtjLEdBQUwsQ0FBU0YsaUJBQVQsQ0FBMkIsS0FBS0UsR0FBTCxDQUFTUixPQUFwQyxFQUE2QyxLQUFLUSxHQUFMLENBQVNQLE1BQXRELEVBQThELEtBQUtPLEdBQUwsQ0FBU04sS0FBdkUsQ0FBbkQsRUFBa0ksS0FBS00sR0FBdkksQ0FBUDtBQUNBO0FBRUQ7O0FBekk2QixDQUFyQixDQUFUO0FBNElBIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29ya1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1YWFhYIFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kQU1JQ2xhc3MoJ1NpbXBsZVNlYXJjaEN0cmwnLCB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZXh0ZW5kczogYW1pLkNvbnRyb2wsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihwYXJlbnQsIG93bmVyKVxuXHR7XG5cdFx0dGhpcy4kc3VwZXIuJGluaXQocGFyZW50LCBvd25lcik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9TaW1wbGVTZWFyY2gvdHdpZy9TaW1wbGVTZWFyY2hDdHJsLnR3aWcnLFxuXHRcdFx0J2N0cmw6dGFibGUnLFxuXHRcdF0sIHtjb250ZXh0OiB0aGlzfSkuZG9uZShmdW5jdGlvbihkYXRhKSB7XG5cblx0XHRcdHRoaXMuZnJhZ21lbnRTaW1wbGVTZWFyY2ggPSBkYXRhWzBdO1xuXG5cdFx0XHR0aGlzLl90YWJsZUN0cmwgPSBkYXRhWzFdO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW5kZXI6IGZ1bmN0aW9uKHNlbGVjdG9yLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZm4gPSAoY2F0YWxvZywgZW50aXR5LCBmaWVsZCwgdmFsdWUpID0+XG5cdFx0XHQnQnJvd3NlUXVlcnknICsgJyAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGNhdGFsb2cpICsgJ1wiIC1lbnRpdHk9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhlbnRpdHkpICsgJ1wiIC1tcWw9XCJTRUxFQ1QgKiBXSEVSRSBgJyArIGZpZWxkICsgJ2AgPSBcXCcnICsgdmFsdWUrICdcXCdcIidcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IFtcblx0XHRcdGNvbnRleHQsXG5cdFx0XHRjYXRhbG9nLCBlbnRpdHksIGZpZWxkLFxuXHRcdFx0c2VhcmNoQ29tbWFuZEZ1bmMsXG5cdFx0XHRjYXJkXG5cdFx0XSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFtcblx0XHRcdFx0J2NvbnRleHQnLFxuXHRcdFx0XHQnY2F0YWxvZycsICdlbnRpdHknLCAnZmllbGQnLFxuXHRcdFx0XHQnc2VhcmNoQ29tbWFuZEZ1bmMnLFxuXHRcdFx0XHQnY2FyZCcsXG5cdFx0XHRdLFxuXHRcdFx0W1xuXHRcdFx0XHRyZXN1bHQsXG5cdFx0XHRcdCcnLCAnJywgJycsXG5cdFx0XHRcdGZuLFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuY3R4LmNvbnRleHQgPSBjb250ZXh0O1xuXG5cdFx0dGhpcy5jdHguY2F0YWxvZyA9IGNhdGFsb2c7XG5cdFx0dGhpcy5jdHguZW50aXR5ID0gZW50aXR5O1xuXHRcdHRoaXMuY3R4LmZpZWxkID0gZmllbGQ7XG5cblx0XHR0aGlzLmN0eC5zZWFyY2hDb21tYW5kRnVuYyA9IHNlYXJjaENvbW1hbmRGdW5jO1xuXG5cdFx0dGhpcy5jdHguY2FyZCA9IGNhcmQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIHNlbGVjdG9yKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3JlbmRlcjogZnVuY3Rpb24ocmVzdWx0LCBzZWxlY3Rvcilcblx0e1xuXHRcdGlmKHRoaXMuZ2V0UGFyZW50KCkuJG5hbWUgIT09ICdUYWJDdHJsJylcblx0XHR7XG5cdFx0XHRjb25zdCB0YWIgPSBuZXcgdGhpcy50YWJDdG9yKG51bGwsIHRoaXMpO1xuXG5cdFx0XHR0YWIucmVuZGVyKHNlbGVjdG9yLCB0aGlzLmN0eCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0dGFiLmFwcGVuZEl0ZW0oJzxpIGNsYXNzPVwiZmEgZmEtdGFibGVcIj48L2k+ICcgKyB0aGlzLmN0eC5lbnRpdHksIHtjbG9zYWJsZTogZmFsc2UsIGZpcnN0VmlzaWJsZTogZmFsc2V9KS5kb25lKChzZWxlY3RvcikgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5zZXRQYXJlbnQodGFiKTtcblxuXHRcdFx0XHRcdHRoaXMuX19yZW5kZXIocmVzdWx0LCBzZWxlY3Rvcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aGlzLl9fcmVuZGVyKHJlc3VsdCwgc2VsZWN0b3IpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X19yZW5kZXI6IGZ1bmN0aW9uKHJlc3VsdCwgc2VsZWN0b3IpXG5cdHtcblx0XHR0aGlzLnJlcGxhY2VIVE1MKHNlbGVjdG9yLCB0aGlzLmZyYWdtZW50U2ltcGxlU2VhcmNoLCBzZXR0aW5ncykuZG9uZSgoKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjRThGMTUyQjBfNjZDNl8xMzJDXzAxNTVfOTU1RDM2NjU0QzEzJykpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHR0aGlzLnNlYXJjaCgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aCh0aGlzLmN0eC5jb250ZXh0KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2VhcmNoOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gbmV3IHRoaXMuX3RhYmxlQ3RybChwYXJlbnQsIHRoaXMpLnJlbmRlcihzZWxlY3RvciwgdGhpcy5jdHguc2VhcmNoQ29tbWFuZEZ1bmModGhpcy5jdHguY2F0YWxvZywgdGhpcy5jdHguZW50aXR5LCB0aGlzLmN0eC5maWVsZCksIHRoaXMuY3R4KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiJdfQ==
