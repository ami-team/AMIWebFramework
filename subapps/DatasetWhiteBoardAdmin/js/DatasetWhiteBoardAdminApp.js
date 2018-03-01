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

$AMIClass('DatasetWhiteBoardAdminApp', {
	/*-----------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*-----------------------------------------------------------------*/

	onReady: function(userdata)
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/DatasetWhiteBoardAdmin/twig/DatasetWhiteBoardAdminApp.twig',
			'subapps/DatasetWhiteBoardAdmin/css/DatasetWhiteBoardAdminApp.css',
			'subapps/DatasetWhiteBoardAdmin/twig/AMIAdmin.twig',
			'subapps/DatasetWhiteBoardAdmin/twig/fragment/groupsFragment.twig',
			'subapps/DatasetWhiteBoardAdmin/twig/fragment/themesFragment.twig',
			'ctrl:tab',
			'ctrl:table',

		], {context: this}).done(function(data) {

			this.fragAMIadmin = data[2];
			this.fragGroups = data[3];
			this.fragThemes = data[4];
			this._tab = new data[5];
			this._tableCtrl = new data[6];

			var dict = {
				groupAdmin: true,
				AMI_Dataset_WB_Admin: true,
				AMIAdmin: true,
			};

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this, dict: dict}).done(function() {

				var _this = this;

				$('#E42E33EE_5420_0DA4_D737_BB08AF646167').click(function(e) {

					e.preventDefault();

						_this._search();
				});

				$(document).keypress(function(e){
					if( e.keyCode == 13 )
					{
						_this._search();
					}
				});

				result.resolve();
			});

			/*---------------------------------------------------------*/


			var _this = this;

			this._tab.render('#F31AF596_6CC5_3C55_DC09_7C6B1DE2D9B6');

			this._tab.appendItem('Groups List').done(function(sel){

				$(sel).append("RRTTTTTTTT");

			})

			return result;

		}).fail(function(data) {

			result.reject(data);

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);

		});

		/*---------------------------------------------------------*/

	},

	/*-----------------------------------------------------------------*/

	_search: function()
	{
		var result = $.Deferred();

		var _this = this;

		var search = "'%" + amiWebApp.textToString($('#DC47F2CE_14D4_B402_55F6_97A3A7FEBD38').val()) + "%'";

		this.command = 'SearchQuery -sql="select AMILOGIN, FIRSTNAME, LASTNAME, CLIENTDN, ISSUERND, USERID,ISADMIN, AMILOGIN as AMILOGIN2 from users where amiLogin like ' + search + '" -project="DatasetWB" -processingStep="production"';

		amiCommand.execute(this.command, {context: this}).done(function(data){

			var rows = amiWebApp.jspath('..row', data);

			var dict = {
				rows: rows,
				search: amiWebApp.textToString($('#DC47F2CE_14D4_B402_55F6_97A3A7FEBD38').val()),
			}

			amiWebApp.replaceHTML('#D54A443F_9434_DC93_F281_8DB9B8CF336B', this.fragAMIadmin, {context: this, dict: dict});

			result.resolve();

		}).fail(function(data){

			result.reject(data);

		});
	},

	/*-----------------------------------------------------------------*/

	addRoleAdmin: function(amiLogin)
	{

		var result = $.Deferred();

		var commandAddRole = "AddUserRole -amiLogin='"+amiLogin+"' -roleName='AMI_DatasetWB_Admin'";

		amiWebApp.lock();

		amiCommand.execute(commandAddRole, {context: this}).done(function(){

			alert("Commande Add: "+commandAddRole);

			result.resolve();

			amiWebApp.unlock();

		}).fail(function(data) {

			result.reject(data);

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);

		});
	},

	/*-----------------------------------------------------------------*/

	removeRoleAdmin: function(amiLogin)
	{

		var result = $.Deferred();

		var commandRemoveRole = "RemoveUserRole -amiLogin='"+amiLogin+"' -roleName='AMI_DatasetWB_Admin'";

		amiWebApp.lock();

		amiCommand.execute(commandRemoveRole, {context: this}).done(function(){

			alert("Commande Remove: "+commandRemoveRole);

			result.resolve();

			amiWebApp.unlock();

		}).fail(function(data) {

			result.reject(data);

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);

		});
	},

	/*-----------------------------------------------------------------*/

	actionAdmin: function(amiLogin, userid)
	{

		var state = $('#C05B8BBC_B1E1_F19B_102C_2BF6FBC33A37_' + userid).prop('checked');

		if(state){
			this.addRoleAdmin(amiLogin);

		} else {
			this.removeRoleAdmin(amiLogin);
		}

	},

	/*-----------------------------------------------------------------*/

	listAllGroups: function()
	{

		var result = $.Deferred();

		amiCommand.execute('AMIDatasetWBListGroups', {context: this}).done(function(data){

			alert(JSON.stringify(data));

			result.resolve();

		}).fail(function(done){

			result.reject(data);

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);

		});
	},

	/*-----------------------------------------------------------------*/

	listAllThemes: function()
	{

		var result = $.Deferred();

		amiCommand.execute('AMIDatasetWBListThemes', {context: this}).done(function(data){

			alert(JSON.stringify(data));

			result.resolve();

		}).fail(function(data){

			result.reject(data);

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});
	},

	/*-----------------------------------------------------------------*/

	addInputGroup: function()
	{

		alert("on entre dans la fonction ajout d'un input de la table groupe");
	},

	/*-----------------------------------------------------------------*/

	addInputTheme: function()
	{

		alert("on entre dans la fonction ajout d'un input de la table theme");
	},

	/*-----------------------------------------------------------------*/

	addGroup: function(groupName)
	{

		var result = $.Deferred();

		amiCommand.execute('AMIDatasetWBAddGroup -groupName'+groupName, {context: this}).done(function(data){

			alert(JSON.stringify(data));

			result.resolve();

		}).fail(function(data){

			result.reject(data);

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});
	},

	/*-----------------------------------------------------------------*/

	removeGroup: function(groupName)
	{

		var result = $.Deferred();

		amiCommand.execute('AMIDatasetWBDeleteGroup -groupName'+groupName, {context: this}).done(function(data){

			alert(JSON.stringify(data));

			result.resolve();

		}).fail(function(data){

			result.reject(data);

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});

	},

	/*-----------------------------------------------------------------*/

	editGroup: function()
	{
	},

	/*-----------------------------------------------------------------*/

	addTheme: function()
	{
	},

	/*-----------------------------------------------------------------*/

	removeTheme: function()
	{
	},

	/*-----------------------------------------------------------------*/

	editTheme: function(){

	},

	/*-----------------------------------------------------------------*/

	onExit: function()
	{
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
	},

	/*-----------------------------------------------------------------*/

	onLogout: function()
	{
	},

	/*-----------------------------------------------------------------*/

});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

var datasetWhiteBoardAdminApp = new DatasetWhiteBoardAdminApp();

/*-------------------------------------------------------------------------*/
