/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global ClipboardJS
 *
 */

/*-------------------------------------------------------------------------*/
$AMIClass('MessageBoxCtrl', {
  /*---------------------------------------------------------------------*/
  $extends: ami.Control,

  /*---------------------------------------------------------------------*/
  $init: function $init(parent, owner) {
    this.$super.$init(parent, owner);
  },

  /*---------------------------------------------------------------------*/
  onReady: function onReady() {
    var _this = this;

    return amiWebApp.loadResources([amiWebApp.originURL + '/controls/MessageBox/twig/MessageBoxCtrl.twig', amiWebApp.originURL + '/js/3rd-party/clipboard.min.js']).done(function (data) {
      amiWebApp.appendHTML('body', data[0]).done(function () {
        var _class = _this.$class;
        /*---------------------------------------------------------*/

        $('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548').on('hidden.bs.modal', function () {
          _class.deferred.resolveWith(_class.context || _class.deferred);
        });
        /*---------------------------------------------------------*/

        new ClipboardJS('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548 .btn[data-clipboard-target]');
        /*---------------------------------------------------------*/
      });
    });
  },

  /*---------------------------------------------------------------------*/
  render: function render(text, settings) {
    var deferred = $.Deferred();
    /*-----------------------------------------------------------------*/

    var _amiWebApp$setup = amiWebApp.setup(['context', 'title'], [deferred, 'Edit box'], settings),
        context = _amiWebApp$setup[0],
        title = _amiWebApp$setup[1];
    /*-----------------------------------------------------------------*/


    amiWebApp.unlock();
    $('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548 .modal-body').text(text || '');
    $('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548').modal('show');
    this.$class.deferred = deferred;
    this.$class.context = context;
    /*-----------------------------------------------------------------*/

    return deferred.promise();
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  show: function show(text, settings) {
    return this.render(text, settings);
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/
//# sourceMappingURL=MessageBoxCtrl.js.map
