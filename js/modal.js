$(document).ready(function() {

	// When clicking on an <a> with class lightbox
	$('a.lightbox').click(function(evt)
	{
		// Prevent default link behaviour
		evt.preventDefault();

		// Define contents of lightbox
		$('.figure img')
			.attr('src', $(this).attr('href'))
			.attr('alt', $(this).attr('alt'));

		// Caption = img alt tag
		$('.caption').html($(this).find('img').attr('alt'));

		// Position the box
		positionBox();

		// open lightbox
		showBox();
	});

});

function showBox() {

	$('body').addClass('modalShowing');

	// IE6/7/8 does not correctly support opacity
	if (jQuery.browser.msie) {

		// show modal box: no animation for IE
		$('#modalOverlay, .modal').show();

		// IE bugfixes
		if($.browser.msie && $.browser.version =='6.0') {
			// Persistent overlay opacity for IE6
			// Make sure modalOverlay has full height
			$('#modalOverlay').css("filter", "alpha(opacity=33)").css('height', $(document).height());
		}

	} else {
		// Simple fadeIn for the better browsers that support opacity well
		$('#modalOverlay, .modal').fadeIn("fast");
	}

	// Hide modal box when clicking outside it or on the close button
	$('#modalOverlay, .buttonClose').bind('click', function(evt) {
		// Prevent default link behaviour
		evt.preventDefault();
		//  Close modal box
		closeBox();
	});

	// Hide modal box when pressing escape button
	$('html').bind("keyup", function(evt) {
		if (evt.keyCode == 27 || evt.keyCode == 88) {
			closeBox();
		}
	});

}

function closeBox() {
	// Make sure the hide code has no effect on the modal box itself
	$('.modal').bind('click', function(evt) { evt.stopPropagation(); });

	// Too much bugs with alpha/opacity, so IE6 gets a simple hide()
	if (jQuery.browser.msie) {
		$('.modal').hide();
		$('#modalOverlay').hide();
	} else {
		// Hide modal and overlay
		$('#modalOverlay, .modal').fadeOut("fast");
	}

}

function positionBox() {
	// Centers the modal

	// initialize object references
	var oElement = $('.modal');
	var oWindow = $(window);

	// calculate offset
	var offsetLeft = parseInt((oWindow.width() - oElement.width()) / 2);
	var offsetTop = parseInt((oWindow.height() - oElement.height()) / 2);

	var modalWidth = parseInt(oElement.width());
	var modalHeight = parseInt(oElement.height());

	oElement.css('left', offsetLeft)
			.css('top', offsetTop)
			.css('width', modalWidth)
			.css('height', modalHeight)
			.css('position', 'fixed');

	// only IE6 should use absolute
	if($.browser.msie && $.browser.version =='6.0') {
		oElement.css('position', 'absolute')
		        .css('top', parseInt(offsetTop + $(window).scrollTop()));
	}
}