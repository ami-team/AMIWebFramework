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
    return new this.tableCtrl(parent, this).render(selector, this.ctx.searchCommandFunc(this.ctx.catalog, this.ctx.entity, this.ctx.field), this.ctx);
  }
  /*----------------------------------------------------------------------------------------------------------------*/

});
/*--------------------------------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpbXBsZVNlYXJjaEN0cmwuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiQ29udHJvbCIsIiRpbml0IiwicGFyZW50Iiwib3duZXIiLCIkc3VwZXIiLCJvblJlYWR5IiwiYW1pV2ViQXBwIiwibG9hZFJlc291cmNlcyIsIm9yaWdpblVSTCIsImNvbnRleHQiLCJkb25lIiwiZGF0YSIsImZyYWdtZW50U2ltcGxlU2VhcmNoIiwidGFibGVDdHJsIiwidGFiQ3RybCIsInJlbmRlciIsInNlbGVjdG9yIiwic2V0dGluZ3MiLCJyZXN1bHQiLCIkIiwiRGVmZXJyZWQiLCJmbiIsImNhdGFsb2ciLCJlbnRpdHkiLCJmaWVsZCIsInZhbHVlIiwidGV4dFRvU3RyaW5nIiwic2V0dXAiLCJzZWFyY2hDb21tYW5kRnVuYyIsImNhcmQiLCJjdHgiLCJrZXkiLCJpc0VtYmVkZGVkIiwiZW5kcG9pbnQiLCJhbWlDb21tYW5kIiwiX3JlbmRlciIsImdldFBhcmVudCIsIiRuYW1lIiwidGFiIiwiYXBwZW5kSXRlbSIsImNsb3NhYmxlIiwiZmlyc3RWaXNpYmxlIiwic2V0UGFyZW50IiwiX19yZW5kZXIiLCJyZXBsYWNlSFRNTCIsInBhdGNoSWQiLCJzdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJzZWFyY2giLCJyZXNvbHZlV2l0aCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBV0E7QUFFQUEsU0FBUyxDQUFDLGtCQUFELEVBQXFCO0FBRTdCO0FBRUFDLEVBQUFBLFFBQVEsRUFBRUMsR0FBRyxDQUFDQyxPQUplOztBQU03QjtBQUVBQyxFQUFBQSxLQUFLLEVBQUUsZUFBU0MsTUFBVCxFQUFpQkMsS0FBakIsRUFDUDtBQUNDLFNBQUtDLE1BQUwsQ0FBWUgsS0FBWixDQUFrQkMsTUFBbEIsRUFBMEJDLEtBQTFCO0FBQ0EsR0FYNEI7O0FBYTdCO0FBRUFFLEVBQUFBLE9BQU8sRUFBRSxtQkFDVDtBQUNDLFdBQU9DLFNBQVMsQ0FBQ0MsYUFBVixDQUF3QixDQUM5QkQsU0FBUyxDQUFDRSxTQUFWLEdBQXNCLG1EQURRLEVBRTlCLFlBRjhCLEVBRzlCLFVBSDhCLENBQXhCLEVBSUo7QUFBQ0MsTUFBQUEsT0FBTyxFQUFFO0FBQVYsS0FKSSxFQUlhQyxJQUpiLENBSWtCLFVBQVNDLElBQVQsRUFBZTtBQUV2QyxXQUFLQyxvQkFBTCxHQUE0QkQsSUFBSSxDQUFDLENBQUQsQ0FBaEM7QUFFQSxXQUFLRSxTQUFMLEdBQWlCRixJQUFJLENBQUMsQ0FBRCxDQUFyQjtBQUNBLFdBQUtHLE9BQUwsR0FBZUgsSUFBSSxDQUFDLENBQUQsQ0FBbkI7QUFDQSxLQVZNLENBQVA7QUFXQSxHQTVCNEI7O0FBOEI3QjtBQUVBSSxFQUFBQSxNQUFNLEVBQUUsZ0JBQVNDLFFBQVQsRUFBbUJDLFFBQW5CLEVBQ1I7QUFDQyxRQUFNQyxNQUFNLEdBQUdDLENBQUMsQ0FBQ0MsUUFBRixFQUFmO0FBRUE7O0FBRUEsUUFBTUMsRUFBRSxHQUFHLFNBQUxBLEVBQUssQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQWtCQyxLQUFsQixFQUF5QkMsS0FBekI7QUFBQSxhQUNWLGdCQUFnQixhQUFoQixHQUFnQ25CLFNBQVMsQ0FBQ29CLFlBQVYsQ0FBdUJKLE9BQXZCLENBQWhDLEdBQWtFLGFBQWxFLEdBQWtGaEIsU0FBUyxDQUFDb0IsWUFBVixDQUF1QkgsTUFBdkIsQ0FBbEYsR0FBbUgsMEJBQW5ILEdBQWdKQyxLQUFoSixHQUF3SixRQUF4SixHQUFtS0MsS0FBbkssR0FBMEssS0FEaEs7QUFBQSxLQUFYO0FBSUE7OztBQVRELDJCQWdCS25CLFNBQVMsQ0FBQ3FCLEtBQVYsQ0FDSCxDQUNDLFNBREQsRUFFQyxTQUZELEVBRVksUUFGWixFQUVzQixPQUZ0QixFQUdDLG1CQUhELEVBSUMsTUFKRCxDQURHLEVBT0gsQ0FDQ1QsTUFERCxFQUVDLEVBRkQsRUFFSyxFQUZMLEVBRVMsRUFGVCxFQUdDRyxFQUhELEVBSUMsS0FKRCxDQVBHLEVBYUhKLFFBYkcsQ0FoQkw7QUFBQSxRQVlFUixPQVpGO0FBQUEsUUFhRWEsT0FiRjtBQUFBLFFBYVdDLE1BYlg7QUFBQSxRQWFtQkMsS0FibkI7QUFBQSxRQWNFSSxpQkFkRjtBQUFBLFFBZUVDLElBZkY7QUFnQ0M7OztBQUVBLFNBQUtDLEdBQUwsR0FBVyxFQUFYOztBQUVBLFNBQUksSUFBSUMsR0FBUixJQUFlZCxRQUFmLEVBQ0E7QUFDSSxXQUFLYSxHQUFMLENBQVNDLEdBQVQsSUFBZ0JkLFFBQVEsQ0FBQ2MsR0FBRCxDQUF4QjtBQUNIO0FBRUQ7OztBQUVBLFNBQUtELEdBQUwsQ0FBU0UsVUFBVCxHQUFzQjFCLFNBQVMsQ0FBQzBCLFVBQVYsRUFBdEI7QUFFQSxTQUFLRixHQUFMLENBQVNHLFFBQVQsR0FBb0JDLFVBQVUsQ0FBQ0QsUUFBL0I7QUFFQSxTQUFLSCxHQUFMLENBQVNyQixPQUFULEdBQW1CQSxPQUFuQjtBQUVBLFNBQUtxQixHQUFMLENBQVNSLE9BQVQsR0FBbUJBLE9BQW5CO0FBQ0EsU0FBS1EsR0FBTCxDQUFTUCxNQUFULEdBQWtCQSxNQUFsQjtBQUNBLFNBQUtPLEdBQUwsQ0FBU04sS0FBVCxHQUFpQkEsS0FBakI7QUFFQSxTQUFLTSxHQUFMLENBQVNGLGlCQUFULEdBQTZCQSxpQkFBN0I7QUFFQSxTQUFLRSxHQUFMLENBQVNELElBQVQsR0FBZ0JBLElBQWhCO0FBRUE7O0FBRUEsU0FBS00sT0FBTCxDQUFhakIsTUFBYixFQUFxQkYsUUFBckI7QUFFQTs7O0FBRUEsV0FBT0UsTUFBUDtBQUNBLEdBakc0Qjs7QUFtRzdCO0FBRUFpQixFQUFBQSxPQUFPLEVBQUUsaUJBQVNqQixNQUFULEVBQWlCRixRQUFqQixFQUNUO0FBQUE7O0FBQ0MsUUFBRyxLQUFLb0IsU0FBTCxHQUFpQkMsS0FBakIsS0FBMkIsU0FBOUIsRUFDQTtBQUNDLFVBQU1DLEdBQUcsR0FBRyxJQUFJLEtBQUt4QixPQUFULENBQWlCLElBQWpCLEVBQXVCLElBQXZCLENBQVo7QUFFQXdCLE1BQUFBLEdBQUcsQ0FBQ3ZCLE1BQUosQ0FBV0MsUUFBWCxFQUFxQixLQUFLYyxHQUExQixFQUErQnBCLElBQS9CLENBQW9DLFlBQU07QUFFekM0QixRQUFBQSxHQUFHLENBQUNDLFVBQUosQ0FBZSxpQ0FBaUMsS0FBSSxDQUFDVCxHQUFMLENBQVNQLE1BQXpELEVBQWlFO0FBQUNpQixVQUFBQSxRQUFRLEVBQUUsS0FBWDtBQUFrQkMsVUFBQUEsWUFBWSxFQUFFO0FBQWhDLFNBQWpFLEVBQXlHL0IsSUFBekcsQ0FBOEcsVUFBQ00sUUFBRCxFQUFjO0FBRTNILFVBQUEsS0FBSSxDQUFDMEIsU0FBTCxDQUFlSixHQUFmOztBQUVBLFVBQUEsS0FBSSxDQUFDSyxRQUFMLENBQWN6QixNQUFkLEVBQXNCRixRQUF0QjtBQUNBLFNBTEQ7QUFNQSxPQVJEO0FBU0EsS0FiRCxNQWVBO0FBQ0MsV0FBSzJCLFFBQUwsQ0FBY3pCLE1BQWQsRUFBc0JGLFFBQXRCO0FBQ0E7QUFDRCxHQXpINEI7O0FBMkg3QjtBQUVBMkIsRUFBQUEsUUFBUSxFQUFFLGtCQUFTekIsTUFBVCxFQUFpQkYsUUFBakIsRUFDVjtBQUFBOztBQUNDLFNBQUs0QixXQUFMLENBQWlCNUIsUUFBakIsRUFBMkIsS0FBS0osb0JBQWhDLEVBQXNESyxRQUF0RCxFQUFnRVAsSUFBaEUsQ0FBcUUsWUFBTTtBQUUxRTtBQUVBUyxNQUFBQSxDQUFDLENBQUMsTUFBSSxDQUFDMEIsT0FBTCxDQUFhLHVDQUFiLENBQUQsQ0FBRCxDQUF5REMsTUFBekQsQ0FBZ0UsVUFBQ0MsQ0FBRCxFQUFPO0FBRXRFQSxRQUFBQSxDQUFDLENBQUNDLGNBQUY7O0FBRUEsUUFBQSxNQUFJLENBQUNDLE1BQUw7QUFDQSxPQUxEO0FBT0E7O0FBRUEvQixNQUFBQSxNQUFNLENBQUNnQyxXQUFQLENBQW1CLE1BQUksQ0FBQ3BCLEdBQUwsQ0FBU3JCLE9BQTVCO0FBRUE7QUFDQSxLQWhCRDtBQWlCQSxHQWhKNEI7O0FBa0o3QjtBQUVBd0MsRUFBQUEsTUFBTSxFQUFFLGtCQUNSO0FBQ0MsV0FBTyxJQUFJLEtBQUtwQyxTQUFULENBQW1CWCxNQUFuQixFQUEyQixJQUEzQixFQUFpQ2EsTUFBakMsQ0FBd0NDLFFBQXhDLEVBQWtELEtBQUtjLEdBQUwsQ0FBU0YsaUJBQVQsQ0FBMkIsS0FBS0UsR0FBTCxDQUFTUixPQUFwQyxFQUE2QyxLQUFLUSxHQUFMLENBQVNQLE1BQXRELEVBQThELEtBQUtPLEdBQUwsQ0FBU04sS0FBdkUsQ0FBbEQsRUFBaUksS0FBS00sR0FBdEksQ0FBUDtBQUNBO0FBRUQ7O0FBeko2QixDQUFyQixDQUFUO0FBNEpBIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29ya1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1YWFhYIFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSUNsYXNzKCdTaW1wbGVTZWFyY2hDdHJsJywge1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGV4dGVuZHM6IGFtaS5Db250cm9sLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIpXG5cdHtcblx0XHR0aGlzLiRzdXBlci4kaW5pdChwYXJlbnQsIG93bmVyKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9TaW1wbGVTZWFyY2gvdHdpZy9TaW1wbGVTZWFyY2hDdHJsLnR3aWcnLFxuXHRcdFx0J2N0cmw6dGFibGUnLFxuXHRcdFx0J2N0cmw6dGFiJyxcblx0XHRdLCB7Y29udGV4dDogdGhpc30pLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuXG5cdFx0XHR0aGlzLmZyYWdtZW50U2ltcGxlU2VhcmNoID0gZGF0YVswXTtcblxuXHRcdFx0dGhpcy50YWJsZUN0cmwgPSBkYXRhWzFdO1xuXHRcdFx0dGhpcy50YWJDdHJsID0gZGF0YVsyXTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oc2VsZWN0b3IsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZm4gPSAoY2F0YWxvZywgZW50aXR5LCBmaWVsZCwgdmFsdWUpID0+XG5cdFx0XHQnQnJvd3NlUXVlcnknICsgJyAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGNhdGFsb2cpICsgJ1wiIC1lbnRpdHk9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhlbnRpdHkpICsgJ1wiIC1tcWw9XCJTRUxFQ1QgKiBXSEVSRSBgJyArIGZpZWxkICsgJ2AgPSBcXCcnICsgdmFsdWUrICdcXCdcIidcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBbXG5cdFx0XHRjb250ZXh0LFxuXHRcdFx0Y2F0YWxvZywgZW50aXR5LCBmaWVsZCxcblx0XHRcdHNlYXJjaENvbW1hbmRGdW5jLFxuXHRcdFx0Y2FyZFxuXHRcdF0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbXG5cdFx0XHRcdCdjb250ZXh0Jyxcblx0XHRcdFx0J2NhdGFsb2cnLCAnZW50aXR5JywgJ2ZpZWxkJyxcblx0XHRcdFx0J3NlYXJjaENvbW1hbmRGdW5jJyxcblx0XHRcdFx0J2NhcmQnLFxuXHRcdFx0XSxcblx0XHRcdFtcblx0XHRcdFx0cmVzdWx0LFxuXHRcdFx0XHQnJywgJycsICcnLFxuXHRcdFx0XHRmbixcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5jdHggPSB7fTtcblxuXHRcdGZvcihsZXQga2V5IGluIHNldHRpbmdzKVxuXHRcdHtcblx0XHQgICAgdGhpcy5jdHhba2V5XSA9IHNldHRpbmdzW2tleV07XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5jdHguaXNFbWJlZGRlZCA9IGFtaVdlYkFwcC5pc0VtYmVkZGVkKCk7XG5cblx0XHR0aGlzLmN0eC5lbmRwb2ludCA9IGFtaUNvbW1hbmQuZW5kcG9pbnQ7XG5cblx0XHR0aGlzLmN0eC5jb250ZXh0ID0gY29udGV4dDtcblxuXHRcdHRoaXMuY3R4LmNhdGFsb2cgPSBjYXRhbG9nO1xuXHRcdHRoaXMuY3R4LmVudGl0eSA9IGVudGl0eTtcblx0XHR0aGlzLmN0eC5maWVsZCA9IGZpZWxkO1xuXG5cdFx0dGhpcy5jdHguc2VhcmNoQ29tbWFuZEZ1bmMgPSBzZWFyY2hDb21tYW5kRnVuYztcblxuXHRcdHRoaXMuY3R4LmNhcmQgPSBjYXJkO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgc2VsZWN0b3IpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9yZW5kZXI6IGZ1bmN0aW9uKHJlc3VsdCwgc2VsZWN0b3IpXG5cdHtcblx0XHRpZih0aGlzLmdldFBhcmVudCgpLiRuYW1lICE9PSAnVGFiQ3RybCcpXG5cdFx0e1xuXHRcdFx0Y29uc3QgdGFiID0gbmV3IHRoaXMudGFiQ3RybChudWxsLCB0aGlzKTtcblxuXHRcdFx0dGFiLnJlbmRlcihzZWxlY3RvciwgdGhpcy5jdHgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdHRhYi5hcHBlbmRJdGVtKCc8aSBjbGFzcz1cImZhIGZhLXRhYmxlXCI+PC9pPiAnICsgdGhpcy5jdHguZW50aXR5LCB7Y2xvc2FibGU6IGZhbHNlLCBmaXJzdFZpc2libGU6IGZhbHNlfSkuZG9uZSgoc2VsZWN0b3IpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuc2V0UGFyZW50KHRhYik7XG5cblx0XHRcdFx0XHR0aGlzLl9fcmVuZGVyKHJlc3VsdCwgc2VsZWN0b3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhpcy5fX3JlbmRlcihyZXN1bHQsIHNlbGVjdG9yKTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfX3JlbmRlcjogZnVuY3Rpb24ocmVzdWx0LCBzZWxlY3Rvcilcblx0e1xuXHRcdHRoaXMucmVwbGFjZUhUTUwoc2VsZWN0b3IsIHRoaXMuZnJhZ21lbnRTaW1wbGVTZWFyY2gsIHNldHRpbmdzKS5kb25lKCgpID0+IHtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjRThGMTUyQjBfNjZDNl8xMzJDXzAxNTVfOTU1RDM2NjU0QzEzJykpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHR0aGlzLnNlYXJjaCgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgodGhpcy5jdHguY29udGV4dCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2VhcmNoOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gbmV3IHRoaXMudGFibGVDdHJsKHBhcmVudCwgdGhpcykucmVuZGVyKHNlbGVjdG9yLCB0aGlzLmN0eC5zZWFyY2hDb21tYW5kRnVuYyh0aGlzLmN0eC5jYXRhbG9nLCB0aGlzLmN0eC5lbnRpdHksIHRoaXMuY3R4LmZpZWxkKSwgdGhpcy5jdHgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iXX0=
