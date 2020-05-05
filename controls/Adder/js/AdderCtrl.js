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

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('AdderCtrl', {
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
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/Adder/css/AdderCtrl.css',
			amiWebApp.originURL + '/controls/Adder/twig/AdderCtrl.twig',

			/**/

			'ctrl:fieldEditor',
			'ctrl:table'
		], {context: this}).done((data) => {

			this.fragmentAddCtrl = data[1];
			this._fieldEditorCtor = data[2];
            this._tableCtor = data[3];

		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	refresh: function()
    {
        this.table.refresh();
    },

    /*----------------------------------------------------------------------------------------------------------------*/

	render: function(selector, settings)
	{
		const result = $.Deferred();

        this.ctx = {};

        /**/

		if(settings)
		{
			if('catalog' in settings)
			{
				this.ctx.catalog = settings['catalog'];
			}

			if('entity' in settings)
			{
				this.ctx.entity = settings['entity'];
			}

			if('field' in settings)
			{
				this.ctx.field = settings['field'];
			}
		}

		/**/

        this.table = new this._tableCtor(this);
		this.fieldEditor = new this._fieldEditorCtor(this, this);
		this.fieldEditor.setup('#' + this.patchId('A0BFC339_C1EA_9A5D_E3D4_4C6761C9A970'), {primaryCatalog: this.ctx.catalog, primaryEntity: this.ctx.entity});

		/*------------------------------------------------------------------------------------------------------------*/


		this.replaceHTML(this._selector = selector, this.fragmentAddCtrl, {context: this, dict: settings}).done( () => {

			/*--------------------------------------------------------------------------------------------------------*/

			$('#' + this.patchId('F8A7229A_60B1_0D37_BA18_807B7E29C818')).click((e) => {

				this.fieldEditor.showRowModal(this.ctx.catalog, this.ctx.entity);
			});

            $('#' + this.patchId('EBB91625_148B_1606_0D40_30BF170B11EE')).click((e) => {

                const val = $('#' + this.patchId('B28F6454_3862_3031_6BAF_98392DE9C377')).val();
                var mql = 'SELECT *';

                if( '' !== val )
                {
                    mql += ' WHERE `' + this.ctx.field + '` LIKE \'%' + val + '%\''
                }

                this.table.render('#' + this.patchId('D6FDA711_E893_7CB9_9B97_4161B2CDE139'), 'SearchQuery -catalog="' + this.ctx.catalog + '" -entity="' + this.ctx.entity + '" -mql="'+ mql + '"', {showToolBar : true, showDetails: true, showTools : true, canEdit: true, catalog: this.ctx.catalog, entity: this.ctx.entity}).done(() => {

                    amiWebApp.unlock();
                }).fail((message) => {

                    amiWebApp.error(message, true);
                 })
            });



			/*--------------------------------------------------------------------------------------------------------*/

			this.table.render('#' + this.patchId('D6FDA711_E893_7CB9_9B97_4161B2CDE139'), 'SearchQuery -catalog="' + this.ctx.catalog + '" -entity="' + this.ctx.entity + '" -mql="SELECT * "', {showToolBar : true, showDetails: true, showTools : true, canEdit: true, catalog: this.ctx.catalog, entity: this.ctx.entity}).done(() => {

				amiWebApp.unlock();
			}).fail((message) => {

				amiWebApp.error(message, true);
			})

			result.resolveWith(this);

		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	}

	/*----------------------------------------------------------------------------------------------------------------*/

});

/*--------------------------------------------------------------------------------------------------------------------*/
