<?php
/*-------------------------------------------------------------------------*/

function cleanHTML($html)
{
	$html = str_replace("<", "\n<", $html);
	$html = str_replace(">", ">\n", $html);
	$html = str_replace(" >", ">", $html);

	$array = explode("\n", $html);

	$result = "";

	foreach($array as $line)
	{
		if(strlen($line) > 0 && ctype_space($line) == false)
		{
			$result = $result . $line;
		}
	}

	return $result . "\n";
}

/*-------------------------------------------------------------------------*/

function odier_eu_setup()
{
	register_nav_menus( array(
		'primary' => __('Primary Menu'),
	));
}

add_action('after_setup_theme', 'odier_eu_setup');

/*-------------------------------------------------------------------------*/

function odier_eu_widgets_init()
{
	register_sidebar(array(
		'name' => __('Sidebar 1'),
		'id' => 'sidebar-1',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget' => '</aside>',
		'before_title' => '<h1 class="widget-title">',
		'after_title' => '</h1>',
	));

	register_sidebar(array(
		'name' => __('Sidebar 2'),
		'id' => 'sidebar-2',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget' => '</aside>',
		'before_title' => '<h1 class="widget-title">',
		'after_title' => '</h1>',
	));

	register_sidebar(array(
		'name' => __('Sidebar 3'),
		'id' => 'sidebar-3',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget' => '</aside>',
		'before_title' => '<h1 class="widget-title">',
		'after_title' => '</h1>',
	));
}

add_action('widgets_init', 'odier_eu_widgets_init');

/*-------------------------------------------------------------------------*/

function wp_nav_menu_good()
{
	$options = array(
		'echo' => false,
		'container' => false,
		'theme_location' => 'primary'
	);

	echo str_replace('class="menu"', 'class="nav nav-pills site-menu"', cleanHTML(wp_nav_menu($options)));
}

/*-------------------------------------------------------------------------*/

function dynamic_sidebar_good($index)
{
	ob_start();
	dynamic_sidebar($index);
	$html = ob_get_clean();

	echo cleanHTML($html);
}

/*-------------------------------------------------------------------------*/
?>