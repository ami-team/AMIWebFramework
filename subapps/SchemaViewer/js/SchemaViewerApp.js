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
			'js/3rd-party/jscolor.min.js',
			'subapps/SchemaViewer/twig/SchemaViewerApp.twig',
			'subapps/SchemaViewer/css/SchemaViewerApp.css',
			/**/
			'ctrl:schema',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[1], {context: this, dict: {command: userdata}}).done(function() {

				/*---------------------------------------------------------*/
				/* COLOR PICKER                                            */
				/*---------------------------------------------------------*/

				this.colorPicker = new jscolor('F542C5DA_46FD_6A57_76CB_9A6A949E7F39', {hash: true});

				/*---------------------------------------------------------*/
				/* DROP ZONE                                               */
				/*---------------------------------------------------------*/

				var dropZone = document.getElementById('EFAEDA1C_C8B2_46EA_AC47_A591A0704FE3');

				dropZone.addEventListener('dragover', this.handleDragOver, false);
				dropZone.addEventListener('drop'    , this.handleDrop    , false);

				/*---------------------------------------------------------*/
				/* EDITOR                                                  */
				/*---------------------------------------------------------*/

				$('#C6DDFAF6_9E75_41C5_87BD_0896B5299559').outerHeight(
					$(document).height() - $('#C6DDFAF6_9E75_41C5_87BD_0896B5299559').offset().top - 8
				);

				/*---------------------------------------------------------*/

				var that = this;

				this.schema = new data[3]();

				this.schema.render('#C6DDFAF6_9E75_41C5_87BD_0896B5299559', {
					onFocus: function(cell) {

						if(cell) {
							that.colorPicker.fromString(cell.getColor());
						}
					},
					onBlur: function(cell) {

						if(true) {
							that.colorPicker.fromString(((('#0066CC'))));
						}
					},
				}).done(function() {

					/*-----------------------------------------------------*/

					$('#D015B3C1_B150_4E27_99D9_A628B3F9B0AC').change(function() {

						that.defaultCatalog = $('#D015B3C1_B150_4E27_99D9_A628B3F9B0AC option:selected').val();
					});

					that.defaultCatalog = /*-----------------------*/ userdata /*-----------------------*/;

					/*-----------------------------------------------------*/

					result.resolve();
				});

				/*---------------------------------------------------------*/

			});

		}).fail(function(message) {

			result.reject(message);
		});

		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/

	onLogin: function()
	{
		var result = $.Deferred();

		amiCommand.execute('ListCatalogs', {context: this}).done(function(data) {

			var L = ['<option value="" style="display: none;">Choose a catalog</option>'];

			$.each(amiWebApp.jspath('..field{.@name==="externalCatalog"}.$', data), function(index, value) {

				if(value === this.defaultCatalog) {
					L.push('<option value="' + amiWebApp.textToHtml(value) + '" selected="selected">' + amiWebApp.textToHtml(value) + '</option>');
				}
				else {
					L.push('<option value="' + amiWebApp.textToHtml(value) + '" xxxxxxxx="xxxxxxxx">' + amiWebApp.textToHtml(value) + '</option>');
				}

			}, this);

			this.openSchema().done(function() {

				var disable = amiLogin.hasRole('AMI_ADMIN') === false;

				$('#D015B3C1_B150_4E27_99D9_A628B3F9B0AC').html(L.join(''));

				$('#D015B3C1_B150_4E27_99D9_A628B3F9B0AC').prop('disabled', false);

				$('#A9A20536_D366_4AFE_96E3_56E3FAF52179').prop('disabled', false);
				$('#D342245F_B95E_4CAB_84C5_53B509C28319').prop('disabled', disable);

				if(disable)
				{
					$('#D316F050_F66C_8D02_33A0_CFF920BEF817').hide();
					$('#A20151B8_B578_A3F1_AF65_FB5AE59287E6').hide();
				}
				else
				{
					$('#D316F050_F66C_8D02_33A0_CFF920BEF817').show();
					$('#A20151B8_B578_A3F1_AF65_FB5AE59287E6').show();
				}

				$('#F542C5DA_46FD_6A57_76CB_9A6A949E7F39').prop('disabled', disable);

				$('#A8A2E848_F02A_40C7_8327_53F73B1B2BD6').prop('disabled', false);
				$('#DA57C571_E294_4D75_B36F_FF6BB066D504').prop('disabled', false);

				result.resolve();

			}).fail(function(message) {

				alert('fffff');

				result.reject(message);
			});

		}).fail(function(data, message) {

			result.reject(message);
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

		$('#D316F050_F66C_8D02_33A0_CFF920BEF817').hide();
		$('#A20151B8_B578_A3F1_AF65_FB5AE59287E6').hide();

		$('#F542C5DA_46FD_6A57_76CB_9A6A949E7F39').prop('disabled', true);

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
				catch(message)
				{
					amiWebApp.error(message, true);
				}
			};

			reader.readAsText(file);
		}
	},

	/*---------------------------------------------------------------------*/

	openSchema: function()
	{
		amiWebApp.lock();

		return this.schema.refresh(this.defaultCatalog, {context: this, showShowTool: true, showEditTool: amiLogin.hasRole('AMI_ADMIN')}).done(function() {

			window.history.pushState('', '', amiWebApp.webAppURL + '?subapp=schemaViewer' + (this.defaultCatalog ? '&userdata=' + encodeURIComponent(this.defaultCatalog) : ''));

			amiWebApp.unlock();

		}).fail(function(message) {

			amiWebApp.error(message, true);
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

			if(value.get('type') === 'sql.Entity')
			{
				var position = value.getPosition();
				var color    = value.getColor()   ;

				custom[value.get('entity')] = {
					x: position.x,
					y: position.y,
					color: color,
				};
			}
		});

		/*-----------------------------------------------------------------*/

		if(jQuery.isEmptyObject(custom) === false)
		{
			/*-------------------------------------------------------------*/

			var text = JSON.stringify(custom);

			/*-------------------------------------------------------------*/

			amiCommand.execute('SetJSONSchema -catalog="' + amiWebApp.textToString(this.defaultCatalog) + '" -json="' + amiWebApp.textToString(text) + '"').done(function(data, message) {

				amiWebApp.success(message, true);

			}).fail(function(data, message) {

				amiWebApp.error(message, true);
			});

			/*-------------------------------------------------------------*/
		}

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	flushServerCachesFast: function()
	{
		/*-----------------------------------------------------------------*/

		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		/*-----------------------------------------------------------------*/

		amiCommand.execute('FlushServerCaches').done(function(data, message) {

			amiWebApp.success(message, true);

		}).fail(function(data, message) {

			amiWebApp.error(message, true);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	flushServerCachesSlow: function()
	{
		/*-----------------------------------------------------------------*/

		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		/*-----------------------------------------------------------------*/

		amiCommand.execute('FlushServerCaches -full').done(function(data, message) {

			amiWebApp.success(message, true);

		}).fail(function(data, message) {

			amiWebApp.error(message, true);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	setBoxColor: function(color)
	{
		var currentCell = this.schema.getCurrentCell();

		if(currentCell)
		{
			currentCell.setColor(color);
		}
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
