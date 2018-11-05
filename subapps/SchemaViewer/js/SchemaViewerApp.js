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

$AMIClass('SchemaViewerApp', {
	/*---------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*---------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		/*-----------------------------------------------------------------*/

		$('#ami_breadcrumb_content').css('display', 'none');

		/*-----------------------------------------------------------------*/

		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/SchemaViewer/twig/SchemaViewerApp.twig',
			'subapps/SchemaViewer/css/SchemaViewerApp.css',
			/**/
			'ctrl:schema',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this, dict: {command: userdata}}).done(function() {

				/*---------------------------------*/
				/* DROP ZONE                       */
				/*---------------------------------*/

				var dropZone = document.getElementById('EFAEDA1C_C8B2_46EA_AC47_A591A0704FE3');

				dropZone.addEventListener('dragover', this.handleDragOver, false);
				dropZone.addEventListener('drop'    , this.handleDrop    , false);

				/*---------------------------------*/
				/* EDITOR                          */
				/*---------------------------------*/

				$('#C6DDFAF6_9E75_41C5_87BD_0896B5299559').outerHeight(
					$(document).height() - $('#C6DDFAF6_9E75_41C5_87BD_0896B5299559').offset().top - 8
				);

				/*---------------------------------*/

				var that = this;

				this.schema = new data[2]();

				this.schema.render('#C6DDFAF6_9E75_41C5_87BD_0896B5299559').done(function() {

					/*---------------------------------*/
					/* DEFAULT CATALOG                 */
					/*---------------------------------*/

					$('#D015B3C1_B150_4E27_99D9_A628B3F9B0AC').change(function() {

						that.defaultCatalog = $('#D015B3C1_B150_4E27_99D9_A628B3F9B0AC option:selected').val();
					});

					that.defaultCatalog = userdata;

					/*---------------------------------*/

					amiWebApp.loadResources([
						'js/3rd-party/jscolor.min.js'
					]);

					/*---------------------------------*/

					result.resolve();
				});
			});

		}).fail(function(data) {

			result.reject(data);
		});

		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/

	onLogin: function()
	{
		var result = $.Deferred();

		amiCommand.execute('GetSchemas', {context: this}).done(function(data1) {

			this.columns = amiWebApp.jspath('..rowset{.@type==="columns"}.row', data1);
			this.foreignKeys = amiWebApp.jspath('..rowset{.@type==="foreignKeys"}.row', data1);

			amiCommand.execute('ListCatalogs', {context: this}).done(function(data2) {

				var s = '<option value="" style="display: none;">Choose a catalog</option>';

				$.each(amiWebApp.jspath('..field{.@name==="externalCatalog"}.$', data2), function(index, value) {

					if(value !== 'self' || amiLogin.hasRole('AMI_ADMIN'))
					{
 						if(value === this.defaultCatalog)
						{
							s += '<option value="' + amiWebApp.textToHtml(value) + '" selected="selected">' + amiWebApp.textToHtml(value) + '</option>';
						}
						else
						{
							s += '<option value="' + amiWebApp.textToHtml(value) + '" xxxxxxxx="xxxxxxxx">' + amiWebApp.textToHtml(value) + '</option>';
						}
					}
				}, this);

				this.openSchema().done(function() {

					$('#D015B3C1_B150_4E27_99D9_A628B3F9B0AC').html(s);

					$('#D015B3C1_B150_4E27_99D9_A628B3F9B0AC').prop('disabled', false);

					$('#A9A20536_D366_4AFE_96E3_56E3FAF52179').prop('disabled', false);
					$('#D342245F_B95E_4CAB_84C5_53B509C28319').prop('disabled', false);

					$('#A8A2E848_F02A_40C7_8327_53F73B1B2BD6').prop('disabled', false);
					$('#DA57C571_E294_4D75_B36F_FF6BB066D504').prop('disabled', false);

					result.resolve();

				}).fail(function(data) {

					result.reject(data);
				});

			}).fail(function(data) {

				result.reject(data);
			});

		}).fail(function(data) {

			result.reject(data);
		});

		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/

	onLogout: function()
	{
		this.schema.clear();

		$('#D015B3C1_B150_4E27_99D9_A628B3F9B0AC').empty();

		$('#D015B3C1_B150_4E27_99D9_A628B3F9B0AC').prop('disabled', true);

		$('#A9A20536_D366_4AFE_96E3_56E3FAF52179').prop('disabled', true);
		$('#D342245F_B95E_4CAB_84C5_53B509C28319').prop('disabled', true);

		$('#A8A2E848_F02A_40C7_8327_53F73B1B2BD6').prop('disabled', true);
		$('#DA57C571_E294_4D75_B36F_FF6BB066D504').prop('disabled', true);
	},

	/*---------------------------------------------------------------------*/

	handleDragOver: function(e)
	{
		e.stopPropagation();
		e.preventDefault();

		e.dataTransfer.dropEffect = 'copy';
	},

	/*---------------------------------------------------------------------*/

	handleDrop: function(e)
	{
		e.stopPropagation();
		e.preventDefault();

		var files = e.dataTransfer.files;

		for(var i = 0, file; (file = files[i]); i++)
		{
			var reader = new FileReader();

			reader.onload = function(e)
			{
				try
				{
					var json = JSON.parse(e.target.result);

					schemaViewerApp.schema.setJSON(json);
				}
				catch(e)
				{
					amiWebApp.error(e, true);
				}
			};

			reader.readAsText(file);
		}
	},

	/*---------------------------------------------------------------------*/

	setPaperHeight: function(height)
	{
		$('#C6DDFAF6_9E75_41C5_87BD_0896B5299559').outerHeight(height);
	},

	/*---------------------------------------------------------------------*/

	openSchema: function()
	{
		amiWebApp.lock();

		return this.schema.refresh(this.defaultCatalog, {context: this}).done(function() {

			window.history.pushState('', '', amiWebApp.webAppURL + '?subapp=schemaViewer&userdata=' + encodeURIComponent(this.defaultCatalog));

			amiWebApp.unlock();

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});
	},

	/*---------------------------------------------------------------------*/

	saveSchema: function()
	{
		if(!this.defaultCatalog)
		{
			return;
		}

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		/*-----------------------------------------------------------------*/

		var custom = {};

		$.each(this.schema.graph.getCells(), function(index, value) {

			if(value.get('type') === 'sql.Table')
			{
				var position = value.get('position');
				var topColor = value.get('topColor');
				var bodyColor = value.get('bodyColor');
				var strokeColor = value.get('strokeColor');

				custom[value.get('table')] = {
					x: position.x,
					y: position.y,
					topColor: topColor,
					bodyColor: bodyColor,
					strokeColor: strokeColor,
				};
			}
		});

		/*-----------------------------------------------------------------*/

		if(jQuery.isEmptyObject(custom) === false)
		{
			/*-------------------------------------------------------------*/

			var text = JSON.stringify(custom);

			/*-------------------------------------------------------------*/

			amiCommand.execute('SetJSONSchema -catalog="' + amiWebApp.textToString(this.defaultCatalog) + '" -json="' + amiWebApp.textToString(text) + '"').done(function(data) {

				amiWebApp.success(amiWebApp.jspath('..info.$', data), true);

			}).fail(function(data) {

				amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
			});

			/*-------------------------------------------------------------*/
		}

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	exportSchema: function()
	{
		this.schema.exportSchema();
	},

	/*---------------------------------------------------------------------*/

	printSchema: function()
	{
		this.schema.printSchema();
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

schemaViewerApp = new SchemaViewerApp();

/*-------------------------------------------------------------------------*/
