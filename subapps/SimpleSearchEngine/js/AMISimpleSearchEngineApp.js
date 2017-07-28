/*!
 * AMISimpleSearchEngineApp class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* CLASS AMISimpleSearchEngineApp                                          */
/*-------------------------------------------------------------------------*/

$AMIClass('AMISimpleSearchEngineApp', {
	/*-----------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*-----------------------------------------------------------------*/

	onReady: function(userdata)
	{
		var result = $.Deferred();

		amiWebApp.loadSheets([
			'subapps/SimpleSearchEngine/css/AMISimpleSearchEngineApp.css',
		]);

		$('#ami_jumbotron_title').html('SimpleSearchEngine');
		$('#ami_jumbotron_content').html('Simple Search Engine');
		$('#ami_breadcrumb_content').html('<li>Search</li><li><a href="' + amiWebApp.webAppURL + '?subapp=amisimplesearchengine">Simple Search Engine</a></li>');

		amiWebApp.loadHTMLs([
			'subapps/SimpleSearchEngine/html/AMISimpleSearchEngineApp.html',
		], {context: this}).done(function(data) {
	
			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this}).done(function() {
				/*-----------------------------------------*/
				/* FILTER                                  */
				/*-----------------------------------------*/

				if(userdata)
				{
					this.interfaceFilter = '';

					/**/

					var interfaces = userdata.split(',');

					for(var i = 0; i < interfaces.length; i++)
					{
						var interface = interfaces[i].trim();

						if(interface !== '')
						{
							if(interface.indexOf('%') < 0) {
								this.interfaceFilter += ' OR `interface`=\'' + interface +  '\'';
							}
							else {
								this.interfaceFilter += ' OR `interface` LIKE \'' + interface +  '\'';
							}
						}
					}

					/**/

					this.interfaceFilter = (this.interfaceFilter) ? this.interfaceFilter.substring(4)
					                                              : '1=1'
					;
				}
				else
				{
					this.interfaceFilter = '1=1';
				}

				/*-----------------------------------------*/

				result.resolve();
			});
		}).fail(function() {
			result.reject();
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	onExit: function()
	{
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
		/*---------------------------------------------------------*/
		/* GET INTERFACES                                          */
		/*---------------------------------------------------------*/

		if($('#ami_simple_search_engine_interface_list').html().trim() === '')
		{
			amiCommand.execute('SearchQuery -catalog="self" -sql="SELECT `interface` FROM `router_search_interface` WHERE ' + this.interfaceFilter + '"', {context: this}).done(function(data)
			{
				var rows = amiWebApp.jspath('..row', data);

				var s = (this.interfaceFilter === '1=1') ? '<option value="">--select--</option>' : '';

				$.each(rows, function(index, row) {

					var interface = amiWebApp.jspath('..field{.@name==="interface"}.$', row)[0] || '';

					s += '<option value="' + interface + '">' + interface + '</option>'
				});

				$('#ami_simple_search_engine_interface_list').html(s).promise().done(function() {

					$('#ami_simple_search_engine_interface_list').change();
				});
			});
		}

		/*---------------------------------------------------------*/
		/* SHOW SERCH INTERFACE                                    */
		/*---------------------------------------------------------*/

		$('#ami_simple_search_engine_tab_search').show();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	onLogout: function()
	{
		/*---------------------------------------------------------*/
		/* HIDE SERCH INTERFACE                                    */
		/*---------------------------------------------------------*/

		$('#ami_simple_search_engine_tab_search').hide();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	onSessionExpired: function()
	{
	},

	/*-----------------------------------------------------------------*/

	setInterface: function(interface)
	{
		if(!interface)
		{
			return;
		}

		amiWebApp.lock();

		this.criteriaArray = [];

		$('#ami_simple_search_engine_center').show();

		amiCommand.execute('SearchQuery -catalog="self" -sql="SELECT `id`, `catalog`, `entity` FROM `router_search_interface` WHERE `interface`=\'' + interface + '\'"', {context: this}).done(function(data) {

			this.id = amiWebApp.jspath('..field{.@name==="id"}.$', data)[0] || '';
			this.catalog = amiWebApp.jspath('..field{.@name==="catalog"}.$', data)[0] || '';
			this.entity = amiWebApp.jspath('..field{.@name==="entity"}.$', data)[0] || '';

			amiCommand.execute('SearchQuery -catalog="self" -sql="SELECT `entity`, `field`, `type` FROM `router_search_criteria` WHERE `interfaceFK`=' + this.id + ' ORDER BY `rank`"', {context: this}).done(function(data) {

				var rows = amiWebApp.jspath('..row', data);

				$.each(rows, function(index, row) {

					var entity = amiWebApp.jspath('..field{.@name==="entity"}.$', row)[0] || '';
					var field = amiWebApp.jspath('..field{.@name==="field"}.$', row)[0] || '';
					var type = amiWebApp.jspath('..field{.@name==="type"}.$', row)[0] || '';

					if(type === '0'
					   ||
					   type === '1'
					 ) {
						this.criteriaArray.push('`' + entity + '`.`' + field + '`');
					}

				}, this);

				$('#ami_simple_search_engine_glass').removeClass('ami-simple-search-engine-glass');

				amiWebApp.unlock();

			}).fail(function(data) {
				amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
			});
		}).fail(function(data) {
			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	},

	/*-----------------------------------------------------------------*/

	search: function(s)
	{
		var where = '';

		if(s.indexOf('%') < 0)
		{
			$.each(this.criteriaArray, function(index, criteria) {
				where += ' OR (' + criteria + '=\'' + s.replace(/\'/g, '\'\'') + '\')';
			});

		}
		else
		{
			$.each(this.criteriaArray, function(index, criteria) {
				where += ' OR (' + criteria + ' LIKE \'' + s.replace(/\'/g, '\'\'') + '\')';
			});
		}

		if(where !== '')
		{
			where = where.substring(4);
		}

		var command = 'BrowseQuery -catalog="' + this.catalog + '" -glite="SELECT `' + this.entity + '`.* WHERE `' + where + '\'"';

		alert(command);
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiSimpleSearchEngineApp = new AMISimpleSearchEngineApp();

amiRegisterSubApp('amiSimpleSearchEngine', amiSimpleSearchEngineApp, {});

/*-------------------------------------------------------------------------*/
