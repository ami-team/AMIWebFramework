/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global JSROOT
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('RootCtrl', {
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
			'https://root.cern/js/latest/scripts/JSRootCore.min.js',
			amiWebApp.originURL + '/controls/Root/twig/RootCtrl.twig',
			amiWebApp.originURL + '/controls/Root/twig/js.twig',
		]).done((data) => {

			this.fragmentRootCtrl = data[1];
			this.fragmentJS = data[2];
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(selector, commandOrJson, settings)
	{
		const result = $.Deferred();

		commandOrJson = commandOrJson.trim();

		/*------------------------------------------------------------------------------------------------------------*/

		const [
			context,
			height, width
		] = amiWebApp.setup(
			[
				'context',
				'height', 'width',
			],
			[
				result,
				768, 1024,
			],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		if(commandOrJson.startsWith('{'))
		{
			this._render(selector, commandOrJson, null, commandOrJson, height, width, settings).done(() => {

				result.resolveWith(context, [commandOrJson]);
			});
		}
		else
		{
			amiWebApp.lock();

			amiCommand.execute(commandOrJson).done((data) => {

				const rows = amiWebApp.jspath('..rowset{.@type==="hist" }.row', data) || [];

				if(rows.length > 0)
				{
					const json = amiWebApp.jspath('..field{.@name==="json"}.$', rows)[0] || '{}';

					this._render(selector, commandOrJson, commandOrJson, json, height, width, settings) .done((data) => {

						result.resolveWith(context, [/*----*/ data /*----*/ ]);

						amiWebApp.unlock();
					});
				}
				else
				{
					result.resolveWith(context, ['not a ROOT histogram']);

					amiWebApp.unlock();
				}

			}).fail((data, message) => {

				result.resolveWith(context, [/*-*/ message /*-*/]);

				amiWebApp.unlock();
			});
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_render: function(selector, commandOrJson, command, json, height, width, tools, settings)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		const JSON = JSROOT.parse(json);

		/*------------------------------------------------------------------------------------------------------------*/

		this.ctx = {
			endpoint: amiCommand.endpoint,
			commandOrJson: commandOrJson,
			command: command,
			json: json,
			height: height,
			width: width,
			xAxis: 'fXaxis' in JSON,
			yAxis: 'fYaxis' in JSON,
			zAxis: 'fZaxis' in JSON,
		};

		/*------------------------------------------------------------------------------------------------------------*/

		return this.replaceHTML(selector, this.fragmentRootCtrl, {dict: this.ctx}).done(() => {

			/*--------------------------------------------------------------------------------------------------------*/

			const js = amiWebApp.formatTWIG(this.fragmentJS, this.ctx);

			/*--------------------------------------------------------------------------------------------------------*/

			JSROOT.draw(this.patchId('#E65240C8_73B7_B44C_52BB_388FFEEE01BD'), JSON, 'hist');

			/*--------------------------------------------------------------------------------------------------------*/

			if(command)
			{
				/*----------------------------------------------------------------------------------------------------*/

				$(this.patchId('#D5A34EA0_1E22_5DEE_473C_2AFA1D9EB28B')).click(() => {

					const xMin = $(this.patchId('#FAEC8E36_E668_9EBB_A36D_243C3F4C28BA')).val();
					const xMax = $(this.patchId('#BF663B5D_240E_A97D_9963_03F94166AB22')).val();
					const yMin = $(this.patchId('#E8924675_0D6A_99CE_363C_4BF4475B30FF')).val();
					const yMax = $(this.patchId('#CD6401B9_5882_F498_0039_FFD4CDF22C65')).val();
					const zMin = $(this.patchId('#AA2E78B1_FC85_C2FA_A5ED_5E1FF3039775')).val();
					const zMax = $(this.patchId('#E56BD713_6FBB_F319_D823_04E17866C674')).val();
					const sizeOfBins = $(this.patchId('#C7CE39F6_B319_EDDD_CA19_E98DEF899372')).val();

					commandOrJson = commandOrJson.replace(/\s*-xMin\s*=\s*"[^"]*"/g, '')
												 .replace(/\s*-xMax\s*=\s*"[^"]*"/g, '')
												 .replace(/\s*-yMin\s*=\s*"[^"]*"/g, '')
												 .replace(/\s*-yMax\s*=\s*"[^"]*"/g, '')
												 .replace(/\s*-zMin\s*=\s*"[^"]*"/g, '')
												 .replace(/\s*-zMax\s*=\s*"[^"]*"/g, '')
												 .replace(/\s*-sizeOfBins\s*=\s*"[^"]*"/g, '')
					;

					this.render(selector, commandOrJson + ' -xMin="' + xMin + '" -xMax="' + xMax + '" -yMin="' + yMin + '" -yMax="' + yMax + '" -zMin="' + zMin + '" -zMax="' + zMax + '" -sizeOfBins="' + sizeOfBins + '"', settings);
				});

				/*----------------------------------------------------------------------------------------------------*/

				$(this.patchId('#B22DE562_B7D4_00D9_605D_544911057E50')).click(() => {

					amiWebApp.createControl(this.getParent(), this, 'messageBox', [command]);
				});

				$(this.patchId('#BA26C452_5152_0114_7324_0F7F9EFA7E72')).click(() => {

					amiWebApp.createControl(this.getParent(), this, 'textBox', [js, {mode: 'javascript'}]);
				});

				/*----------------------------------------------------------------------------------------------------*/

				if('fXaxis' in JSON)
				{
					$(this.patchId('#FAEC8E36_E668_9EBB_A36D_243C3F4C28BA')).val(JSON.fXaxis.fXmin);
					$(this.patchId('#BF663B5D_240E_A97D_9963_03F94166AB22')).val(JSON.fXaxis.fXmax);

					if('fYaxis' in JSON)
					{
						$(this.patchId('#C7CE39F6_B319_EDDD_CA19_E98DEF899372')).val((JSON.fXaxis.fXmax - JSON.fXaxis.fXmin) / JSON.fNcells);
					}
				}

				if('fYaxis' in JSON)
				{
					$(this.patchId('#E8924675_0D6A_99CE_363C_4BF4475B30FF')).val(JSON.fYaxis.fXmin);
					$(this.patchId('#CD6401B9_5882_F498_0039_FFD4CDF22C65')).val(JSON.fYaxis.fXmax);

					if('fZaxis' in JSON)
					{
						$(this.patchId('#C7CE39F6_B319_EDDD_CA19_E98DEF899372')).val((JSON.fYaxis.fXmax - JSON.fYaxis.fXmin) / JSON.fNcells);
					}
				}

				if('fZaxis' in JSON)
				{
					$(this.patchId('#AA2E78B1_FC85_C2FA_A5ED_5E1FF3039775')).val(JSON.fYaxis.fXmin);
					$(this.patchId('#E56BD713_6FBB_F319_D823_04E17866C674')).val(JSON.fYaxis.fXmax);
				}

				/*----------------------------------------------------------------------------------------------------*/

				$(this.patchId('#A1908273_5C91_D702_DA03_41FC7EF2051A')).show();
			}
			else
			{
				$(this.patchId('#A1908273_5C91_D702_DA03_41FC7EF2051A')).hide();
			}

			/*--------------------------------------------------------------------------------------------------------*/
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
