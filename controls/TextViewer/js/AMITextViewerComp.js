/*!
 * AMITextViewerComp class
 *
 * Copyright (c) 2014-![VALUE YEAR] The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* CLASS AMITextViewerComp                                                 */
/*-------------------------------------------------------------------------*/

function AMITextViewerComp()
{
	/*-----------------------------------------------------------------*/

	this.init = function()
	{
		amiWebApp.loadHTMLs([
			'components/TextViewer/twig/Modal/text_viewer.twig'
		]).done(function(data) {

			amiWebApp.appendHTML('body', data[0]);
		});
	};

	/*-----------------------------------------------------------------*/

	this.show = function(text)
	{
		var html = '<i class="line-number"></i>' + amiWebApp.textToHtml(text).replace(/\n/g, '\n<i class="line-number"></i>');

		$('#text_viewer_cmp_content').html(html);

		$('#text_viewer_cmp_modal').modal('show');
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

amiTextViewerComp = new AMITextViewerComp();

amiTextViewerComp.init();

/*-------------------------------------------------------------------------*/