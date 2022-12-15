/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

import './assets/css/daterangepicker.css';
import './assets/js/daterangepicker.js'

import twigCriteriaBool from './assets/twig/criteria_bool.twig';
import twigCriteriaDate from './assets/twig/criteria_date.twig';
import twigCriteriaNumber from './assets/twig/criteria_number.twig';
import twigCriteriaParamFew from './assets/twig/criteria_param_few.twig';
import twigCriteriaParamMany from './assets/twig/criteria_param_many.twig';
import twigCriteriaStringFew from './assets/twig/criteria_string_few.twig';
import twigCriteriaStringMany from './assets/twig/criteria_string_many.twig';
import twigJS from './assets/twig/js.twig';
import twigSearchCtrl from './assets/twig/SearchCtrl.twig';

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('SearchCtrl', {
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

		amiWebApp.loadResources([
			'ctrl:tab',
		]).done((data) => {

			this.fragmentCriteriaBool = twigCriteriaBool;
			this.fragmentCriteriaDate = twigCriteriaDate;
			this.fragmentCriteriaNumber = twigCriteriaNumber;
			this.fragmentCriteriaParamFew = twigCriteriaParamFew;
			this.fragmentCriteriaParamMany = twigCriteriaParamMany;
			this.fragmentCriteriaStringFew = twigCriteriaStringFew;
			this.fragmentCriteriaStringMany = twigCriteriaStringMany;
			this.fragmentJS = twigJS;

			this.fragmentSearchCtrl = twigSearchCtrl;

			/**/
			this.tabCtor = data[0];

			result.resolve();

		}).fail((data) => {

			result.reject(data);
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(selector, options)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		this.setupCtx(
			{
				isEmbedded: amiWebApp.isEmbedded(),

				endpoint: amiCommand.endpoint,

				/**/

				cnt: 1,
				ast: null,
				predicates: {},
				mql: '',
				js: '',
			},
			{
				name: 'N/A',
				defaultCatalog: '',
				defaultEntity: '',
				defaultField: '',
				defaultPrimaryField: '',
				defaultSelect: '*',
				defaultOrderBy: '',
				defaultOrderWay: '',
				criteria: [],
				more: {},
				canEdit: false,
			},
			options
		);

		/*------------------------------------------------------------------------------------------------------------*/

		if('canEdit' in this.ctx.more && this.ctx.more.canEdit)
		{
			delete this.ctx.more.canEdit;

			this.ctx.canEdit = true;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

		this.tabCtrl = new this.tabCtor(this.getParent(), this);

		/*------------------------------------------------------------------------------------------------------------*/

		return this.tabCtrl.render(selector).done(() => {

			this.renderForm().done(() => {

				amiWebApp.unlock();
			});
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	renderForm: function()
	{
		const result = $.Deferred();

		this.tabCtrl.appendItem(`<i class="bi bi-search"></i> ${this.ctx.name}`).done((selector) => {

			this.replaceHTML(selector, this.fragmentSearchCtrl, {dict: this.ctx}).done(() => {

				let parent = $(selector);

				/*----------------------------------------------------------------------------------------------------*/

				parent.find('button[data-open-box]').click((e) => {

					e.preventDefault();

					this.openBox($(e.currentTarget).attr('data-open-box'));
				});

				/*----------------------------------------------------------------------------------------------------*/

				$(this.patchId('#F5F9DA0F_C961_4EA5_CFDA_1C5CEA91F4B1')).click((e) => {

					e.preventDefault();

					this.addCriteria();
				});

				/*----------------------------------------------------------------------------------------------------*/

				$(this.patchId('#D199AEE3_39DD_D588_FA94_FB525CEAEAEE')).click((e) => {

					e.preventDefault();

					this.openSchema();
				});

				/*----------------------------------------------------------------------------------------------------*/

				$(this.patchId('#AADD9C49_349F_5910_336E_F299F6196408')).click((e) => {

					e.preventDefault();

					this.updateExpression();
				});

				/*----------------------------------------------------------------------------------------------------*/

				$(this.patchId('#CA15011B_EECA_E9AB_63EE_7A2A467025A5')).keypress((e) => {

					if(e.keyCode == 13)
					{
						e.preventDefault();
						this.updateExpression();
					}
				});

				/*----------------------------------------------------------------------------------------------------*/

				$(this.patchId('#A604B953_E0F6_3BA3_3B8A_DE24C951B613')).click((e) => {

					e.preventDefault();

					this.viewSelection();
				});

				/*----------------------------------------------------------------------------------------------------*/

				$(this.patchId('#D75D8E3A_8485_FF24_2EB4_2E09FEFD2750')).click((e) => {

					e.preventDefault();

					this.showMQL();
				});

				/*----------------------------------------------------------------------------------------------------*/

				$(this.patchId('#E6B6F387_34EE_9FFB_5C5A_C92A49577133')).click((e) => {

					e.preventDefault();

					this.showJS();
				});

				/*----------------------------------------------------------------------------------------------------*/

				let doRefresh = true;

				[...this.ctx.criteria].forEach((criterion,idx) => {

					if(criterion.more.auto_open === true)
					{
						this.openBox(idx);

						doRefresh = false;
					}
				})

				/*----------------------------------------------------------------------------------------------------*/

				if(doRefresh)
				{
					this.refresh();
				}

				/*----------------------------------------------------------------------------------------------------*/

				return result.resolve();

				/*----------------------------------------------------------------------------------------------------*/
			});

			/*--------------------------------------------------------------------------------------------------------*/
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	openBox: function(idx)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		let name;

		let promise;

		const select = {};
		const filter = [];

		const criterion = this.ctx.criteria[idx];

		const selector = this.patchId('#CF445396_19BE_7A34_902E_7F63B53CAEC8');

		const catalog = criterion.catalog;
		const entity = criterion.entity;
		const field = criterion.field;

		criterion.isDefaultEntity = this.ctx.defaultEntity === entity

		switch(criterion.type)
		{
			case 0:
				name = `Q${criterion.cnt = this.ctx.cnt++}`;
				promise = this.appendHTML(selector, this.fragmentCriteriaStringFew, {dict: criterion});
				break;

			case 1:
				name = `Q${criterion.cnt = this.ctx.cnt++}`;
				promise = this.appendHTML(selector, this.fragmentCriteriaStringMany, {dict: criterion});
				break;

			case 2:
				name = `Q${criterion.cnt = this.ctx.cnt++}`;
				promise = this.appendHTML(selector, this.fragmentCriteriaNumber, {dict: criterion});
				break;

			case 3:
				name = `Q${criterion.cnt = this.ctx.cnt++}`;
				promise = this.appendHTML(selector, this.fragmentCriteriaDate, {dict: criterion});
				break;

			case 4:
				name = `Q${criterion.cnt = this.ctx.cnt++}`;
				promise = this.appendHTML(selector, this.fragmentCriteriaBool, {dict: criterion});
				break;


			/*--------------------------------------------------------------------------------------------------------*/
			/* KEY / VAL                                                                                              */
			/*--------------------------------------------------------------------------------------------------------*/

			case 5:
			case 7:
			case 9:
				name = `Q${criterion.cnt = this.ctx.cnt++}`;
				promise = this.appendHTML(selector, this.fragmentCriteriaParamFew, {dict: criterion});
				break;

			case 6:
			case 8:
			case 10:
				name = `Q${criterion.cnt = this.ctx.cnt++}`;
				promise = this.appendHTML(selector, this.fragmentCriteriaParamMany, {dict: criterion});
				break;

			/*--------------------------------------------------------------------------------------------------------*/

			default:
				return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		promise.done(() => {

			/*--------------------------------------------------------------------------------------------------------*/

			const selector = `${this.patchId('#C12133EC_2A38_3545_0685_974260DCC950')}_${name}`;

			const el = $(selector);

			const isDefaultEntity = this.ctx.defaultEntity === entity;

			/*--------------------------------------------------------------------------------------------------------*/

			switch(criterion.type)
			{
				/*----------------------------------------------------------------------------------------------------*/
				/* TEXT BOX                                                                                           */
				/*----------------------------------------------------------------------------------------------------*/

				case 0:
				case 1:
					el.find('select').change((e) => {

						e.preventDefault();

						el.find('input.filter').val('');
						this.select(name);
					});

					el.find('button.filter').click((e) => {

						e.preventDefault();

						this.filter(name);
					});

					el.find('input.filter').keypress((e) => {

						if(e.keyCode === 13)
						{
							e.preventDefault();

							this.filter(name);
						}
					});

					el.find('input[type="checkbox"]').change((e) => {

						e.preventDefault();

						if(el.find('input.filter').val() === '')
						{
							this.select(name);
						}
						else
						{
							this.filter(name);
						}

					});

					el.find('.show-less').click((e) => {

						e.preventDefault();

						this.viewLess(name);
					});

					el.find('.show-more').click((e) => {

						e.preventDefault();

						this.viewMore(name);
					});

					if('init_value' in criterion.more)
					{
						const tmp = [];

						for(let i in criterion.more.init_value)
						{
							select[criterion.more.init_value[i]] = true;

							if(criterion.more.init_value === '@NULL')
							{
								tmp.push(`\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} IS NULL`);
							}
							else
							{
								tmp.push(`\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} = '${criterion.more.init_value[i].replace(/'/g, '\'\'')}'`);
							}
						}

						if (isDefaultEntity)
						{
							filter.push(tmp.join(' OR '));
						}
						else
						{
							filter.push(`[${tmp.join(' OR ')}]`);
						}

					}

					break;

				/*----------------------------------------------------------------------------------------------------*/
				/* NUMBER BOX																						 */
				/*----------------------------------------------------------------------------------------------------*/

				case 2:
				case 3:
					el.find('.set').click((e) => {

						e.preventDefault();

						this.setMinMax(name);
					});

					el.find('.reset').click((e) => {

						e.preventDefault();

						amiWebApp.lock();

						const predicate = this.ctx.predicates[name];

						$(`${predicate.selector} input[type="checkbox"]`).prop('checked', false);
						$(`${predicate.selector} input.min`).val('');
						$(`${predicate.selector} input.max`).val('');

						this.fillNumberBox(name, true).done(() => {

							this.setMinMax(name);
						}).always(() => {

							amiWebApp.unlock();
						});
					});

					el.find('input[type="checkbox"]').change((e) => {

						e.preventDefault();

						const predicate = this.ctx.predicates[name];

						if($(`${predicate.selector} input[type="checkbox"]`).prop('checked'))
						{
							$(`${predicate.selector} input.min`).attr('disabled','disabled');
							$(`${predicate.selector} input.max`).attr('disabled','disabled');
						}
						else
						{
							$(`${predicate.selector} input.min`).removeAttr('disabled');
							$(`${predicate.selector} input.max`).removeAttr('disabled');
						}

						this.setMinMax(name);
					});

					el.find('.timedate').daterangepicker({
						timePicker: true,
						timePicker24Hour: true,
						singleDatePicker: true,
						locale: {
							format: 'YYYY-MM-DD HH:mm:ss',
						},
					});

					//to review
					if('more' in criterion)
					{
						if('min' in criterion.more)
						{
							if (isDefaultEntity)
							{
								filter.push(`\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} >= AMI_TIMESTAMP('${new String(criterion.more.min).replace(/'/g, '\'\'')}')`);
							}
							else
							{
								filter.push(`[\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} >= AMI_TIMESTAMP('${new String(criterion.more.min).replace(/'/g, '\'\'')}')]`);
							}
						}

						if('max' in criterion.more)
						{
							if (isDefaultEntity)
							{
								filter.push(`\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} <= AMI_TIMESTAMP('${new String(criterion.more.max).replace(/'/g, '\'\'')}')`);
							}
							else
							{
								filter.push(`[\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} <= AMI_TIMESTAMP('${new String(criterion.more.max).replace(/'/g, '\'\'')}')]`);
							}
						}
					}

					break;

				/*----------------------------------------------------------------------------------------------------*/
				/* BOOLEAN BOX																						*/
				/*----------------------------------------------------------------------------------------------------*/

				case 4:
					el.find('input[type="checkbox"]').change((e) => {

						e.preventDefault();

						this.toggle(name);
					});

					break;

				/*----------------------------------------------------------------------------------------------------*/
				/* PARAM BOX																						  */
				/*----------------------------------------------------------------------------------------------------*/

				case 5:
				case 6:
				case 7:
				case 8:
				case 9:
				case 10:
					el.find('.key').change((e) => {

						e.preventDefault();

						this.selectParamKey(name);
					});

					el.find('.value').change((e) => {

						e.preventDefault();

						//this.selectParamVal(name);
						this.select(name);
					});

					el.find('button.filter').click((e) => {

							e.preventDefault();

							this.filter(name);
					});

					el.find('input.filter').keypress((e) => {

						if(e.keyCode === 13)
						{
							e.preventDefault();

							this.filter(name);
						}
					});

					el.find('input[type="checkbox"]').change((e) => {

						e.preventDefault();

						this.select(name);
					});

					el.find('.show-less').click((e) => {

						e.preventDefault();

						/*this.viewLessParamVal(name);*/
					});

					el.find('.show-more').click((e) => {

						e.preventDefault();

						/*this.viewMoreParamVal(name);*/
					});

					break;

				/*----------------------------------------------------------------------------------------------------*/
			}

			/*--------------------------------------------------------------------------------------------------------*/

			el.find('button[data-dismiss="box"]').click((e) => {

				e.preventDefault();

				this.closeBox(name);
			});

			/*--------------------------------------------------------------------------------------------------------*/

			this.ctx.predicates[name] = {
				/* PREDICAT */
				selector: selector,
				criterion: criterion,
				/* SQL */
				select: select,
				filter: filter.join(' AND '),
				limit: 10,
			};

			/*--------------------------------------------------------------------------------------------------------*/

			this.addPredicateInAST(name);

			/*--------------------------------------------------------------------------------------------------------*/

			if(criterion.type === 4)
			{
				this.toggle(name);
			}
			else if(criterion.type === 2 || criterion.type === 3)
			{
				amiWebApp.lock();

				this.fillNumberBox(name, true).done(() => {

					this.setMinMax(name);
				}).always(() => {

					amiWebApp.unlock();
				});

			}
			else {
				this.refresh(name);
			}

			/*--------------------------------------------------------------------------------------------------------*/
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	closeBox: function(name)
	{
		$(this.ctx.predicates[name].selector).remove();

		delete this.ctx.predicates[name];

		this.delPredicateInAST(name);

		this.refresh();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	refresh: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

		try
		{
			let predicate;

			$.each(this.ctx.predicates, (name) => {

				predicate = this.ctx.predicates[name];

				switch(predicate.criterion.type)
				{
					case 0:
						amiWebApp.lock();
						this.fillStringBox(name, false, false).always(() => {
							amiWebApp.unlock();
						});
						break;

					case 1:
						amiWebApp.lock();
						this.fillStringBox(name, true, true).always(() => {
							amiWebApp.unlock();
						});
						break;

					case 2:
					case 3:
						amiWebApp.lock();
						this.fillNumberBox(name, false).always(() => {
							amiWebApp.unlock();
						});
						break;

					case 5:
					case 6:
					case 7:
					case 8:
					case 9:
					case 10:
						amiWebApp.lock();
						this.fillParamBoxKey(name); this.fillParamBoxVal(name).always(() => {
							amiWebApp.unlock();
						});
						break;
				}

			}, this);

			/*--------------------------------------------------------------------------------------------------------*/

			$(this.patchId('#CA15011B_EECA_E9AB_63EE_7A2A467025A5')).val(this.dumpAST());

			/*--------------------------------------------------------------------------------------------------------*/

			const filter = this.dumpAST(this.ctx.predicates);

			/*--------------------------------------------------------------------------------------------------------*/

			let mql = `SELECT COUNT(${this.ctx.defaultPrimaryField}) AS \`nb\``;

			this.ctx.mql = `SELECT ${this.ctx.defaultSelect}`;

			if(filter)
			{
				mql += ` WHERE ${filter}`;
				this.ctx.mql += ` WHERE ${filter}`;
			}

			this.ctx.mql = this.ctx.mql
				           .replace(/and/g, 'AND')
				           .replace(/or/g, 'OR')
				           .replace(/not/g, 'NOT')
			;

			/*--------------------------------------------------------------------------------------------------------*/

			this.ctx.js = amiWebApp.formatTWIG(this.fragmentJS, this.ctx);

			/*--------------------------------------------------------------------------------------------------------*/

			return amiCommand.execute(`SearchQuery -catalog="${amiWebApp.textToString(this.ctx.defaultCatalog)}" -entity="${amiWebApp.textToString(this.ctx.defaultEntity)}" -mql="${amiWebApp.textToString(mql)}"`).done((data) => {

				const nb = amiWebApp.jspath('..field{.@name==="nb"}.$', data)[0] || 'N/A';

				$(this.patchId('#D7F429C8_E45C_57A3_6BCC_C74BAE4B0DDA')).text(nb);

				amiWebApp.unlock();

				$(this.patchId('#FB83961B_D88B_C24C_E8C5_6B3DCC2AAE2F')).text('');

				if(nb != 0)
				{
					this._loadSummary([], 0);
				}

			}).fail((data, message) => {

				amiWebApp.error(message);
			});

			/*--------------------------------------------------------------------------------------------------------*/
		}
		catch(e)
		{
			amiWebApp.error(e, true);
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_loadSummary: function(res, idx)
	{
		if(this.ctx.more.summary && this.ctx.more.summary.length > 0)
		{
			if(idx < this.ctx.more.summary.length)
			{
				const filter = this.dumpAST(this.ctx.predicates);

				let mql = '';

				let constraints = this.ctx.more.summary[idx].constraints ? this.ctx.more.summary[idx].constraints : '';

				switch(this.ctx.more.summary[idx].type)
				{
					case 0:
						mql = `SELECT COUNT(DISTINCT \`${this.ctx.more.summary[idx].catalog}\`.\`${this.ctx.more.summary[idx].entity}\`.\`${this.ctx.more.summary[idx].field}\`${constraints}) AS RES`;
						if(filter)
						{
							mql += ` WHERE ${filter}`;
						}
						break;

					case 1:
						mql = `SELECT SUM(\`${this.ctx.more.summary[idx].catalog}\`.\`${this.ctx.more.summary[idx].entity}\`.\`${this.ctx.more.summary[idx].field}\`${constraints}) AS RES`;
						if(filter)
						{
							mql += ` WHERE ${filter}`;
						}
						break;

					case 2:
						mql = `SELECT ROUND(AVG(\`${this.ctx.more.summary[idx].catalog}\`.\`${this.ctx.more.summary[idx].entity}\`.\`${this.ctx.more.summary[idx].field}\`${constraints})) AS RES`;
						if(filter)
						{
							mql += ` WHERE ${filter}`;
						}
						break;
				}

				const command =`SearchQuery -catalog="${this.ctx.more.summary[idx].catalog}" -entity="${this.ctx.defaultEntity}" -mql="${mql}"`;

				amiCommand.execute(command).done((data) => {

					const summaryValue = amiWebApp.jspath('..field{.@name==="RES"}.$', data)[0] || 'N/A';

					const tmp = `${this.ctx.more.summary[idx].name}: ${summaryValue}`;

					if(summaryValue !== '@NULL')
					{
						res.push(tmp);
					}

					this._loadSummary(res, idx + 1);

				}).fail((data, message) => {

					amiWebApp.error(message, true);
				});
			}
			else
			{
				$(this.patchId('#FB83961B_D88B_C24C_E8C5_6B3DCC2AAE2F')).text(res.join(', '));
			}
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	fillStringBox: function(name, applyFilter, applyLimit)
	{
		const predicate = this.ctx.predicates[name], criterion = predicate.criterion;

		/*------------------------------------------------------------------------------------------------------------*/
		/* BUILD SQL QUERY                                                                                            */
		/*------------------------------------------------------------------------------------------------------------*/

		let mql = `SELECT DISTINCT \`${criterion.catalog}\`.\`${criterion.entity}\`.\`${criterion.field}\`${this.dumpConstraints(criterion)}`;

		/*------------------------------------------------------------------------------------------------------------*/
		/* ADD FILTER                                                                                                 */
		/*------------------------------------------------------------------------------------------------------------*/

		const filter = this.dumpFilterAST(name);

		/*------------------------------------------------------------------------------------------------------------*/

		if(filter)
		{
			mql += ` WHERE ${filter}`;
		}

		/*------------------------------------------------------------------------------------------------------------*/
		/* ADD ORDER BY AND LIMIT																					 */
		/*------------------------------------------------------------------------------------------------------------*/

		if (criterion.more.order)
		{
			mql += ` ORDER BY  \`${criterion.catalog}\`.\`${criterion.entity}\`.\`${criterion.field}\` ${criterion.more.order}`;
		}

		if(applyLimit)
		{
			mql += ` LIMIT ${predicate.limit} OFFSET 0`;
		}

		/*------------------------------------------------------------------------------------------------------------*/
		/* FILL BOX                                                                                                   */
		/*------------------------------------------------------------------------------------------------------------*/

		return amiCommand.execute(`SearchQuery -catalog="${amiWebApp.textToString(criterion.catalog)}" -entity="${amiWebApp.textToString(this.ctx.defaultEntity)}" -mql="${amiWebApp.textToString(mql)}"`).done((data) => {

			const L = [];

			const rows = amiWebApp.jspath('..row', data);

			/*--------------------------------------------------------------------------------------------------------*/
			/* SELECTED ITEMS                                                                                         */
			/*--------------------------------------------------------------------------------------------------------*/

			Object.keys(predicate.select).forEach((key) => {

				const valuehtml = amiWebApp.textToHtml(key);

				if(amiWebApp.jspath('..row.field{.$ === \'' + key + '\'}.$', data)[0])
				{
					L.push(`<option value="${valuehtml}" selected="selected">${valuehtml}</option>`);
				}
				else
				{
					L.push(`<option value="${valuehtml}" selected="selected" class="text-danger">${valuehtml}</option>`);
				}
			});

			/*--------------------------------------------------------------------------------------------------------*/
			/* OTHER ITEMS                                                                                            */
			/*--------------------------------------------------------------------------------------------------------*/

			$.each(rows, (idx, row) => {

				const value = amiWebApp.jspath('..field.$', row)[0] || '';

				if(!(value in predicate.select))
				{
					const valuehtml = amiWebApp.textToHtml(value);
					L.push(`<option value="${valuehtml}" xxxxxxxx="xxxxxxxx">${valuehtml}</option>`);
				}
			});

			L.sort();


			if('::any::' in predicate.select) {
				L.unshift('<option value="::any::" selected="selected">« reset filter »</option>');
			}
			else {
				L.unshift('<option value="::any::" xxxxxxxx="xxxxxxxx">« reset filter »</option>');
			}

			$(`${predicate.selector} select`).html(L.join(''));

			$(`${predicate.selector} .count`).text(L.length - 1);

			$(`${predicate.selector} .limit`).text(predicate.limit);

		}).fail((data) => {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	fillParamBoxKey: function(name)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

		let predicate = this.ctx.predicates[name], criterion = predicate.criterion;

		/*------------------------------------------------------------------------------------------------------------*/
		/* BUILD SQL QUERY																							*/
		/*------------------------------------------------------------------------------------------------------------*/

		let mql = '';

		switch(criterion.type)
		{
			case 5:
			case 6:
				mql = `SELECT JSON_PATHS(\`${criterion.catalog}\`.\`${criterion.entity}\`.\`${criterion.field}\`${this.dumpConstraints(criterion)}, '$') WHERE 1`;
				break;
			case 7:
			case 8:
			case 9:
			case 10:
				mql = `SELECT DISTINCT \`${criterion.catalog}\`.\`${criterion.entity}\`.\`${criterion.key_field}\`${this.dumpConstraints(criterion)}`;
				break;
		}

		const filter = this.dumpFilterAST(name);

		if(filter)
		{
			mql += ` WHERE ${filter}`;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.execute(`SearchQuery -catalog="${amiWebApp.textToString(criterion.catalog)}" -entity="${amiWebApp.textToString(this.ctx.defaultEntity)}" -mql="${amiWebApp.textToString(mql)}"`).done((data) => {

			const fields = amiWebApp.jspath('..field', data);

			let m = {};

			switch(criterion.type)
			{
				case 5:
				case 6:
					m['@NULL'] = '@NULL';

					$.each(fields, (idx, field) => {
							let key = field.$.substring(2);
							m[key] = key;
					});

					this._fillParamBoxKey(m,predicate);

					break;

				case 7:
				case 8:
				case 9:
				case 10:
					$.each(fields, (idx, field) => {

						m[field.$] = field.$
					});

					this._fillParamBoxKey(m,predicate);
					break;
			}

			/*--------------------------------------------------------------------------------------------------------*/

			amiWebApp.unlock();

			/*--------------------------------------------------------------------------------------------------------*/


		}).fail((data) => {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_fillParamBoxKey: function(m, predicate)
	{
		if($.isEmptyObject(m) === false)
		{
			const L = [];

			let selected = false;

			/*--------------------------------------------------------------------------------------------------------*/
			/* SELECTED ITEM                                                                                          */
			/*--------------------------------------------------------------------------------------------------------*/

			$(`${predicate.selector} select.key`).removeClass('text-danger');

			if(predicate.selectedParam)
			{
				if(m[predicate.selectedParam])
				{
					selected = true;
					L.push(`<option value="${amiWebApp.textToHtml(predicate.selectedParam)}" selected="selected" class="text-dark">${amiWebApp.textToHtml(predicate.selectedParam)}</option>`);
				}
				else
				{
					selected = true;
					$(`${predicate.selector} select.key`).addClass('text-danger');
					L.push(`<option value="${amiWebApp.textToHtml(predicate.selectedParam)}" selected="selected">${amiWebApp.textToHtml(predicate.selectedParam)}</option>`);
				}
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* OTHER ITEMS                                                                                            */
			/*--------------------------------------------------------------------------------------------------------*/

			for(const key in m)
			{
				if(key !== predicate.selectedParam)
				{
					L.push(`<option value="${amiWebApp.textToHtml(key)}" xxxxxxxx="xxxxxxxx" class="text-dark">${amiWebApp.textToHtml(key)}</option>`);
				}
			}

			/*--------------------------------------------------------------------------------------------------------*/

			L.sort();

			/*--------------------------------------------------------------------------------------------------------*/

			if('::any::' === predicate.selectedParam) {
				selected = true;
				L.unshift('<option value="::any::" selected="selected" class="text-dark">« reset filter »</option>');
			}
			else {
				L.unshift('<option value="::any::" xxxxxxxx="xxxxxxxx" class="text-dark">« reset filter »</option>');
			}

			$(`${predicate.selector} select:first`).html(L.join(''));

			if(!selected)
			{
				$(`${predicate.selector} select:last`).html('');
				$(`${predicate.selector} select:last`).attr('disabled','disabled');
			}
		}
		else
		{
			$(`${predicate.selector} select:first`).html('');
			$(`${predicate.selector} select:last`).html('');
			$(`${predicate.selector} select:last`).attr('disabled','disabled');
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	fillParamBoxVal: function(name, applyFilter, applyLimit)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const predicate = this.ctx.predicates[name], criterion = predicate.criterion;

		const selectedParam = this.ctx.predicates[name].selectedParam || '';

		if (selectedParam !== '')
		{
			/*--------------------------------------------------------------------------------------------------------*/
			/* BUILD SQL QUERY																						*/
			/*--------------------------------------------------------------------------------------------------------*/

			let mql = '';

			switch(criterion.type)
			{
				case 5:
				case 6:
					mql = `SELECT JSON_VALUES(\`${criterion.catalog}\`.\`${criterion.entity}\`.\`${criterion.field}\`${this.dumpConstraints(criterion)}, '$.${selectedParam}') WHERE 1`;
					break;
				case 7:
				case 8:
					mql = `SELECT DISTINCT \`${criterion.catalog}\`.\`${criterion.entity}\`.\`${criterion.field}\`${this.dumpConstraints(criterion)} WHERE \`${criterion.catalog}\`.\`${criterion.entity}\`.\`${criterion.key_field}\`${this.dumpConstraints(criterion)} = '${selectedParam}'`;
					break;
				case 9:
				case 10:
					mql = `SELECT DISTINCT \`${criterion.catalog}\`.\`${criterion.entity}\`.\`${this.ctx.predicates[name].selectedValueField}\`${this.dumpConstraints(criterion)} WHERE \`${criterion.catalog}\`.\`${criterion.entity}\`.\`${criterion.key_field}\`${this.dumpConstraints(criterion)} = '${selectedParam}'`;
					break;
			}

			/*--------------------------------------------------------------------------------------------------------*/

			const filter = this.dumpFilterAST(name);

			if(filter)
			{
				switch(criterion.type)
				{
					case 5:
					case 6:
						mql += ' WHERE ';
						break;
					case 7:
					case 8:
					case 9:
					case 10:
						mql += ' AND ';
						break;
				}

				mql += filter;
			}

			if(criterion.more.order)
			{
				switch(criterion.type)
				{
					case 5:
					case 6:
						mql += ` ORDER BY \`${criterion.catalog}\`.\`${criterion.entity}\`.\`${criterion.field}\` ${criterion.more.order}`;
						break;
					case 7:
					case 8:
						mql += ` ORDER BY \`${criterion.catalog}\`.\`${criterion.entity}\`.\`${criterion.field}\` ${criterion.more.order}`;
						break;
					case 9:
					case 10:
						mql += ` ORDER BY \`${criterion.catalog}\`.\`${criterion.entity}\`.\`${this.ctx.predicates[name].selectedValueField}\` ${criterion.more.order}`;
						break;
				}
			}

			if(applyLimit)
			{
				mql += ` LIMIT ${predicate.limit} OFFSET 0`;
			}

			/*--------------------------------------------------------------------------------------------------------*/

			amiCommand.execute(`SearchQuery -catalog="${amiWebApp.textToString(criterion.catalog)}" -entity="${amiWebApp.textToString(this.ctx.defaultEntity)}" -mql="${amiWebApp.textToString(mql)}"`).done((data) => {

				const L = [];
				const fields = amiWebApp.jspath('..field', data);

				let valueDict = {};

				$.each(fields, (idx, field) => {

					let values=[]
					let value;

					switch(criterion.type) {
						case 5:
						case 6:
							value = (field.$ || '').trim();

							if(value.startsWith('"') && value.endsWith('"'))
							{
								value = amiWebApp.stringToText(value.substring(1, value.length - 1));
								valueDict[value] = value;
							}

							/*----------------------------------------------------------------------------------------*/

							if(value.startsWith('[') && value.endsWith(']'))
							{
								values = JSON.parse(value);
								values.forEach((v) =>
								{
									valueDict[v] = v;
								});

							}
							else
							{
								valueDict[value] = value;
							}
							break;
						case 7:
						case 8:
						case 9:
						case 10:
							value = field.$ || '';
							valueDict[value] = value;
							break;
					}
				});

				/*----------------------------------------------------------------------------------------------------*/
				/* SELECTED ITEMS                                                                                     */
				/*----------------------------------------------------------------------------------------------------*/

				Object.keys(predicate.select).forEach((key) => {

					const valuehtml = amiWebApp.textToHtml(key);

					if(valueDict[key])
					{
						L.push(`<option value="${valuehtml}" selected="selected">${valuehtml}</option>`);
					}
					else
					{
						L.push(`<option value="${valuehtml}" selected="selected" class="text-danger">${valuehtml}</option>`);
					}
				});

				/*----------------------------------------------------------------------------------------------------*/
				/* OTHER ITEMS                                                                                        */
				/*----------------------------------------------------------------------------------------------------*/

				for(const v in valueDict) {
					if (v !== '') {
						if (!(v in predicate.select)) {
							L.push(`<option value="${amiWebApp.textToHtml(v)}" xxxxxxxx="xxxxxxxx">${amiWebApp.textToHtml(v)}</option>`);
						}
					}
				}

				/*----------------------------------------------------------------------------------------------------*/

				if(L.length > 0)
				{
					//new feature
					L.sort();

					if('::any::' in predicate.select) {
						L.unshift('<option value="::any::" selected="selected">« reset filter »</option>');
					}
					else {
						L.unshift('<option value="::any::" xxxxxxxx="xxxxxxxx">« reset filter »</option>');
					}

					$(`${predicate.selector} select:last`).html(L.join(''));

					$(`${predicate.selector} .count`).text(L.length - 1);

					$(`${predicate.selector} .limit`).text(predicate.limit);

					$(`${predicate.selector} select:last`).removeAttr('disabled');
				}
				else
				{
					$(`${predicate.selector} select:last`).html('');
					$(`${predicate.selector} select:last`).attr('disabled','disabled');
				}

				result.resolve();
				amiWebApp.unlock();

			}).fail((data) => {
				amiWebApp.error(amiWebApp.jspath('..error.$', data), true);

				result.reject();
			});
		}
		else
		{
			$(`${predicate.selector} select:last`).html('');
			$(`${predicate.selector} select:last`).attr('disabled','disabled');

			result.resolve();
			amiWebApp.unlock();
		}

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	fillNumberBox: function(name, init)
	{
		const predicate = this.ctx.predicates[name], criterion = predicate.criterion;

		/*------------------------------------------------------------------------------------------------------------*/
		/* BUILD SQL QUERY																							*/
		/*------------------------------------------------------------------------------------------------------------*/

		let mql = `SELECT MIN(\`${criterion.catalog}\`.\`${criterion.entity}\`.\`${criterion.field}\`${this.dumpConstraints(criterion)}) AS \`min\`, MAX(\`${criterion.catalog}\`.\`${criterion.entity}\`.\`${criterion.field}\`${this.dumpConstraints(criterion)}) AS \`max\``;

		/*-----------------------------------------------------------------*/

		const filter = this.dumpFilterAST(name);

		if(filter)
		{
			mql += ` WHERE ${filter}`;
		}

		/*------------------------------------------------------------------------------------------------------------*/
		/* FILL BOX																								   */
		/*------------------------------------------------------------------------------------------------------------*/

		return amiCommand.execute(`SearchQuery -catalog="${amiWebApp.textToString(criterion.catalog)}" -entity="${amiWebApp.textToString(this.ctx.defaultEntity)}" -mql="${amiWebApp.textToString(mql)}"`).done((data) => {

			let min = amiWebApp.jspath('..field{.@name==="min"}.$', data)[0] || '';
			let max = amiWebApp.jspath('..field{.@name==="max"}.$', data)[0] || '';

			if(min === '@NULL')
			{
				min = '';
			}

			if(max === '@NULL')
			{
				max = '';
			}

			if (min !== '' && max !== '')
			{
				if ($(`${predicate.selector} input.min`).val() !== '' && $(`${predicate.selector} input.max`).val() !== '')
				{
					//now predicate.select.min and max are never empty Object nor === '' !
					if (($.isEmptyObject(predicate.select.min) || predicate.select.min === '') && ($.isEmptyObject(predicate.select.max) || predicate.select.max === ''))
					{
						$(`${predicate.selector} input.min`).val(min);
						$(`${predicate.selector} input.max`).val(max);
					}
					else
					{
						$(`${predicate.selector} input.min`).val(predicate.select.min);
						$(`${predicate.selector} input.max`).val(predicate.select.max);

						if(parseFloat(predicate.select.min) < parseFloat(min))
						{
							$(`${predicate.selector} input.min`).addClass('text-danger');
						}
						else
						{
							$(`${predicate.selector} input.min`).removeClass('text-danger');
						}

						if(parseFloat(predicate.select.max) > parseFloat(max))
						{
							$(`${predicate.selector} input.max`).addClass('text-danger');
						}
						else
						{
							$(`${predicate.selector} input.max`).removeClass('text-danger');
						}
					}
				}
				else if(init)
				{
					$(`${predicate.selector} input.min`).val(min);
					$(`${predicate.selector} input.max`).val(max);
				}
			}
			//new feature
			else
			{
				if(predicate.select.min !== '')
				{
					$(`${predicate.selector} input.min`).addClass('text-danger');
				}
				else
				{
					$(`${predicate.selector} input.min`).removeClass('text-danger');
				}

				if(predicate.select.max !== '')
				{
					$(`${predicate.selector} input.max`).addClass('text-danger');
				}
				else
				{
					$(`${predicate.selector} input.max`).removeClass('text-danger');
				}
			}

		}).fail((data) => {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	selectParamKey: function(name)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		let predicate = this.ctx.predicates[name], criterion = predicate.criterion;

		predicate.select = {}

		/*------------------------------------------------------------------------------------------------------------*/

		if($(`${predicate.selector} select:first option[value="::any::"]:selected`).length == 0)
		{
			this.ctx.predicates[name].selectedParam = $(`${predicate.selector} select:first option:selected`).val();
		}
		else
		{
			this.ctx.predicates[name].selectedParam = '';
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if(this.ctx.predicates[name].selectedParam !== '')
		{
			if (this.ctx.predicates[name].criterion.type === 9 || this.ctx.predicates[name].criterion.type === 10)
			{
				let mql = `SELECT DISTINCT \`${criterion.catalog}\`.\`${criterion.entity}\`.\`${criterion.field}\`${this.dumpConstraints(criterion)} WHERE \`${criterion.catalog}\`.\`${criterion.entity}\`.\`${criterion.key_field}\`${this.dumpConstraints(criterion)} = '${this.ctx.predicates[name].selectedParam}'`;

				amiCommand.execute(`SearchQuery -catalog="${amiWebApp.textToString(criterion.catalog)}" -entity="${amiWebApp.textToString(this.ctx.defaultEntity)}" -mql="${amiWebApp.textToString(mql)}"`).done((data) => {

					this.ctx.predicates[name].selectedValueField = amiWebApp.jspath('..field', data)[0].$ || '';

					switch(predicate.criterion.type)
					{
						case 9:
							this.fillParamBoxVal(name, false, false).always(() => {

								this.select(name);
							});
							break;

						case 10:
							this.fillParamBoxVal(name, true, true).always(() => {

							   this.select(name);
							 });
							break;
					}
				});
			}
			else
			{
				switch(predicate.criterion.type)
				{
					case 5:
					case 7:

						this.fillParamBoxVal(name, false, false).always(() => {

							this.select(name);
						});
						break;
					case 6:
					case 8:
						this.fillParamBoxVal(name, true, true).always(() => {

							this.select(name);
						});
						break;
				}
			}
		}
		else
		{
			/*--------------------------------------------------------------------------------------------------------*/

			switch(predicate.criterion.type)
			{
				case 5:
				case 7:
				case 9:
					this.fillParamBoxVal(name, false, false).always(() => {

					   this.select(name);
					});
					break;
				case 6:
				case 8:
				case 10:
					this.fillParamBoxVal(name, true, true).always(() => {

					   this.select(name);
					});
					break;
			}

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	select: function(name)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		let predicate = this.ctx.predicates[name], criterion = predicate.criterion;

		let catalog = criterion.catalog;
		let entity = criterion.entity;
		let field = criterion.field;

		let isDefaultEntity = this.ctx.defaultEntity === entity;

		let param = predicate.selectedParam;

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

		let L = [];
		let S = {};

		if($(`${predicate.selector} select:last option[value="::any::"]:selected`).length === 0 && $(`${predicate.selector} select:last option:selected`).length !== 0)
		{
			$(`${predicate.selector} select:last option:selected`).each((i, el) => {

				switch(criterion.type)
				{
					case 0:
					case 1:
						if( el.value === '@NULL')
						{
							if (isDefaultEntity)
							{
								L.push(`\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} IS NULL`);
							}
							else
							{
								L.push(`[\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} IS NULL]`);
							}
						}
						else
						{
							if (isDefaultEntity)
							{
								L.push(`\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} = '${amiWebApp.textToSQL(el.value)}'`);
							}
							else
							{
								L.push(`[\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} = '${amiWebApp.textToSQL(el.value)}']`);
							}
						}
						break;
					case 5:
					case 6:
						if(param)
						{
							if (isDefaultEntity)
							{
								if(param === '@NULL')
								{
									L.push(`\`${catalog}\`.\`${entity}\`.\`${field}\` IS NULL`);
								}
								else
								{
									if(el.value === '@NULL')
									{
										L.push(`JSON_VALUE(\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)},'$.${param}') IS NULL`);
									}
									else
									{
										if(param.endsWith('[*]'))
										{
											L.push(`JSON_QUERY(\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)},'$.${param.replace(/\[\*\]/g, '')}') LIKE '[%${amiWebApp.textToSQL(el.value)}%]'`);
										}
										else
										{
											let expr = '';

											if(param.includes('[*].'))
											{
												const idx = param.lastIndexOf('[*].');
												const path = param.substring(0, idx).replace(/\[\*\]/g, '');
												const key = param.substring(idx + 4);

												expr = `JSON_QUERY(\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)},'$.${path}') LIKE '[%${key}%${amiWebApp.textToSQL(el.value)}%]' OR `;
											}

											expr = `(${expr}JSON_VALUE(\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)},'$.${param}') = '${amiWebApp.textToSQL(el.value)}')`;

											L.push(expr);
										}
									}
								}
							}
							else
							{
								if(param === '@NULL')
								{
									L.push(`[\`${catalog}\`.\`${entity}\`.\`${field}\` IS NULL]`);
								}
								else
								{
									if(el.value === '@NULL')
									{
										L.push(`[JSON_VALUE(\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)},'$.${param}') IS NULL]`);
									}
									else
									{
										if(param.endsWith('[*]'))
										{
											L.push(`[JSON_QUERY(\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)},'$.${param.replace(/\[\*\]/g, '')}') LIKE '[%${amiWebApp.textToSQL(el.value)}%]']`);
										}
										else
										{
											let expr = '';

											if(param.includes('[*].'))
											{
												const idx = param.lastIndexOf('[*].');
												const path = param.substring(0, idx).replace(/\[\*\]/g, '');
												const key = param.substring(idx + 4);

												expr = `JSON_QUERY(\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)},'$.${path}') LIKE '[%${key}%${amiWebApp.textToSQL(el.value)}%]' OR `;

											}

											expr = `(${expr}JSON_VALUE(\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)},'$.${param}') = '${amiWebApp.textToSQL(el.value)}')`;

											L.push(`[${expr}]`);
										}
									}
								}
							}
						}

						break;

					case 7:
					case 8:
						if(param)
						{
							if (isDefaultEntity)
							{
								L.push(`(\`${catalog}\`.\`${entity}\`.\`${criterion.key_field}\`${this.dumpConstraints(criterion)} = '${param}' AND \`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} = '${amiWebApp.textToSQL(el.value)}')`);
							}
							else
							{
								L.push(`[(\`${catalog}\`.\`${entity}\`.\`${criterion.key_field}\`${this.dumpConstraints(criterion)} = '${param}' AND \`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} = '${amiWebApp.textToSQL(el.value)}')]`);
							}
						}
						break;

					case 9:
					case 10:
						if(param)
						{
							if (isDefaultEntity)
							{
								L.push(`(\`${catalog}\`.\`${entity}\`.\`${criterion.key_field}\`${this.dumpConstraints(criterion)} = '${param}' AND \`${catalog}\`.\`${entity}\`.\`${this.ctx.predicates[name].selectedValueField}\`${this.dumpConstraints(criterion)} = '${amiWebApp.textToSQL(el.value)}')`);
							}
							else
							{
								L.push(`[(\`${catalog}\`.\`${entity}\`.\`${criterion.key_field}\`${this.dumpConstraints(criterion)} = '${param}' AND \`${catalog}\`.\`${entity}\`.\`${this.ctx.predicates[name].selectedValueField}\`${this.dumpConstraints(criterion)} = '${amiWebApp.textToSQL(el.value)}')]`);
							}
						}
						break;
				}

				S[el.value] = true;
			});

			predicate.filter = L.join(!$(`${predicate.selector} input.switch-andor`).prop('checked') ? ' OR ' : ' AND ');

			if($(`${predicate.selector} input.switch-not`).prop('checked'))
			{
				predicate.filter = `NOT (${predicate.filter})`;
			}

			predicate.select = S;


			/*--------------------------------------------------------------------------------------------------------*/
		}
		else
		{
			/*--------------------------------------------------------------------------------------------------------*/
			/* OPEN BOX WITH NO SELECTED VALUE																		*/
			/*--------------------------------------------------------------------------------------------------------*/

			switch(criterion.type)
			{
				case 5:
				case 6:
					if(param)
					{
						if (isDefaultEntity)
						{
							if(param === '@NULL')
							{
								 L.push(`\`${catalog}\`.\`${entity}\`.\`${field}\` IS NULL`);
							}
							else
							{
								 if(param.endsWith('[*]'))
								 {
								 	L.push(`JSON_QUERY(\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)}, '$.${param.substring(0, param.length - 3)}') IS NOT NULL`);
								 }
								 else
								 {
								 	L.push(`JSON_VALUE(\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)}, '$.${param}') IS NOT NULL`);
								 }
							}
						}
						else
						{
							if(param === '@NULL')
							{
								 L.push(`[\`${catalog}\`.\`${entity}\`.\`${field}\` IS NULL]`);
							}
							else
							{
								 if(param.endsWith('[*]'))
								 {
									L.push(`[JSON_QUERY(\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)}, '$.${param.substring(0, param.length - 3)}') IS NOT NULL]`);
								 }
								 else
								 {
									L.push(`[JSON_VALUE(\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)}, '$.${param}') IS NOT NULL]`);
								 }
							}
						}
					}
			}

			predicate.filter = L.join(!$(`${predicate.selector} input.switch-andor`).prop('checked') ? ' OR ' : ' AND ');

			if(param && $(`${predicate.selector} input.switch-not`).prop('checked'))
			{
				predicate.filter = `NOT (${predicate.filter})`;
			}

			predicate.select = S;

			/*--------------------------------------------------------------------------------------------------------*/

		}

		/*------------------------------------------------------------------------------------------------------------*/

		this.refresh();
		amiWebApp.unlock();

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_wildcard: function(parts, s)
	{
		let idx;

		for(let i = 0; i < parts.length; s = s.substring(idx + parts[i++].length))
		{
			if((idx = s.indexOf(parts[i])) < 0)
			{
				return false;
			}
		}

		return true;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	filter: function(name)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		let predicate = this.ctx.predicates[name], criterion = predicate.criterion;

		let catalog = criterion.catalog;
		let entity = criterion.entity;
		let field = criterion.field;

		let param = predicate.selectedParam;

		let isDefaultEntity = this.ctx.defaultEntity === entity;

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

		let filter = $(`${predicate.selector} .filter`).val();
		let tmpFilter;

		/*------------------------------------------------------------------------------------------------------------*/

		switch(criterion.type)
		{

			case 0:

				if(filter.includes('%'))
				{
					if(isDefaultEntity)
					{
						/* or/and has no meaning in this case, keep the % */
						tmpFilter = `\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} LIKE '${filter.replace(/'/g, '\'\'')}'`;
					}
					else
					{
						let sel = $(`${predicate.selector} select:last option:not(:first)`);
						let parts = filter.split('%');
						let L = [];

						sel.each( (i, el) => {
							if(filter && this._wildcard(parts, el.value))
							{
								L.push(`[\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} = '${el.value.trim()}']`);
							}
						});

						tmpFilter = L.join(!$(`${predicate.selector} input[type="checkbox"]`).prop('checked') ? ' OR ' : ' AND ');
					}
				}
				else
				{
					tmpFilter = `\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} = '${filter.replace(/'/g, '\'\'')}'`;
				}

				break;
			case 1:
				if(filter.includes('%'))
				{
					tmpFilter = `\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} LIKE '${filter.replace(/'/g, '\'\'')}'`;
				}
				else
				{
					tmpFilter = `\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} = '${filter.replace(/'/g, '\'\'')}'`;
				}
				break;
			case 5:
			case 6:

				if(param === '@NULL')
				{
					tmpFilter = `\`${catalog}\`.\`${entity}\`.\`${criterion.field}\` IS NULL`;
				}
				else
				{
					if(filter.includes('%'))
					{
						if(param.endsWith('[*]'))
						{
							tmpFilter = `JSON_QUERY(\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)},'$.${param.substring(0, param.length - 3 )}') LIKE '[%${amiWebApp.textToSQL(filter)}%]'`;
						}
						else
						{
							tmpFilter = `JSON_VALUE(\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)},'$.${param}') LIKE '${amiWebApp.textToSQL(filter)}'`;
						}
					}
					else
					{
						if(param.endsWith('[*]'))
						{
							tmpFilter = `JSON_QUERY(\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)},'$.${param.substring(0, param.length - 3 )}') LIKE '[%${amiWebApp.textToSQL(filter)}%]'`;
						}
						else
						{
							tmpFilter = `JSON_VALUE(\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)},'$.${param}') = '${amiWebApp.textToSQL(filter)}'`;
						}
					}
				}
				break;

			case 7:
			case 8:
				if(filter.includes('%')) {
					tmpFilter = `(\`${catalog}\`.\`${entity}\`.\`${criterion.key_field}\`${this.dumpConstraints(criterion)} = '${param}' AND \`${catalog}\`.\`${entity}\`.\`${criterion.field}\` LIKE '${filter.replace(/'/g, '\'\'')}')`;
				} else {
					tmpFilter = `(\`${catalog}\`.\`${entity}\`.\`${criterion.key_field}\`${this.dumpConstraints(criterion)} = '${param}' AND \`${catalog}\`.\`${entity}\`.\`${criterion.field}\` = '${filter.replace(/'/g, '\'\'')}')`;
				}
				break;

			case 9:
			case 10:
				if(filter.includes('%')) {
					tmpFilter = `(\`${catalog}\`.\`${entity}\`.\`${criterion.key_field}\`${this.dumpConstraints(criterion)} = '${param}' AND \`${catalog}\`.\`${entity}\`.\`${this.ctx.predicates[name].selectedValueField}\` LIKE '${filter.replace(/'/g, '\'\'')}')`;
				} else {
					tmpFilter = `(\`${catalog}\`.\`${entity}\`.\`${criterion.key_field}\`${this.dumpConstraints(criterion)} = '${param}' AND \`${catalog}\`.\`${entity}\`.\`${this.ctx.predicates[name].selectedValueField}\` = '${filter.replace(/'/g, '\'\'')}')`;
				}
				break;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if($(`${predicate.selector} input.switch-not`).prop('checked'))
		{
			tmpFilter = `NOT (${tmpFilter})`;
		}

		if(isDefaultEntity)
		{
			predicate.filter = tmpFilter;
		}
		else
		{
			criterion.type === 0 ? predicate.filter = tmpFilter : predicate.filter = `[${tmpFilter}]` ;
		}

		/*------------------------------------------------------------------------------------------------------------*/
		/* SELECT IN THE HTML BOX VALUES																			  */
		/*------------------------------------------------------------------------------------------------------------*/

		predicate.select = {};

		let sel = $(`${predicate.selector} select:last option:not(:first)`);

		if(filter.includes('%'))
		{
			let parts = filter.split('%');

			sel.each( (i, el) => {
				if(filter && this._wildcard(parts, el.value))
				{
					predicate.select[el.value.trim()] = true;
				}

			});
		}
		else
		{
			sel.each( (i, el) => {
				if(filter && filter === el.value)
				{
					predicate.select[el.value.trim()] = true;
				}

			});
		}

		/*------------------------------------------------------------------------------------------------------------*/

		this.refresh();
		amiWebApp.unlock();

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	viewLess: function(name)
	{
		let predicate = this.ctx.predicates[name];

		/*--*/ if(predicate.limit > 100) {
			predicate.limit -= 100;
		} else if(predicate.limit > 10) {
			predicate.limit -= 10;
		} else if(predicate.limit > 1) {
			predicate.limit -= 1;
		}

		amiWebApp.lock();

		this.fillStringBox(name, true, true).always(() => {

			let filter = $(`${predicate.selector} .filter`).val()
														   .trim();

			if(filter && filter !== '')
			{
				this.filter(name);
			}

			amiWebApp.unlock();
		});

	},

	/*----------------------------------------------------------------------------------------------------------------*/

	viewMore: function(name)
	{
		let predicate = this.ctx.predicates[name];

		/*--*/ if(predicate.limit >= 100) {
			predicate.limit += 100;
		} else if(predicate.limit >= 10) {
			predicate.limit += 10;
		} else if(predicate.limit >= 0) {
			predicate.limit += 1;
		}

		// loch and unlock not needed as there are done inside refresh... => should propagate from fillStringBox etc...
		amiWebApp.lock();

		this.fillStringBox(name, true, true).always(() => {

			let filter = $(`${predicate.selector} .filter`).val()
														   .trim();

			if(filter && filter !== '')
			{
				this.filter(name);
			}

			amiWebApp.unlock();
		});

	},

	/*----------------------------------------------------------------------------------------------------------------*/

	setMinMax: function(name)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		let predicate = this.ctx.predicates[name], criterion = predicate.criterion;

		let catalog = criterion.catalog;
		let entity = criterion.entity;
		let field = criterion.field;

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

		let tmpFilter;

		if($(`${predicate.selector} input.switch-null`).prop('checked'))
		{
			$(`${predicate.selector} input.min`).attr('disabled','disabled');
			$(`${predicate.selector} input.max`).attr('disabled','disabled');

			tmpFilter = `\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} IS NULL`
			;
		}
		else
		{
			let min = $(`${predicate.selector} input.min`).val() || '';
			let max = $(`${predicate.selector} input.max`).val() || '';

			$(`${predicate.selector} input.min`).removeAttr('disabled');
			$(`${predicate.selector} input.max`).removeAttr('disabled');

			predicate.select.min = min;
			predicate.select.max = max;

			if(min === '' || max === '')
			{
				tmpFilter = `\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} IS NULL`
				;
			}
			else
			{
				if(predicate.criterion.type === 3)
				{
					if(!$(`${predicate.selector} input.switch-in`).prop('checked'))
					{
						tmpFilter = `\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} >= AMI_TIMESTAMP('${min}') AND \`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} <= AMI_TIMESTAMP('${max}')`
						;
					}
					else
					{
						tmpFilter = `\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} < AMI_TIMESTAMP('${min}') OR \`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} > AMI_TIMESTAMP('${max}')`
						;
					}
				}
				else
				{
					if(!$(`${predicate.selector} input.switch-in`).prop('checked'))
					{
						tmpFilter = `\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} >= '${min}' AND \`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} <= '${max}'`
						;
					}
					else
					{
						tmpFilter = `\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} < '${min}' OR \`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} > '${max}'`
						;
					}
				}
			}
		}
		/*------------------------------------------------------------------------------------------------------------*/

		let isDefaultEntity = this.ctx.defaultEntity === entity;

		if(isDefaultEntity || tmpFilter === '')
		{
			predicate.filter = tmpFilter;
		}
		else
		{
			predicate.filter = `[${tmpFilter}]`;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		this.refresh();

		amiWebApp.unlock();

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	toggle: function(name)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		let predicate = this.ctx.predicates[name], criterion = predicate.criterion;

		let catalog = criterion.catalog;
		let entity = criterion.entity;
		let field = criterion.field;

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

		let tmpFilter;

		if($(`${predicate.selector} input[type="checkbox"]`).prop('checked'))
		{
			tmpFilter = `\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} = '${new String(criterion.more.on).replace(/'/g, '\'\'')}'`;
		}
		else
		{
			if(!criterion.more.inclusive)
			{
				tmpFilter = `\`${catalog}\`.\`${entity}\`.\`${field}\`${this.dumpConstraints(criterion)} = '${new String(criterion.more.off).replace(/'/g, '\'\'')}'`;
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		let isDefaultEntity = this.ctx.defaultEntity === entity;

		if(isDefaultEntity)
		{
			predicate.filter = tmpFilter;
		}
		else
		{
			predicate.filter = `[${tmpFilter}]`;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		this.refresh();
		amiWebApp.unlock();

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	addCriteria: function()
	{
		alert('TODO');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	openSchema: function()
	{
		amiWebApp.createControlInContainer(this.tabCtrl, this, 'schema', [this.ctx.defaultCatalog], {}, this.ctx, 'database', this.ctx.defaultCatalog);

		/* À VERIFIER !!! */
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	viewSelection: function()
	{
		/* À VERIFIER !!! */

		amiWebApp.createControlInContainer(this.tabCtrl, this, 'table', [`BrowseQuery -GUI -catalog="${amiWebApp.textToString(this.ctx.defaultCatalog)}" -entity="${amiWebApp.textToString(this.ctx.defaultEntity)}" -mql="${amiWebApp.textToString(this.ctx.mql)}"`], {showDetails: true, canEdit: this.ctx.canEdit, catalog: this.ctx.defaultCatalog, entity: this.ctx.defaultEntity, primaryField: this.ctx.defaultPrimaryField}, this.ctx, 'table', this.ctx.defaultEntity);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	showMQL: function()
	{
		amiWebApp.createControl(this.getParent(), this, 'textBox', [this.ctx.mql, {lang: 'mql'}]);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	showJS: function()
	{
		amiWebApp.createControl(this.getParent(), this, 'textBox', [this.ctx.js, {lang: 'javascript'}]);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* AST																											*/
	/*----------------------------------------------------------------------------------------------------------------*/

	updateExpression: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		let fix = function(node)
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

		/*------------------------------------------------------------------------------------------------------------*/

		let expression = $(this.patchId('#CA15011B_EECA_E9AB_63EE_7A2A467025A5')).val();

		/*------------------------------------------------------------------------------------------------------------*/

		if(expression)
		{
			/*--------------------------------------------------------------------------------------------------------*/

			amiWebApp.lock();

			/*--------------------------------------------------------------------------------------------------------*/

			try
			{
				this.ctx.ast = fix(new amiTwig.expr.Compiler(expression, 1).rootNode);

				this.refresh();
				amiWebApp.unlock();
			}
			catch(e)
			{
				$(this.patchId('#CA15011B_EECA_E9AB_63EE_7A2A467025A5')).val(this.dumpAST());

				amiWebApp.error(e, true);
			}

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	addPredicateInAST: function(predicate)
	{
		let newNode = new amiTwig.expr.Node(amiTwig.expr.tokens.TERMINAL, predicate);

		if(this.ctx.ast)
		{
			let andNode = new amiTwig.expr.Node(amiTwig.expr.tokens.LOGICAL_AND, 'and');

			andNode.nodeLeft = this.ctx.ast;
			andNode.nodeRight = newNode;

			this.ctx.ast = andNode;
		}
		else
		{
			this.ctx.ast = newNode;
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	delPredicateInAST: function(predicate)
	{
		let m = this.lookupParentAST(predicate);

		if(m)
		{
			if(m.parent)
			{
				let parent = m.parent;
				let other = m.other;

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

	/*----------------------------------------------------------------------------------------------------------------*/

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
			let result;

			let goodOther;
			let goodParent;

			/*--------------------------------------------------------------------------------------------------------*/

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

			/*--------------------------------------------------------------------------------------------------------*/

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

			/*--------------------------------------------------------------------------------------------------------*/
		}

		return null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	lookupParentAST: function(predicate)
	{
		return this.ctx.ast ? this._lookupParentAST(predicate, null, null, this.ctx.ast) : null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_dumpAST: function(node, dict, ignore)
	{
		let t1;
		let t2;

		let result;

		/**/ if(node.nodeLeft
				&&
				node.nodeRight
		 ) {
			/*--------------------------------------------------------------------------------------------------------*/

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

				return `(${result.join(' ')})`;
			}

			/*--------------------------------------------------------------------------------------------------------*/
		}
		else if(node.nodeLeft === null && node.nodeRight !== null)
		{
			/*--------------------------------------------------------------------------------------------------------*/

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

				return `(${result.join(' ')})`;
			}

			/*--------------------------------------------------------------------------------------------------------*/
		}
		else if(node.nodeLeft !== null && node.nodeRight === null)
		{
			/*--------------------------------------------------------------------------------------------------------*/

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

				return `(${result.join(' ')})`;
			}

			/*--------------------------------------------------------------------------------------------------------*/
		}
		else
		{
			/*--------------------------------------------------------------------------------------------------------*/

			let value = node.nodeValue;

			/*--------------------------------------------------------------------------------------------------------*/

			if(value !== ignore)
			{
				if(dict)
				{
					var filter = dict[value].filter;

					if(filter)
					{
						return `(${filter})`;
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

			/*--------------------------------------------------------------------------------------------------------*/
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	dumpAST: function(dict, ignore)
	{
		let result;

		/*------------------------------------------------------------------------------------------------------------*/

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

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	dumpConstraints: function(criterion)
	{
		return criterion.more.constraints && criterion.more.constraints.length > 0 ? `{${criterion.more.constraints.join()}}` : '';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_dumpFilterAST: function(predicate, node, predicates)
	{
		let ast = null;
		let predicateFound = false

		if(node === null)
		{
			return {'ast' : ast, 'predicateFound' : predicateFound};
		}

		let astL = null;
		let astR = null;
		let predicateFoundL = false;
		let predicateFoundR = false;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* RECURSION																									  */
	/*----------------------------------------------------------------------------------------------------------------*/

		if(node.nodeLeft === null && node.nodeRight === null)
		{
			if(node.nodeValue === predicate)
			{
				ast = null;
				predicateFound = true;
			}
			else
			{
				ast = new amiTwig.expr.Node(amiTwig.expr.tokens.TERMINAL, node.nodeValue);
			}

			return {'ast' : ast, 'predicateFound' : predicateFound};
		}

		if (node.nodeLeft !== null )
		{
			let tmp = this._dumpFilterAST(predicate, node.nodeLeft, predicates);
			astL = tmp.ast;
			predicateFoundL = tmp.predicateFound;
		}

		if (node.nodeRight !== null )
		{
			let tmp = this._dumpFilterAST(predicate,node.nodeRight, predicates);
			astR = tmp.ast;
			predicateFoundR = tmp.predicateFound;
		}

		/*------------------------------------------------------------------------------------------------------------*/
		/* AND/OR NODE TREATMENT																					  */
		/*------------------------------------------------------------------------------------------------------------*/

		/**/ if(node.nodeValue === 'and')
		{

			/**/ if(astL !== null && astR !== null)
			{
				ast = new amiTwig.expr.Node(amiTwig.expr.tokens.LOGICAL_AND, 'and');

				ast.nodeLeft = astL;
				ast.nodeRight = astR;
			}
			else if(astL !== null)
			{
				ast = astL;
			}
			else if(astR !== null)
			{
				ast = astR;
			}
			else
			{
				ast = null;
			}

			predicateFound = predicateFoundL || predicateFoundR;

			return {'ast' : ast, 'predicateFound' : predicateFound};
		}
		else if(node.nodeValue === 'or')
		{

			if(predicateFoundL === false && predicateFoundR === false)
			{
				/**/ if(astL !== null && astR !== null)
				{
					ast = new amiTwig.expr.Node(amiTwig.expr.tokens.LOGICAL_OR, 'or');

					ast.nodeLeft = astL;
					ast.nodeRight = astR;
				}
				else if(astL !== null)
				{
					ast = astL;
				}
				else if(astR !== null)
				{
					ast = astR;
				}
				else
				{
					ast = null;
				}
			}
			else
			{
				/**/ if(predicateFoundL === true && predicateFoundR === true)
				{
					ast = new amiTwig.expr.Node(amiTwig.expr.tokens.LOGICAL_OR, 'or');

					ast.nodeLeft = astL;
					ast.nodeRight = astR;
				}
				else if(predicateFoundL === true)
				{
					ast = astL;
				}
				else if(predicateFoundR === true)
				{
					ast = astR;
				}
			}

			predicateFound = predicateFoundL || predicateFoundR;

			return {'ast' : ast, 'predicateFound' : predicateFound};
		}
		else if(node.nodeValue === 'not')
		{
			if(predicateFoundR === false)
			{
				/**/ if(astR !== null)
				{
					ast = astR;
				}
				else
				{
					ast = null;
				}
			}
			else
			{
				ast = astR;
			}

			return {'ast' : ast, 'predicateFound' : predicateFoundR};
		}

		/*------------------------------------------------------------------------------------------------------------*/

	},

	/*----------------------------------------------------------------------------------------------------------------*/

	dumpFilterAST: function(predicate)
	{
		let tmp = this._dumpFilterAST(predicate, this.ctx.ast, this.ctx.predicates)

		let result = '';

		/*------------------------------------------------------------------------------------------------------------*/

		if (tmp.ast !== null)
		{
			if((result = this._dumpAST(tmp.ast, this.ctx.predicates)))
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

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
