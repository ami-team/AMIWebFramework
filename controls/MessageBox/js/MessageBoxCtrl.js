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
    return amiWebApp.loadResources([amiWebApp.originURL + '/controls/MessageBox/twig/MessageBoxCtrl.twig', amiWebApp.originURL + '/js/3rd-party/clipboard.min.js']).done(function (data) {
      amiWebApp.appendHTML('body', data[0]).done(function () {
        new ClipboardJS('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548 .btn[data-clipboard-target]');
      });
    });
  },

  /*---------------------------------------------------------------------*/
  show: function show(text) {
    $('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548 .modal-body').text(text || '');
    $('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548').modal('show');
  },

  /*---------------------------------------------------------------------*/
  render: function render(text) {
    $('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548 .modal-body').text(text || '');
    $('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548').modal('show');
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/
