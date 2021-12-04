/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

'use strict';

import * as strings from './strings'

/*--------------------------------------------------------------------------------------------------------------------*/

class AMIJSDoc
{
	/*----------------------------------------------------------------------------------------------------------------*/

	static #linkExp = /(?:\[\s*([^\s\]]+)\s*])?{@link\s+([^\s}]+)\s*}/g;

	/*----------------------------------------------------------------------------------------------------------------*/

	#menuSelector = null;
	#bodySelector = null;
	#json = null;

	/*----------------------------------------------------------------------------------------------------------------*/

	constructor(menuSelector, bodySelector, json)
	{
		this.#menuSelector = menuSelector;
		this.#bodySelector = bodySelector;
		this.#json = json;

		this.#makeMenu();
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	#makeMenu()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		const s = `
<a class="list-group-item list-group-item-action p-2" href="">
	<i class="bi bi-house"></i> Home
</a>

<div class="list-group-item list-group-item-action p-2">

	${this.#makeSubMenu('Global', 'global')}
	${this.#makeSubMenu('Namespace', 'namespaces')}
	${this.#makeSubMenu('Interface', 'interfaces')}
	${this.#makeSubMenu('Class', 'classes')}

</div>
`;

		/*------------------------------------------------------------------------------------------------------------*/

		$(this.#menuSelector).html(s.trim()).promise().done((_) => {

			$(this.#menuSelector).find('a[data-name][data-cat][data-name]').click((e) => {

				const el = $(e.currentTarget);

				e.preventDefault();

				this.#makeContent(
					el.attr('data-title'),
					el.attr('data-cat'),
					el.attr('data-name')
				);
			});
		});

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	#makeSubMenu(title, cat)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		let items;

		if(cat === 'global')
		{
			items = [];

			if(this.#json['variables']) {
				items = items.concat(this.#json['variables']);
			}

			if(this.#json['functions']) {
				items = items.concat(this.#json['functions']);
			}
		}
		else
		{
			items = this.#json[cat];
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if(Array.isArray(items) && items.length > 0)
		{
			result.push('<div>');

			result.push(`<a href="#jsdoc_menu_${title.toLowerCase()}" data-toggle="collapse" data-bs-toggle="collapse"><i class="bi bi-book"></i> ${strings.textToHtml(title)}</a>`);

			result.push(`<ul class="collapse mb-0" id="jsdoc_menu_${title.toLowerCase()}">${items.map((_item) => `<li><a href="#" data-title="${strings.textToHtml(title)}" data-cat="${strings.textToHtml(cat)}" data-name="${strings.textToHtml(_item.name)}">${strings.textToHtml(_item.name)}</a></li>`).join('')}</ul>`);

			result.push('</div>');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	#makeContent(title, cat, name)
	{
		const s = [];

		/*------------------------------------------------------------------------------------------------------------*/

		let item;

		if(cat === 'global')
		{
			item = {
				name: 'variables and functions',
				variables: this.#json['variables'],
				functions: this.#json['functions'],
			};
		}
		else
		{
			item = this.#json[cat].filter((item) => item.name === name)[0];
		}

		/*------------------------------------------------------------------------------------------------------------*/

		s.push('<div class="card">');
		s.push('<div class="card-body bg-light">');
		s.push(`<h1>${strings.textToHtml(title)}: ${strings.textToHtml(item.name)}</h1>`);
		s.push(AMIJSDoc.#makeAlias(item));
		s.push(AMIJSDoc.#makeDesc(item));
		s.push(AMIJSDoc.#makeDetails(item));
		s.push('</div>');
		s.push('</div>');

		/*------------------------------------------------------------------------------------------------------------*/

		if(item.konstructor)
		{
			s.push('<h4 class="mt-3">Constructor</h4>');

			s.push(AMIJSDoc.#makeFunction(item.konstructor));
		}

		if(Array.isArray(item.variables))
		{
			s.push('<h4 class="mt-3">Members</h4>');

			for(const _variable of item.variables) {
				s.push(AMIJSDoc.#makeVariable(_variable));
			}
		}

		if(Array.isArray(item.functions))
		{
			s.push('<h4 class="mt-3">Methods</h4>');

			for(const _function of item.functions) {
				s.push(AMIJSDoc.#makeFunction(_function));
			}
		}

		if(Array.isArray(item.events))
		{
			s.push('<h4 class="mt-3">Events</h4>');

			for(const _event of item.events) {
				s.push(AMIJSDoc.#makeFunction(_event));
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		$(this.#bodySelector).html(s.join(''));

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	static #makeVariable(variable)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		result.push(`<hr id="jsdoc_variable_${variable.name}" />`);

		result.push(AMIJSDoc.#makeVariableSignature(variable));

		result.push(AMIJSDoc.#makeAlias(variable));

		result.push(AMIJSDoc.#makeDesc(variable));

		result.push(AMIJSDoc.#makeDetails(variable));

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	static #makeVariableSignature(variable)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		result.push(`<span class="signature-name">${strings.textToHtml(variable.name)}</span>`);

		result.push(`<span class="signature-attrs">: {${AMIJSDoc.#makeType(variable)}}</span>`);

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	static #makeFunction(method)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		result.push(`<hr id="jsdoc_method_${method.name}" />`);

		result.push(AMIJSDoc.#makeFunctionSignature(method));

		result.push(AMIJSDoc.#makeAlias(method));

		result.push(AMIJSDoc.#makeDesc(method));

		result.push(AMIJSDoc.#makeFunctionParameters(method));

		result.push(AMIJSDoc.#makeDetails(method));

		result.push(AMIJSDoc.#makeFunctionExceptions(method));

		result.push(AMIJSDoc.#makeFunctionReturn(method));

		result.push(AMIJSDoc.#makeExamples(method));

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	static #makeFunctionSignature(method)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		result.push(`<span class="signature-name">${strings.textToHtml(method.name)}</span>`);

		/*------------------------------------------------------------------------------------------------------------*/

		if(method.params)
		{
			const L = method.params.map((_param) => AMIJSDoc.#makeParam(_param));

			result.push(`<span class="signature-params">(${L.join(', ')})</span>`);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if(method.returns)
		{
			const L = method.returns.map((_return) => AMIJSDoc.#makeType(_return));

			result.push(`<span class="signature-attrs"> &rarr; {${L.join(' or ')}}</span>`);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	static #makeFunctionParameters(method)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		if(method.params.length > 0)
		{
			/*--------------------------------------------------------------------------------------------------------*/

			const L1 = [], L2 = [], L3 = [], L4 = [], L5 = [], L6 = [];

			let cnt1 = 0, cnt2 = 0, cnt3 = 0, cnt4 = 0, cnt5 = 0, cnt6 = 0;

			for(const _params of method.params)
			{
				L1.push(strings.textToHtml(_params['name']));
				L2.push(AMIJSDoc.#makeType(_params));
				L3.push(AMIJSDoc.#makeDesc(_params));
				L4.push(strings.textToHtml(_params['default']));
				L5.push(_params['optional']);
				L6.push(_params['nullable']);

				if(_params['name']) {
					cnt1++;
				}
				if(_params['type']) {
					cnt2++;
				}
				if(_params['desc']) {
					cnt3++;
				}
				if(_params['default']) {
					cnt4++;
				}
				if(_params['optional']) {
					cnt5++;
				}
				if(_params['nullable']) {
					cnt6++;
				}
			}

			/*--------------------------------------------------------------------------------------------------------*/

			result.push('<h5 class="mt-2"><strong>Parameters:</strong></h5>');

			result.push('<table class="table table-sm table-hover table-striped table-bordered" style="width: auto;">');

			/*--------*/
			/* THEAD  */
			/*--------*/

			result.push('<thead>');
			result.push('<tr>');

			if(cnt1 > 0) {
				result.push('<th>Name</th>');
			}
			if(cnt2 > 0) {
				result.push('<th>Type</th>');
			}
			if(cnt4 > 0) {
				result.push('<th>Default</th>');
			}
			if(cnt5 > 0) {
				result.push('<th>Optional</th>');
			}
			if(cnt6 > 0) {
				result.push('<th>Nullable</th>');
			}
			if(cnt3 > 0) {
				result.push('<th>Description</th>');
			}

			result.push('</tr>');
			result.push('</thead>');

			/*--------*/
			/* TBODY  */
			/*--------*/

			result.push('<tbody>');

			for(const i in method.params)
			{
				result.push('<tr>');

				if(cnt1 > 0) {
					result.push(`<td>${L1[i]}</td>`);
				}
				if(cnt2 > 0) {
					result.push(`<td>${L2[i]}</td>`);
				}
				if(cnt4 > 0) {
					result.push(`<td>${L4[i]}</td>`);
				}
				if(cnt5 > 0) {
					result.push(`<td class="text-center">${L5[i] ? '✓' : ''}</td>`);
				}
				if(cnt6 > 0) {
					result.push(`<td class="text-center">${L6[i] ? '✓' : ''}</td>`);
				}
				if(cnt3 > 0) {
					result.push(`<td>${L3[i]}</td>`);
				}

				result.push('</tr>');
			}

			result.push('</tbody>');

			/*--------*/

			result.push('</table>');

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	static #makeFunctionExceptions(method)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		if(Array.isArray(method.exceptions))
		{
			for(const _exception of method.exceptions)
			{
				result.push('<h5 class="mt-2"><strong>Throws:</strong></h5>');

				result.push(AMIJSDoc.#makeDesc(_exception));

				result.push(`<div>Type: <span class="signature-attrs">${AMIJSDoc.#makeType(_exception)}</span></div>`);
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	static #makeFunctionReturn(method)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		if(Array.isArray(method.returns))
		{
			for(const _return of method.returns)
			{
				result.push('<h5 class="mt-2"><strong>Returns:</strong></h5>');

				result.push(AMIJSDoc.#makeDesc(_return));

				result.push(`<div>Type: <span class="signature-attrs">${AMIJSDoc.#makeType(_return)}</span></div>`);
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('')
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	static #makeAlias(x)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		if(x.alias)
		{
			result.push('<div>');

			result.push(`Alias: ${strings.textToHtml(x.alias)}`);

			result.push('</div>');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	static #makeDesc(x)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		if(x.desc)
		{
			result.push('<div>');

			result.push(strings.textToHtml(x.desc).replace(AMIJSDoc.#linkExp, (_, x, y) => {

				return `<a href="${y}">${x || y}</a>`;
			}));

			result.push('</div>');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	static #makeParam(x)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		result.push(strings.textToHtml(x.name));

		if(x.optional) {
			result.push('<sup class="signature-params-attrs">opt.</sup>');
		}

		if(x.nullable) {
			result.push('<sup class="signature-params-attrs">null.</sup>');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	static #makeType(x)
	{
		return x.type.map((y) => `<i>${strings.textToHtml(y.replace(/\s*/g, ''))}</i>`).join(' or ');
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	static #makeDetails(x)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		if(Array.isArray(x.implements) && x.implements.length > 0) {
			result.push(`<div>Implements: ${strings.textToHtml(x.implements.join(', '))}</div>`);
		}

		if(Array.isArray(x.inherits) && x.inherits.length > 0) {
			result.push(`<div>Inherits: ${strings.textToHtml(x.inherits.join(', '))}</div>`);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		const version = [];
		const author = [];
		const see = [];

		if(x.version)
		{
			version.push(`<dt>Version:</dt><dd>${strings.textToHtml(x.version)}</dd>`);
		}

		if(Array.isArray(x.author))
		{
			for(const _author of x.author)
			{
				const _AUTHOR = _author.replace(AMIJSDoc.#linkExp, (_, x, y) => {

					return `<a href="${y}">${x || y}</a>`;
				});

				author.push(`<dt>Author:</dt><dd>${_AUTHOR}</dd>`);
			}
		}

		if(Array.isArray(x.see))
		{
			for(const _see of x.see)
			{
				const _SEE = _see.replace(AMIJSDoc.#linkExp, (_, x, y) => {

					return `<a href="${y}">${x || y}</a>`;
				});

				see.push(`<dt>See:</dt><dd>${_SEE}</dd>`);
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if(author.length > 0 || version.length > 0 || see.length > 0)
		{
			result.push('<dl class="details">');
			result.push(version.join(''));
			result.push(author.join(''));
			result.push(see.join(''));
			result.push('</dl>');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	static #makeExamples(x, mode)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		if(Array.isArray(x.examples))
		{
			for(const _example of x.examples)
			{
				result.push('<h5 class="mt-2"><strong>Example:</strong></h5>');

				result.push(`<textarea class="form-editor" data-mode="${strings.textToHtml(mode)}">${strings.textToHtml(_example)}</textarea>`);
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Renders a AMI JSDoc documentation
 * @param {string} menuSelector selector of the menu div
 * @param {string} bodySelector selector of the body div
 * @param {object} json the JSON documentation
 * @returns {AMIJSDoc}
 * @ignore
 */

export function renderJSDoc(menuSelector, bodySelector, json)
{
	return new AMIJSDoc(menuSelector, bodySelector, json);
}

/*--------------------------------------------------------------------------------------------------------------------*/
