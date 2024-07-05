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

			$('#CA1C2B9C_C66E_16A4_0192_95704C27B6E2').select2({
				tags: true,
				allowClear: true,
				placeholder: 'Existing or new dashboard name',
				dropdownParent: $('#C5E27E1F_DEB1_DE92_1301_898529832194 .modal-body')
			});

			/*--------------------------------------------------------------------------------------------------------*/

			$('#D5C96872_D545_4B33_ECD9_55EC32E1703E').on('click', () => {

				amiWebApp.modalLeave();
				amiWebApp.modalLeave();

				$('#C5E27E1F_DEB1_DE92_1301_898529832194').modal('hide');

				_class.deferred.resolveWith(_class.context || _class.deferred, [null]);
			});

			/*--------------------------------------------------------------------------------------------------------*/

			$('#E335D6CC_ADA1_92CF_1C64_F446B27B5F93').on('click', () => {

				const hash = $('#CA1C2B9C_C66E_16A4_0192_95704C27B6E2').val().trim();

				const transparent = $('#DDC88FB6_C193_9C60_53CE_85D885BD42F7').prop('checked') ? '1' : '0';
				const autoRefresh = $('#BFE60B45_EB7C_E9AD_8748_9894FB5FBC35').prop('checked') ? '1' : '0';

				const json = $('#A7003C5D_0A5C_08A2_DAD9_3EC577328D43').val().trim();

				if(hash && json)
				{
					amiWebApp.lock();

					amiCommand.execute('AddDashboardWidget -hash=? -transparent=? -autoRefresh=? -json=?', {params: [hash, transparent, autoRefresh, json]}).done(() => {

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

	render: function(widget, options)
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
			json = amiWebApp.typeOf(widget) === 'Object' ? /*------*/(widget)
			                                             : JSON.parse(widget)
			;
		}
		catch(e)
		{
			json = {};
		}

		/*------------------------------------------------------------------------------------------------------------*/

		const select = $('#CA1C2B9C_C66E_16A4_0192_95704C27B6E2').empty();

		$.each(Object.values(amiAuth.getDashboardInfo()), (_, info) => {

			select.append(new Option(info.name, info.hash));
		});

		/*------------------------------------------------------------------------------------------------------------*/

		$('#CA1C2B9C_C66E_16A4_0192_95704C27B6E2').val(hash || '');
		$('#A7003C5D_0A5C_08A2_DAD9_3EC577328D43').val(JSON.stringify(json, null, 2)|| '{}');
		$('#CC011903_7C42_70CF_25CD_DE594C3E23C5').collapse('show');
		$('#C5E27E1F_DEB1_DE92_1301_898529832194').modal('show');

		this.$class.deferred = deferred;
		this.$class.context = context;

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
