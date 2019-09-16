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

    var fn = function fn(catalog, entity, field, value) {
      return 'BrowseQuery' + ' -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -mql="SELECT * WHERE `' + field + '` = \'' + value + '\'"';
    };
    /*------------------------------------------------------------------------------------------------------------*/


    var _amiWebApp$setup = amiWebApp.setup(['context', 'placeholder', 'catalog', 'entity', 'field', 'searchCommandFunc', 'card'], [result, '', '', '', '', fn, false], settings),
        context = _amiWebApp$setup[0],
        placeholder = _amiWebApp$setup[1],
        catalog = _amiWebApp$setup[2],
        entity = _amiWebApp$setup[3],
        field = _amiWebApp$setup[4],
        searchCommandFunc = _amiWebApp$setup[5],
        card = _amiWebApp$setup[6];
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
          _this2.search();
        }
      });
      /*--------------------------------------------------------------------------------------------------------*/

      result.resolveWith(_this2.ctx.context);
      /*--------------------------------------------------------------------------------------------------------*/
    });
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  search: function search(value) {
    return amiWebApp.createControlInContainer(this.getParent(), this, 'table', [this.ctx.searchCommandFunc(this.ctx.catalog, this.ctx.entity, this.ctx.field, value.trim())], {}, this.ctx, 'table', this.ctx.entity);
  }
  /*----------------------------------------------------------------------------------------------------------------*/

});
/*--------------------------------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpbXBsZVNlYXJjaEN0cmwuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiQ29udHJvbCIsIiRpbml0IiwicGFyZW50Iiwib3duZXIiLCIkc3VwZXIiLCJvblJlYWR5IiwiYW1pV2ViQXBwIiwibG9hZFJlc291cmNlcyIsIm9yaWdpblVSTCIsImNvbnRleHQiLCJkb25lIiwiZGF0YSIsImZyYWdtZW50U2ltcGxlU2VhcmNoIiwidGFiQ3RybCIsInJlbmRlciIsInNlbGVjdG9yIiwic2V0dGluZ3MiLCJyZXN1bHQiLCIkIiwiRGVmZXJyZWQiLCJmbiIsImNhdGFsb2ciLCJlbnRpdHkiLCJmaWVsZCIsInZhbHVlIiwidGV4dFRvU3RyaW5nIiwic2V0dXAiLCJwbGFjZWhvbGRlciIsInNlYXJjaENvbW1hbmRGdW5jIiwiY2FyZCIsImN0eCIsImtleSIsImlzRW1iZWRkZWQiLCJlbmRwb2ludCIsImFtaUNvbW1hbmQiLCJfcmVuZGVyIiwiZ2V0UGFyZW50IiwiJG5hbWUiLCJ0YWIiLCJhcHBlbmRJdGVtIiwiY2xvc2FibGUiLCJmaXJzdFZpc2libGUiLCJzZXRQYXJlbnQiLCJfX3JlbmRlciIsInJlcGxhY2VIVE1MIiwiZGljdCIsInBhdGNoSWQiLCJzdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJ2YWwiLCJ0cmltIiwic2VhcmNoIiwicmVzb2x2ZVdpdGgiLCJjcmVhdGVDb250cm9sSW5Db250YWluZXIiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQVdBO0FBRUFBLFNBQVMsQ0FBQyxrQkFBRCxFQUFxQjtBQUU3QjtBQUVBQyxFQUFBQSxRQUFRLEVBQUVDLEdBQUcsQ0FBQ0MsT0FKZTs7QUFNN0I7QUFFQUMsRUFBQUEsS0FBSyxFQUFFLGVBQVNDLE1BQVQsRUFBaUJDLEtBQWpCLEVBQ1A7QUFDQyxTQUFLQyxNQUFMLENBQVlILEtBQVosQ0FBa0JDLE1BQWxCLEVBQTBCQyxLQUExQjtBQUNBLEdBWDRCOztB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WUFBRzNCLEtBQUgsRUFDQTtBQUNDLFVBQUEsTUFBSSxDQUFDNEIsTUFBTDtBQUNBO0FBQ0QsT0FWRDtBQVlBOztBQUVBbkMsTUFBQUEsTUFBTSxDQUFDb0MsV0FBUCxDQUFtQixNQUFJLENBQUN2QixHQUFMLENBQVNyQixPQUE1QjtBQUVBO0FBQ0EsS0FyQkQ7QUFzQkEsR0F4SjRCOztBQTBKN0I7QUFFQTJDLEVBQUFBLE1BQU0sRUFBRSxnQkFBUzVCLEtBQVQsRUFDUjtBQUNDLFdBQU9sQixTQUFTLENBQUNnRCx3QkFBVixDQUFtQyxLQUFLbEIsU0FBTCxFQUFuQyxFQUFxRCxJQUFyRCxFQUEyRCxPQUEzRCxFQUFvRSxDQUFDLEtBQUtOLEdBQUwsQ0FBU0YsaUJBQVQsQ0FBMkIsS0FBS0UsR0FBTCxDQUFTVCxPQUFwQyxFQUE2QyxLQUFLUyxHQUFMLENBQVNSLE1BQXRELEVBQThELEtBQUtRLEdBQUwsQ0FBU1AsS0FBdkUsRUFBOEVDLEtBQUssQ0FBQzJCLElBQU4sRUFBOUUsQ0FBRCxDQUFwRSxFQUFtSyxFQUFuSyxFQUF1SyxLQUFLckIsR0FBNUssRUFBaUwsT0FBakwsRUFBMEwsS0FBS0EsR0FBTCxDQUFTUixNQUFuTSxDQUFQO0FBQ0E7QUFFRDs7QUFqSzZCLENBQXJCLENBQVQ7QUFvS0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEFNSSBXZWIgRnJhbWV3b3JrXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LVhYWFggVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kQU1JQ2xhc3MoJ1NpbXBsZVNlYXJjaEN0cmwnLCB7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZXh0ZW5kczogYW1pLkNvbnRyb2wsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24ocGFyZW50LCBvd25lcilcblx0e1xuXHRcdHRoaXMuJHN1cGVyLiRpbml0KHBhcmVudCwgb3duZXIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2NvbnRyb2xzL1NpbXBsZVNlYXJjaC90d2lnL1NpbXBsZVNlYXJjaEN0cmwudHdpZycsXG5cdFx0XHQnY3RybDp0YWInLFxuXHRcdF0sIHtjb250ZXh0OiB0aGlzfSkuZG9uZShmdW5jdGlvbihkYXRhKSB7XG5cblx0XHRcdHRoaXMuZnJhZ21lbnRTaW1wbGVTZWFyY2ggPSBkYXRhWzBdO1xuXG5cdFx0XHR0aGlzLnRhYkN0cmwgPSBkYXRhWzFdO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVuZGVyOiBmdW5jdGlvbihzZWxlY3Rvciwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBmbiA9IChjYXRhbG9nLCBlbnRpdHksIGZpZWxkLCB2YWx1ZSkgPT5cblx0XHRcdCdCcm93c2VRdWVyeScgKyAnIC1jYXRhbG9nPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoY2F0YWxvZykgKyAnXCIgLWVudGl0eT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGVudGl0eSkgKyAnXCIgLW1xbD1cIlNFTEVDVCAqIFdIRVJFIGAnICsgZmllbGQgKyAnYCA9IFxcJycgKyB2YWx1ZSsgJ1xcJ1wiJ1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IFtcblx0XHRcdGNvbnRleHQsXG5cdFx0XHRwbGFjZWhvbGRlcixcblx0XHRcdGNhdGFsb2csIGVudGl0eSwgZmllbGQsXG5cdFx0XHRzZWFyY2hDb21tYW5kRnVuYyxcblx0XHRcdGNhcmRcblx0XHRdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0W1xuXHRcdFx0XHQnY29udGV4dCcsXG5cdFx0XHRcdCdwbGFjZWhvbGRlcicsXG5cdFx0XHRcdCdjYXRhbG9nJywgJ2VudGl0eScsICdmaWVsZCcsXG5cdFx0XHRcdCdzZWFyY2hDb21tYW5kRnVuYycsXG5cdFx0XHRcdCdjYXJkJyxcblx0XHRcdF0sXG5cdFx0XHRbXG5cdFx0XHRcdHJlc3VsdCxcblx0XHRcdFx0JycsXG5cdFx0XHRcdCcnLCAnJywgJycsXG5cdFx0XHRcdGZuLFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmN0eCA9IHt9O1xuXG5cdFx0Zm9yKGxldCBrZXkgaW4gc2V0dGluZ3MpXG5cdFx0e1xuXHRcdCAgICB0aGlzLmN0eFtrZXldID0gc2V0dGluZ3Nba2V5XTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmN0eC5pc0VtYmVkZGVkID0gYW1pV2ViQXBwLmlzRW1iZWRkZWQoKTtcblxuXHRcdHRoaXMuY3R4LmVuZHBvaW50ID0gYW1pQ29tbWFuZC5lbmRwb2ludDtcblxuXHRcdHRoaXMuY3R4LmNvbnRleHQgPSBjb250ZXh0O1xuXG5cdFx0dGhpcy5jdHgucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcblxuXHRcdHRoaXMuY3R4LmNhdGFsb2cgPSBjYXRhbG9nO1xuXHRcdHRoaXMuY3R4LmVudGl0eSA9IGVudGl0eTtcblx0XHR0aGlzLmN0eC5maWVsZCA9IGZpZWxkO1xuXG5cdFx0dGhpcy5jdHguc2VhcmNoQ29tbWFuZEZ1bmMgPSBzZWFyY2hDb21tYW5kRnVuYztcblxuXHRcdHRoaXMuY3R4LmNhcmQgPSBjYXJkO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgc2VsZWN0b3IpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9yZW5kZXI6IGZ1bmN0aW9uKHJlc3VsdCwgc2VsZWN0b3IpXG5cdHtcblx0XHRpZih0aGlzLmdldFBhcmVudCgpLiRuYW1lICE9PSAnVGFiQ3RybCcpXG5cdFx0e1xuXHRcdFx0Y29uc3QgdGFiID0gbmV3IHRoaXMudGFiQ3RybChudWxsLCB0aGlzKTtcblxuXHRcdFx0dGFiLnJlbmRlcihzZWxlY3RvciwgdGhpcy5jdHgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdHRhYi5hcHBlbmRJdGVtKCc8aSBjbGFzcz1cImZhIGZhLXNlYXJjaFwiPjwvaT4gJyArIHRoaXMuY3R4LmVudGl0eSwge2Nsb3NhYmxlOiBmYWxzZSwgZmlyc3RWaXNpYmxlOiBmYWxzZX0pLmRvbmUoKHNlbGVjdG9yKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLnNldFBhcmVudCh0YWIpO1xuXG5cdFx0XHRcdFx0dGhpcy5fX3JlbmRlcihyZXN1bHQsIHNlbGVjdG9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRoaXMuX19yZW5kZXIocmVzdWx0LCBzZWxlY3Rvcik7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X19yZW5kZXI6IGZ1bmN0aW9uKHJlc3VsdCwgc2VsZWN0b3IpXG5cdHtcblx0XHR0aGlzLnJlcGxhY2VIVE1MKHNlbGVjdG9yLCB0aGlzLmZyYWdtZW50U2ltcGxlU2VhcmNoLCB7ZGljdDogdGhpcy5jdHh9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjRThGMTUyQjBfNjZDNl8xMzJDXzAxNTVfOTU1RDM2NjU0QzEzJykpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRjb25zdCB2YWx1ZSA9ICQodGhpcy5wYXRjaElkKCcjRjhEOEMyRkJfODFEOV9GN0EwXzEyMUJfNkZCMjk0OUY4REI2JykpLnZhbCgpLnRyaW0oKTtcblxuXHRcdFx0XHRpZih2YWx1ZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuc2VhcmNoKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKHRoaXMuY3R4LmNvbnRleHQpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNlYXJjaDogZnVuY3Rpb24odmFsdWUpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lcih0aGlzLmdldFBhcmVudCgpLCB0aGlzLCAndGFibGUnLCBbdGhpcy5jdHguc2VhcmNoQ29tbWFuZEZ1bmModGhpcy5jdHguY2F0YWxvZywgdGhpcy5jdHguZW50aXR5LCB0aGlzLmN0eC5maWVsZCwgdmFsdWUudHJpbSgpKV0sIHt9LCB0aGlzLmN0eCwgJ3RhYmxlJywgdGhpcy5jdHguZW50aXR5KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
