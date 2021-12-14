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

import twigDocumentApp from './assets/twig/DocumentApp.twig';

import * as marked from 'marked';

/*--------------------------------------------------------------------------------------------------------------------*/
/* DocumentApp                                                                                                        */
/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('DocumentApp', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function()
	{
		this.$super.$init();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function()
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		this._markdownOptions = {
			gfm: true,
			tables: true,
			breaks: false,
			pedantic: false,
			sanitize: false,
			smartLists: true,
			smartypants: false,
			xhtml: true,
			renderer: new marked.Renderer(),
		};

		this._markdownOptions.renderer.table = (header, body) => '<table class="table table-striped"><thead>' + header + '</thead><tbody>\n' + body + '</tbody></table>';

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.replaceHTML('#ami_main_content', twigDocumentApp).done(() => {

			$('#EA7E94EC_0876_F03C_9655_0985670D51B4').hide();
			$('#D2D815F2_0DB1_F1EF_1B81_A76A55F1ACCF').hide();

			$('#D51A8FD2_21EB_CF57_B7E0_DD6B0367FB0C').change((e) => {

				amiWebApp.replaceHTML('#E974FB62_3BAD_A0CF_7B96_10EBA1B0C3FF', this.toHtml($(e.currentTarget).val()));
			});

			result.resolve();
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function(userdata)
	{
		this.loadPage(userdata || 'home.html');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function(userdata)
	{
		this.loadPage(userdata || 'home.html');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	toHtml: function(body)
	{
		return !body.match(/<!--\s+markdown:\s*disabled\s+-->/g) ? marked(body.replace(/[\t ]+[<]/gm, '<'), this._markdownOptions)
		                                                         : body
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	loadPage: function(page)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.execute('GetPageInfo -name=?', {params: [page]}).done((data) => {

			this.render(
				/*------------------------*/ page /*------------------------*/,
				amiWebApp.jspath('..field{.@name==="title"}.$', data)[0] || '',
				amiWebApp.jspath('..field{.@name==="body"}.$', data)[0] || '',
				true
			);

		}).fail(() => {

			amiWebApp.loadTexts(amiWebApp.originURL + '/docs/' + page).done((data) => {

				this.render(
					/*------------------------*/ page /*------------------------*/,
					/*------------------------*/ page /*------------------------*/,
					/*----------------------*/ data[0] /*----------------------*/,
					false
				);

			}).fail(() => {

				if(page !== '404.html')
				{
					this.loadPage('404.html');
				}
			});

		}).always(() => {

			this.setMode(false);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(page, title, body, editable)
	{
		const breadcrumb = [];

		/*------------------------------------------------------------------------------------------------------------*/

		breadcrumb.push('<a href="' + amiWebApp.webAppURL + '?subapp=document&userdata=' + /*-*/ 'home.html' /*-*/ + '">' + /*---*/ 'Documents' /*---*/ + '</a>');
		breadcrumb.push('<a href="' + amiWebApp.webAppURL + '?subapp=document&userdata=' + encodeURIComponent(page) + '">' + amiWebApp.textToHtml(title) + '</a>');

		if(editable && (amiAuth.hasRole('AMI_ADMIN') || amiAuth.hasRole('AMI_WRITER')))
		{
			this.page = page;
			this.title = title;
			this.body = body;

			$('#D51A8FD2_21EB_CF57_B7E0_DD6B0367FB0C').val(body);

			breadcrumb.push(
				'<a href="javascript:documentApp.toggleMode();" id="FEF81C5A_5608_2423_9C1A_2F598A1C07C4"><i class="bi-pencil text-primary"></i></a>' +
				'&nbsp;&nbsp;' +
				'<a href="javascript:documentApp.saveDoc();" id="EA7E94EC_0876_F03C_9655_0985670D51B4"><i class="bi-save text-success"></i></a>'
			);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.replaceHTML('#E974FB62_3BAD_A0CF_7B96_10EBA1B0C3FF', this.toHtml(body)).done(() => {

			amiWebApp.fillBreadcrumb(breadcrumb);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	setMode: function(editMode)
	{
		const el1 = $('#EA7E94EC_0876_F03C_9655_0985670D51B4');
		const el2 = $('#D2D815F2_0DB1_F1EF_1B81_A76A55F1ACCF');
		const el3 = $('#E974FB62_3BAD_A0CF_7B96_10EBA1B0C3FF');

		if(editMode)
		{
			el1.show();
			el2.show();
			$('#D51A8FD2_21EB_CF57_B7E0_DD6B0367FB0C').val(this.body);
			el3.removeClass('col-md-12').addClass('col-md-6');
		}
		else
		{
			el1.hide();
			el2.hide();
			this.body = $('#D51A8FD2_21EB_CF57_B7E0_DD6B0367FB0C').val();
			el3.removeClass('col-md-6').addClass('col-md-12');
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	toggleMode: function()
	{
		this.setMode(this.editMode = !this.editMode);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	saveDoc: function()
	{
		if(confirm('Are you sure?'))
		{
			amiWebApp.lock();

			amiCommand.execute('UpdateElements -catalog="self" -entity="router_markdown" -single -fields="body" -values=? -keyFields="name" -keyValues=?', {params: [$('#D51A8FD2_21EB_CF57_B7E0_DD6B0367FB0C').val(), this.page]}).done((data, message) => {

				amiWebApp.success(message, true);

			}).fail((data, message) => {

				amiWebApp.error(message, true);
			});
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

window.documentApp = new DocumentApp();

/*--------------------------------------------------------------------------------------------------------------------*/
