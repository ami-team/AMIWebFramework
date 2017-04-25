/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-2017 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/

$AMIClass('BootstrapApp', {
	/*-----------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*-----------------------------------------------------------------*/

	onReady: function(userdata)
	{
		amiWebApp.loadSheets([
			'subapps/Bootstrap/css/BootstrapApp.css',
		]);

		amiWebApp.loadScripts([
			'subapps/Bootstrap/js/jquery-ui.min.js',
		]);

		$('#ami_breadcrumb_content').html('<li>Admin</li><li><a href="' + amiWebApp.webAppURL + '?subapp=bootstrap">Bootstrap</a></li>');

		var result = $.Deferred();

		amiWebApp.loadHTMLs([
			'subapps/Bootstrap/twig/BootstrapApp.twig',
			'subapps/Bootstrap/twig/Fragment/category.twig',
		], {context: this}).done(function(data1) {

			amiWebApp.loadXMLs([
				'subapps/Bootstrap/js/bootstrap3Model.xml',
			], {context: this}).done(function(data2) {

				var categories = {};

				$.foreach($(data2).find('category'), function(indx, node) {

					var category = {};

					var type = $(node).attr('type');
					var title = $(node).attr('title');

					category['type'] = type;
					category['title'] = title;
					category['items'] = [  ];

					$.foreach($(node).find('item'), function(indx, node) {

						var item = {};

						var name = $(node).attr('name');
						var text = $(node).text(/*  */);

						item['name'] = name;
						item['text'] = text;

						category['items'].push(item);
					});

					if(type === 'grid'
					   ||
					   type === 'html'
					   ||
					   type === 'twig'
					 ) {
						categories[title] = category;
					}
					else
					{
						amiWebApp.error('Invalid model file!');

						result.reject();

						return;
					}

				}, this);

				amiWebApp.replaceHTML('#ami_main_content', data1[0], {context: this, dict: {CATEGORIES: categories}}).done(function() {

					result.resolve();
				});

			}).fail(function() {

				result.reject();
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

		$('.lyrow .preview input').bind('keyup', function () {

			var e = 0;
			var t = '';
			var n = false;
			var r = $(this).val().split(' ', 12);

			$.each(r, function(r, i) {

				if(!n)
				{
					if(parseInt(i) <= 0) n = true;


        e = e + parseInt(i);
        t += '<div class="col-md-' + i + ' column"></div>'
      }
    });

    if (e == 12 && !n) {
      $(this).parent().next().children().html(t);
      $(this).parent().prev().show()
    } else {
      $(this).parent().prev().hide()
    }
  })
  
		/*---------------------------------------------------------*/

		$('.demo, .demo .column').sortable({
			connectWith: '.column',
			handle: '.drag',
			opacity: 0.35,
		});

		/*---------------------------------------------------------*/

		$('.accordion .lyrow').draggable({
			connectToSortable: '.demo',
			handle: '.drag',
			helper: 'clone',
			drag: function(e, t) {
				//t.helper.width(400);
			},
			stop: function(e, t) {
				$('.demo .column').sortable({
					connectWith: '.column',
					opacity: 0.35,
				})
			}
		});

		/*---------------------------------------------------------*/

		$('.accordion .box').draggable({
			connectToSortable: '.column',
			handle: '.drag',
			helper: 'clone',
			drag: function(e, t) {
				t.helper.width(400);
			},
			stop: function(e, t) {
				/* TODO */
				/* TODO */
				/* TODO */
				/* TODO */
			}
		});

		/*---------------------------------------------------------*/
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

bootstrapApp = new BootstrapApp();

amiRegisterSubApp('bootstrap', bootstrapApp, {});

/*-------------------------------------------------------------------------*/
