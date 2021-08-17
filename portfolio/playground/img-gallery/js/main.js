jQuery(document).ready(function($){
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');
		$back_to_bottom = $('.cd-bottom');
	//hide or show the "back to top" link
	$(window).scroll(function(){
		if ( $(this).scrollTop() > offset ) {
			$back_to_top.addClass('cd-is-visible');
			$back_to_bottom.addClass('cd-is-visible');
			console.log($back_to_bottom);
		} 
		else{
			$back_to_top.removeClass('cd-is-visible cd-fade-out');
			$back_to_bottom.removeClass('cd-is-visible cd-fade-out');
		}	
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
			$back_to_bottom.addClass('cd-fade-out');
		}		
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});

});