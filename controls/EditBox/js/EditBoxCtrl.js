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
$AMIClass('EditBoxCtrl', {
  /*---------------------------------------------------------------------*/
  $extends: ami.Control,

  /*---------------------------------------------------------------------*/
  $init: function $init(parent, owner) {
    this.$super.$init(parent, owner);
  },

  /*---------------------------------------------------------------------*/
  onReady: function onReady() {
    var _this = this;

    return amiWebApp.loadResources([amiWebApp.originURL + '/controls/EditBox/twig/EditBoxCtrl.twig', amiWebApp.originURL + '/js/3rd-party/clipboard.min.js']).done(function (data) {
      amiWebApp.appendHTML('body', data[0]).done(function () {
        var _class = _this.$class;
        /*---------------------------------------------------------*/

        $('#F9BC65C1_07EB_2F56_E152_9B76DB218F10').on('hidden.bs.modal', function () {
          //$('#F9BC65C1_07EB_2F56_E152_9B76DB218F10').modal('hide');
          _class.deferred.rejectWith(_class.context || _class.deferred, [$('#F9BC65C1_07EB_2F56_E152_9B76DB218F10 textarea').val()]);
        });
        /*---------------------------------------------------------*/

        $('#CB99273A_B731_0289_8D87_D0549A1944FB').on(
        /*-*/
        'click'
        /*-*/
        , function () {
          $('#F9BC65C1_07EB_2F56_E152_9B76DB218F10').modal('hide');

          _class.deferred.resolveWith(_class.context || _class.deferred, [$('#F9BC65C1_07EB_2F56_E152_9B76DB218F10 textarea').val()]);
        });
        /*---------------------------------------------------------*/

        new ClipboardJS('#F9BC65C1_07EB_2F56_E152_9B76DB218F10 .btn[data-clipboard-target]');
        /*---------------------------------------------------------*/
      });
    });
  },

  /*---------------------------------------------------------------------*/
  show: function show(text, settings) {
    var deferred = $.Deferred();
    /*-----------------------------------------------------------------*/

    var _amiWebApp$setup = amiWebApp.setup(['context', 'title'], [deferred, 'Edit box'], settings),
        context = _amiWebApp$setup[0],
        title = _amiWebApp$setup[1];
    /*-----------------------------------------------------------------*/


    $('#D042A24A_4F19_BEF9_A843_15391EAD26A1').html(title);
    $('#F9BC65C1_07EB_2F56_E152_9B76DB218F10 textarea').val(text || '');
    $('#F9BC65C1_07EB_2F56_E152_9B76DB218F10').modal('show');
    this.$class.deferred = deferred;
    this.$class.context = context;
    /*-----------------------------------------------------------------*/

    return deferred.promise();
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  render: function render(text, settings) {
    return this.show(text, settings);
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/
