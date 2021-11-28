/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('BookmarkEditorApp', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	bookmarkProfile: {
		name: 'bookmarkProfile',
		/**/
		infoMethod: () => amiAuth.getBookmarkInfo(),
		/**/
		addCommand: 'AddHash',
		updateCommand: 'UpdateHash',
		removeCommand: 'RemoveHash',
		/**/
		listId: '#ACFE5A3E_2548_59BF_7EBB_32821C900AB1',
		/**/
		nameId: '#CA130E29_BDD4_CC8C_C71C_9472725DFE5A',
		shareId: '#B0ECE244_6128_4BB1_569C_18225330963A',
		jsonId: '#CC458B68_FE2E_2EDB_D49E_4EC9C9F8AD17',
		/**/
		clearId: '#DB6C48C0_5B8B_F324_5669_C17254E45A5D',
		removeId: '#FF60636A_49EE_1C5D_BB59_AC077A8999E2',
		addUpdateId: '#F1814093_A84F_0FC4_4581_699ACA53782F',
	},

	dashboardProfile: {
		name: 'dashboardProfile',
		/**/
		infoMethod: () => amiAuth.getDashboardInfo(),
		/**/
		addCommand: 'AddHash',
		updateCommand: 'UpdateHash',
		removeCommand: 'RemoveHash',
		/**/
		listId: '#D89CE3F5_9D1D_B338_D895_C344CD4FFE08',
		/**/
		nameId: '#CC4A8905_4020_85F9_BDFE_1F3AFFA69A0C',
		shareId: '#C12DD7B5_DE47_9429_E2AC_5A48A0B7CA6E',
		jsonId: '#C39F1AF8_26C2_C0A6_C012_B3D6C443DB90',
		/**/
		clearId: '#BE2709CF_8E16_DE33_E151_CBF589591E8F',
		removeId: '#E6F1B904_1835_D1FD_6C2C_7B9465A6DF50',
		addUpdateId: '#B05BAD9F_4923_FE76_EAD2_FC39CB712853',
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		const result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/BookmarkEditor/twig/BookmarkEditorApp.twig',
			'subapps/BookmarkEditor/twig/items.twig',
		]).done((data) => {

			const dict = {
				mode: (userdata || 'home').trim()
			};

			amiWebApp.replaceHTML('#ami_main_content', data[0], {dict: dict}).done(() => {

				/*----------------------------------------------------------------------------------------------------*/

				amiWebApp.loadResources([
					'subapps/BookmarkEditor/js/jquery-ui.min.js',
				]).done(() => {

					/*------------------------------------------------------------------------------------------------*/

					this.makeSortable(this.bookmarkProfile, $('#ACFE5A3E_2548_59BF_7EBB_32821C900AB1'));

					this.makeSortable(this.dashboardProfile, $('#D89CE3F5_9D1D_B338_D895_C344CD4FFE08'));

					/*------------------------------------------------------------------------------------------------*/

				}).fail(function(data) {

					amiWebApp.error(data);
				});

				/*----------------------------------------------------------------------------------------------------*/

				this.fragmentItems = data[1];

				/*----------------------------------------------------------------------------------------------------*/
				/* BOOKMARKS                                                                                          */
				/*----------------------------------------------------------------------------------------------------*/

				this.setUpdateMode(this.bookmarkProfile, false);

				$(this.bookmarkProfile.clearId).click((e) => {

					this.clear(this.bookmarkProfile);
					e.preventDefault();
				});

				$(this.bookmarkProfile.removeId).click((e) => {

					this.remove(this.bookmarkProfile);
					e.preventDefault();
				});

				$(this.bookmarkProfile.addUpdateId).click((e) => {

					this.save(this.bookmarkProfile);
					e.preventDefault();
				});

				/*----------------------------------------------------------------------------------------------------*/
				/* BOOKMARKS                                                                                          */
				/*----------------------------------------------------------------------------------------------------*/

				this.setUpdateMode(this.dashboardProfile, false);

				$(this.dashboardProfile.clearId).click((e) => {

					this.clear(this.dashboardProfile);
					e.preventDefault();
				});

				$(this.dashboardProfile.removeId).click((e) => {

					this.remove(this.dashboardProfile);
					e.preventDefault();
				});

				$(this.dashboardProfile.addUpdateId).click((e) => {

					this.save(this.dashboardProfile);
					e.preventDefault();
				});

				/*----------------------------------------------------------------------------------------------------*/

				result.resolve();
			});

		}).fail(function(data) {

			result.reject(data);
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function()
	{
		this.showList(this.bookmarkProfile);
		this.showList(this.dashboardProfile);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function()
	{
		this.showList(this.bookmarkProfile);
		this.showList(this.dashboardProfile);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	makeSortable: function(profile, el)
	{
		el.sortable({

			start: (_, ui) => {

				/*----------------------------------------------------------------------------------------*/

				ui.item.ranks1 = {};

				el.find('div[data-id]').each((indx, item) => {

					ui.item.ranks1[$(item).attr('data-id')] = indx;
				});

				/*----------------------------------------------------------------------------------------*/
			},
			update: (_, ui) => {

				/*----------------------------------------------------------------------------------------*/

				ui.item.ranks2 = {};

				el.find('div[data-id]').each((indx, item) => {

					ui.item.ranks2[$(item).attr('data-id')] = indx;
				});

				/*----------------------------------------------------------------------------------------------------*/

				this.ranks = ui.item.ranks2;

				/*----------------------------------------------------------------------------------------------------*/

				this.swap(
					profile,
					ui.item.ranks1,
					ui.item.ranks2
				);

				/*----------------------------------------------------------------------------------------------------*/
			},

			/*--------------------------------------------------------------------------------------------------------*/
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_swapNb: 0,

	/*----------------------------------------------------------------------------------------------------------------*/

	swap: function(profile, ranks1, ranks2)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		this._swapNb = Object.keys(profile.items).length;

		/*------------------------------------------------------------------------------------------------------------*/

		for(const id in profile.items)
		{
			if(ranks1[id] !== ranks2[id])
			{
				amiWebApp.lock();

				amiCommand.execute(`${profile.updateCommand} -id=? -rank=?`, {params: [id, ranks2[id]]}).done(() => {

					amiWebApp.unlock();

				}).fail((data, message) => {

					amiWebApp.error(message, true);

				}).always(() => {

					if(--this._swapNb === 0)
					{
						amiAuth.update();
					}
				});
			}
			else
			{
				if(--this._swapNb === 0)
				{
					amiAuth.update();
				}
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	showList: function(profile)
    {
    	/*------------------------------------------------------------------------------------------------------------*/

		const items = Object.values(profile.infoMethod());

		/*------------------------------------------------------------------------------------------------------------*/

		profile.items = {};

		for(const x of items)
		{
			profile.items[x.id] = x;
        }

    	/*------------------------------------------------------------------------------------------------------------*/

		const dict = {
			profile: profile.name,
			items: items,
		};

		amiWebApp.replaceHTML(profile.listId, this.fragmentItems, {dict: dict});

    	/*------------------------------------------------------------------------------------------------------------*/
    },

	/*----------------------------------------------------------------------------------------------------------------*/

	setUpdateMode: function(profile, updateMode)
	{
		if(updateMode)
		{
			$(profile.removeId).prop('disabled', false);

			$(profile.addUpdateId).text('Update');
		}
		else
		{
			$(profile.removeId).prop('disabled', true);

			$(profile.addUpdateId).text('Add');
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	jsonIndent: function(s, espace)
	{
		try
		{
			return JSON.stringify(JSON.parse(s), null, espace);
		}
		catch(e)
		{
			return '{}';
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	select: function(profile, id)
	{
		if(!(id = id.trim()))
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		profile.selectedItem = id;

		/*------------------------------------------------------------------------------------------------------------*/

		$(profile.nameId).val((profile.items[id].name || '').trim());

		$(profile.shareId).prop('checked', profile.items[id].shared !== '0');

		$(profile.jsonId).val(this.jsonIndent((profile.items[id].json || '{}').trim(), 4));

		/*------------------------------------------------------------------------------------------------------------*/

		this.setUpdateMode(profile, true);

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	clear: function(profile, checked = true)
	{
		if(checked && !confirm('Please confirm...'))
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		profile.selectedItem = null;

		/*------------------------------------------------------------------------------------------------------------*/

		$(profile.nameId).val('');

		$(profile.shareId).prop('checked', false);

		$(profile.jsonId).val(this.jsonIndent('{}', 4));

		/*------------------------------------------------------------------------------------------------------------*/

		this.setUpdateMode(profile, false);

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	save: function(profile)
	{
		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		const id = profile.selectedItem;

		/*------------------------------------------------------------------------------------------------------------*/

		const name = ($(profile.nameId).val() || '').trim();

		const shared = $(profile.shareId).prop('checked') ? '1' : '0';

		const json = this.jsonIndent(($(profile.jsonId).val() || '{}').trim(), 0);

		/*------------------------------------------------------------------------------------------------------------*/

		if(name && json)
		{
			/*--------------------------------------------------------------------------------------------------------*/

			amiWebApp.lock();

			amiCommand.execute((id ? `${profile.updateCommand} -id="${amiWebApp.textToString(id)}"` : profile.addCommand) + ' -name=? -shared=? -json=?', {params: [name, shared, json]}).done((data, message) => {

				amiAuth.update().done(() => {

					this.clear(false);

					this.showList(profile);

					amiWebApp.success(message, true);

				}).fail((data, message) => {

					this.showList(profile);

					amiWebApp.error(message, true);
				});

			}).fail((data, message) => {

				this.showList(profile);

				amiWebApp.error(message, true);
			});

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	remove: function(profile)
	{
		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		const id = profile.selectedItem;

		/*------------------------------------------------------------------------------------------------------------*/

		if(id)
		{
			/*--------------------------------------------------------------------------------------------------------*/

			amiWebApp.lock();

			amiCommand.execute(`${profile.removeCommand} -id=?`, {params: [id]}).done((data, message) => {

				amiAuth.update().done(() => {

					this.clear(false);

					this.showList(profile);

					amiWebApp.success(message, true);

				}).fail((data, message) => {

					this.showList(profile);

					amiWebApp.error(message, true);
				});

			}).fail((data, message) => {

				this.showList(profile);

				amiWebApp.error(message, true);
			});

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

window.bookmarkEditorApp = new BookmarkEditorApp();

/*--------------------------------------------------------------------------------------------------------------------*/
