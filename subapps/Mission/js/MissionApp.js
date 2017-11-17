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

$AMIClass('MissionApp', {
	/*-----------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*-----------------------------------------------------------------*/

	onReady: function(userdata)
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/Mission/twig/MissionApp.twig',
			'subapps/Mission/css/MissionApp.css',

			'subapps/Mission/js/moment.min.js',

			'subapps/Mission/js/fullcalendar.min.css',
			'subapps/Mission/js/fullcalendar.min.js',
			'subapps/Mission/js/fr.js',

			'subapps/Mission/js/daterangepicker.css',
			'subapps/Mission/js/daterangepicker.js',

			'subapps/Mission/js/countries.json',

		], {context: this}).done(function(data) {

			var dict = {
				countries: data[8],
				cars_admin: {'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D'},
			};

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this, dict: dict}).done(function() {

				$('#B87BA1D3_9B98_A6CF_4571_EF1F8CD3D687').change(function(e) { /* CAR_PERSO */

					if($(this).is(':checked'))
					{
						$('#E596D471_C34D_34EA_0323_ABE2E3B5CF8B').prop('disabled', false);
						$('#F9EE0F3B_4DC8_2AA0_65FA_B1682FE7F7F2').prop('disabled', false);
						$('#C66E4AC8_B835_7A66_5E47_EA8D6CEB82F3').prop('disabled', false);
						$('#D7F86539_24DF_0F1F_B43C_44E7C643433C').prop('disabled', false);
					}
					else
					{
						$('#E596D471_C34D_34EA_0323_ABE2E3B5CF8B').prop('disabled', true);
						$('#F9EE0F3B_4DC8_2AA0_65FA_B1682FE7F7F2').prop('disabled', true);
						$('#C66E4AC8_B835_7A66_5E47_EA8D6CEB82F3').prop('disabled', true);
						$('#D7F86539_24DF_0F1F_B43C_44E7C643433C').prop('disabled', true);
					}
				});

				$('#D697A2D1_4F94_F432_40FA_A3AA8457774D').change(function(e) { /* CAR_ADMIN */

					if($(this).is(':checked'))
					{
						$('#DC232684_8D16_94C9_E052_09C48C0C13EA').prop('disabled', false);
					}
					else
					{
						$('#DC232684_8D16_94C9_E052_09C48C0C13EA').prop('disabled', true);
					}
				});

				$('#CE7FD164_3A1F_57F7_A686_42975C7C72B6').change(function(e) { /* PLANE */

					if($(this).is(':checked'))
					{
						$('#BF9C7CBC_E136_21B5_8FD8_96A58B280172').prop('disabled', false);
						$('#F32AF0E3_F12C_FC02_089D_9AD926709A89').prop('disabled', false);
					}
					else
					{
						$('#BF9C7CBC_E136_21B5_8FD8_96A58B280172').prop('disabled', true);
						$('#F32AF0E3_F12C_FC02_089D_9AD926709A89').prop('disabled', true);
					}
				});

				$('#F7F9E6AB_0A80_41F2_D1FA_D4482E3A3FE3').change(function(e) { /* OTHER */

					if($(this).is(':checked'))
					{
						$('#F2D2AADB_D25D_FF8B_EC6B_0715CDC1E008').prop('disabled', false);
					}
					else
					{
						$('#F2D2AADB_D25D_FF8B_EC6B_0715CDC1E008').prop('disabled', true);
					}
				});

				$('#D686BF9C_8A5E_BC98_526E_D78A0D7029B4').submit(function(e) {

					missionApp.submit(e);
				});

				result.resolve();
			});

		}).fail(function(data) {

			result.reject(data);
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	onExit: function()
	{
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
		var events = [
			{
				title: 'All Day Event',
				start: '2017-10-01'
			},
			{
				title: 'Long Event',
				start: '2017-10-07',
				end: '2017-10-10'
			},
			{
				title: 'Repeating Event',
				start: '2017-10-09T16:00:00'
			},
			{
				title: 'Repeating Event',
				start: '2017-10-16T16:00:00'
			},
			{
				title: 'Conference',
				start: '2017-10-11',
				end: '2017-10-13'
			},
			{
				title: 'Meeting',
				start: '2017-10-12T10:30:00',
				end: '2017-10-12T12:30:00'
			},
			{
				title: 'Lunch',
				start: '2017-10-12T12:00:00'
			},
			{
				title: 'Meeting',
				start: '2017-10-12T14:30:00'
			},
			{
				title: 'Happy Hour',
				start: '2017-10-12T17:30:00'
			},
			{
				title: 'Dinner',
				start: '2017-10-12T20:00:00'
			},
			{
				title: 'Birthday Party',
				start: '2017-10-13T07:00:00'
			},
			{
				title: 'Click for Google',
				url: 'http://google.com/',
				start: '2017-10-28'
			}
		];

		amiCommand.execute('GetSessionInfo', {context: this}).done(function(data)
		{
			var firstName = amiWebApp.jspath('..field{.@name=== "firstName" }.$', data)[0] || '';
			var lastName = amiWebApp.jspath('..field{.@name=== "lastName" }.$', data)[0] || '';

			$('#FE80AAC1_65C1_178B_0ED4_4932CA1B7B64').val(firstName + ' ' + lastName);

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data));
		});

		$('#E53363E7_B1AA_D1C2_802D_8AADAD5D7F26').fullCalendar({
			/*-------------------------------------------------*/

			customButtons: {
				addButton: {
					text: '+ Déposer une mission',
					click: function() {
						$('#E41919DC_EC9E_CA85_6CB4_A440E1206F42').modal('show');
					}
				}
			},

			/*-------------------------------------------------*/

			header: {
				left: 'addButton',
				center: 'title',
				right: 'prev,next today month,basicWeek listYear'
			},

			/*-------------------------------------------------*/

			lang: 'fr',
			height: 500,
			navLinks: true,
			editable: true,
			eventLimit: true,

			/*-------------------------------------------------*/

			events: events,

			defaultDate: new Date('2017-10-12'),

			/*-------------------------------------------------*/
		});

		$('#E60D9F28_3905_1859_F073_DCF37DF5DC91').html('TODO');

		$('#F483AEF1_9CAB_24C8_1494_B8951638DE76').daterangepicker({
			timePicker: true,
			timePicker24Hour: true,
			timePickerIncrement: 30,
			locale: {
				format: 'DD/MM/YYYY HH:mm'
			}
		});
	},

	/*-----------------------------------------------------------------*/

	onLogout: function()
	{
	},

	/*-----------------------------------------------------------------*/

	submit: function(e)
	{
		e.preventDefault();

		/*---------------------------------------------------------*/

		var data = {};

		$(e.target).serializeArray().forEach(function(item) {

			var name = item.name.trim();
			var value = item.value.trim()

			switch(name)
			{
				/*-----------------------------------------*/

				case 'dates':
				{
					var dates = value.split(' - ');

					if(dates.length === 2)
					{
						data['data1'] = dates[0];
						data['data2'] = dates[1];
					}
					else
					{
						/* TODO */
					}

					break;
				}

				/*-----------------------------------------*/

				/*-----------------------------------------*/

				default:
					data[name] = value;

					break;

				/*-----------------------------------------*/
			}
		});

		/*---------------------------------------------------------*/

		alert(JSON.stringify(data));

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

var missionApp = new MissionApp();

/*-------------------------------------------------------------------------*/
