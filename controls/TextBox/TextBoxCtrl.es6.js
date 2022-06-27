/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global ClipboardJS
 */

import twigTextBoxCtrl from './assets/twig/TextBoxCtrl.twig';

import ClipboardJS from 'clipboard';
import {EditorView} from 'codemirror';
import {EditorState} from '@codemirror/state';
import editableCompartment from '../../src/js/utilities/codemirrror';


/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('TextBoxCtrl', {
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

		amiWebApp.appendHTML('body', twigTextBoxCtrl).done(() => {

			const _class = this.$class;

			/*--------------------------------------------------------------------------------------------------------*/

			$('#B8927006_7FCE_87BD_FC8D_C7575D69C362').on('hidden.bs.modal', () => {

				// const editor = EditorView.findFromDOM($('.form-editor-codemirror.form-editor-codemirror')[0]);
				//
				// let transaction = editor.state.update({
				// 	changes: { from: 0, to: editor.state.doc.length, insert: '' }
				// });
				//
				// editor.dispatch(transaction)

				amiWebApp.modalLeave();

				_class.deferred.resolveWith(_class.context || _class.deferred);
			});

			/*--------------------------------------------------------------------------------------------------------*/

			new ClipboardJS('#B8927006_7FCE_87BD_FC8D_C7575D69C362 .btn[data-clipboard-target]');

			/*--------------------------------------------------------------------------------------------------------*/

			result.resolve();

			/*--------------------------------------------------------------------------------------------------------*/
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	format: function(text, lang)
	{
		if(lang === 'json')
		{
			try
			{
				if(!amiWebApp.isString(text))
				{
					return JSON.stringify(/*------*/(text), null, 2);
				}
				else
				{
					text = text.trim();

					if(text && text.toUpperCase() !== '@NULL')
					{
						return JSON.stringify(JSON.parse(text), null, 2);
					}
					else
					{
						return 'null';
					}
				}
			}
			catch(e)
			{
				amiWebApp.error('invalid JSON string', true);

				return 'null';
			}
		}

		return text;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(text, options)
	{
		const deferred = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const params = amiWebApp.setupParams(
			{
				text: text
			}, {
				context: deferred,
				title: 'Text box',
				lang: 'text'
			},
			options
		);

		/*------------------------------------------------------------------------------------------------------------*/

		$('#B6FA759D_D2DD_D079_B591_5023C422B87F').text(params.title);
		$('#AF62E47C_F3A6_FEB6_A48B_CCD3BAFE6647').text(params.lang);

		$('#B8927006_7FCE_87BD_FC8D_C7575D69C362 .form-editor').text(this.format(params.text, params.lang)).data('editor');
		const editor = $('.form-editor-codemirror.form-editor-codemirror');
		const editorInstance = EditorView.findFromDOM(editor[0]);

		$('#B8927006_7FCE_87BD_FC8D_C7575D69C362').modal('show');

		this.$class.deferred = /**/deferred/**/;
		this.$class.context = params.context;

		/*------------------------------------------------------------------------------------------------------------*/

		let transaction = editorInstance.state.update({
			changes: { from: 0, to: editorInstance.state.doc.length, insert: this.format(params.text, params.lang) },
		});

		editorInstance.dispatch(transaction)

		// monaco.editor.setModelLanguage(editor.getModel(), params.lang !== 'mql' ? params.lang : 'sql'); /* TEMP */

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.modalEnter();

		return deferred.promise();

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	show: function(text, options)
	{
		return this.render(text, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
