/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global amiTwig
 *
 */

/*-------------------------------------------------------------------------*/
/* BOX CRITERIA HOW TO                                                     */
/*-------------------------------------------------------------------------*/

/* 
 * Mandatory criteria
 * 
 * name: criteria display name
 * catalog: project:process (catalog id)
 * entity: entity to search on
 * field: field to search on
 * 
 * Optionnal criteria
 * 
 * type 0 box (String few)
 * 
 * select: [...], list of default values to select at init
 * auto_open: boolean, open/not open the box by at start
 * 
 * type 1 box (String many)
 * 
 * select: [...], list of default values to select at init
 * auto_open: boolean, open/not open the box by at start
 * 
 * type 2 box (Range)
 * 
 * select: {'min':..., max:...}, default min and max values
 * auto_open: boolean, open/not open the box by at start
 * 
 * type 3 box (Date)
 * 
 * select: {'min':..., max:...}, default min and max values
 * auto_open: boolean, open/not open the box by at start
 * 
 * type 4 box (Boolean)
 * 
 * select: ... , the default selected value
 * states: {'on': xxx, 'off': yyy}, values xxx for state on and yyy for state off
 * inclusive: boolean, mode xxx/all or xxx/yyy
 * auto_open: boolean, open/not open the box by at start
 */

/*-------------------------------------------------------------------------*/

