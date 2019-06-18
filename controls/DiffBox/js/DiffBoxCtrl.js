/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global diff_match_patch
 *
 */

/*-------------------------------------------------------------------------*/
$AMIClass('DiffBoxCtrl', {
  /*---------------------------------------------------------------------*/
  $extends: ami.Control,

  /*---------------------------------------------------------------------*/
  $init: function $init(parent, owner) {
    this.$super.$init(parent, owner);
  },

  /*---------------------------------------------------------------------*/
  onReady: function onReady() {
    var _this = this;

    return amiWebApp.loadResources([amiWebApp.originURL + '/controls/DiffBox/twig/DiffBoxCtrl.twig', amiWebApp.originURL + '/js/3rd-party/diff_match_patch.min.js']).done(function (data) {
      amiWebApp.appendHTML('body', data[0]).done(function () {
        var _class = _this.$class;
        /*---------------------------------------------------------*/

        $('#B8D42DF0_0D25_C818_1438_5BAD52BB9E0B').on('hidden.bs.modal', function () {
          _class.deferred.resolveWith(_class.context || _class.deferred);
        });
        /*---------------------------------------------------------*/

        _this.dmp = new diff_match_patch();
        /*---------------------------------------------------------*/
      });
    });
  },

  /*---------------------------------------------------------------------*/
  render: function render(text1, text3, settings) {
    var deferred = $.Deferred();
    /*-----------------------------------------------------------------*/

    var _amiWebApp$setup = amiWebApp.setup(['context', 'title'], [deferred, 'Edit box'], settings),
        context = _amiWebApp$setup[0],
        title = _amiWebApp$setup[1];
    /*-----------------------------------------------------------------*/


    var d = this.dmp.diff_main(text1, text3);
    this.dmp.diff_cleanupEfficiency(d);
    /*-----------------------------------------------------------------*/

    var html1 = '<i class="line-number"></i>' + amiWebApp.textToHtml(text1).replace(/\n/g, '\n<i class="line-number"></i>');
    $('#E94A7FE7_FEBC_AE12_0C13_E625FC2ADFE6').html(html1);
    /*-----------------------------------------------------------------*/

    var html2 = '<i class="line-number"></i>' + this.dmp.diff_prettyHtml(d).replace(/\n/g, '\n<i class="line-number"></i>');
    $('#AF0BD692_6F09_4527_2684_AAF623658767').html(html2);
    /*-----------------------------------------------------------------*/

    var html3 = '<i class="line-number"></i>' + amiWebApp.textToHtml(text3).replace(/\n/g, '\n<i class="line-number"></i>');
    $('#C604C636_346F_64A8_3EBE_ADCDE2AEB343').html(html3);
    /*-----------------------------------------------------------------*/

    amiWebApp.unlock();
    $('#B8D42DF0_0D25_C818_1438_5BAD52BB9E0B').modal('show');
    this.$class.deferred = deferred;
    this.$class.context = context;
    /*-----------------------------------------------------------------*/

    return deferred.promise();
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  show: function show(text1, text3, settings) {
    return this.render(text1, text3, settings);
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/
//# sourceMappingURL=DiffBoxCtrl.js.map
