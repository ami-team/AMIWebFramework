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

$AMIClass('GlanceCtrl', {
	/*-----------------------------------------------------------------*/

	$extends: ami.Control,

	/*-----------------------------------------------------------------*/

	$init: function()
	{
		var _this = this;

		this.$super.$init();

		/*---------------------------------------------------------*/

		var oldVal;
		var newVal;

		$('#E704D1D0_AA06_9F62_B79E_540E003CFDB2').on('keyup input', function() {

			$(this).css('height', 'auto');
			var height = this.scrollHeight;
			$(this).css('height', height);
		});

		$('#E704D1D0_AA06_9F62_B79E_540E003CFDB2').on('focus', function() {

			oldVal = $(this).val();
		});

		$('#E704D1D0_AA06_9F62_B79E_540E003CFDB2').on('blur', function() {

			newVal = $(this).val();

			if(newVal !== oldVal)
			{
				_this.setFreeComment(newVal).fail(function() {

					$(this).val(oldVal);
				});
			}
		});

		/*---------------------------------------------------------*/

		$('#D7A2964A_138B_5D24_380A_7C45BB29CBA0').click(function() {

			_this.toggleAddDatasets();
		});

		$('#E1F57609_6048_A3F3_6EF7_B7A5C6489148').click(function() {

			_this.addDatasets();
		});

		$('#AAAF7B5A_432F_3894_3395_FEED09A2C750').click(function() {

			_this.removeDatasets();
		});

		$('#D97C3F0E_23B1_91FD_9D22_0F947409D1AD').click(function() {

			_this.exportDatasetsCSV();
		});

		$('#EC61E236_3C64_F841_24F6_40A35D548083').click(function() {

			_this.exportDatasetsTXT();
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/js/3rd-party/filesaver.min.js',
			amiWebApp.originURL + '/controls/Glance/js/tablesort.min.js',
			amiWebApp.originURL + '/controls/Glance/twig/GlanceCtrl.twig',
			amiWebApp.originURL + '/controls/Glance/twig/datasets.twig',
			'ctrl:confirmBox',
		], {context: this}).done(function(data) {

			amiWebApp.appendHTML('body', data[2], {context: this}).done(function() {

				/*-----------------------------------------*/

				new Tablesort(document.getElementById('C6768D59_6B1F_786A_3F79_BA2C8E132B43'));

				/*-----------------------------------------*/

				this.fragmentDatasets = /**/ data[3];

				this.confirmBox = new data[4];

				this.paperType = '';

				this.refCode = '';

				/*-----------------------------------------*/
			});
		});
	},

	/*-----------------------------------------------------------------*/

	_getStatus: function(prodsysStatus, amiStatus)
	{
		var color;
		var status;

		if((prodsysStatus == 'ALL EVENTS AVAILABLE' || prodsysStatus == 'Tier 0') && amiStatus === 'VALID')
		{
			color = 'success';
			status = 'VALID';
		}
		else
		{
			if((prodsysStatus.indexOf('ALL EVENTS WAITING') >= 0 || prodsysStatus.indexOf('EVENTS PARTIALLY AVAILABLE') >= 0 || prodsysStatus.indexOf('EVENTS AVAILABLE') >= 0) && amiStatus === 'VALID')
			{
				color = 'warning';
				status = 'CHECK';
			}
			else
			{
				color = 'danger';
				status = 'INVALID';
			}
		}

		return {
			color: color,
			status: status,
		};
	},

	/*-----------------------------------------------------------------*/

	_updateNumberOfDatasets: function()
	{
		$('#BBF23DB9_72C5_CAC4_1ACF_D33C342DD081').text('(' + $('#C6768D59_6B1F_786A_3F79_BA2C8E132B43 tbody td').length + ' datasets)');
	},

	/*-----------------------------------------------------------------*/

	render: function(paperType, refCode)
	{
		amiWebApp.flush();
		amiWebApp.lock();

		amiCommand.execute('GlanceGetPaperInfo -paperType="' + amiWebApp.textToString(paperType) + '" -refCode="' + amiWebApp.textToString(refCode) + '"', {context: this}).done(function(data) {

			/*-------------------------------------------------*/

			var paper = amiWebApp.jspath('..rowset{.@type==="paper"}.row', data);

			var freeComment = amiWebApp.jspath('..field{.@name==="freeComment"}.$', paper)[0] || '';
			var phase = amiWebApp.jspath('..field{.@name==="phase"}.$', paper)[0] || '';
			var state = amiWebApp.jspath('..field{.@name==="state"}.$', paper)[0] || '';
			var force = amiWebApp.jspath('..field{.@name==="force"}.$', paper)[0] || '';

			$('#C5965C43_F371_0216_D5D0_FB6E32792F90').text(
				refCode + ', ' + phase
			);

			$('#E704D1D0_AA06_9F62_B79E_540E003CFDB2').val(
				freeComment
			);

			this.paperType = paperType;

			this.refCode = refCode;

			/*-------------------------------------------------*/

			if(phase === 'submission' && force === '0')
			{
				$('#D7A2964A_138B_5D24_380A_7C45BB29CBA0').hide();
				$('#AAAF7B5A_432F_3894_3395_FEED09A2C750').hide();
			}
			else
			{
				$('#D7A2964A_138B_5D24_380A_7C45BB29CBA0').show();
				$('#AAAF7B5A_432F_3894_3395_FEED09A2C750').show();
			}

			/*-------------------------------------------------*/

			var DATASETS = [];

			var datasets = amiWebApp.jspath('..rowset{.@type==="datasets"}.row', data);

			for(var i in datasets)
			{
				var dataset = datasets[i];

				var ldn = amiWebApp.jspath('..field{.@name==="ldn"}.$', dataset)[0] || '';
				var prodsysStatus = amiWebApp.jspath('..field{.@name==="prodsysStatus"}.$', dataset)[0] || '';
				var completion = amiWebApp.jspath('..field{.@name==="completion"}.$', dataset)[0] || '';
				var amiStatus = amiWebApp.jspath('..field{.@name==="amiStatus"}.$', dataset)[0] || '';

				/**/

				var colorAndStatus = this._getStatus(prodsysStatus, amiStatus);

				/**/

				DATASETS.push({
					LDN: ldn,
					COLOR: colorAndStatus['color'],
					STATUS: colorAndStatus['status'],
					PRODSYSSTATUS: prodsysStatus,
					COMPLETION: completion,
					AMISTATUS: amiStatus,
				});
			}

			/*-------------------------------------------------*/

			amiWebApp.replaceHTML('#C6768D59_6B1F_786A_3F79_BA2C8E132B43 tbody', this.fragmentDatasets, {context: this, dict: {DATASETS: DATASETS}}).done(function() {


				$('#C0FAD691_EACD_867C_1374_22ACF302B933').modal('show');

				$('#F13156B6_D340_F6FF_D96E_AC297BEC4552').hide();

				this._updateNumberOfDatasets();

				amiWebApp.unlock();
			});

			/*-------------------------------------------------*/

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});
	},

	/*-----------------------------------------------------------------*/

	toggleAddDatasets: function()
	{
		$('#F13156B6_D340_F6FF_D96E_AC297BEC4552').toggle();
	},

	/*-----------------------------------------------------------------*/

	setFreeComment: function(freeComment)
	{
		amiWebApp.flush();
		amiWebApp.lock();

		return amiCommand.execute('GlanceSetFreeComment -paperType="' + amiWebApp.textToString(this.paperType) + '" -refCode="' + amiWebApp.textToString(this.refCode) + '" -freeComment="' + amiWebApp.textToString(freeComment) + '"').done(function(data) {

			amiWebApp.info(amiWebApp.jspath('..info.$', data), true, '#F0E0C2C3_B750_D75D_5734_639E449DE7C3');

		}).fail(function(data){

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true, '#F0E0C2C3_B750_D75D_5734_639E449DE7C3');
		});
	},

	/*-----------------------------------------------------------------*/

	addDatasets: function()
	{
		alert('Hello');
	},

	/*-----------------------------------------------------------------*/

	removeDatasets()
	{
		this.confirmBox.show('You are about to create a new AMI-Tag?', {context: this}).done(function() {

			amiWebApp.flush();
			amiWebApp.lock();

			amiCommand.execute('GlanceRemoveDatasets -paperType="' + amiWebApp.textToString(this.paperType) + '" -refCode="' + amiWebApp.textToString(this.refCode) + '"', {context: this}).done(function() {

				this.render(this.paperType, this.refCode);

			}).fail(function(data) {

				amiWebApp.error(amiWebApp.jspath('..error.$', data), true, '#F0E0C2C3_B750_D75D_5734_639E449DE7C3');
			});
		});
	},

	/*-----------------------------------------------------------------*/

	exportDatasetsCSV: function()
	{
		amiCommand.execute('GlanceGetPaperInfo -paperType="' + amiWebApp.textToString(this.paperType) + '" -refCode="' + amiWebApp.textToString(this.refCode) + '"', {context: this}).done(function(data) {

			var datasets = amiWebApp.jspath('..rowset{.@type==="datasets"}.row', data);

			var text = '#FIELDS\nldn;prodsysStatus;amiStatus\n#VALUES\n';

			for(var i in datasets)
			{
				var dataset = datasets[i];

				var ldn = amiWebApp.jspath('..field{.@name==="ldn"}.$', dataset)[0] || '';
				var prodsysStatus = amiWebApp.jspath('..field{.@name==="prodsysStatus"}.$', dataset)[0] || '';
				var completion = amiWebApp.jspath('..field{.@name==="completion"}.$', dataset)[0] || '';
				var amiStatus = amiWebApp.jspath('..field{.@name==="amiStatus"}.$', dataset)[0] || '';

				text += ldn + ';' + prodsysStatus + ';' + completion + ';' + amiStatus + '\n';
			}

			saveAs(new Blob([text], {type: 'text/csv'}), 'datasets.csv');

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true, '#F0E0C2C3_B750_D75D_5734_639E449DE7C3');
		});
	},

	/*-----------------------------------------------------------------*/

	exportDatasetsTXT: function()
	{
		amiCommand.execute('GlanceGetPaperInfo -paperType="' + amiWebApp.textToString(this.paperType) + '" -refCode="' + amiWebApp.textToString(this.refCode) + '"', {context: this}).done(function(data) {

			var datasets = amiWebApp.jspath('..rowset{.@type==="datasets"}.row', data);

			var text = '';

			for(var i in datasets)
			{
				var dataset = datasets[i];

				var ldn = amiWebApp.jspath('..field{.@name==="ldn"}.$', dataset)[0] || '';
/*				var prodsysStatus = amiWebApp.jspath('..field{.@name==="prodsysStatus"}.$', dataset)[0] || '';
 *				var completion = amiWebApp.jspath('..field{.@name==="completion"}.$', dataset)[0] || '';
 *				var amiStatus = amiWebApp.jspath('..field{.@name==="amiStatus"}.$', dataset)[0] || '';
 */
				text += ldn + '\n';
			}

			saveAs(new Blob([text], {type: 'text/plain'}), 'datasets.txt');

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true, '#F0E0C2C3_B750_D75D_5734_639E449DE7C3');
		});
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
