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

$AMIClass('BookmarkEditorApp', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		const result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/BookmarkEditor/twig/BookmarkEditorApp.twig',
			'subapps/BookmarkEditor/twig/bookmarks.twig',
		]).done((data) => {

			amiWebApp.replaceHTML('#ami_main_content', data[0]).done(() => {

				amiWebApp.loadResources([
					'subapps/UserDashboard/js/jquery-ui.min.js',
				]).done(() => {

					/*------------------------------------------------------------------------------------------------*/

					$('#ACFE5A3E_2548_59BF_7EBB_32821C900AB1').sortable({

						start: (e, ui) => {

							/*----------------------------------------------------------------------------------------*/

							ui.item.ranks1 = {};

							$('#ACFE5A3E_2548_59BF_7EBB_32821C900AB1 > div[data-id]').each((indx, item) => {

								ui.item.ranks1[$(item).attr('data-id')] = indx;
							});

							/*----------------------------------------------------------------------------------------*/
						},
						update: (e, ui) => {

							/*----------------------------------------------------------------------------------------*/

							ui.item.ranks2 = {};

							$('#ACFE5A3E_2548_59BF_7EBB_32821C900AB1 > div[data-id]').each((indx, item) => {

								ui.item.ranks2[$(item).attr('data-id')] = indx;
							});

							this.ranks = ui.item.ranks2;

							/*----------------------------------------------------------------------------------------*/

							this.swap(
								ui.item.ranks1,
								ui.item.ranks2
							);

							/*----------------------------------------------------------------------------------------*/
						},

						/*--------------------------------------------------------------------------------------------*/
					});

					/*------------------------------------------------------------------------------------------------*/
				});

				/*----------------------------------------------------------------------------------------------------*/

				this.fragmentBookmarks = data[1];

				this.bookmarks = {};

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
		this.showBookmarkList();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function()
	{
		this.showBookmarkList();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	showBookmarkList: function()
    {
		this.bookmarks = amiLogin.getBookmarkInfo();/*.reduce((map, x) => {
			map[x.id] = x;
			return map;
		});*/

		//alert(JSON.stringify(this.bookmarks));
    },

	/*----------------------------------------------------------------------------------------------------------------*/

	swap: function(ranks1, ranks2)
	{
		for(const id in this.bookmarks)
		{
			if(ranks1[id] !== ranks2[id])
			{
				/*----------------------------------------------------------------------------------------------------*/

				const command = 'UpdateBookmark -catalog="self" -id="' + id + '" -rank="' + ranks2[id];

				/*----------------------------------------------------------------------------------------------------*/

				amiWebApp.lock();

				amiCommand.execute(command).done(() => {

					amiWebApp.unlock();

				}).fail((data, message) => {

					amiWebApp.error(message, true);
				});

				/*----------------------------------------------------------------------------------------------------*/
			}
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	select: function(id)
	{
		if(!(id = id.trim()))
		{
			return;
		}

		this.selected = id;

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

		$('#CA130E29_BDD4_CC8C_C71C_9472725DFE5A').val(this.bookmarks[id].name);

		$('#B0ECE244_6128_4BB1_569C_18225330963A').prop('checked', this.bookmarks[id].shared);

		$('#CC458B68_FE2E_2EDB_D49E_4EC9C9F8AD17').val(this.bookmarks[id].json);

		/*------------------------------------------------------------------------------------------------------------*/

			amiWebApp.unlock();

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	clear: function()
	{
		if(confirm('Please confirm...') == false)
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		$('#CA130E29_BDD4_CC8C_C71C_9472725DFE5A').val('');

		$('#B0ECE244_6128_4BB1_569C_18225330963A').prop('checked', 0);

		$('#CC458B68_FE2E_2EDB_D49E_4EC9C9F8AD17').val('');

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	save: function()
	{
		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		const id = this.selected;
		const name = this._trim($('#CA130E29_BDD4_CC8C_C71C_9472725DFE5A').val());
		const shared = $('#B0ECE244_6128_4BB1_569C_18225330963A').prop('checked');
		const json = this._trim($('#CC458B68_FE2E_2EDB_D49E_4EC9C9F8AD17').val());

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.execute('UpdateBookmark -id="' + id + '" -name=" ' + name + ' " -shared="' + shared + '" -json="' + json + '"', () => {

			amiLogin.update().done(() => {

				this.showBookmarkList();

				amiWebApp.success(message, true);

			}).fail((data, message) => {

				this.showBookmarkList();

				amiWebApp.error(message, true);
			});

		}).fail((data, message) => {

			this.showBookmarkList();

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	remove: function()
	{
		if(!confirm('Please confirm...'))
		{
			return;
		}

		const id = this.selected;

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.execute('RemoveBookmark -catalog="self" -id="' + id + '"').done((data, message) => {

			amiLogin.update().done(() => {

				this.showBookmarkList();

				amiWebApp.success(message, true);

			}).fail((data, message) => {

				this.showBookmarkList();

				amiWebApp.error(message, true);
			});

		}).fail((data, message) => {

			this.showBookmarkList();

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/

	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_trim: function(s)
	{
		if(s) {
			return s.trim();
		}
		else {
			return '';
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

const bookmarkEditorApp = new BookmarkEditorApp();

/*--------------------------------------------------------------------------------------------------------------------*/
