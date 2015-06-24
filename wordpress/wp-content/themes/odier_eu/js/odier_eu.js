/*-------------------------------------------------------------------------*/

$(document).ready(function() {

	var icon = $('.site-sidebar-button .fa');

	icon.on('click', function(e) {

		var div = $('.site-sidebar-content');

		div.toggle();
  
		if(div.is(":visible")) {
			icon.removeClass('fa-plus-circle');
			icon.addClass('fa-minus-circle');
		} else {
			icon.addClass('fa-plus-circle');
			icon.removeClass('fa-minus-circle');
		}
	});

});

/*-------------------------------------------------------------------------*/
