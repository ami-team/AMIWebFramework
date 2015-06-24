<?php get_header(); ?>

<?php if(is_home()) : ?>

<?php

if(have_posts())
{
	while(have_posts())
	{
		the_post();

		echo '<h2>' . the_title() . '</h2>';

		the_content();

	}
}

?>

<?php else : ?>

<?php

if(have_posts())
{
	while(have_posts())
	{
		the_post();

		echo '<h2>' . the_title() . '</h2>';

		the_content();

	}
}

?>

<?php endif; ?>

<?php get_sidebar(); ?>
<?php get_footer(); ?>