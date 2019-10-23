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

	onReady: function(userdata)
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

					/*------------------------------------------------------------------------------------------------*/

					this.fragmentInterface = data[1];

					this.searchInterfaces = {};

					/*------------------------------------------------------------------------------------------------*/

					this.groups1 = [];
					this.groups2 = [];

					if(userdata)
					{
						userdata.split(',').forEach((item) => {

							const parts = item.split(':');

							/**/

							if(parts.length > 0)
							{
								const group = parts[0].trim();

								if(this.groups1.indexOf(group) < 0)
								{
									this.groups1.push(group);
								}

								if(parts.length > 1)
								{
									const name = parts[1].trim();

									if(this.groups2.indexOf(group + ':' + name) < 0)
									{
										this.groups2.push((group + ':' + name));
									}
								}
							}
						});
					}

					/*------------------------------------------------------------------------------------------------*/

					result.resolve();
				});
			});

		}).fail((data) => {

			result.reject(data);
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function()
	{
		this.getInterfaceList();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function()
	{
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	getInterfaceList: function()
	{
		amiWebApp.lock();

		const sql = (this.groups1.length === 0) ? 'SELECT `id`, `group`, `name`, `rank`, `json` FROM `router_search_interface` WHERE `archived` = 0 ORDER BY `rank` ASC, `group` ASC, `name` ASC'
		                                        : 'SELECT `id`, `group`, `name`, `rank`, `json` FROM `router_search_interface` WHERE `archived` = 0 AND `group` IN (' + this.groups1.map(group => '\'' + amiWebApp.textToSQL(group) + '\'').join(', ') + ') ORDER BY `rank` ASC, `group` ASC, `name` ASC'
		;

		amiCommand.execute('SearchQuery -catalog="self" -entity="router_search_interface" -sql="' + sql + '"').done((data) => {

			const rows = amiWebApp.jspath('..row', data);

			const dict = {
				groups: {},
			};

			const auto_open = [];

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

					if(this.groups2.indexOf(group + ':' + name) >= 0)
					{
						auto_open.push(id);
					}
				}
				catch(e)
				{
					/* IGNORE */
				}
			});

			amiWebApp.replaceHTML('#CCFE77D9_5798_A236_8108_E59AE44FB242', this.fragmentInterface, {dict: dict}).done(() => {

				auto_open.forEach((item) => {

					this.select(item);
				});

				amiWebApp.unlock();
			});

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	select: function(id)
	{
		amiWebApp.lock();

		const interface = this.searchInterfaces[id];

		this.tabCtrl.appendItem(interface.name, {context: this, closable: true}).done((sel) => {

			interface.json.name = interface.name;

			new this.searchCtor(this.tabCtrl).render(sel, interface.json).always(() => {

				amiWebApp.unlock();
			});
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

var searchApp = new SearchApp();

/*--------------------------------------------------------------------------------------------------------------------*/
