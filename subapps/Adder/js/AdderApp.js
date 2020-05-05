/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('AdderApp', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function(userdata)
	{
        if(userdata)
        {
            this.qId = [];

            userdata.split(',').forEach((item) => {

                 this.qId.push(item.trim());

            });
        }

		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/Adder/css/AdderApp.css',
			'subapps/Adder/twig/AdderApp.twig',
			'ctrl:adder'
		], {context: this}).done(function(data) {

		    this.adderCtrl = data[2];

			amiWebApp.replaceHTML('#ami_main_content', data[1], {context: this}).done(function() {

				result.resolve();
			});

		}).fail(function(data) {

			result.reject(data);
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onExit: function()
	{
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function()
	{
        const result = $.Deferred();

        var enable = amiLogin.hasRole('AMI_ADMIN') === true || amiLogin.hasRole('AMI_WRITER') === true;

        if(enable)
        {
            if(this.qId)
            {
                const catalog = this.qId[0];
                const entity = this.qId[1];
                const field = this.qId[2];

                const adder = new this.adderCtrl();

                adder.render('#C9BBC18B_2959_A48E_9059_9FC08D667935',{catalog: catalog, entity:entity, field: field}).done(function() {

                    result.resolve();

                }).fail(function(message) {

                    result.reject(message);
                });
            }
            else
            {
                result.reject('Missing parameters');
            }
        }
        else
        {
            $('#C9BBC18B_2959_A48E_9059_9FC08D667935').empty();
        }
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function()
	{
	    $('#C9BBC18B_2959_A48E_9059_9FC08D667935').empty();
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

var adderApp = new AdderApp();

/*--------------------------------------------------------------------------------------------------------------------*/
