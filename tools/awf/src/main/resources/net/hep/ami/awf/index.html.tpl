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
					'<li class="nav-item dropdown">' +
					'  <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">' +
					'    Search' +
					'  </a>' +
					'  <div class="dropdown-menu">' +
					'    <a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=searchEngine">Search Engine</a>' +
					'    <a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=simpleSearchEngine">Simple Search Engine</a>' +
					'    <div class="dropdown-divider"></div>' +
					'    <a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=schemaViewer">Schema Viewer</a>' +
					'  </div>' +
					'</li>' +
					'<li class="nav-item dropdown">' +
					'  <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">' +
					'    Tools' +
					'  </a>' +
					'  <div class="dropdown-menu">' +
					'    <a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=command">Command</a>' +
					'    <a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=emergency">Emergency</a>' +
					'  </div>' +
					'</li>'
				;

				if(amiLogin.hasRole('AMI_ADMIN'))
				{
					menu +=
						'<li class="nav-item dropdown">' +
						'  <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">' +
						'    <i class="fa fa-key"></i> Admin' +
						'  </a>' +
						'  <div class="dropdown-menu">' +
						'    <a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=adminDashboard">Admin Dashboard</a>' +
						'    <div class="dropdown-divider"></div>' +
						'    <a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=document&userdata=api.html">AMI Web Framework API</a>' +
						'    <a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=document&userdata=info.html">AMI Web Framework Info</a>' +
						'  </div>' +
						'</li>'
					;
				}

				$('#ami_menu_content').html(menu);
			};

			amiWebApp.onReady = function()
			{
				return amiWebApp.loadSubAppByURL('document');
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
