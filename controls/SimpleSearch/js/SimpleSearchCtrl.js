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
    return amiWebApp.loadResources([amiWebApp.originURL + '/controls/SimpleSearch/twig/SimpleSearchCtrl.twig', 'ctrl:table', 'ctrl:tab'], {
      context: this
    }).done(function (data) {
      this.fragmentSimpleSearch = data[0];
      this.tableCtrl = data[1];
      this.tabCtrl = data[2];
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
      var tab = new this.tabCtrl(null, this);
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

    this.replaceHTML(selector, this.fragmentSimpleSearch).done(function () {
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
    return new this.tableCtrl(parent, this).render(selector, this.ctx.searchCommandFunc(this.ctx.catalog, this.ctx.entity, this.ctx.field, this.patchId('#F8D8C2FB_81D9_F7A0_121B_6FB2949F8DB6')), this.ctx);
  }
  /*----------------------------------------------------------------------------------------------------------------*/

});
/*--------------------------------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpbXBsZVNlYXJjaEN0cmwuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiQ29udHJvbCIsIiRpbml0IiwicGFyZW50Iiwib3duZXIiLCIkc3VwZXIiLCJvblJlYWR5IiwiYW1pV2ViQXBwIiwibG9hZFJlc291cmNlcyIsIm9yaWdpblVSTCIsImNvbnRleHQiLCJkb25lIiwiZGF0YSIsImZyYWdtZW50U2ltcGxlU2VhcmNoIiwidGFibGVDdHJsIiwidGFiQ3RybCIsInJlbmRlciIsInNlbGVjdG9yIiwic2V0dGluZ3MiLCJyZXN1bHQiLCIkIiwiRGVmZXJyZWQiLCJmbiIsImNhdGFsb2ciLCJlbnRpdHkiLCJmaWVsZCIsInZhbHVlIiwidGV4dFRvU3RyaW5nIiwic2V0dXAiLCJzZWFyY2hDb21tYW5kRnVuYyIsImNhcmQiLCJjdHgiLCJrZXkiLCJpc0VtYmVkZGVkIiwiZW5kcG9pbnQiLCJhbWlDb21tYW5kIiwiX3JlbmRlciIsImdldFBhcmVudCIsIiRuYW1lIiwidGFiIiwiYXBwZW5kSXRlbSIsImNsb3NhYmxlIiwiZmlyc3RWaXNpYmxlIiwic2V0UGFyZW50IiwiX19yZW5kZXIiLCJyZXBsYWNlSFRNTCIsInBhdGNoSWQiLCJzdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJzZWFyY2giLCJyZXNvbHZlV2l0aCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBV0E7QUFFQUEsU0FBUyxDQUFDLGtCQUFELEVBQXFCO0FBRTdCO0FBRUFDLEVBQUFBLFFBQVEsRUFBRUMsR0FBRyxDQUFDQyxPQUplOztBQU03QjtBQUVBQyxFQUFBQSxLQUFLLEVBQUUsZUFBU0MsTUFBVCxFQUFpQkMsS0FBakIsRUFDUDtBQUNDLFNBQUtDLE1BQUwsQ0FBWUgsS0FBWixDQUFrQkMsTUFBbEIsRUFBMEJDLEtBQTFCO0FBQ0EsR0FYNEI7O0FBYTdCO0FBRUFFLEVBQUFBLE9BQU8sRUFBRSxtQkFDVDtBQUNDLFdBQU9DLFNBQVMs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LEVBQWlDYSxNQUFqQyxDQUF3Q0MsUUFBeEMsRUFBa0QsS0FBS2MsR0FBTCxDQUFTRixpQkFBVCxDQUEyQixLQUFLRSxHQUFMLENBQVNSLE9BQXBDLEVBQTZDLEtBQUtRLEdBQUwsQ0FBU1AsTUFBdEQsRUFBOEQsS0FBS08sR0FBTCxDQUFTTixLQUF2RSxFQUE4RSxLQUFLcUIsT0FBTCxDQUFhLHVDQUFiLENBQTlFLENBQWxELEVBQXdMLEtBQUtmLEdBQTdMLENBQVA7QUFDQTtBQUVEOztBQXpKNkIsQ0FBckIsQ0FBVDtBQTRKQSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQU1JIFdlYiBGcmFtZXdvcmtcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtWFhYWCBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlDbGFzcygnU2ltcGxlU2VhcmNoQ3RybCcsIHtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRleHRlbmRzOiBhbWkuQ29udHJvbCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihwYXJlbnQsIG93bmVyKVxuXHR7XG5cdFx0dGhpcy4kc3VwZXIuJGluaXQocGFyZW50LCBvd25lcik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY29udHJvbHMvU2ltcGxlU2VhcmNoL3R3aWcvU2ltcGxlU2VhcmNoQ3RybC50d2lnJyxcblx0XHRcdCdjdHJsOnRhYmxlJyxcblx0XHRcdCdjdHJsOnRhYicsXG5cdFx0XSwge2NvbnRleHQ6IHRoaXN9KS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcblxuXHRcdFx0dGhpcy5mcmFnbWVudFNpbXBsZVNlYXJjaCA9IGRhdGFbMF07XG5cblx0XHRcdHRoaXMudGFibGVDdHJsID0gZGF0YVsxXTtcblx0XHRcdHRoaXMudGFiQ3RybCA9IGRhdGFbMl07XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW5kZXI6IGZ1bmN0aW9uKHNlbGVjdG9yLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGZuID0gKGNhdGFsb2csIGVudGl0eSwgZmllbGQsIHZhbHVlKSA9PlxuXHRcdFx0J0Jyb3dzZVF1ZXJ5JyArICcgLWNhdGFsb2c9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhjYXRhbG9nKSArICdcIiAtZW50aXR5PVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZW50aXR5KSArICdcIiAtbXFsPVwiU0VMRUNUICogV0hFUkUgYCcgKyBmaWVsZCArICdgID0gXFwnJyArIHZhbHVlICsgJ1xcJ1wiJ1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IFtcblx0XHRcdGNvbnRleHQsXG5cdFx0XHRjYXRhbG9nLCBlbnRpdHksIGZpZWxkLFxuXHRcdFx0c2VhcmNoQ29tbWFuZEZ1bmMsXG5cdFx0XHRjYXJkXG5cdFx0XSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFtcblx0XHRcdFx0J2NvbnRleHQnLFxuXHRcdFx0XHQnY2F0YWxvZycsICdlbnRpdHknLCAnZmllbGQnLFxuXHRcdFx0XHQnc2VhcmNoQ29tbWFuZEZ1bmMnLFxuXHRcdFx0XHQnY2FyZCcsXG5cdFx0XHRdLFxuXHRcdFx0W1xuXHRcdFx0XHRyZXN1bHQsXG5cdFx0XHRcdCcnLCAnJywgJycsXG5cdFx0XHRcdGZuLFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmN0eCA9IHt9O1xuXG5cdFx0Zm9yKGxldCBrZXkgaW4gc2V0dGluZ3MpXG5cdFx0e1xuXHRcdCAgICB0aGlzLmN0eFtrZXldID0gc2V0dGluZ3Nba2V5XTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmN0eC5pc0VtYmVkZGVkID0gYW1pV2ViQXBwLmlzRW1iZWRkZWQoKTtcblxuXHRcdHRoaXMuY3R4LmVuZHBvaW50ID0gYW1pQ29tbWFuZC5lbmRwb2ludDtcblxuXHRcdHRoaXMuY3R4LmNvbnRleHQgPSBjb250ZXh0O1xuXG5cdFx0dGhpcy5jdHguY2F0YWxvZyA9IGNhdGFsb2c7XG5cdFx0dGhpcy5jdHguZW50aXR5ID0gZW50aXR5O1xuXHRcdHRoaXMuY3R4LmZpZWxkID0gZmllbGQ7XG5cblx0XHR0aGlzLmN0eC5zZWFyY2hDb21tYW5kRnVuYyA9IHNlYXJjaENvbW1hbmRGdW5jO1xuXG5cdFx0dGhpcy5jdHguY2FyZCA9IGNhcmQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBzZWxlY3Rvcik7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3JlbmRlcjogZnVuY3Rpb24ocmVzdWx0LCBzZWxlY3Rvcilcblx0e1xuXHRcdGlmKHRoaXMuZ2V0UGFyZW50KCkuJG5hbWUgIT09ICdUYWJDdHJsJylcblx0XHR7XG5cdFx0XHRjb25zdCB0YWIgPSBuZXcgdGhpcy50YWJDdHJsKG51bGwsIHRoaXMpO1xuXG5cdFx0XHR0YWIucmVuZGVyKHNlbGVjdG9yLCB0aGlzLmN0eCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0dGFiLmFwcGVuZEl0ZW0oJzxpIGNsYXNzPVwiZmEgZmEtdGFibGVcIj48L2k+ICcgKyB0aGlzLmN0eC5lbnRpdHksIHtjbG9zYWJsZTogZmFsc2UsIGZpcnN0VmlzaWJsZTogZmFsc2V9KS5kb25lKChzZWxlY3RvcikgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5zZXRQYXJlbnQodGFiKTtcblxuXHRcdFx0XHRcdHRoaXMuX19yZW5kZXIocmVzdWx0LCBzZWxlY3Rvcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aGlzLl9fcmVuZGVyKHJlc3VsdCwgc2VsZWN0b3IpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9fcmVuZGVyOiBmdW5jdGlvbihyZXN1bHQsIHNlbGVjdG9yKVxuXHR7XG5cdFx0dGhpcy5yZXBsYWNlSFRNTChzZWxlY3RvciwgdGhpcy5mcmFnbWVudFNpbXBsZVNlYXJjaCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0U4RjE1MkIwXzY2QzZfMTMyQ18wMTU1Xzk1NUQzNjY1NEMxMycpKS5zdWJtaXQoKGUpID0+IHtcblxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0dGhpcy5zZWFyY2goKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKHRoaXMuY3R4LmNvbnRleHQpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNlYXJjaDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIG5ldyB0aGlzLnRhYmxlQ3RybChwYXJlbnQsIHRoaXMpLnJlbmRlcihzZWxlY3RvciwgdGhpcy5jdHguc2VhcmNoQ29tbWFuZEZ1bmModGhpcy5jdHguY2F0YWxvZywgdGhpcy5jdHguZW50aXR5LCB0aGlzLmN0eC5maWVsZCwgdGhpcy5wYXRjaElkKCcjRjhEOEMyRkJfODFEOV9GN0EwXzEyMUJfNkZCMjk0OUY4REI2JykpLCB0aGlzLmN0eCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiJdfQ==