$AMIClass('SearchCtrl', {
	/*---------------------------------------------------------------------*/

	$extends: ami.Control,

	/*---------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);
	},

	/*---------------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/Search/twig/SearchCtrl.twig',
			amiWebApp.originURL + '/controls/Search/twig/criteria_string_few.twig',
			amiWebApp.originURL + '/controls/Search/twig/criteria_string_many.twig',
			amiWebApp.originURL + '/controls/Search/twig/criteria_number.twig',
			amiWebApp.originURL + '/controls/Search/twig/criteria_date.twig',
			amiWebApp.originURL + '/controls/Search/twig/criteria_bool.twig',
			amiWebApp.originURL + '/controls/Search/twig/js.twig',
			/**/
			amiWebApp.originURL + '/controls/Search/js/moment.min.js',
			amiWebApp.originURL + '/controls/Search/js/daterangepicker.js',
			amiWebApp.originURL + '/controls/Search/js/daterangepicker.css',
			/**/
			'ctrl:tab',
		], {context: this}).done(function(data) {

			this.fragmentSearchCtrl = data[0];
			this.fragmentCriteriaStringFew = data[1];
			this.fragmentCriteriaStringMany = data[2];
			this.fragmentCriteriaNumber = data[3];
			this.fragmentCriteriaDate = data[4];
			this.fragmentCriteriaBool = data[5];
			this.fragmentJS = data[6];

			this.tabCtor = data[10];
		});
	},

	/*---------------------------------------------------------------------*/

	render: function(selector, settings)
	{
		this.ctx = {
			isEmbedded: amiWebApp.isEmbedded(),

			endpoint: amiCommand.endpoint,

			/**/

			name: 'user',
			defaultCatalog: 'self',
			defaultEntity: 'router_user',
			defaultField: 'AMIUser',
			defaultPrimaryField: 'identifier',
			criterias: [
				{name: 'Id', catalog: 'self', entity: 'router_user', field: 'id', type: 2},
				{name: 'User1', catalog: 'self', entity: 'router_user', field: 'AMIUser', type: 0},
				{name: 'User2', catalog: 'self', entity: 'router_user', field: 'AMIUser', type: 1},
				{name: 'Created', catalog: 'self', entity: 'router_user', field: 'created', type: 3},
				{name: 'Valid', catalog: 'self', entity: 'router_user', field: 'valid', type: 4},
			],

			/**/

			cnt: 1,
			ast: null,
			predicates: {},
			mql: '',
			js: '',
		};

		if(settings)
		{
			if('name' in settings) {
				this.ctx.name = settings['name'];
			}

		 	if('defaultCatalog' in settings) {
				this.ctx.defaultCatalog = settings['defaultCatalog'];
		 	}

			if('defaultEntity' in settings) {
				this.ctx.defaultEntity = settings['defaultEntity'];
			}

			if('defaultField' in settings) {
				this.ctx.defaultField = settings['defaultField'];
			}

			if('defaultPrimaryField' in settings) {
				this.ctx.defaultPrimaryField = settings['defaultPrimaryField'];
			}

			if('criterias' in settings) {
				this.ctx.criterias = settings['criterias'];
			}
		}

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		/*-----------------------------------------------------------------*/

		this.tabCtrl = new this.tabCtor(this.getParent(), this);

		/*-----------------------------------------------------------------*/

		return this.tabCtrl.render(selector, {context: this}).done(function() {

			this.renderForm();
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	renderForm: function()
	{
		this.tabCtrl.appendItem(this.ctx.name, {context: this}).done(function(selector) {

			this.replaceHTML(selector, this.fragmentSearchCtrl, {context: this, dict: this.ctx}).done(function() {

				var _this = this;

				var parent = $(selector);

				/*---------------------------------------------------------*/

				parent.find('button[data-open-box]').click(function(e) {

					e.preventDefault();

					_this.openBox($(this).attr('data-open-box'));
				});

				/*---------------------------------------------------------*/

				$(this.patchId('#F5F9DA0F_C961_4EA5_CFDA_1C5CEA91F4B1')).click(function(e) {

					e.preventDefault();

					_this.addCriteria();
				});

				/*---------------------------------------------------------*/

				$(this.patchId('#D199AEE3_39DD_D588_FA94_FB525CEAEAEE')).click(function(e) {

					e.preventDefault();

					_this.openSchema();
				});

				/*---------------------------------------------------------*/

				$(this.patchId('#AADD9C49_349F_5910_336E_F299F6196408')).click(function(e) {

					e.preventDefault();

					_this.updateExpression();
				});

				/*---------------------------------------------------------*/

				$(this.patchId('#A604B953_E0F6_3BA3_3B8A_DE24C951B613')).click(function(e) {

					e.preventDefault();

					_this.viewSelection();
				});

				/*---------------------------------------------------------*/

				$(this.patchId('#D75D8E3A_8485_FF24_2EB4_2E09FEFD2750')).click(function(e) {

					e.preventDefault();

					_this.showMQL();
				});

				/*---------------------------------------------------------*/

				$(this.patchId('#E6B6F387_34EE_9FFB_5C5A_C92A49577133')).click(function(e) {

					e.preventDefault();

					_this.showJS();
				});

				/*---------------------------------------------------------*/

				for(var idx in this.ctx.criterias)
				{
					if(this.ctx.criterias[idx].auto_open === true)
					{
						this.openBox(idx);
					}
				}

				/*---------------------------------------------------------*/

				this.refresh();

				/*---------------------------------------------------------*/
			});

			/*-------------------------------------------------------------*/
		});
	},

	/*---------------------------------------------------------------------*/

	openBox: function(idx)
	{
		/*-----------------------------------------------------------------*/

		var name;

		var promise;

		var select = {};
		var filter = [];

		var criteria = this.ctx.criterias[idx];

		var selector = this.patchId('#CF445396_19BE_7A34_902E_7F63B53CAEC8');

		var catalog = criteria.catalog;
		var entity = criteria.entity;
		var field = criteria.field;

		switch(criteria.type)
		{
			case 0:
				name = 'Q' + (criteria.cnt = this.ctx.cnt++);
				promise = this.appendHTML(selector, this.fragmentCriteriaStringFew, {context: this, dict: criteria});
				break;

			case 1:
				name = 'Q' + (criteria.cnt = this.ctx.cnt++);
				promise = this.appendHTML(selector, this.fragmentCriteriaStringMany, {context: this, dict: criteria});
				break;

			case 2:
				name = 'Q' + (criteria.cnt = this.ctx.cnt++);
				promise = this.appendHTML(selector, this.fragmentCriteriaNumber, {context: this, dict: criteria});
				break;

			case 3:
				name = 'Q' + (criteria.cnt = this.ctx.cnt++);
				promise = this.appendHTML(selector, this.fragmentCriteriaDate, {context: this, dict: criteria});
				break;

			case 4:
				name = 'Q' + (criteria.cnt = this.ctx.cnt++);
				promise = this.appendHTML(selector, this.fragmentCriteriaBool, {context: this, dict: criteria});
				break;

			default:
				return;
		}

		/*-----------------------------------------------------------------*/

		promise.done(function() {

			/*-------------------------------------------------------------*/

			var selector = this.patchId('#C12133EC_2A38_3545_0685_974260DCC950') + '_' + name;

			var el = $(selector);

			var _this = this;

			/*-------------------------------------------------------------*/

			switch(criteria.type)
			{
				/*---------------------------------------------------------*/
				/* TEXT BOX                                                */
				/*---------------------------------------------------------*/

				case 0:
				case 1:
					el.find('select').change(function(e) {

						e.preventDefault();

						_this.select(name);
					});

					el.find('input.filter').keyup(function(e) {

						if(e.keyCode !== 13)
						{
							if(criteria.type === 0) _this.filter1(name);
						}
					});

					el.find('button.filter').click(function(e) {

						if(/*-*/ true /*-*/)
						{
							e.preventDefault();

							if(criteria.type === 0) _this.select(name); else _this.filter2(name);
						}
					});

					el.find('input.filter').keypress(function(e) {

						if(e.keyCode === 13)
						{
							e.preventDefault();

							if(criteria.type === 0) _this.select(name); else _this.filter2(name);
						}
					});

					el.find('input[type="checkbox"]').change(function(e) {

						e.preventDefault();

						_this.select(name);
					});

					el.find('.show-less').click(function(e) {

						e.preventDefault();

						_this.viewLess(name);
					});

					el.find('.show-more').click(function(e) {

						e.preventDefault();

						_this.viewMore(name);
					});

					if('select' in criteria)
					{
						for(var i in criteria.select)
						{
							select[criteria.select[i]] = true;

							filter.push('`' + catalog + '`.`' + entity + '`.`' + field + '` = \'' + criteria.select[i].replace(/'/g, '\'\'') + '\'');
						}
					}

					break;

				/*---------------------------------------------------------*/
				/* NUMBER BOX                                              */
				/*---------------------------------------------------------*/

				case 2:
				case 3:
					el.find('.set').click(function(e) {

						e.preventDefault();

						_this.setOrReset(name, 0);
					});

					el.find('.reset').click(function(e) {

						e.preventDefault();

						_this.setOrReset(name, 1);
					});

					el.find('.timedate').daterangepicker({
						timePicker: true,
						timePicker24Hour: true,
						singleDatePicker: true,
						locale: {
							format: 'YYYY-MM-DD HH:mm:ss',
						},
					});

					if('select' in criteria)
					{
						if('min' in criteria.select)
						{
							filter.push('`' + catalog + '`.`' + entity + '`.`' + field + '` >= \'' + new String(criteria.select.min).replace(/'/g, '\'\'') + '\'');
						}

						if('max' in criteria.select)
						{
							filter.push('`' + catalog + '`.`' + entity + '`.`' + field + '` <= \'' + new String(criteria.select.max).replace(/'/g, '\'\'') + '\'');
						}
					}

					break;

				/*---------------------------------------------------------*/
				/* BOOLEAN BOX                                             */
				/*---------------------------------------------------------*/

				case 4:
					el.find('input[type="checkbox"]').change(function(e) {

						e.preventDefault();

						_this.toggle(name);
					});

					break;

				/*---------------------------------------------------------*/
			}

			/*-------------------------------------------------------------*/

			el.find('button[data-dismiss="box"]').click(function(e) {

				e.preventDefault();

				_this.closeBox(name);
			});

			/*-------------------------------------------------------------*/

			this.ctx.predicates[name] = {
				/* PREDICAT */
				selector: selector,
				criteria: criteria,
				/* SQL */
				select: select,
				filter: filter.join(' AND '),
				limit: 10,
			};

			/*-------------------------------------------------------------*/

			this.addPredicateInAST(name);

			/*-------------------------------------------------------------*/

			if(criteria.type === 4) {
				this.toggle(name);
			}
			else {
				this.refresh(name);
			}

			/*-------------------------------------------------------------*/
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	closeBox: function(name)
	{
		$(this.ctx.predicates[name].selector).remove();

		delete this.ctx.predicates[name];

		this.delPredicateInAST(name);

		this.refresh();
	},

	/*---------------------------------------------------------------------*/

	refresh: function()
	{
		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		/*-----------------------------------------------------------------*/

		var predicate;

		$.each(this.ctx.predicates, function(name) {

			predicate = this.ctx.predicates[name];

			switch(predicate.criteria.type)
			{
				case 0:
					this.fillStringBox(name, false, false);
					break;

				case 1:
					this.fillStringBox(name, true, true);
					break;

				case 2:
					this.fillNumberBox(name);
					break;

				case 3:
					this.fillNumberBox(name);
					break;
			}

		}, this);

		/*-----------------------------------------------------------------*/

		$(this.patchId('#CA15011B_EECA_E9AB_63EE_7A2A467025A5')).val(this.dumpAST());

		/*-----------------------------------------------------------------*/

		var filter = this.dumpAST(this.ctx.predicates);

		/*-----------------------------------------------------------------*/

		var mql = 'SELECT COUNT(' + this.ctx.defaultPrimaryField + ') AS `nb`';

		this.ctx.mql = 'SELECT *';

		if(filter)
		{
			mql += ' WHERE ';
			mql += filter;
			this.ctx.mql += ' WHERE ';
			this.ctx.mql += filter;
		}

		/*-----------------------------------------------------------------*/

		this.ctx.js = amiWebApp.formatTWIG(this.fragmentJS, this.ctx);

		/*-----------------------------------------------------------------*/

		return amiCommand.execute('SearchQuery -catalog="' + amiWebApp.textToString(this.ctx.defaultCatalog) + '" -entity="' + amiWebApp.textToString(this.ctx.defaultEntity) + '" -mql="' + amiWebApp.textToString(mql) + '"', {context: this}).done(function(data) {

			var nb = amiWebApp.jspath('..field{.@name==="nb"}.$', data)[0] || 'N/A';

			$(this.patchId('#D7F429C8_E45C_57A3_6BCC_C74BAE4B0DDA')).text(nb);

			amiWebApp.unlock();

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	fillStringBox: function(name, applyFilter, applyLimit)
	{
		var predicate = this.ctx.predicates[name], criteria = predicate.criteria;

		/*-----------------------------------------------------------------*/
		/* BUILD SQL QUERY                                                 */
		/*-----------------------------------------------------------------*/

		var mql = 'SELECT DISTINCT `' + criteria.catalog + '`.`' + criteria.entity + '`.`' + criteria.field + '`';

		/*-----------------------------------------------------------------*/

		var filter = this.dumpAST(this.ctx.predicates, applyFilter ? null : name);

		if(filter)
		{
			mql += ' WHERE ' + filter;
		}

		if (criteria.order) 
		{
			mql += ' ORDER BY `' + criteria.catalog + '`.`' + criteria.entity + '`.`' + criteria.field + '` ' + criteria.order;
		}

		if(applyLimit)
		{
			mql += ' LIMIT ' + predicate.limit + ' OFFSET 0'
		}

		/*-----------------------------------------------------------------*/
		/* FILL BOX                                                        */
		/*-----------------------------------------------------------------*/

		return amiCommand.execute('SearchQuery -catalog="' + amiWebApp.textToString(criteria.catalog) + '" -entity="' + amiWebApp.textToString(this.ctx.defaultEntity) + '" -mql="' + amiWebApp.textToString(mql) + '"', {context: this}).done(function(data) {

			var L = [];

			var rows = amiWebApp.jspath('..row', data);

			if('::any::' in predicate.select) {
				L.push('<option value="::any::" selected="selected">« reset filter »</option>');
			}
			else {
				L.push('<option value="::any::" xxxxxxxx="xxxxxxxx">« reset filter »</option>');
			}

			$.each(rows, function(idx, row) {

				var value = amiWebApp.textToHtml(amiWebApp.jspath('..field.$', row)[0] || '');

				if(value in predicate.select) {
					L.push('<option value="' + amiWebApp.textToHtml(value) + '" selected="selected">' + amiWebApp.textToHtml(value) + '</option>');
				} else {
					L.push('<option value="' + amiWebApp.textToHtml(value) + '" xxxxxxxx="xxxxxxxx">' + amiWebApp.textToHtml(value) + '</option>');
				}
			});

			$(predicate.selector + ' select').html(L.join(''));

			$(predicate.selector + ' .count').text(L.length - 1);

			$(predicate.selector + ' .limit').text(predicate.limit);

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	fillNumberBox: function(name)
	{
		var predicate = this.ctx.predicates[name], criteria = predicate.criteria;

		/*-----------------------------------------------------------------*/
		/* BUILD SQL QUERY                                                 */
		/*-----------------------------------------------------------------*/

		var mql = 'SELECT MIN(`' + criteria.catalog + '`.`' + criteria.entity + '`.`' + criteria.field + '`) AS `min`, MAX(`' + criteria.catalog + '`.`' + criteria.entity + '`.`' + criteria.field + '`) AS `max`';

		/*-----------------------------------------------------------------*/

		var filter = this.dumpAST(this.ctx.predicates);

		if(filter)
		{
			mql += ' WHERE ' + filter;
		}

		/*-----------------------------------------------------------------*/
		/* FILL BOX                                                        */
		/*-----------------------------------------------------------------*/

		return amiCommand.execute('SearchQuery -catalog="' + amiWebApp.textToString(criteria.catalog) + '" -entity="' + amiWebApp.textToString(this.ctx.defaultEntity) + '" -mql="' + amiWebApp.textToString(mql) + '"', {context: this}).done(function(data) {

			var min = amiWebApp.jspath('..field{.@name==="min"}.$', data)[0] || '';
			var max = amiWebApp.jspath('..field{.@name==="max"}.$', data)[0] || '';

			$(predicate.selector + ' input.min').val(min);
			$(predicate.selector + ' input.max').val(max);

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	select: function(name)
	{
		/*-----------------------------------------------------------------*/

		var predicate = this.ctx.predicates[name], criteria = predicate.criteria;

		var catalog = criteria.catalog;
		var entity = criteria.entity;
		var field = criteria.field;

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		/*-----------------------------------------------------------------*/

		if($(predicate.selector + ' option[value="::any::"]:selected').length == 0)
		{
			var L = [];
			var S = {};
			
			var isDefaultEntity = this.ctx.defaultEntity === entity ? true : false;

			$(predicate.selector + ' option:selected').each(function() {

				if (isDefaultEntity)
				{
					L.push('`' + catalog + '`.`' + entity + '`.`' + field + '` = \'' + this.value.replace(/'/g, '\'\'') + '\'');
				}
				else
				{
					L.push('[`' + catalog + '`.`' + entity + '`.`' + field + '` = \'' + this.value.replace(/'/g, '\'\'') + '\']');
				}
				

				S[this.value] = true;
			});

			predicate.filter = L
				.join(!$(predicate.selector + ' input[type="checkbox"]').prop('checked') ? ' OR ' : ' AND ');
			predicate.select = S;
		}
		else
		{
			predicate.filter = '';
				$(predicate.selector + ' .filter').val('');
			predicate.select = {};
		}

		/*-----------------------------------------------------------------*/

		this.refresh();

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	_wildcard: function(parts, s)
	{
		var idx;

		for(var i = 0; i < parts.length; s = s.substring(idx + parts[i++].length))
		{
			if((idx = s.indexOf(parts[i])) < 0)
			{
				return false;
			}
		}

		return true;
	},

	/*---------------------------------------------------------------------*/

	filter1: function(name)
	{
		var _this = this;

		/*-----------------------------------------------------------------*/

		var predicate = this.ctx.predicates[name];

		/*-----------------------------------------------------------------*/

		var filter = $(predicate.selector + ' .filter').val()
		                                               .trim()
							       .toLowerCase()
		;

		/*-----------------------------------------------------------------*/

		var parts = filter.split('%');

		$(predicate.selector + ' option:not(:first)').prop('selected', function() {

			return filter && _this._wildcard(parts, this.value.toLowerCase());
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	filter2: function(name)
	{
		/*-----------------------------------------------------------------*/

		var predicate = this.ctx.predicates[name], criteria = predicate.criteria;

		var catalog = criteria.catalog;
		var entity = criteria.entity;
		var field = criteria.field;

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		/*-----------------------------------------------------------------*/

		var filter = $(predicate.selector + ' .filter').val();

		if(filter.indexOf('%') < 0) {
			predicate.filter = '`' + catalog + '`.`' + entity + '`.`' + field + '` = \'' + filter.replace(/'/g, '\'\'') + '\'';
		} else {
			predicate.filter = '`' + catalog + '`.`' + entity + '`.`' + field + '` LIKE \'' + filter.replace(/'/g, '\'\'') + '\'';
		}

		/*-----------------------------------------------------------------*/

		this.refresh();

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	viewLess: function(name)
	{
		var predicate = this.ctx.predicates[name];

		/*--*/ if(predicate.limit > 100) {
			predicate.limit -= 100;
		} else if(predicate.limit > 10) {
			predicate.limit -= 10;
		} else if(predicate.limit > 1) {
			predicate.limit -= 1;
		}

		amiWebApp.lock();

		this.fillStringBox(name, true, true).always(function() {

			amiWebApp.unlock();
		});
	},

	/*---------------------------------------------------------------------*/

	viewMore: function(name)
	{
		var predicate = this.ctx.predicates[name];

		/*--*/ if(predicate.limit >= 100) {
			predicate.limit += 100;
		} else if(predicate.limit >= 10) {
			predicate.limit += 10;
		} else if(predicate.limit >= 0) {
			predicate.limit += 1;
		}

		amiWebApp.lock();

		this.fillStringBox(name, true, true).always(function() {

			amiWebApp.unlock();
		});
	},

	/*---------------------------------------------------------------------*/

	setOrReset: function(name, reset)
	{
		/*-----------------------------------------------------------------*/

		var predicate = this.ctx.predicates[name], criteria = predicate.criteria;

		var catalog = criteria.catalog;
		var entity = criteria.entity;
		var field = criteria.field;

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		/*-----------------------------------------------------------------*/

		if(!reset)
		{
			var min = $(predicate.selector + ' input.min').val();
			var max = $(predicate.selector + ' input.max').val();

			if(!$(predicate.selector + ' input[type="checkbox"]').prop('checked'))
			{
				predicate.filter = '`' + catalog + '`.`' + entity + '`.`' + field + '` >= \'' + min + '\''
				                   +
				                   ' AND '
				                   +
				                   '`' + catalog + '`.`' + entity + '`.`' + field + '` <= \'' + max + '\''
				;
			}
			else
			{
				predicate.filter = '`' + catalog + '`.`' + entity + '`.`' + field + '` < \'' + min + '\''
				                   +
				                   ' OR '
				                   +
				                   '`' + catalog + '`.`' + entity + '`.`' + field + '` > \'' + max + '\''
				;
			}
		}
		else
		{
			predicate.filter = '';
		}

		/*-----------------------------------------------------------------*/

		this.refresh();

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	toggle: function(name)
	{
		/*-----------------------------------------------------------------*/

		var predicate = this.ctx.predicates[name], criteria = predicate.criteria;

		var catalog = criteria.catalog;
		var entity = criteria.entity;
		var field = criteria.field;

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		/*-----------------------------------------------------------------*/

		if($(predicate.selector + ' input[type="checkbox"]').prop('checked'))
		{
			predicate.filter = '`' + catalog + '`.`' + entity + '`.`' + field + '` = \'' + new String(criteria.states.on).replace(/'/g, '\'\'') + '\'';
		}
		else
		{
			if(!criteria.inclusive)
			{
				predicate.filter = '`' + catalog + '`.`' + entity + '`.`' + field + '` = \'' + new String(criteria.states.off).replace(/'/g, '\'\'') + '\'';
			}
			else
			{
				predicate.filter = '';
			}
		}

		/*-----------------------------------------------------------------*/

		this.refresh();

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	addCriteria: function()
	{
		alert('TODO');
	},

	/*---------------------------------------------------------------------*/

	openSchema: function()
	{
		amiWebApp.createControlInContainer(this.tabCtrl, this, 'schema', [this.ctx.defaultCatalog], {}, this.ctx, 'database', this.ctx.defaultCatalog);

		/* À VERIFIER !!! */
	},

	/*---------------------------------------------------------------------*/

	viewSelection: function()
	{
		amiWebApp.createControlInContainer(this.tabCtrl, this, 'table', ['BrowseQuery -GUI -catalog="' + amiWebApp.textToString(this.ctx.defaultCatalog) + '" -entity="' + amiWebApp.textToString(this.ctx.defaultEntity) + '" -mql="' + amiWebApp.textToString(this.ctx.mql) + '"'], {showDetails: true, canEdit: false, catalog: this.ctx.defaultCatalog, entity: this.ctx.defaultEntity, primaryField: this.ctx.defaultPrimaryField}, this.ctx, 'table', this.ctx.defaultEntity);

		/* À VERIFIER !!! */
	},

	/*---------------------------------------------------------------------*/

	showMQL: function()
	{
		amiWebApp.createControl(this.getParent(), this, 'messageBox', [this.ctx.mql], {});
	},

	/*---------------------------------------------------------------------*/

	showJS: function()
	{
		amiWebApp.createControl(this.getParent(), this, 'textBox', [this.ctx.js], {});
	},

	/*---------------------------------------------------------------------*/
	/* AST                                                                 */
	/*---------------------------------------------------------------------*/

	updateExpression: function()
	{
		/*-----------------------------------------------------------------*/

		var fix = function(node)
		{
			if(node.nodeValue && node.nodeValue.startsWith('_.'))
			{
				node.nodeValue = node.nodeValue.substring(2);
			}

			if(node.nodeLeft) {
				fix(node.nodeLeft);
			}

			if(node.nodeRight) {
				fix(node.nodeRight);
			}

			return node;
		};

		/*-----------------------------------------------------------------*/

		var expression = $(this.patchId('#CA15011B_EECA_E9AB_63EE_7A2A467025A5')).val();

		/*-----------------------------------------------------------------*/

		if(expression)
		{
			/*-------------------------------------------------------------*/

			amiWebApp.lock();

			/*-------------------------------------------------------------*/

			try
			{
				this.ctx.ast = fix(new amiTwig.expr.Compiler(expression, 1).rootNode);

				this.refresh();
			}
			catch(e)
			{
				$(this.patchId('#CA15011B_EECA_E9AB_63EE_7A2A467025A5')).val(this.dumpAST());

				amiWebApp.error(e, true);
			}

			/*-------------------------------------------------------------*/
		}

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	addPredicateInAST: function(predicate)
	{
		var newNode = new amiTwig.expr.Node(amiTwig.expr.tokens.TERMINAL, predicate);

		if(this.ctx.ast)
		{
			var andNode = new amiTwig.expr.Node(amiTwig.expr.tokens.LOGICAL_AND, 'and');

			andNode.nodeLeft = this.ctx.ast;
			andNode.nodeRight = newNode;

			this.ctx.ast = andNode;
		}
		else
		{
			this.ctx.ast = newNode;
		}
	},

	/*---------------------------------------------------------------------*/

	delPredicateInAST: function(predicate)
	{
		var m = this.lookupParentAST(predicate);

		if(m)
		{
			if(m.parent)
			{
				var parent = m.parent;
				var other = m.other;

				parent.nodeType = other.nodeType;
				parent.nodeValue = other.nodeValue;
				parent.nodeLeft = other.nodeLeft;
				parent.nodeRight = other.nodeRight;
			}
			else
			{
				this.ctx.ast = null;
			}
		}
	},

	/*---------------------------------------------------------------------*/

	_lookupParentAST: function(predicate, parent, other, node)
	{
		if(node.nodeValue === predicate)
		{
			return {
				parent: parent,
				other: other,
			};
		}
		else
		{
			var result;

			var goodOther;
			var goodParent;

			/*-------------------------------------------------------------*/

			if(node.nodeLeft)
			{
				if(!node.nodeRight)
				{
	  				goodParent = parent;
	  				goodOther = other;
				}
				else
				{
					goodParent = /*-*/node/*-*/;
					goodOther = node.nodeRight;
				}

				if((result = this._lookupParentAST(predicate, goodParent, goodOther, node.nodeLeft)))
				{
					return result;
				}
			}

			/*-------------------------------------------------------------*/

			if(node.nodeRight)
			{
				if(!node.nodeLeft)
				{
	  				goodParent = parent;
	  				goodOther = other;
				}
				else
				{
					goodParent = /*-*/node/*-*/;
					goodOther = node.nodeLeft;
				}

				if((result = this._lookupParentAST(predicate, goodParent, goodOther, node.nodeRight)))
				{
					return result;
				}
			}

			/*-------------------------------------------------------------*/
		}

		return null;
	},

	/*---------------------------------------------------------------------*/

	lookupParentAST: function(predicate)
	{
		return this.ctx.ast ? this._lookupParentAST(predicate, null, null, this.ctx.ast) : null;
	},

	/*---------------------------------------------------------------------*/

	_dumpAST: function(node, dict, ignore)
	{
		var t1;
		var t2;

		var result;

		/**/ if(node.nodeLeft
		        &&
		        node.nodeRight
		 ) {
			/*-------------------------------------------------------------*/

			t1 = this._dumpAST(node.nodeLeft, dict, ignore);
			t2 = this._dumpAST(node.nodeRight, dict, ignore);

			/**/ if(!t1)
			{
  				return t2;
			}
			else if(!t2)
			{
				return t1;
			}
			else
			{
		 		result = [];

				result.push(t1);
  				result.push(node.nodeValue);
				result.push(t2);

				return '(' + result.join(' ') + ')';
			}

			/*-------------------------------------------------------------*/
		}
		else if(node.nodeLeft === null && node.nodeRight !== null)
		{
			/*-------------------------------------------------------------*/

			t2 = this._dumpAST(node.nodeRight, dict, ignore);

			if(!t2)
			{
				return null;
			}
			else
			{
		 		result = [];

				result.push(node.nodeValue);
				result.push(t2);

				return '(' + result.join(' ') + ')';
			}

			/*-------------------------------------------------------------*/
		}
		else if(node.nodeLeft !== null && node.nodeRight === null)
		{
			/*-------------------------------------------------------------*/

			t1 = this._dumpAST(node.nodeLeft, dict, ignore);

			if(!t1)
			{
		 		return null;
			}
			else
			{
		 		result = [];

				result.push(t1);
				result.push(node.nodeValue);

				return '(' + result.join(' ') + ')';
			}

			/*-------------------------------------------------------------*/
		}
		else
		{
			/*-------------------------------------------------------------*/

			var value = node.nodeValue;

			/*-------------------------------------------------------------*/

			if(value !== ignore)
			{
				if(dict)
				{
					var filter = dict[value].filter;

					if(filter)
					{
						return '(' + filter + ')';
					}
					else
					{
						return null;
					}
				}
				else
				{
					return value;
				}
			}
			else
			{
				return null;
			}

			/*-------------------------------------------------------------*/
		}
	},

	/*---------------------------------------------------------------------*/

	dumpAST: function(dict, ignore)
	{
		var result;

		/*-----------------------------------------------------------------*/

		if(this.ctx.ast)
		{
			if((result = this._dumpAST(this.ctx.ast, dict, ignore)))
			{
				if(result.startsWith('(')
				   &&
				   result.endsWith(')')
				 ) {
					result = result.substring(1, result.length - 1);
				}
			}
			else
			{
				result = '';
			}
		}
		else
		{
			result = '';
		}

		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
