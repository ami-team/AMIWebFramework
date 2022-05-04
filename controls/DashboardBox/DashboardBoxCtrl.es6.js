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

import twigDashboardBoxCtrl from './assets/twig/DashboardBoxCtrl.twig';

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('DashboardBoxCtrl', {
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

		amiWebApp.appendHTML('body', twigDashboardBoxCtrl).done(() => {

			const _class = this.$class;

			/*--------------------------------------------------------------------------------------------------------*/

			$('#D5C96872_D545_4B33_ECD9_55EC32E1703E').on('click', () => {

				amiWebApp.modalLeave();

				$('#C5E27E1F_DEB1_DE92_1301_898529832194').modal('hide');

				_class.deferred.resolveWith(_class.context || _class.deferred, [null]);
			});

			/*--------------------------------------------------------------------------------------------------------*/

			$('#E557D8C7_CBA2_3E32_4861_A2A7A81A9D14').on('click', () => {

				const hash = $('#CA1C2B9C_C66E_16A4_0192_95704C27B6E2').val().trim();

				const transparent = $('#DDC88FB6_C193_9C60_53CE_85D885BD42F7').prop('checked') ? '1' : '0';

				if(hash)
				{
					const json = {
						control: _class.control,
						userdata: JSON.stringify(_class.userdata),
					};

					amiWebApp.lock();

					amiCommand.execute('AddToDashboard -hash=? -transparent=? -json=?', {params: [hash, transparent, JSON.stringify(json)]}).done(() => {

						amiLogin.update().always(() => {

							amiWebApp.unlock();

							amiWebApp.modalLeave();

							$('#C5E27E1F_DEB1_DE92_1301_898529832194').modal('hide');

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
			context, hash
		] = amiWebApp.setup(
			['context', 'hash'],
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

		$('#CA1C2B9C_C66E_16A4_0192_95704C27B6E2').val(hash || '');
		$('#A7003C5D_0A5C_08A2_DAD9_3EC577328D43').val(JSON.stringify(json, null, 2)|| '{}');
		$('#CC011903_7C42_70CF_25CD_DE594C3E23C5').collapse('show');
		$('#C5E27E1F_DEB1_DE92_1301_898529832194').modal('show');

		this.$class.deferred = deferred;
		this.$class.context = context;
		this.$class.control = control;
		this.$class.userdata = json;

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
