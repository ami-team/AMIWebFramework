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
	/*-----------------------------------------------------------------*/

	$implements: [ami.SubApp],

	/*-----------------------------------------------------------------*/

	onReady: function(userdata)
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/TableViewer/twig/TableViewerApp.twig',
			'ctrl:tab',
			'ctrl:table',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this}).done(function() {

				this.tab = new data[1];
				this.table = new data[2];

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

					this.catalog = json.catalog;
					this.entity = json.entity;

					this.tab.appendTab(this.catalog + '.' + this.entity, {context: this}).done(function(sel) {

						this._1stTabSel = sel;

						result.resolve();
					});
				});
			});

		}).fail(function(data) {

			result.reject(data);
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
		this.table.render(this._1stTabSel, 'SearchQuery -catalog="' + this.catalog + '" -entity="' + this.entity + '" -mql="SELECT `*`"', {canEdit: true, catalog: this.catalog, entity: this.entity, primaryField: 'id', start: 1, stop: 20});

		$('#A2944C0A_9249_E4D2_3679_494C1A3AAAF0').show();
	},

	/*-----------------------------------------------------------------*/

	onLogout: function()
	{
		$('#A2944C0A_9249_E4D2_3679_494C1A3AAAF0').hide();
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

var tableViewerApp = new TableViewerApp();

/*-------------------------------------------------------------------------*/
