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

import twigBookmarkBoxCtrl from './assets/twig/BookmarkBoxCtrl.twig';

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('BookmarkBoxCtrl', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.Control,

	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function()
	{
		const result = $.Deferred();

		amiWebApp.appendHTML('body', twigBookmarkBoxCtrl).done(() => {

			const _class = this.$class;

			/*--------------------------------------------------------------------------------------------------------*/

			$('#F43F294B_B664_4883_0691_2EAEC8B8B3BB').on('click', () => {

				amiWebApp.modalLeave();

				$('#A3B9F992_0B7B_82B4_BDD0_E4EF2AF2E197').modal('hide');

				_class.deferred.resolveWith(_class.context || _class.deferred, [null]);
			});

			/*--------------------------------------------------------------------------------------------------------*/

			$('#E335D6CC_ADA1_92CF_1C64_F446B27B5F93').on('click', () => {

				const name = $('#DDE98A9F_46A2_F340_F7D8_74F2D1704714').val().trim();

				const shared = $('#CEB66D23_8782_A96F_A8B6_139AC2A48875').prop('checked') ? '1' : '0';

				if(name)
				{
					const json = {
						subapp: _class.control,
						userdata: JSON.stringify(_class.userdata),
					};

					amiWebApp.lock();

					amiCommand.execute('AddHash -name=? -shared=? -json=?', {params: [name, shared, JSON.stringify(json)]}).done(() => {

						amiLogin.update().always(() => {

							amiWebApp.unlock();

							amiWebApp.modalLeave();

							$('#A3B9F992_0B7B_82B4_BDD0_E4EF2AF2E197').modal('hide');

							_class.deferred.rejectWith(_class.context || _class.deferred, [name]);
						});

					}).fail((data, message) => {

						amiWebApp.error(message, true);
					});
				}
			});

			/*--------------------------------------------------------------------------------------------------------*/

			result.resolve();

			/*--------------------------------------------------------------------------------------------------------*/
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(control, userdata, options)
	{
		const deferred = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const [
			context, name
		] = amiWebApp.setup(
			['context', 'name'],
			[deferred, ''],
			options
		);

		/*------------------------------------------------------------------------------------------------------------*/

		let json;

		try
		{
			json = amiWebApp.typeOf(userdata) === 'Object' ? /*------*/(userdata)
				                                           : JSON.parse(userdata)
			;
		}
		catch(e)
		{
			json = {};
		}

		/*------------------------------------------------------------------------------------------------------------*/

		$('#DDE98A9F_46A2_F340_F7D8_74F2D1704714').val(name || '');
		$('#AC86FF11_7805_C85E_7411_F061BA049208').val(JSON.stringify(json, null, 2)|| '{}');
		$('#EBABE58F_47EC_314C_5386_280E9D8A32A7').collapse('show');
		$('#A3B9F992_0B7B_82B4_BDD0_E4EF2AF2E197').modal('show');

		this.$class.deferred = deferred;
		this.$class.context = context;
		this.$class.control = control;
		this.$class.userdata = json

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.modalEnter();

		return deferred.promise();

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	show: function(text, options)
	{
		return this.render(text, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
