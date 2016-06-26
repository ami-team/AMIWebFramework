/*!
 * AMIDiffViewerComp class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* CLASS AMIDiffViewerComp                                                 */
/*-------------------------------------------------------------------------*/

function AMIDiffViewerComp()
{
	/*-----------------------------------------------------------------*/

	this.init = function()
	{
		amiWebApp.loadScripts([
			'js/3rd-party/diff_match_patch.min.js',
		]);
	
		amiWebApp.loadHTMLs([
			'components/DiffViewer/html/Modal/diff_viewer.html'
		], {context: this}).done(function(data) {

			amiWebApp.appendHTML('body', data[0]);

			this.dmp = new diff_match_patch();
		});
	};

	/*-----------------------------------------------------------------*/

	this.show = function(text1, text2)
	{
		/*---------------------------------------------------------*/

		var d = this.dmp.diff_main(text1, text2);

		this.dmp.diff_cleanupEfficiency(d);

		/*---------------------------------------------------------*/

		var html1 = '<i class="line-number"></i>' + amiWebApp.textToHtml(text1).replace(/\n/g, '\n<i class="line-number"></i>');

		$('#diff_viewer_cmp_content_orig').html(html1);

		/*---------------------------------------------------------*/

		var html2 = '<i class="line-number"></i>' + this.dmp.diff_prettyHtml(d).replace(/\n/g, '\n<i class="line-number"></i>');

		$('#diff_viewer_cmp_content_diff').html(html2);

		/*---------------------------------------------------------*/

		var html3 = '<i class="line-number"></i>' + amiWebApp.textToHtml(text2).replace(/\n/g, '\n<i class="line-number"></i>');

		$('#diff_viewer_cmp_content_chgd').html(html3);

		/*---------------------------------------------------------*/

		$('#diff_viewer_cmp_modal').modal('show');

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

amiDiffViewerComp = new AMIDiffViewerComp();

amiDiffViewerComp.init();

/*-------------------------------------------------------------------------*/
