/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 * @global saveAs
 *
 */

/*-------------------------------------------------------------------------*/
/* AMITableApp                                                             */
/*-------------------------------------------------------------------------*/

$AMIClass('AMITableApp', {
	/*-----------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*-----------------------------------------------------------------*/

	onReady: function(userdata)
	{
		amiWebApp.loadSheets([
			'subapps/Table/css/AMITableApp.css',
		]);

		amiWebApp.loadScripts([
			'subapps/Table/js/autoiframe.js',
			'components/TextViewer/js/AMITextViewerComp.js',
		]);

		$('#ami_jumbotron_title').html('Command Line');
		$('#ami_jumbotron_content').html('Execute AMI commands');
		$('#ami_breadcrumb_content').html('<li>Tools</li><li><a href="' + amiWebApp.webAppURL + '?subapp=amiTable">Table</a></li>');

		var result = $.Deferred();

		amiWebApp.loadHTMLs([
			'subapps/Table/twig/AMITableApp.twig',
			'subapps/Table/twig/Fragment/table.twig',
			'subapps/Table/twig/Fragment/tab.twig',
			'subapps/Table/twig/Fragment/stats.twig',
			'subapps/Table/twig/Fragment/groupBy.twig',
			'subapps/Table/twig/Fragment/details.twig',
			'subapps/Table/twig/Fragment/iFrameTab.twig',
			'subapps/Table/twig/Modal/formater.twig',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this}).done(function() {

				this.fragmentTablePanel = data[0];
				this.fragmentTable = data[1];
				this.fragmentTab = data[2];
				this.fragmentStats = data[3];
				this.fragmentGroupBy = data[4];
				this.fragmentDetails = data[5];
				this.fragmentIframeTab = data[6];

				$('body').append(data[7]);

				this.uniqueKey = '';

				this.sortingDirection = '';
				this.sortingField = '';
				this.filters = [];
				console.log(this.filters);

				this.query = userdata ? JSON.parse(userdata) : {
						entity : 'dataset',
						query : 'SELECT default WHERE dataset.amiStatus=\'VALID\'',
						project : 'data16_001',
						processing_step : 'real_data',
				};

				$('#ami_table_edit_button').bootstrapToggle('disable');

				result.resolve();
			});


		}).fail(function() {

			result.reject();
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
//		if(amiLogin.hasRole('AMI_administrator_role'))
		{
			$('#ami_table_edit_button').bootstrapToggle('enable');
		}

		this.refresh();

	},

	/*-----------------------------------------------------------------*/

	onLogout: function()
	{
	},

	/*-----------------------------------------------------------------*/

	onExit: function()
	{
	},

	/*-----------------------------------------------------------------*/

	refresh: function()
	{
		if($('#ami_table_edit_button').prop('checked'))
		{
			$('#ami_table_edit_button').bootstrapToggle('off');
			$('#ami_table .editable').attr('contenteditable', 'false');
		}

		if ($('#ami_table_start_index').val() === '0'){
			$('#ami_table_start_index').val('1');
		}
		if ($('#ami_table_stop_index').val() < $('#ami_table_start_index').val()){
			$('#ami_table_stop_index').val($('#ami_table_start_index').val());
		}

		var startIndex = parseInt($('#ami_table_start_index').val())-1;
		var stopIndex = parseInt($('#ami_table_stop_index').val());
		var nbElements = (stopIndex - startIndex);

		console.log(this.filters);
		var where = this.filters.length > 0 ? ' AND ' + this.filters.join(' AND ') : '';

		var command = 'BrowseSQLQuery -gLiteEntity="' + this.query.entity + '" -gLiteQuery="' + this.query.query + where + '" -project="' + this.query.project + '" -processingStep="' + this.query.processing_step + '" -mode="defaultField" -amiAdvanced="ON" -startIndex="' + startIndex + '"-nbElements="' + nbElements + '" -orderBy="' + this.sortingField + '" orderWay="' + this.sortingDirection + '"';

		amiWebApp.lock();

		amiCommand.execute(command, {context: this}).done(function(data) {

			var rows = amiWebApp.jspath('..rowset{.@type==="Element_Info"}.row', data);

			this.uniqueKey = amiWebApp.jspath('..Result.uniqueKey.$', data)[0] || 'identifier';

			amiWebApp.replaceHTML('#ami_table_content', this.fragmentTable, {context: this, dict: {rows: rows}}).done(function() {

				$('#ami_table_resultTab_title').html(this.query.project + '/' + this.query.processing_step + '/' + this.query.entity);

				$('#ami_table_result_navbar_entity').html((this.query.entity).bold());
				$('#ami_table_result_navbar_records').html((amiWebApp.jspath('..totalNumberOfElements.$', data) + ' records'));

				$('#ami_table_more_amicommand').attr('href', amiWebApp.webAppURL + '?subapp=amiCommand&userdata=' + encodeURIComponent(command));

				$('#ami_table_more_condition_clauses').attr('href', 'javascript: amiTextViewerComp.show(\'' + amiWebApp.htmlToString(amiWebApp.textToHtml(
						amiWebApp.jspath('..Result.gLiteCondition.$', data)[0] || ''
				)) + '\');');

				$('#ami_table_more_sql').attr('href', 'javascript: amiTextViewerComp.show(\'' + amiWebApp.htmlToString(amiWebApp.textToHtml(
						amiWebApp.jspath('..Result.sql.$', data)[0] || ''
				)) + '\');');

				$('#ami_table_more_glite').attr('href', 'javascript: amiTextViewerComp.show(\'' + amiWebApp.htmlToString(amiWebApp.textToHtml(
						amiWebApp.jspath('..Result.gLiteQuery.$', data)[0] || ''
				)) + '\');');

				window.history.pushState('', '', amiWebApp.webAppURL + '?subapp=amiTable&userdata=' + encodeURIComponent(JSON.stringify(this.query)));

				$('.nav-tabs a[href="#ami_table_result"]').tab('show');

				this.setUnit();

				document.getElementById('ami_table_start_index').addEventListener('keypress', function(e) {

					if(e.keyCode == 13)
					{
						amiTableApp.refresh();
					}
				});

				document.getElementById('ami_table_stop_index').addEventListener('keypress', function(e) {

					if(e.keyCode == 13)
					{
						amiTableApp.refresh();
					}
				});

				amiWebApp.unlock();
			});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	},

	/*-----------------------------------------------------------------*/

	setUnit: function()
	{
		$('.editable').each(function() {
			/*-----------------------------------------------------------------*/
			/*                                                                 */
			/*-----------------------------------------------------------------*/

			var unitValue = $(this).text();

			/*-----------------------------------------------------------------*/
			/*                                                                 */
			/*-----------------------------------------------------------------*/

			var unitName = $(this).attr('data-unitName');
			var unitFactor = $(this).attr('data-unitFactor');
			var unitBase = $(this).attr('data-unitBase');

			if(!unitName && !unitFactor && !unitBase)
			{
				return;
			}

			if(unitValue === 'N/A')
			{
				unitValue = '0';
			}

			/*-----------------------------------------------------------------*/

			$(this).attr('data-origValue', unitValue);
			$(this).attr('data-origFactor', unitFactor);

			/*-----------------------------------------------------------------*/
			/*                                                                 */
			/*-----------------------------------------------------------------*/

			$(this).addClass('ami-representation');

			/*-----------------------------------------------------------------*/
			/*                                                                 */
			/*-----------------------------------------------------------------*/

			var scale = 0.0;

			var base = parseFloat(unitBase);

			var norm_value = parseFloat(unitValue) * amiTableApp.getFactorFlt(unitFactor, base);

			if(norm_value !== 0.0)
			{
				scale = Math.log(norm_value) / Math.log(base);

				/**/ if(scale > 0.0) {
					scale = Math.ceil(scale - 1);
				}
				else if(scale < 0.0) {
					scale = Math.floor(scale - 0);
				}
			}

			norm_factor = amiTableApp.getFactorStr(Math.pow(base, scale), base);

			/*-----------------------------------------------------------------*/
			/*                                                                 */
			/*-----------------------------------------------------------------*/

			$(this).attr('data-unitValue', norm_value);
			$(this).attr('data-unitFactor', norm_factor);

			$(this).attr('onclick', 'amiTableApp.showFormaterModal(this)');

			/*-----------------------------------------------------------------*/
			/*                                                                 */
			/*-----------------------------------------------------------------*/

			amiTableApp.numFormaterRepr(this);

			/*-----------------------------------------------------------------*/
		});
	},

	/*-----------------------------------------------------------------*/

	numFormaterRepr: function(tag)
	{
		/*-----------------------------------------------------------------*/
		/*                                                                 */
		/*-----------------------------------------------------------------*/

		var origValue = $(tag).attr('data-origValue');
		var origFactor = $(tag).attr('data-origFactor');

		var unitValue = $(tag).attr('data-unitValue');
		var unitName = $(tag).attr('data-unitName');
		var unitFactor = $(tag).attr('data-unitFactor');
		var unitBase = $(tag).attr('data-unitBase');

		var humanReadable = $(tag).attr('data-humanReadable');

		/*-----------------------------------------------------------------*/
		/*                                                                 */
		/*-----------------------------------------------------------------*/

		if(humanReadable.trim().toLowerCase() !== 'false')
		{
			var val = parseFloat(unitValue) / amiTableApp.getFactorFlt(unitFactor, parseFloat(unitBase));

			$(tag).text(val.toFixed(3) + ' ' + unitFactor + unitName);
		}
		else
		{
			$(tag).text(origValue + ' ' + origFactor + unitName);
		}

		/*-----------------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	showFormaterModal: function(tag)
	{
		if($('#ami_table_edit_button').prop('checked'))
		{
			return;
		}

		/*-----------------------------------------------------------------*/
		/*                                                                 */
		/*-----------------------------------------------------------------*/

		var origValue = $(tag).attr('data-origValue');
		var origFactor = $(tag).attr('data-origFactor');


		var unitName = $(tag).attr('data-unitName');
		var unitFactor = $(tag).attr('data-unitFactor');
		var unitBase = $(tag).attr('data-unitBase');

		var humanReadable = $(tag).attr('data-humanReadable');

		/*-----------------------------------------------------------------*/
		/*                                                                 */
		/*-----------------------------------------------------------------*/

		$('#ami_table_formater_origValue').text(origValue + ' ' + origFactor + unitName);

		$('#ami_table_formater_unitName').val(unitName);
		$('#ami_table_formater_unitFactor').val(unitFactor);
		$('#ami_table_formater_unitBase').val(unitBase);

		if(humanReadable.trim().toLowerCase() !== 'false')
		{
			$('#ami_table_formater_humanReadable').prop('checked', true);
		}
		else
		{
			$('#ami_table_formater_humanReadable').prop('checked', false);
		}

		/*-----------------------------------------------------------------*/
		/*                                                                 */
		/*-----------------------------------------------------------------*/

		this.currentTag = tag;

		/*-----------------------------------------------------------------*/
		/*                                                                 */
		/*-----------------------------------------------------------------*/

		$('#modal_table_formater').modal('show');

		/*-----------------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	applyFormater: function()
	{
		/*-----------------------------------------------------------------*/
		/*                                                                 */
		/*-----------------------------------------------------------------*/

		$(this.currentTag).attr('data-unitName', $('#ami_table_formater_unitName').val());
		$(this.currentTag).attr('data-unitFactor', $('#ami_table_formater_unitFactor option:selected').val());
		$(this.currentTag).attr('data-unitBase', $('#ami_table_formater_unitBase option:selected').val());

		/*-----------------------------------------------------------------*/
		/*                                                                 */
		/*-----------------------------------------------------------------*/

		if($('#ami_table_formater_humanReadable').prop('checked'))
		{
			$(this.currentTag).attr('data-humanReadable', 'true');
		}
		else
		{
			$(this.currentTag).attr('humanReadable', 'false');
		}

		/*-----------------------------------------------------------------*/
		/*                                                                 */
		/*-----------------------------------------------------------------*/

		this.numFormaterRepr(this.currentTag);

		/*-----------------------------------------------------------------*/
		/*                                                                 */
		/*-----------------------------------------------------------------*/

		$('#modal_table_formater').modal('hide');

		/*-----------------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	prev: function()
	{
		var old_start = parseInt($('#ami_table_start_index').val());
		var old_stop = parseInt($('#ami_table_stop_index').val());

		if(!old_start)
		{
			old_start = 1;
		}

		if(!old_stop)
		{
			old_stop = 15;
		}

		var range = (old_stop - old_start) + 1;

		var new_start = old_start - range;
		var new_stop = old_stop - range;

		if(new_start >= 1 && new_stop >= 1)
		{
			$('#ami_table_start_index').val(new_start);
			$('#ami_table_stop_index').val(new_stop);
		}
		else
		{
			$('#ami_table_start_index').val(0x0001);
			$('#ami_table_stop_index').val(range);
		}

		this.refresh();
	},

	/*-----------------------------------------------------------------*/

	next: function()
	{
		var old_start = parseInt($('#ami_table_start_index').val());
		var old_stop = parseInt($('#ami_table_stop_index').val());

		if(!old_start)
		{
			old_start = 1;
		}

		if(!old_stop)
		{
			old_stop = 15;
		}

		var range = (old_stop - old_start) + 1;

		var new_start = old_start + range;
		var new_stop = old_stop + range;

		if(new_start >= 1 && new_stop >= 1)
		{
			$('#ami_table_start_index').val(new_start);
			$('#ami_table_stop_index').val(new_stop);
		}
		else
		{
			$('#ami_table_start_index').val(0x0001);
			$('#ami_table_stop_index').val(range);
		}

		this.refresh();
	},

	/*-----------------------------------------------------------------*/

	editTable: function()
	{
		var tags = $('#ami_table .editable');

		if($('#ami_table_edit_button').prop('checked'))
		{
			tags.attr('contenteditable', 'true');

			for(var i = 0; i <= tags.length - 1; i++)
			{

				$(tags[i]).keypress(function(e) {

					if (e.keyCode == 13)
					{
						e.preventDefault();

						return false;
					}
				});

				if(typeof(tags[i].onfocus) != 'function'
					&&
					typeof(tags[i].onblur) != 'function'
				){
					tags[i].onfocus = function()
					{
						this.data_orig = this.innerHTML;

						var unitName = $(this).attr('data-unitName');
						var unitFactor = $(this).attr('data-unitFactor');
						var unitBase = $(this).attr('data-unitBase');

						if(!unitName && !unitFactor && !unitBase)
						{
							return;
						}
						else
						{
							$(this).attr('data-unitFactor', '');

							var unitValue = $(this).attr('data-unitValue');
							var unitFactor = $(this).attr('data-unitFactor');

							var humanReadable = $(this).attr('data-humanReadable');

							if(humanReadable.trim().toLowerCase() !== 'false')
							{
								var val = parseFloat(unitValue) / amiTableApp.getFactorFlt(unitFactor, parseFloat(unitBase));

								if(Math.floor(val) === val)
								{
									$(this).text(val);
								}
								else
								{
									$(this).text(val.toFixed(3));
								}

							}
							else
							{
								$(tag).text(origValue + ' ' + origFactor);
							}

						}
					};

					tags[i].onblur = function()
					{
						$(this).attr('data-unitValue', this.innerHTML).val();

						amiTableApp.setUnit();

						if(this.data_orig != this.innerHTML)
						{
							amiWebApp.lock();

							amiCommand.execute('UpdateElement -project="' + amiTableApp.query.project + '" -processingStep="' + amiTableApp.query.processing_step + '" -entity="' + amiTableApp.query.entity + '" -' + amiTableApp.uniqueKey + '="' + amiWebApp.textToString($(this).attr('data-row')) + '" -updateField="' + amiWebApp.textToString($(this).attr('data-col')) + '" -updateValue="' + amiWebApp.textToString(this.innerHTML) + '"', {context: this}).done(function(data) {

								amiWebApp.success(amiWebApp.jspath('..info.$', data)[0]);

							}).fail(function(data) {

								this.innerHTML = this.data_orig;

								amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
							});
						}

						$(this).text(this.innerHTML);
					};
				}
			}
		}
		else
		{
			tags.attr('contenteditable', 'false');
		}
	},

	/*-----------------------------------------------------------------*/

	bookmark: function()
	{
		amiWebApp.lock();

		amiCommand.execute('AddBookmark -url="' + amiWebApp.textToString(window.location.href) + '"').done(function(data) {

			amiWebApp.success(amiWebApp.jspath('..info.$', data)[0]);

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	},

	/*-----------------------------------------------------------------*/

	sortTable: function(sortingDirection, sortingField)
	{
		this.sortingDirection = sortingDirection;
		this.sortingField = sortingField;

		this.refresh();
	},

	/*-----------------------------------------------------------------*/

	submitFilter: function(field, operation, value)
	{
		this.filters.push(field + ' ' + operation + ' \'' + amiWebApp.textToString(value) + '\'');

		$("[data-toggle='popover']").popover('hide');

		this.refresh();
	},

	/*-----------------------------------------------------------------*/

	stats: function(field)
	{
		var command = 'BrowseSQLQuery -project="' + this.query.project + '" -processingStep="' + this.query.processing_step + '" -gLiteEntity="' + this.query.entity + '" -gLiteQuery="' + this.query.query + '" -stats="' + this.query.entity + '.' + field + '"';

		amiWebApp.lock();

		amiCommand.execute(command, {context: this}).done(function(data) {

			var row = amiWebApp.jspath('..rowset{.@type==="Element_Info"}.row', data)[0] || {};

			this.createTab('stats', {context: this}).done(function(tabCnt) {

				var dict = {
					tabCnt: tabCnt,
					command: command,
					row: row,
				};

				amiWebApp.appendHTML('#ami_table_tab_content', this.fragmentStats, {context: this, dict: dict}).done(function() {

					$('.nav-tabs a[href="#ami_table_tab' + tabCnt + '"]').tab('show');

					amiWebApp.unlock();
				});
			});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	},

	/*-----------------------------------------------------------------*/

	groupBy: function(field)
	{
		var command = 'BrowseSQLQuery -project="' + this.query.project + '" -processingStep="' + this.query.processing_step + '" -gLiteEntity="' + this.query.entity + '" -gLiteQuery="' + this.query.query + '" -groupBy="' + this.query.entity + '.' + field + '"';

		amiWebApp.lock();

		amiCommand.execute(command, {context: this}).done(function(data) {

			var rows = amiWebApp.jspath('..rowset{.@type==="Element_Info"}.row', data);

			this.createTab('group by', {context: this}).done(function(tabCnt) {

				var dict = {
					tabCnt: tabCnt,
					command: command,
					rows: rows,
				};

				amiWebApp.appendHTML('#ami_table_tab_content', this.fragmentGroupBy, {context: this, dict: dict}).done(function() {

					$('.nav-tabs a[href="#ami_table_tab' + tabCnt + '"]').tab('show');

					amiWebApp.unlock();
				});
			});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	},

	/*-----------------------------------------------------------------*/

	details: function(RowId)
	{

		var command = 'GetElementInfo -project="' + this.query.project + '" -processingStep="' + this.query.processing_step + '" -entityName="' + this.query.entity + '" -elementID="' + RowId + '"';

		amiWebApp.lock();

		amiCommand.execute(command, {context: this}).done(function(data) {

			this.createTab('details', {context: this}).done(function(tabCnt) {

				var dict = {
					tabCnt: tabCnt,
					command: command,
					elementInfo: amiWebApp.jspath('..rowset{.@type==="Element_Info"}', data),
					elementChild: amiWebApp.jspath('..rowset{.@type==="Element_Child"}', data),
					extraInfo: amiWebApp.jspath('..rowset{.@type!=="Element_Info" && .@type!=="Element_Child"}', data),
				};

				amiWebApp.appendHTML('#ami_table_tab_content', this.fragmentDetails, {context: this, dict: dict}).done(function() {

					$('.nav-tabs a[href="#ami_table_tab' + tabCnt + '"]').tab('show');

					amiWebApp.unlock();
				});
			});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});

	},

	/*-----------------------------------------------------------------*/

	detailLink: function(entity,query)
	{
		var command = 'BrowseSQLQuery -gLiteEntity="' + entity + '" -gLiteQuery="' + query + '" -project="' + this.query.project + '" -processingStep="' + this.query.processing_step + '" -mode="defaultField" -amiAdvanced="ON" -startIndex="' + startIndex + '"-nbElements="' + nbElements + '" -orderBy="' + this.sortingField + '" orderWay="' + this.sortingDirection + '"';
		alert(command);
	},

	/*-----------------------------------------------------------------*/

	_tabCnt: 0,

	/*-----------------------------------------------------------------*/

	createTab: function(title, settings)
	{
		var context = null;

		if(settings)
		{
			if('context' in settings) {
				context = settings['context'];
			}
		}

		var cnt = this._tabCnt++;

		var dict = {
				cnt: cnt,
				title: this.query.project + '/' + this.query.processing_step + '/' + title,
		}

		var result = $.Deferred();

		amiWebApp.appendHTML('#ami_table_nav_tabs', this.fragmentTab, {dict: dict}).done(function() {

			if(context) {
				result.resolveWith(context, [cnt]);
			} else {
				result.resolve(cnt);
			}
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	createIFrameTab: function(title, command)
	{
		amiWebApp.lock();

		var cnt = this._tabCnt++;

		var dict = {
				cnt: cnt,
				title: this.query.project + '/' + this.query.processing_step + '/' + title,
				command: command,
		}

		var converter = 'AMIProdFrameHTML.xsl';

		amiWebApp.appendHTML('#ami_table_nav_tabs', this.fragmentTab, {context: this, dict: dict}).done(function() {

			amiWebApp.appendHTML('#ami_table_tab_content', this.fragmentIframeTab, {context: this, dict: dict}).done(function() {

				amiCommand.execute(command + ' -uimode="bootstrap" -additionalFields', {context: this, converter: converter}).always(function(data) {

					document.getElementById('ami_table_tab_iframe' + cnt).contentWindow.document.write(data);
				});

				$('.nav-tabs a[href="#ami_table_tab' + cnt + '"]').tab('show');

				amiWebApp.unlock();
			});
		});
	},

	/*-----------------------------------------------------------------*/

	closeTab: function(selector)
	{
		$('#ami_table_nav_tabs a:first').tab('show');

		$('.nav-tabs a[href="' + selector + '"]').parent().remove();

		$(selector).remove();
	},

	/*-----------------------------------------------------------------*/

	getFactorStr: function(factor, base)
	{
		var result = '?';

		/**/ if(base == 1000.0)
		{
			/**/ if(factor === 1.0e+24) {
				result = 'Y';
			}
			else if(factor === 1.0e+21) {
				result = 'Z';
			}
			else if(factor === 1.0e+18) {
				result = 'E';
			}
			else if(factor === 1.0e+15) {
				result = 'P';
			}
			else if(factor === 1.0e+12) {
				result = 'T';
			}
			else if(factor === 1.0e+9) {
				result = 'G';
			}
			else if(factor === 1.0e+6) {
				result = 'M';
			}
			else if(factor === 1.0e+3) {
				result = 'k';
			}
			else if(factor === 1.0) {
				result = '';
			}
			else if(factor === 1.0e-3) {
				result = 'm';
			}
			else if(factor === 1.0e-6) {
				result = 'u';
			}
			else if(factor === 1.0e-9) {
				result = 'n';
			}
			else if(factor === 1.0e-12) {
				result = 'p';
			}
			else if(factor === 1.0e-15) {
				result = 'f';
			}
			else if(factor === 1.0e-18) {
				result = 'a';
			}
			else if(factor === 1.0e-21) {
				result = 'z';
			}
			else if(factor === 1.0e-24) {
				result = 'y';
			}
		}
		else if(base == 1024.0)
		{
			/**/ if(factor === 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0) {
				result = 'Y';
			}
			else if(factor === 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0) {
				result = 'Z';
			}
			else if(factor === 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0) {
				result = 'E';
			}
			else if(factor === 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0) {
				result = 'P';
			}
			else if(factor === 1024.0 * 1024.0 * 1024.0 * 1024.0) {
				result = 'T';
			}
			else if(factor === 1024.0 * 1024.0 * 1024.0) {
				result = 'G';
			}
			else if(factor === 1024.0 * 1024.0) {
				result = 'M';
			}
			else if(factor === 1024.0) {
				result = 'k';
			}
			else if(factor === 1.0) {
				result = '';
			}
		}

		return result;
	},

	/*-----------------------------------------------------------------*/

	getFactorFlt: function(factor, base)
	{
		var result = 1.0;

		/**/ if(base == 1000.0)
		{
			/**/ if(factor === 'Y') {
				result = 1.0e+24;
			}
			else if(factor === 'Z') {
				result = 1.0e+21;
			}
			else if(factor === 'E') {
				result = 1.0e+18;
			}
			else if(factor === 'P') {
				result = 1.0e+15;
			}
			else if(factor === 'T') {
				result = 1.0e+12;
			}
			else if(factor === 'G') {
				result = 1.0e+9;
			}
			else if(factor === 'M') {
				result = 1.0e+6;
			}
			else if(factor === 'k') {
				result = 1.0e+3;
			}
			else if(factor === '') {
				result = 1.0;
			}
			else if(factor === 'm') {
				result = 1.0e-3;
			}
			else if(factor === 'u') {
				result = 1.0e-6;
			}
			else if(factor === 'n') {
				result = 1.0e-9;
			}
			else if(factor === 'p') {
				result = 1.0e-12;
			}
			else if(factor === 'f') {
				result = 1.0e-15;
			}
			else if(factor === 'a') {
				result = 1.0e-18;
			}
			else if(factor === 'z') {
				result = 1.0e-21;
			}
			else if(factor === 'y') {
				result = 1.0e-24;
			}
		}
		else if(base == 1024.0)
		{
			/**/ if(factor === 'Y') {
				result = 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0;
			}
			else if(factor === 'Z') {
				result = 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0;
			}
			else if(factor === 'E') {
				result = 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0;
			}
			else if(factor === 'P') {
				result = 1024.0 * 1024.0 * 1024.0 * 1024.0 * 1024.0;
			}
			else if(factor === 'T') {
				result = 1024.0 * 1024.0 * 1024.0 * 1024.0;
			}
			else if(factor === 'G') {
				result = 1024.0 * 1024.0 * 1024.0;
			}
			else if(factor === 'M') {
				result = 1024.0 * 1024.0;
			}
			else if(factor === 'k') {
				result = 1024.0;
			}
			else if(factor === '') {
				result = 1.0;
			}
		}

		return result;
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiTableApp = new AMITableApp();

amiRegisterSubApp('amiTable', amiTableApp, {});

/*-------------------------------------------------------------------------*/
/* GLOBAL FUNCTION                                                         */
/*-------------------------------------------------------------------------*/

function executeLinkedAMICommandTab(title, command)
{
	amiTableApp.createIFrameTab(title, command);
}

/*-------------------------------------------------------------------------*/
