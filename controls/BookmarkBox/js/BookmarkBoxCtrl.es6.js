/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global ClipboardJS
 *
 */

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
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/BookmarkBox/twig/BookmarkBoxCtrl.twig',
		]).done((data) => {

			amiWebApp.appendHTML('body', data[0]).done(() => {

				const _class = this.$class;

				/*----------------------------------------------------------------------------------------------------*/

				$('#F43F294B_B664_4883_0691_2EAEC8B8B3BB').on('click', () => {

					amiWebApp.modalLeave();

					$('#A3B9F992_0B7B_82B4_BDD0_E4EF2AF2E197').modal('hide');

					_class.deferred.resolveWith(_class.context || _class.deferred, [null]);
				});

				/*----------------------------------------------------------------------------------------------------*/

				$('#E335D6CC_ADA1_92CF_1C64_F446B27B5F93').on('click', () => {

					const name = $('#DDE98A9F_46A2_F340_F7D8_74F2D1704714').val().trim();

					if(name)
					{
						const json = {
							subapp: _class.subapp,
							userdata: _class.userdata,
						};

						amiWebApp.lock();

						amiCommand.execute('AddHash -name="' + amiWebApp.textToString(name) + '" -json="' + amiWebApp.textToString(JSON.stringify(json)) + '"').done(() => {

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

				/*----------------------------------------------------------------------------------------------------*/
			});
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(subapp, userdata, settings)
	{
		const deferred = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const [
			context, name
		] = amiWebApp.setup(
			['context', 'name'],
			[deferred, ''],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		$('#DDE98A9F_46A2_F340_F7D8_74F2D1704714').val(this.$class.origName = name || '');

		$('#A3B9F992_0B7B_82B4_BDD0_E4EF2AF2E197').modal('show');

		this.$class.deferred = deferred;
		this.$class.context = context;

		this.$class.subapp = /*-------------------------------*/ subapp /*-------------------------------*/;
		this.$class.userdata = amiWebApp.typeOf(userdata) === 'Object' ? JSON.stringify(userdata) : userdata;

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.modalEnter();

		return deferred.promise();

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	show: function(text, settings)
	{
		return this.render(text, settings);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
