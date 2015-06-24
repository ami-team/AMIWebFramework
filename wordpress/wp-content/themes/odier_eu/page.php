<?php get_header(); ?>

        <div class="site-content" role="main">

<?php

while(have_posts())
{
	the_post();

	get_template_part('content', 'page');
}

?>

        </div>

<?php get_sidebar(); ?>
<?php get_footer(); ?>