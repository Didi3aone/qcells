$(document).ready(function () {
    if ($("#sliderA").length > 0 ) {
        // $("#sliderA").excoloSlider({
        // 	interval: 10000,
        // 	hoverPause: true,
        // 	prevnextAutoHide: false,
        // 	pagerNav: false,
        // 	autoSize: true,
        // 	width: 1126,
        // 	height: 539,
        // 	repeat: true,
        // });

        $("#sliderA").slick({
            autoplay: true,
            autoplaySpeed: 5000,
            arrows : false,
        });
    }

    if ($("#sliderpro").length > 0 ) {
        $("#sliderpro").excoloSlider({
        	interval: 10000,
        	hoverPause: true,
        	prevnextAutoHide: false,
        	pagerNav: false,
        	autoSize: true,
        	width: 784,
        	height: 460,
        	repeat: true,
        });
    }
});
