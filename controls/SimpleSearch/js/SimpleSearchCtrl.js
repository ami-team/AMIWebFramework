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
    return amiWebApp.loadResources([amiWebApp.originURL + '/controls/SimpleSearch/twig/SimpleSearchCtrl.twig', 'ctrl:table'], {
      context: this
    }).done(function (data) {
      this.fragmentSimpleSearch = data[0];
      this._tableCtrl = data[1];
    });
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  render: function render(selector, settings) {
    var result = $.Deferred();
    /*------------------------------------------------------------------------------------------------------------*/

    var fn = function fn(catalog, entity, field, value) {
      return 'BrowseQuery' + ' -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -mql="SELECT * WHERE `' + field + '` = \'' + value + '\'"';
    };
    /*------------------------------------------------------------------------------------------------------------*/


    var _amiWebApp$setup = amiWebApp.setup(['context', 'catalog', 'entity', 'field', 'searchCommandFunc', 'card'], [result, '', '', '', fn, false], settings),
        context = _amiWebApp$setup[0],
        catalog = _amiWebApp$setup[1],
        entity = _amiWebApp$setup[2],
        field = _amiWebApp$setup[3],
        searchCommandFunc = _amiWebApp$setup[4],
        card = _amiWebApp$setup[5];
    /*------------------------------------------------------------------------------------------------------------*/


    this.ctx = {};

    for (var key in settings) {
      this.ctx[key] = settings[key];
    }
    /*------------------------------------------------------------------------------------------------------------*/


    this.ctx.isEmbedded = amiWebApp.isEmbedded();
    this.ctx.endpoint = amiCommand.endpoint;
    this.ctx.context = context;
    this.ctx.catalog = catalog;
    this.ctx.entity = entity;
    this.ctx.field = field;
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

  /*----------------------------------------------------------------------------------------------------------------*/
  __render: function __render(result, selector) {
    var _this2 = this;

    this.replaceHTML(selector, this.fragmentSimpleSearch, settings).done(function () {
      /*--------------------------------------------------------------------------------------------------------*/
      $(_this2.patchId('#E8F152B0_66C6_132C_0155_955D36654C13')).submit(function (e) {
        e.preventDefault();

        _this2.search();
      });
      /*--------------------------------------------------------------------------------------------------------*/

      result.resolveWith(_this2.ctx.context);
      /*--------------------------------------------------------------------------------------------------------*/
    });
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  search: function search() {
    return new this._tableCtrl(parent, this).render(selector, this.ctx.searchCommandFunc(this.ctx.catalog, this.ctx.entity, this.ctx.field), this.ctx);
  }
  /*----------------------------------------------------------------------------------------------------------------*/

});
/*--------------------------------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpbXBsZVNlYXJjaEN0cmwuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiQ29udHJvbCIsIiRpbml0IiwicGFyZW50Iiwib3duZXIiLCIkc3VwZXIiLCJvblJlYWR5IiwiYW1pV2ViQXBwIiwibG9hZFJlc291cmNlcyIsIm9yaWdpblVSTCIsImNvbnRleHQiLCJkb25lIiwiZGF0YSIsImZyYWdtZW50U2ltcGxlU2VhcmNoIiwiX3RhYmxlQ3RybCIsInJlbmRlciIsInNlbGVjdG9yIiwic2V0dGluZ3MiLCJyZXN1bHQiLCIkIiwiRGVmZXJyZWQiLCJmbiIsImNhdGFsb2ciLCJlbnRpdHkiLCJmaWVsZCIsInZhbHVlIiwidGV4dFRvU3RyaW5nIiwic2V0dXAiLCJzZWFyY2hDb21tYW5kRnVuYyIsImNhcmQiLCJjdHgiLCJrZXkiLCJpc0VtYmVkZGVkIiwiZW5kcG9pbnQiLCJhbWlDb21tYW5kIiwiX3JlbmRlciIsImdldFBhcmVudCIsIiRuYW1lIiwidGFiIiwidGFiQ3RvciIsImFwcGVuZEl0ZW0iLCJjbG9zYWJsZSIsImZpcnN0VmlzaWJsZSIsInNldFBhcmVudCIsIl9fcmVuZGVyIiwicmVwbGFjZUhUTUwiLCJwYXRjaElkIiwic3VibWl0IiwiZSIsInByZXZlbnREZWZhdWx0Iiwic2VhcmNoIiwicmVzb2x2ZVdpdGgiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQVdBO0FBRUFBLFNBQVMsQ0FBQyxrQkFBRCxFQUFxQjtBQUU3QjtBQUVBQyxFQUFBQSxRQUFRLEVBQUVDLEdBQUcsQ0FBQ0MsT0FKZTs7QUFNN0I7QUFFQUMsRUFBQUEsS0FBSyxFQUFFLGVBQVNDLE1BQVQsRUFBaUJDLEtBQWpCLEVBQ1A7QUFDQyxTQUFLQyxNQUFMLENBQVlILEtBQVosQ0FBa0JDLE1BQWxCLEVBQTBCQyxLQUExQjtBQUNBLEdBWDRCOztBQWE3QjtBQUVBRSxFQUFBQSxPQUFPLEVBQUUsbUJBQ1Q7QUFDQyxXQUFPQyxTQUFT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Q0FBU0YsaUJBQVQsQ0FBMkIsS0FBS0UsR0FBTCxDQUFTUixPQUFwQyxFQUE2QyxLQUFLUSxHQUFMLENBQVNQLE1BQXRELEVBQThELEtBQUtPLEdBQUwsQ0FBU04sS0FBdkUsQ0FBbkQsRUFBa0ksS0FBS00sR0FBdkksQ0FBUDtBQUNBO0FBRUQ7O0FBdko2QixDQUFyQixDQUFUO0FBMEpBIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29ya1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1YWFhYIFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSUNsYXNzKCdTaW1wbGVTZWFyY2hDdHJsJywge1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGV4dGVuZHM6IGFtaS5Db250cm9sLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIpXG5cdHtcblx0XHR0aGlzLiRzdXBlci4kaW5pdChwYXJlbnQsIG93bmVyKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9TaW1wbGVTZWFyY2gvdHdpZy9TaW1wbGVTZWFyY2hDdHJsLnR3aWcnLFxuXHRcdFx0J2N0cmw6dGFibGUnLFxuXHRcdF0sIHtjb250ZXh0OiB0aGlzfSkuZG9uZShmdW5jdGlvbihkYXRhKSB7XG5cblx0XHRcdHRoaXMuZnJhZ21lbnRTaW1wbGVTZWFyY2ggPSBkYXRhWzBdO1xuXG5cdFx0XHR0aGlzLl90YWJsZUN0cmwgPSBkYXRhWzFdO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVuZGVyOiBmdW5jdGlvbihzZWxlY3Rvciwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBmbiA9IChjYXRhbG9nLCBlbnRpdHksIGZpZWxkLCB2YWx1ZSkgPT5cblx0XHRcdCdCcm93c2VRdWVyeScgKyAnIC1jYXRhbG9nPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoY2F0YWxvZykgKyAnXCIgLWVudGl0eT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGVudGl0eSkgKyAnXCIgLW1xbD1cIlNFTEVDVCAqIFdIRVJFIGAnICsgZmllbGQgKyAnYCA9IFxcJycgKyB2YWx1ZSsgJ1xcJ1wiJ1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IFtcblx0XHRcdGNvbnRleHQsXG5cdFx0XHRjYXRhbG9nLCBlbnRpdHksIGZpZWxkLFxuXHRcdFx0c2VhcmNoQ29tbWFuZEZ1bmMsXG5cdFx0XHRjYXJkXG5cdFx0XSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFtcblx0XHRcdFx0J2NvbnRleHQnLFxuXHRcdFx0XHQnY2F0YWxvZycsICdlbnRpdHknLCAnZmllbGQnLFxuXHRcdFx0XHQnc2VhcmNoQ29tbWFuZEZ1bmMnLFxuXHRcdFx0XHQnY2FyZCcsXG5cdFx0XHRdLFxuXHRcdFx0W1xuXHRcdFx0XHRyZXN1bHQsXG5cdFx0XHRcdCcnLCAnJywgJycsXG5cdFx0XHRcdGZuLFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmN0eCA9IHt9O1xuXG5cdFx0Zm9yKGxldCBrZXkgaW4gc2V0dGluZ3MpXG5cdFx0e1xuXHRcdCAgICB0aGlzLmN0eFtrZXldID0gc2V0dGluZ3Nba2V5XTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmN0eC5pc0VtYmVkZGVkID0gYW1pV2ViQXBwLmlzRW1iZWRkZWQoKTtcblxuXHRcdHRoaXMuY3R4LmVuZHBvaW50ID0gYW1pQ29tbWFuZC5lbmRwb2ludDtcblxuXHRcdHRoaXMuY3R4LmNvbnRleHQgPSBjb250ZXh0O1xuXG5cdFx0dGhpcy5jdHguY2F0YWxvZyA9IGNhdGFsb2c7XG5cdFx0dGhpcy5jdHguZW50aXR5ID0gZW50aXR5O1xuXHRcdHRoaXMuY3R4LmZpZWxkID0gZmllbGQ7XG5cblx0XHR0aGlzLmN0eC5zZWFyY2hDb21tYW5kRnVuYyA9IHNlYXJjaENvbW1hbmRGdW5jO1xuXG5cdFx0dGhpcy5jdHguY2FyZCA9IGNhcmQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBzZWxlY3Rvcik7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3JlbmRlcjogZnVuY3Rpb24ocmVzdWx0LCBzZWxlY3Rvcilcblx0e1xuXHRcdGlmKHRoaXMuZ2V0UGFyZW50KCkuJG5hbWUgIT09ICdUYWJDdHJsJylcblx0XHR7XG5cdFx0XHRjb25zdCB0YWIgPSBuZXcgdGhpcy50YWJDdG9yKG51bGwsIHRoaXMpO1xuXG5cdFx0XHR0YWIucmVuZGVyKHNlbGVjdG9yLCB0aGlzLmN0eCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0dGFiLmFwcGVuZEl0ZW0oJzxpIGNsYXNzPVwiZmEgZmEtdGFibGVcIj48L2k+ICcgKyB0aGlzLmN0eC5lbnRpdHksIHtjbG9zYWJsZTogZmFsc2UsIGZpcnN0VmlzaWJsZTogZmFsc2V9KS5kb25lKChzZWxlY3RvcikgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5zZXRQYXJlbnQodGFiKTtcblxuXHRcdFx0XHRcdHRoaXMuX19yZW5kZXIocmVzdWx0LCBzZWxlY3Rvcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aGlzLl9fcmVuZGVyKHJlc3VsdCwgc2VsZWN0b3IpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9fcmVuZGVyOiBmdW5jdGlvbihyZXN1bHQsIHNlbGVjdG9yKVxuXHR7XG5cdFx0dGhpcy5yZXBsYWNlSFRNTChzZWxlY3RvciwgdGhpcy5mcmFnbWVudFNpbXBsZVNlYXJjaCwgc2V0dGluZ3MpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNFOEYxNTJCMF82NkM2XzEzMkNfMDE1NV85NTVEMzY2NTRDMTMnKSkuc3VibWl0KChlKSA9PiB7XG5cblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdHRoaXMuc2VhcmNoKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aCh0aGlzLmN0eC5jb250ZXh0KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZWFyY2g6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBuZXcgdGhpcy5fdGFibGVDdHJsKHBhcmVudCwgdGhpcykucmVuZGVyKHNlbGVjdG9yLCB0aGlzLmN0eC5zZWFyY2hDb21tYW5kRnVuYyh0aGlzLmN0eC5jYXRhbG9nLCB0aGlzLmN0eC5lbnRpdHksIHRoaXMuY3R4LmZpZWxkKSwgdGhpcy5jdHgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iXX0=
