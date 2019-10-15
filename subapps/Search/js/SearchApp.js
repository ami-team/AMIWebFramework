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

$AMIClass('SearchApp', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function()
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/Search/twig/SearchApp.twig',
			'subapps/Search/twig/interface.twig',
			'ctrl:search',
			'ctrl:tab',
		]).done((data) => {

			this.searchCtor = data[2];

			this.tabCtrl = new data[3]();

			amiWebApp.replaceHTML('#ami_main_content', data[0]).done(() => {

				this.tabCtrl.render('#FE8BB925_A267_F972_060E_CC9C70D0C6D2', {card: false}).done(() => {

					this.fragmentInterface = data[1];

					this.searchInterfaces = {};

					result.resolve();
				});
			});

		}).fail((data) => {

			result.reject(data);
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function(userdata)
	{
		this.getInterfaceList(userdata.split(','));
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function()
	{
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	getInterfaceList: function(groups)
	{
		amiWebApp.lock();

		const sql = 'SELECT `id`, `group`, `name`, `json` FROM `router_search_interface` WHERE `archived` = 0 AND `group` IN (' + groups.map(group => '\'' + group + '\'').join(', ') + ')';

		amiCommand.execute('SearchQuery -catalog="self" -entity="router_search_interface" -sql="' + sql + '"').done((data) => {

			var rows = amiWebApp.jspath('..row', data);

			var dict = {
				groups: {},
			};

			rows.forEach((row) => {

				const id = amiWebApp.jspath('..field{.@name==="id"}.$', row)[0] || '';
				const group = amiWebApp.jspath('..field{.@name==="group"}.$', row)[0] || '';
				const name = amiWebApp.jspath('..field{.@name==="name"}.$', row)[0] || '';
				const json = amiWebApp.jspath('..field{.@name==="json"}.$', row)[0] || '';

				try
				{
					if(!(group in dict.groups))
					{
						dict.groups[group] = [];
					}

					const interface = {
						id: id,
						name: name,
						json: JSON.parse(json),
					};

					dict.groups[group].push(interface);

					this.searchInterfaces[id] = interface;
				}
				catch(e)
				{
					/* IGNORE */
				}
			});

			amiWebApp.replaceHTML('#CCFE77D9_5798_A236_8108_E59AE44FB242', this.fragmentInterface, {dict: dict}).done(() => {

				amiWebApp.unlock();
			});

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	select: function(id)
	{
		const interface = this.searchInterfaces[id];

		this.tabCtrl.appendItem(interface.name, {context: this, closable: true}).done((sel) => {

			var search = new this.searchCtor(this.tabCtrl);

			interface.json.name = interface.name;

			console.debug(JSON.stringify(interface.json));

			search.render(sel, interface.json);
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

var searchApp = new SearchApp();

/*--------------------------------------------------------------------------------------------------------------------*/
