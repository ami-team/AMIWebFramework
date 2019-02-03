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

$AMIClass('TableViewerApp', {
	/*---------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*---------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/TableViewer/twig/TableViewerApp.twig',
			'ctrl:tab',
			'ctrl:table',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this}).done(function() {

				this.tab = new data[1](((this)));
				this.table = new data[2](this.tab);

				this.tab.render('#A2944C0A_9249_E4D2_3679_494C1A3AAAF0', {context: this}).done(function() {

					var json;

					try
					{
						json = JSON.parse(userdata || '{}');
					}
					catch(e)
					{
						json = {/*----------------------*/};
					}

					this.catalog = json.catalog || '';
					this.entity = json.entity || '';
					this.expression = json.expression || '1=1';
					this.primaryField = json.primaryField || '';

					this.tab.appendItem(this.entity, {context: this}).done(function(tabSel) {

						this.tabSel = tabSel;

						result.resolve();
					});
				});
			});

		}).fail(function(data) {

			result.reject(data);
		});

		return result;
	},

	/*---------------------------------------------------------------------*/

	onLogin: function()
	{
		this.table.render(this.tabSel, 'SearchQuery -catalog="' + amiWebApp.textToString(this.catalog) + '" -entity="' + amiWebApp.textToString(this.entity) + '" -mql="SELECT `*` WHERE ' + this.expression + '"', {showDetails: true, canEdit: amiLogin.hasRole('AMI_ADMIN'), catalog: this.catalog, entity: this.entity, primaryField: this.primaryField, start: 1, stop: 20});

		$('#A2944C0A_9249_E4D2_3679_494C1A3AAAF0').show();
	},

	/*---------------------------------------------------------------------*/

	onLogout: function()
	{
		$('#A2944C0A_9249_E4D2_3679_494C1A3AAAF0').hide();
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

var tableViewerApp = new TableViewerApp();

/*-------------------------------------------------------------------------*/
