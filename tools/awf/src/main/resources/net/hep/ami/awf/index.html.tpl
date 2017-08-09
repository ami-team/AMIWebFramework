<?xml version="1.0" encoding="utf-8"?>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

		<title>{{TITLE}}</title>

		<script type="text/javascript" src="js/jquery.min.js"></script>
		<script type="text/javascript" src="js/ami.min.js"></script>

		<script type="text/javascript">

			amiWebApp.onRefresh = function(isAuth)
			{
				var menu =
					'<li class="dropdown">' +
					'	<a href="#" class="dropdown-toggle" data-toggle="dropdown">' +
					'		Catalogs <span class="caret"></span>' +
					'	</a>' +
					'	<ul class="dropdown-menu">' +
					'		<li class="divider" role="separator"></li>' +
					'		<li><a href="' + amiWebApp.webAppURL + '?subapp=schemaViewer">Schema Viewer</a></li>' +
					'	</ul>' +
					'</li>' +
					'<li class="dropdown">' +
					'	<a href="#" class="dropdown-toggle" data-toggle="dropdown">' +
					'		Tools <span class="caret"></span>' +
					'	</a>' +
					'	<ul class="dropdown-menu">' +
					'		<li><a href="' + amiWebApp.webAppURL + '?subapp=command">Command</a></li>' +
					'	</ul>' +
					'</li>'
				;

				if(amiLogin.hasRole('AMI_ADMIN'))
				{
					menu +=
						'<li class="dropdown">' +
						'	<a href="#" class="dropdown-toggle" data-toggle="dropdown">' +
						'		<i class="fa fa-key"></i> Admin <span class="caret"></span>' +
						'	</a>' +
						'	<ul class="dropdown-menu">' +
						'		<li><a href="' + amiWebApp.webAppURL + '?subapp=document&userdata=api.html">AMI Web Framework API</a></li>' +
						'		<li><a href="' + amiWebApp.webAppURL + '?subapp=document&userdata=info.html">AMI Web Framework Info</a></li>' +
						'	</ul>' +
						'</li>'
					;
				}

				$('#ami_menu_content').html(menu);
			};

			amiWebApp.onReady = function()
			{
				amiWebApp.loadSubAppByURL('document');
			};

		</script>
	</head>
	<body>

		<script type="text/javascript">

			amiWebApp.start({
				logo_url: 'images/logo.png',
				theme_url: 'twig/AMI/Theme/blue.twig',
				endpoint_url: '{{ENDPOINT}}',
			});

		</script>

	</body>
</html>
