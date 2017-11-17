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
	/*-----------------------------------------------------------------*/

	$extends: ami.Control,

	/*-----------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);
	},

	/*-----------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/SimpleSearch/twig/SimpleSearchCtrl.twig',
			'ctrl:table',
		], {context: this}).done(function(data) {

			this.fragmentSimpleSearch = data[0];

			this._tableCtrl = data[1];
		});
	},

	/*-----------------------------------------------------------------*/

	render: function(selector, settings)
	{
		this.command = '';

		this.param = '';

		this.entity = '';

		if(this._settings = settings)
		{
			if('command' in settings) {
				this.command = settings['command'];
			}

		 	if('param' in settings) {
				this.param = settings['param'];
		 	}

			if('entity' in settings) {
				this.entity = settings['entity'];
			}
		}

		/*---------------------------------------------------------*/		

		var _this = this;

		return this.replaceHTML(selector, this.fragmentSimpleSearch, settings).done(function() {

			$(_this.patchId('#E8F152B0_66C6_132C_0155_955D36654C13')).submit(function(e) {

				e.preventDefault();

				_this._search();
			});
		});

		/*---------------------------------------------------------*/		
	},

	/*-----------------------------------------------------------------*/

	_search: function()
	{
		/*---------------------------------------------------------*/

		var command = this.command + ' -' + this.param + '="' + amiWebApp.textToString($(this.patchId('#F8D8C2FB_81D9_F7A0_121B_6FB2949F8DB6')).val()) + '"';

		/*---------------------------------------------------------*/

		var parent = this.getParent();

		if(parent.$name === 'TabCtrl')
		{
			parent.appendTab(this.entity ? this.entity : 'result', {context: this}).done(function(selector) {

				new this._tableCtrl(parent, this).render(selector, command, this._settings);
			});
		}
		else
		{
			amiWebApp.error('could not create a new tab', true);
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
