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

$AMIClass('SearchCtrl', {
	/*-----------------------------------------------------------------*/

	$extends: ami.Control,

	/*-----------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);
	},

	/*-----------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/Search/twig/SearchCtrl.twig',
			amiWebApp.originURL + '/controls/Search/twig/criteria_string_few.twig',
			amiWebApp.originURL + '/controls/Search/twig/criteria_string_many.twig',
			amiWebApp.originURL + '/controls/Search/twig/criteria_number.twig',
			amiWebApp.originURL + '/controls/Search/twig/criteria_date.twig',
			amiWebApp.originURL + '/controls/Search/twig/criteria_bool.twig',
			/**/
			amiWebApp.originURL + '/controls/Search/js/moment.min.js',
			amiWebApp.originURL + '/controls/Search/js/daterangepicker.js',
			amiWebApp.originURL + '/controls/Search/js/daterangepicker.css',
			/**/
			'ctrl:schema',
		], {context: this}).done(function(data) {

			this.fragmentSearch = data[0];
			this.fragmentCriteriaStringFew = data[1];
			this.fragmentCriteriaStringMany = data[2];
			this.fragmentCriteriaNumber = data[3];
			this.fragmentCriteriaDate = data[4];
			this.fragmentCriteriaBool = data[5];

			this.schemaCtor = data[9];
		});
	},

	/*-----------------------------------------------------------------*/

	render: function(selector, settings)
	{
		this.ctx = {
			isEmbedded: amiWebApp.isEmbedded(),
			name: 'user',
			defaultCatalog: 'self',
			defaultEntity: 'router_user',
			criterias: [
				{name: 'Id', catalog: 'self', entity: 'router_user', field: 'id', type: 2},
				{name: 'User1', catalog: 'self', entity: 'router_user', field: 'AMIUser', type: 0},
				{name: 'User2', catalog: 'self', entity: 'router_user', field: 'AMIUser', type: 1},
				{name: 'Created', catalog: 'self', entity: 'router_user', field: 'created', type: 3},
				{name: 'Valid', catalog: 'self', entity: 'router_user', field: 'valid', type: 4},
			],
			predicates: {
			},
			cnt: 1,
			ast: null,
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

			if('criterias' in settings) {
				this.ctx.criterias = settings['criterias'];
			}
		}

		/*---------------------------------------------------------*/

		var _this = this;

		return this.replaceHTML(selector, this.fragmentSearch, {dict: this.ctx}).done(function() {

			var parent = $(selector);

			/*-------------------------------------------------*/

			parent.find('button[data-open-box]').click(function(e) {

				e.preventDefault();

				_this.openBox($(this).attr('data-open-box'));
			});

			/*-------------------------------------------------*/

			$(_this.patchId('#F5F9DA0F_C961_4EA5_CFDA_1C5CEA91F4B1')).click(function(e) {

				e.preventDefault();

				_this.addCriteria(_this.ctx.defaultCatalog);
			});

			/*-------------------------------------------------*/

			$(_this.patchId('#D199AEE3_39DD_D588_FA94_FB525CEAEAEE')).click(function(e) {

				e.preventDefault();

				_this.openSchema(_this.ctx.defaultCatalog);
			});

			/*-------------------------------------------------*/

			$(_this.patchId('#AADD9C49_349F_5910_336E_F299F6196408')).click(function(e) {

				e.preventDefault();

				_this.updateExpression($(_this.patchId('#CA15011B_EECA_E9AB_63EE_7A2A467025A5')).val());
			});

			/*-------------------------------------------------*/
		});

		/*---------------------------------------------------------*/		
	},

	/*-----------------------------------------------------------------*/

	openBox: function(idx)
	{
		/*---------------------------------------------------------*/		

		var promise;

		var criteria = this.ctx.criterias[idx];

		var selector = this.patchId('#CF445396_19BE_7A34_902E_7F63B53CAEC8');

		switch(criteria.type)
		{
			case 0:
				criteria.cnt = this.ctx.cnt++;
				promise = this.appendHTML(selector, this.fragmentCriteriaStringFew, {context: this, dict: criteria});
				break;

			case 1:
				criteria.cnt = this.ctx.cnt++;
				promise = this.appendHTML(selector, this.fragmentCriteriaStringMany, {context: this, dict: criteria});
				break;

			case 2:
				criteria.cnt = this.ctx.cnt++;
				promise = this.appendHTML(selector, this.fragmentCriteriaNumber, {context: this, dict: criteria});
				break;

			case 3:
				criteria.cnt = this.ctx.cnt++;
				promise = this.appendHTML(selector, this.fragmentCriteriaDate, {context: this, dict: criteria});
				break;

			case 4:
				criteria.cnt = this.ctx.cnt++;
				promise = this.appendHTML(selector, this.fragmentCriteriaBool, {context: this, dict: criteria});
				break;

			default:
				return;
		}

		/*---------------------------------------------------------*/		

		promise.done(function() {

			var _this = this;

			/*-------------------------------------------------*/

			var predicate = 'Q' + criteria.cnt;

			var selector = this.patchId('#C12133EC_2A38_3545_0685_974260DCC950') + '_' + predicate;

			var el = $(selector);

			/*-------------------------------------------------*/

			el.find('[data-dismiss="box"]').click(function(e) {

				e.preventDefault();

				_this.closeBox(predicate);
			});

			/*-------------------------------------------------*/

			var f;

			switch(criteria.type)
			{
				/*-----------------------------------------*/
				/* TEXT BOX (FEW)                          */
				/*-----------------------------------------*/

				case 0:
				case 1:
					el.find('select').change(function(e) {

						e.preventDefault();

						_this.select(predicate);
					});

					el.find('input.filter').keyup(function(e) {

						if(e.keyCode !== 13)
						{
							if(criteria.type === 0) _this.filter1(predicate);
						}
					});

					el.find('button.filter').click(function(e) {

						if(/*-*/ true /*-*/)
						{
							e.preventDefault();

							if(criteria.type === 0) _this.select(predicate); else _this.filter2(predicate);
						}
					});

					el.find('input.filter').keypress(function(e) {

						if(e.keyCode === 13)
						{
							e.preventDefault();

							if(criteria.type === 0) _this.select(predicate); else _this.filter2(predicate);
						}
					});

					el.find('input[type="checkbox"]').change(function(e) {

						e.preventDefault();

						_this.select(predicate);
					});

					el.find('.show-less').click(function(e) {

						e.preventDefault();

						_this.viewLess(predicate);
					});

					el.find('.show-more').click(function(e) {

						e.preventDefault();

						_this.viewMore(predicate);
					});

					break;

				/*-----------------------------------------*/
				/* NUMBER BOX                              */
				/*-----------------------------------------*/

				case 2:
				case 3:
					el.find('.set').click(function(e) {

						e.preventDefault();

						_this.setOrReset(predicate, 0);
					});

					el.find('.reset').click(function(e) {

						e.preventDefault();

						_this.setOrReset(predicate, 1);
					});

					el.find('.timedate').daterangepicker({
						timePicker: true,
						timePicker24Hour: true,
						singleDatePicker: true,
						locale: {
							format: 'DD/MM/YYYY HH:mm',
						},
					});

					break;

				/*-----------------------------------------*/
				/* BOOLEAN BOX                             */
				/*-----------------------------------------*/

				case 4:
					el.find('input[type="checkbox"]').change(function(e) {

						e.preventDefault();

						_this.toggle(predicate);
					});

					break;

				/*-----------------------------------------*/
			}

			/*-------------------------------------------------*/

			this.ctx.predicates[predicate] = {
				/* PREDICAT */
				selector: selector,
				criteria: criteria,
				/* SQL */
				select: {},
				filter: '',
				limit: 10,
			};

			/*-------------------------------------------------*/

			this.addPredicateInAST(predicate);

			/*-------------------------------------------------*/

			if(criteria.type === 4) {
				this.toggle(predicate);
			}
			else {
				this.refresh(predicate);
			}

			/*-------------------------------------------------*/
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	closeBox: function(name)
	{
		$(this.ctx.predicates[name].selector).remove();

		delete this.ctx.predicates[name];

		this.delPredicateInAST(name);

		this.refresh();
	},

	/*-----------------------------------------------------------------*/

	refresh: function()
	{
		/*---------------------------------------------------------*/

		amiWebApp.lock();

		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/

		$(this.patchId('#CA15011B_EECA_E9AB_63EE_7A2A467025A5')).val(this.dumpAST());

		/*---------------------------------------------------------*/

		//alert(this.dumpAST(this.ctx.predicates));

		/*---------------------------------------------------------*/

		amiWebApp.unlock();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	fillStringBox: function(name, applyFilter, applyLimit)
	{
		var predicate = this.ctx.predicates[name], criteria = predicate.criteria;

		/*---------------------------------------------------------*/
		/* BUILD SQL QUERY                                         */
		/*---------------------------------------------------------*/

		var mql = 'SELECT `' + criteria.catalog + '`.`' + criteria.entity + '`.`' + criteria.field + '`';

		/*---------------------------------------------------------*/

		var filter = this.dumpAST(this.ctx.predicates, applyFilter ? null : name);

		if(filter)
		{
			mql += ' WHERE ' + filter;
		}

		if(applyLimit)
		{
			mql += ' LIMIT ' + predicate.limit;
		}

		/*---------------------------------------------------------*/
		/* FILL BOX                                                */
		/*---------------------------------------------------------*/

		return amiCommand.execute('SearchQuery -catalog="' + amiWebApp.textToString(criteria.catalog) + '" -entity="' + amiWebApp.textToString(criteria.entity) + '" -mql="' + amiWebApp.textToString(mql) + '"', {context: this}).done(function(data) {

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
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	fillNumberBox: function(name)
	{
		var predicate = this.ctx.predicates[name], criteria = predicate.criteria;

		/*---------------------------------------------------------*/
		/* BUILD SQL QUERY                                         */
		/*---------------------------------------------------------*/

		var mql = 'SELECT MIN(`' + criteria.catalog + '`.`' + criteria.entity + '`.`' + criteria.field + '`) AS `min`, MAX(`' + criteria.catalog + '`.`' + criteria.entity + '`.`' + criteria.field + '`) AS `max`';

		/*---------------------------------------------------------*/

		var filter = this.dumpAST(this.ctx.predicates);

		if(filter)
		{
			mql += ' WHERE ' + filter;
		}

		/*---------------------------------------------------------*/
		/* FILL BOX                                                */
		/*---------------------------------------------------------*/

		return amiCommand.execute('SearchQuery -catalog="' + amiWebApp.textToString(criteria.catalog) + '" -entity="' + amiWebApp.textToString(criteria.entity) + '" -mql="' + amiWebApp.textToString(mql) + '"', {context: this}).done(function(data) {

			var min = amiWebApp.jspath('..field{.@name==="min"}.$', data)[0] || '';
			var max = amiWebApp.jspath('..field{.@name==="max"}.$', data)[0] || '';

			$(predicate.selector + ' input.min').val(min);
			$(predicate.selector + ' input.max').val(max);
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	select: function(name)
	{
		/*---------------------------------------------------------*/

		var predicate = this.ctx.predicates[name], criteria = predicate.criteria;

		var catalog = criteria.catalog;
		var entity = criteria.entity;
		var field = criteria.field;

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		/*---------------------------------------------------------*/

		if($(predicate.selector + ' option[value="::any::"]:selected').length == 0)
		{
			var L = [];
			var S = {};

			$(predicate.selector + ' option:selected').each(function() {

				L.push('`' + catalog + '`.`' + entity + '`.`' + field + '` = \'' + this.value.replace(/\'/g, '\'\'') + '\'');

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

		/*---------------------------------------------------------*/

		this.refresh();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

	filter1: function(name)
	{
		/*---------------------------------------------------------*/

		var predicate = this.ctx.predicates[name];

		/*---------------------------------------------------------*/

		var filter = $(predicate.selector + ' .filter').val();

		var parts = filter.toLowerCase().split('%');

		/*---------------------------------------------------------*/

		var _this = this;

		$(predicate.selector + ' option:not(:first)').prop('selected', function() {

			return filter && _this._wildcard(parts, this.value.toLowerCase());
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	filter2: function(name)
	{
		/*---------------------------------------------------------*/

		var predicate = this.ctx.predicates[name], criteria = predicate.criteria;

		var catalog = criteria.catalog;
		var entity = criteria.entity;
		var field = criteria.field;

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		/*---------------------------------------------------------*/

		var filter = $(predicate.selector + ' .filter').val();

		if(filter.indexOf('%') < 0) {
			predicate.filter = '`' + catalog + '`.`' + entity + '`.`' + field + '` = \'' + filter.replace(/\'/g, '\'\'') + '\'';
		} else {
			predicate.filter = '`' + catalog + '`.`' + entity + '`.`' + field + '` LIKE \'' + filter.replace(/\'/g, '\'\'') + '\'';
		}

		/*---------------------------------------------------------*/

		this.refresh();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

	viewMore: function(name)
	{
		var predicate = this.ctx.predicates[name];

		/*--*/ if(predicate.limit > 100) {
			predicate.limit += 100;
		} else if(predicate.limit > 10) {
			predicate.limit += 10;
		} else if(predicate.limit > 0) {
			predicate.limit += 1;
		}

		amiWebApp.lock();

		this.fillStringBox(name, true, true).always(function() {

			amiWebApp.unlock();
		});
	},

	/*-----------------------------------------------------------------*/

	setOrReset: function(name, reset)
	{
		/*---------------------------------------------------------*/

		var predicate = this.ctx.predicates[name], criteria = predicate.criteria;

		var catalog = criteria.catalog;
		var entity = criteria.entity;
		var field = criteria.field;

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/

		this.refresh();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	toggle: function(name)
	{
		/*---------------------------------------------------------*/

		var predicate = this.ctx.predicates[name], criteria = predicate.criteria;

		var catalog = criteria.catalog;
		var entity = criteria.entity;
		var field = criteria.field;

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		/*---------------------------------------------------------*/

		if(!$(predicate.selector + ' input[type="checkbox"]').prop('checked'))
		{
			predicate.filter = '`' + catalog + '`.`' + entity + '`.`' + field + '` = 0';
		}
		else
		{
			predicate.filter = '`' + catalog + '`.`' + entity + '`.`' + field + '` != 0';
		}

		/*---------------------------------------------------------*/

		this.refresh();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	addCriteria: function(catalog)
	{
		alert('TODO');
	},

	/*-----------------------------------------------------------------*/

	openSchema: function(catalog)
	{
		var parent = this.getParent();

		if(parent.$name === 'TabCtrl')
		{
			parent.appendTab('<i class="fa fa-database"></i> ' + catalog, {context: this}).done(function(selector) {

				new this.schemaCtor(parent, this).render(selector, catalog);

				$(selector).height(400);
			});
		}
	},

	/*-----------------------------------------------------------------*/
	/* AST
	/*-----------------------------------------------------------------*/

	updateExpression: function(expression)
	{
		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

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

			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/
		}

		return null;
	},

	/*-----------------------------------------------------------------*/

	lookupParentAST: function(predicate)
	{
		return this.ctx.ast ? this._lookupParentAST(predicate, null, null, this.ctx.ast) : null;
	},

	/*-----------------------------------------------------------------*/

	_dumpAST: function(node, dict, ignore)
	{
		/**/ if(node.nodeLeft
		        &&
		        node.nodeRight
		 ) {
			/*-------------------------------------------------*/

			var t1 = this._dumpAST(node.nodeLeft, dict, ignore);
			var t2 = this._dumpAST(node.nodeRight, dict, ignore);

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
		 		var result = [];

				result.push(t1);
  				result.push(node.nodeValue);
				result.push(t2);

				return '(' + result.join(' ') + ')';
			}

			/*-------------------------------------------------*/
		}
		else if(node.nodeLeft === null && node.nodeRight !== null)
		{
			/*-------------------------------------------------*/

			var t2 = this._dumpAST(node.nodeRight, dict, ignore);

			if(!t2)
			{
				return null;
			}
			else
			{
		 		var result = [];

				result.push(node.nodeValue);
				result.push(t2);

				return '(' + result.join(' ') + ')';
			}

			/*-------------------------------------------------*/
		}
		else if(node.nodeLeft !== null && node.nodeRight === null)
		{
			/*-------------------------------------------------*/

			var t1 = this._dumpAST(node.nodeLeft, dict, ignore);

			if(!t1)
			{
		 		return null;
			}
			else
			{
		 		var result = [];

				result.push(t1);
				result.push(node.nodeValue);

				return '(' + result.join(' ') + ')';
			}

			/*-------------------------------------------------*/
		}
		else
		{
			/*-------------------------------------------------*/

			var value = node.nodeValue;

			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/
		}
	},

	/*-----------------------------------------------------------------*/

	dumpAST: function(dict, ignore)
	{
		var result;

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

		return result;
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
