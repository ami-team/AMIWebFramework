/*!
 * AMISearchEngineApp class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* CLASS AMISearchEngineApp                                                */
/*-------------------------------------------------------------------------*/

$AMIClass('AMISearchEngineApp', {
	/*-----------------------------------------------------------------*/

	onReady: function(userdata) {

		var result = $.Deferred();

		amiWebApp.loadSheets([
			'subapps/SearchEngine/css/AMISearchEngineApp.css',
		]);

		$('#ami_jumbotron_title').html('SearchEngine');
		$('#ami_jumbotron_content').html('Search Engine');
		$('#ami_breadcrumb_content').html('<li><a>Search</a></li><li><a href="' + amiWebApp.webAppURL + '?subapp=amisearchengine">Search Engine</a></li>');

		amiWebApp.loadHTMLs([
			'subapps/SearchEngine/html/AMISearchEngineApp.html',
			'subapps/SearchEngine/html/Fragment/criteria.html',
			'subapps/SearchEngine/html/Fragment/criteria_string_few.html',
			'subapps/SearchEngine/html/Fragment/criteria_string_many.html',
			'subapps/SearchEngine/html/Fragment/criteria_number.html',
			'subapps/SearchEngine/html/Fragment/criteria_date.html',
			'subapps/SearchEngine/html/Fragment/result_tab.html',
			'subapps/SearchEngine/html/Fragment/result_content.html',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this}).done(function() {

				this.fragmentCriteria = data[1];
				this.fragmentCriteriaStringFew = data[2];
				this.fragmentCriteriaStringMany = data[3];
				this.fragmentCriteriaNumber = data[4];
				this.fragmentCriteriaDate = data[5];
				this.fragmentResultTab = data[6];
				this.fragmentResultContent = data[7];

				/*-----------------------------------------*/
				/* FILTER                                  */
				/*-----------------------------------------*/

				if(userdata) {
					this.interfaceFilter = '';

					/**/

					var interfaces = userdata.split(',');

					for(var i = 0; i < interfaces.length; i++) {

						var interface = interfaces[i].trim();

						if(interface !== '') {

							if(interface.indexOf('%') < 0) {
								this.interfaceFilter += ' OR `interface`=\'' + interface +  '\'';
							} else {
								this.interfaceFilter += ' OR `interface` LIKE \'' + interface +  '\'';
							}
						}
					}

					/**/

					this.interfaceFilter = (this.interfaceFilter) ? this.interfaceFilter.substring(4)
					                                              : '1=1'
					;
				} else {
					this.interfaceFilter = '1=1';
				}

				/*-----------------------------------------*/

				result.resolve();
			});

		}).fail(function() {
			result.reject();
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	onExit: function() {
	},

	/*-----------------------------------------------------------------*/

	onLogin: function() {
		/*---------------------------------------------------------*/
		/* GET INTERFACES                                          */
		/*---------------------------------------------------------*/

		if(!$('#ami_search_engine_interface_list').html().trim()) {

			amiCommand.execute('SearchQuery -catalog="self" -sql="SELECT `interface` FROM `router_search_interface` WHERE ' + this.interfaceFilter + '"', {context: this}).done(function(data) {

				var rows = amiWebApp.jspath('..row', data);

				var s = (this.interfaceFilter === '1=1') ? '<option value="">--select--</option>' : '';

				$.foreach(rows, function(index, row) {

					var interface = amiWebApp.jspath('..field{.@name==="interface"}.$', row)[0] || '';

					s += '<option value="' + interface + '">' + interface + '</option>'
				});

				$('#ami_search_engine_interface_list').html(s).promise().done(function() {

					$('#ami_search_engine_interface_list').change();
				});
			});
		}

		/*---------------------------------------------------------*/
		/* SHOW SERCH INTERFACE                                    */
		/*---------------------------------------------------------*/

		$('#ami_search_engine_tab_content').show();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	onLogout: function() {
		/*---------------------------------------------------------*/
		/* HIDE SERCH INTERFACE                                    */
		/*---------------------------------------------------------*/

		$('#ami_search_engine_tab_content').hide();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	onSessionExpired: function() {
	},

	/*-----------------------------------------------------------------*/

	setInterface: function(interface) {

		if(!interface) {
			return;
		}

		amiWebApp.lock();

		this.criteriaDict = {};

		$('#ami_search_engine_left').empty();
		$('#ami_search_engine_right').empty();

		amiCommand.execute('SearchQuery -catalog="self" -sql="SELECT `id`, `catalog`, `entity` FROM `router_search_interface` WHERE `interface`=\'' + interface + '\'"', {context: this}).done(function(data) {

			this.id = amiWebApp.jspath('..field{.@name==="id"}.$', data)[0] || '';
			this.catalog = amiWebApp.jspath('..field{.@name==="catalog"}.$', data)[0] || '';
			this.entity = amiWebApp.jspath('..field{.@name==="entity"}.$', data)[0] || '';

			amiCommand.execute('SearchQuery -catalog="self" -sql="SELECT `entity`, `field`, `alias`, `type`, `mask`, `defaultValue` FROM `router_search_criteria` WHERE `interfaceFK`=' + this.id + ' ORDER BY `rank`"', {context: this}).done(function(data) {

				var rows = amiWebApp.jspath('..row', data);

				var dict = [];

				$.foreach(rows, function(index, row) {

					var entity = amiWebApp.jspath('..field{.@name==="entity"}.$', row)[0] || '';
					var field = amiWebApp.jspath('..field{.@name==="field"}.$', row)[0] || '';
					var alias = amiWebApp.jspath('..field{.@name==="alias"}.$', row)[0] || '';
					var type = amiWebApp.jspath('..field{.@name==="type"}.$', row)[0] || '';
					var mask = amiWebApp.jspath('..field{.@name==="mask"}.$', row)[0] || '0';
					var defaultValue = amiWebApp.jspath('..field{.@name==="defaultValue"}.$', row)[0] || '';

					if(!alias) {
						alias = field;
					}

					dict.push({
						CHECKED: (type === '4' && (mask & 1) !== 0 && (parseInt(defaultValue) === 1) || defaultValue.toLowerCase().trim() === 'yes' || defaultValue.toLowerCase().trim() === 'true') ? 'checked="checked"' : '',
						ENTITY: entity,
						FIELD: field,
						ALIAS: alias,
						TYPE: type,
						MASK: mask,
 						DEFAULT_VALUE: defaultValue,
					});
				});

				amiWebApp.replaceHTML('#ami_search_engine_left', this.fragmentCriteria, {dict: dict, context: this}).done(function() {

					$('#ami_search_engine_glass').removeClass('ami-search-engine-glass');

					amiWebApp.unlock();

					$.foreach(dict, function(index, row) {

						if(row['CHECKED']) {

							var F3 = '`' + row['ENTITY'] + '`.`' + row['FIELD'] + '`!=0';

							this.criteriaDict[row['ALIAS']] = {
								/* CRITERIA */
								entity: row['ENTITY'],
								field: row['FIELD'],
								type: row['TYPE'],
								mask: row['MASK'],

								/* SQL */
								selected: {},
								filter: F3,
								limit: 10,
							};
						}
					}, this);

					this.refresh();
				});

			}).fail(function(data) {
				amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
			});

		}).fail(function(data) {
			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	},

	/*-----------------------------------------------------------------*/

	criteriaClick: function(visible, entity, field, alias, type) {

		if(visible === true) {
			this.createBox(visible, entity, field, alias, type);
		} else {
			this.deleteBox(alias);
		}
	},

	/*-----------------------------------------------------------------*/

	createBox: function(visible, entity, field, alias, type, mask) {

		this.criteriaDict[alias] = {
			/* CRITERIA */
			entity: entity,
			field: field,
			type: type,
			mask: mask,

			/* SQL */
			selected: {},
			filter: '',
			limit: 10,
		};

		var dict = {
			ALIAS: alias,
		};

		/****/ if(type === 0) {
			amiWebApp.appendHTML('#ami_search_engine_right', this.fragmentCriteriaStringFew, {dict: dict, context: this}).done(function() {
				this.fillStringBox(alias, false, false);
			});
		} else if(type === 1) {
			amiWebApp.appendHTML('#ami_search_engine_right', this.fragmentCriteriaStringMany, {dict: dict, context: this}).done(function() {
				this.fillStringBox(alias, true, true);
			});
		} else if(type === 2) {
			amiWebApp.appendHTML('#ami_search_engine_right', this.fragmentCriteriaNumber, {dict: dict, context: this}).done(function() {
				this.fillNumberBox(alias);
			});
		} else if(type === 3) {
			amiWebApp.appendHTML('#ami_search_engine_right', this.fragmentCriteriaDate, {dict: dict, context: this}).done(function() {
				this.fillDateBox(alias);
			});
		} else if(type === 4) {
			var criteria = this.criteriaDict[alias];

			criteria['filter'] = '`' + criteria['entity'] + '`.`' + criteria['field'] + '`!=0';

			this.refresh();
		}
	},

	/*-----------------------------------------------------------------*/

	deleteBox: function(alias) {

		$('#ami_search_engine_checkbox_' + alias).prop('checked', false);

		$('#ami_search_engine_box_' + alias).remove();

		delete this.criteriaDict[alias];

		this.refresh();
	},

	/*-----------------------------------------------------------------*/

	refresh: function() {
		/*---------------------------------------------------------*/
		/* REFRESH BOXES                                           */
		/*---------------------------------------------------------*/

		for(var alias in this.criteriaDict) {

			var type = this.criteriaDict[alias]['type'];

			/****/ if(type === 0) {
				this.fillStringBox(alias, false, false);
			} else if(type === 1) {
				this.fillStringBox(alias, true, true);
			} else if(type === 2) {
				this.fillNumberBox(alias);
			} else if(type === 3) {
				this.fillDateBox(alias);
			}
		}

		/*---------------------------------------------------------*/
		/* REFRESH MESSAGE                                         */
		/*---------------------------------------------------------*/

		var command = 'BrowseQuery -catalog="' + this.catalog + '" -glite="SELECT `' + this.entity + '`.* WHERE ' + this.buildFilter().replace(/\"/g, '\\\"') + '"';

		/*---------------------------------------------------------*/

		amiCommand.execute('SearchQuery -catalog="' + this.catalog + '" -glite="SELECT COUNT(`' + this.entity + '`.*) AS `nb` WHERE ' + this.buildFilter().replace(/\"/g, '\\\"') + '"', {context: this}).done(function(data) {

			var nb = amiWebApp.jspath('..field{.@name==="nb"}.$', data)[0] || '';

			$('#ami_search_engine_message').html('<div style="background-color: #F5F5F5; border-radius: 8px; padding: 4px;"><button class="btn btn-success btn-sm" onclick="alert(\'' + amiWebApp.textToHtml(amiWebApp.textToString(command)) + '\');">View selection</button> Number of selected items: ' + nb + '</div>');

		}).fail(function(data) {
			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	buildFilter: function(ignore) {

		var result = '';

		for(var alias in this.criteriaDict) {

			if(alias !== ignore) {
				var filter = this.criteriaDict[alias]['filter'];

				if(filter !== '') {

					result += ' AND (' + filter + ')';
				}
			}
		}

		if(result !== '') {
			result = result.substring(5);
		} else {
			result = '(1=1)';
		}

		return result;
	},

	/*-----------------------------------------------------------------*/

	fillStringBox: function(alias, applyFilter, applyLimit) {

		amiWebApp.lock();

		var criteria = this.criteriaDict[alias];

		/*---------------------------------------------------------*/
		/* BUILD SQL QUERY                                         */
		/*---------------------------------------------------------*/

		var mql = 'SELECT DISTINCT `' + criteria['entity'] + '`.`' + criteria['field'] + '`';

		if(applyFilter !== false) {
			mql += ' WHERE ' + this.buildFilter(/***/);
		} else {
			mql += ' WHERE ' + this.buildFilter(alias);
		}

		if(applyLimit !== false) {
			mql += ' LIMIT ' + criteria['limit'] + ' OFFSET 0';
		}

		/*---------------------------------------------------------*/
		/* FILL BOX                                                */
		/*---------------------------------------------------------*/

		amiCommand.execute('SearchQuery -catalog="' + this.catalog + '" -glite="' + mql.replace(/\"/g, '\\\"') + '"', {context: this}).done(function(data) {

			var rows = amiWebApp.jspath('..row', data);

			var s = (criteria['filter'] !== '') ? '<option value="$any$">&laquo; any &raquo;</option>' : '';

			$.foreach(rows, function(index, row) {

				var value = amiWebApp.textToHtml(amiWebApp.jspath('..field.$', row)[0] || '');

				if(value in criteria['selected']) {
					s += '<option value="' + value + '" selected="selected">' + value + '</option>';
				} else {
					s += '<option value="' + value + '" xxxxxxxx="xxxxxxxx">' + value + '</option>';
				}
			});

			$('#ami_search_engine_box_' + alias + '_value').html(s);

			amiWebApp.unlock();

		}).fail(function(data) {
			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	fillNumberBox: function(alias) {

		amiWebApp.lock();

		var criteria = this.criteriaDict[alias];

		/*---------------------------------------------------------*/
		/* FILL BOX                                                */
		/*---------------------------------------------------------*/

		var filter = this.buildFilter();

		amiCommand.execute('SearchQuery -catalog="' + this.catalog + '" -glite="SELECT MIN(`' + criteria['entity'] + '`.`' + criteria['field'] + '`) AS `min`, MAX(`' + criteria['entity'] + '`.`' + criteria['field'] + '`) AS `max` WHERE ' + filter.replace(/\"/g, '\\\"') + '"', {context: this}).done(function(data) {

			var min = amiWebApp.jspath('..field{.@name==="min"}.$', data)[0] || '';
			var max = amiWebApp.jspath('..field{.@name==="max"}.$', data)[0] || '';

			$('#ami_search_engine_box_' + alias + '_min').val(min);
			$('#ami_search_engine_box_' + alias + '_max').val(max);

			amiWebApp.unlock();

		}).fail(function(data) {
			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	fillDateBox: function(alias) {

		amiWebApp.lock();

		var criteria = this.criteriaDict[alias];

		/*---------------------------------------------------------*/
		/* FILL BOX                                                */
		/*---------------------------------------------------------*/

		var filter = this.buildFilter();

		amiCommand.execute('SearchQuery -catalog="' + this.catalog + '" -glite="SELECT MIN(`' + criteria['entity'] + '`.`' + criteria['field'] + '`) AS `min`, MAX(`' + criteria['entity'] + '`.`' + criteria['field'] + '`) AS `max` WHERE ' + filter.replace(/\"/g, '\\\"') + '"', {context: this}).done(function(data) {

			var min = amiWebApp.jspath('..field{.@name==="min"}.$', data)[0] || '';
			var max = amiWebApp.jspath('..field{.@name==="max"}.$', data)[0] || '';

			$('#ami_search_engine_box_' + alias + '_min').val(min);
			$('#ami_search_engine_box_' + alias + '_max').val(max);

			amiWebApp.unlock();

		}).fail(function(data) {
			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	viewLess: function(alias) {

		var criteria = this.criteriaDict[alias];

		/****/ if(criteria['limit'] > 100) {
			criteria['limit'] -= 100;
		} else if(criteria['limit'] > 10) {
			criteria['limit'] -= 10;
		} else if(criteria['limit'] > 1) {
			criteria['limit'] -= 1;
		}

		$('#ami_search_engine_box_' + alias + '_limit').text(criteria['limit']);

		this.fillStringBox(alias, true, true);
	},

	/*-----------------------------------------------------------------*/

	viewMore: function(alias) {

		var criteria = this.criteriaDict[alias];

		/****/ if(criteria['limit'] > 100) {
			criteria['limit'] += 100;
		} else if(criteria['limit'] > 10) {
			criteria['limit'] += 10;
		} else if(criteria['limit'] > 0) {
			criteria['limit'] += 1;
		}

		$('#ami_search_engine_box_' + alias + '_limit').text(criteria['limit']);

		this.fillStringBox(alias, true, true);
	},

	/*-----------------------------------------------------------------*/

	_wildcard: function(parts, nbOfParts, s) {

		for(var i = 0; i < nbOfParts; i++) {

			var idx = s.indexOf(parts[i]);

			if(idx < 0) {
				return false;
			}

			s = s.substring(idx + parts[i].length);
		}

		return true;
	},

	/*-----------------------------------------------------------------*/

	applyFilter0: function(alias) {
		/*---------------------------------------------------------*/
		/* BUILD WILDCARD                                          */
		/*---------------------------------------------------------*/

		var parts = $('#ami_search_engine_box_' + alias + '_wildcard').val().toLowerCase().split('%');

		var nbOfParts = parts.length;

		/*---------------------------------------------------------*/
		/* APPLY WILDCARD                                          */
		/*---------------------------------------------------------*/

		var criteria = this.criteriaDict[alias];

		var entity = criteria['entity'];
		var field = criteria['field'];

		var s = '';
		var v = {};

		$('#ami_search_engine_box_' + alias + '_value > option').each(function() {

			var value = this.value;

			if(this._wildcard(parts, nbOfParts, value.toLowerCase())) {

				s += ' OR `' + entity + '`.`' + field + '`=\'' + value.replace(/\'/g, '\'\'') + '\'';

				v[value] = true;
			}
		});

		if(s !== '') {
			s = s.substring(4);
		}

		criteria['filter'] = s;
		criteria['selected'] = v;

		/*---------------------------------------------------------*/
		/* REFRESH                                                 */
		/*---------------------------------------------------------*/

		this.refresh();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	applyFilter1: function(alias) {
		/*---------------------------------------------------------*/
		/* APPLY WILDCARD                                          */
		/*---------------------------------------------------------*/

		var criteria = this.criteriaDict[alias];

		var wildcard = $('#ami_search_engine_box_' + alias + '_wildcard').val();

		if(wildcard.indexOf('%') < 0) {
			criteria['filter'] = '`' + criteria['entity'] + '`.`' + criteria['field'] + '`=\'' + wildcard.replace(/\'/g, '\'\'') + '\'';
		} else {
			criteria['filter'] = '`' + criteria['entity'] + '`.`' + criteria['field'] + '` LIKE \'' + wildcard.replace(/\'/g, '\'\'') + '\'';
		}

		/*---------------------------------------------------------*/
		/* REFRESH                                                 */
		/*---------------------------------------------------------*/

		this.refresh();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	select: function(alias) {
		/*---------------------------------------------------------*/
		/* SELECT                                                  */
		/*---------------------------------------------------------*/

		var criteria = this.criteriaDict[alias];

		var s = '';
		var v = {};

		if($('#ami_search_engine_box_' + alias + '_value option[value="$any$"]:selected').length == 0) {

			var entity = criteria['entity'];
			var field = criteria['field'];

			$('#ami_search_engine_box_' + alias + '_value > option[value!=""]:selected').each(function() {

				var value = this.value;

				s += ' OR `' + criteria['entity'] + '`.`' + criteria['field'] + '`=\'' + value.replace(/\'/g, '\'\'') + '\'';

				v[value] = true;
			});

			if(s !== '') {
				s = s.substring(4);
			}
		}

		criteria['filter'] = s;
		criteria['selected'] = v;

		/*---------------------------------------------------------*/
		/* REFRESH                                                 */
		/*---------------------------------------------------------*/

		this.refresh();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	setRange: function(alias) {
		/*---------------------------------------------------------*/
		/* SET RANGE                                               */
		/*---------------------------------------------------------*/

		var criteria = this.criteriaDict[alias];

		var min = $('#ami_search_engine_box_' + alias + '_min').val();
		var max = $('#ami_search_engine_box_' + alias + '_max').val();

		criteria['filter'] = '`' + criteria['entity'] + '`.`' + criteria['field'] + '`>=' + min
		                     + ' AND ' +
				     '`' + criteria['entity'] + '`.`' + criteria['field'] + '`<=' + max
		;

		/*---------------------------------------------------------*/
		/* REFRESH                                                 */
		/*---------------------------------------------------------*/

		this.refresh();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	resetRange: function(alias) {
		/*---------------------------------------------------------*/
		/* RESET RANGE                                             */
		/*---------------------------------------------------------*/

		var criteria = this.criteriaDict[alias];

		criteria['filter'] = '';

		/*---------------------------------------------------------*/
		/* REFRESH                                                 */
		/*---------------------------------------------------------*/

		this.refresh();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiSearchEngineApp = new AMISearchEngineApp();

amiRegisterSubApp('amiSearchEngine', amiSearchEngineApp, {});

/*-------------------------------------------------------------------------*/
