/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-2017 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/

$AMIClass('RDFViewerApp', {
	/*-----------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*-----------------------------------------------------------------*/

	onReady: function(userdata)
	{
		/*---------------------------------------------------------*/

		amiWebApp.loadScripts([
			'subapps/RDFViewer/js/ontodia.js',
			'subapps/RDFViewer/js/react.js',
			'subapps/RDFViewer/js/react-dom.js',
		]);

		/*---------------------------------------------------------*/

		amiWebApp.loadSheets([
			'subapps/RDFViewer/css/RDFViewerApp.css',
		]);

		/*---------------------------------------------------------*/

		$('#ami_breadcrumb_content').css('display', 'none');

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		amiWebApp.loadHTMLs([
			'subapps/RDFViewer/twig/RDFViewerApp.twig',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this, dict: {command: userdata}}).done(function() {

				result.resolve();
			});

		}).fail(function() {

			result.reject();
		});

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	onExit: function()
	{
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
		if($('#3FDF89A1_1E7B_471D_A9EC_71C06765C44E').is(':empty') )
		{
			const ontodiaProperties = {
				ref: function(workspace)
				{
					if(!workspace)
					{
						return;
					}

        const model = workspace.getModel();

        model.importLayout({
          dataProvider: new Ontodia.SparqlDataProvider({
            endpointUrl: 'https://library-ontodia-org.herokuapp.com/sparql',
            imagePropertyUris: [
              'http://xmlns.com/foaf/0.1/img',
            ],
            queryMethod: Ontodia.SparqlQueryMethod.GET
          }, Ontodia.OWLStatsSettings),
        });

					/* TODO */
				},

				onSaveDiagram: function()
				{
					/* TODO */
				},
			};

			ReactDOM.render(React.createElement(Ontodia.Workspace, ontodiaProperties), document.getElementById('3FDF89A1_1E7B_471D_A9EC_71C06765C44E'));
		}
	},

	/*-----------------------------------------------------------------*/

	onLogout: function()
	{
	},

	/*-----------------------------------------------------------------*/

	onSessionExpired: function()
	{
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

rdfViewerApp = new RDFViewerApp();

amiRegisterSubApp('rdfViewer', rdfViewerApp, {});

/*-------------------------------------------------------------------------*/
