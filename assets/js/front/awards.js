var awards = function () {

    var $container =  $('.awards-list');

    var init_slider = function () {
        $(".awardpic").excoloSlider({
			autoPlay: false,
			repeat: false,
			hoverPause: true,
			prevnextAutoHide: false,
			pagerNav: false,
			autoSize: true,
			width: 560,
			height: 400
		});
    }

    var search = function (filter) {
        var year = $("#year_filter").val();

        if (year || year == "" || filter.length > 0) {
            $('#loading').addClass('active');
            $.ajax({
                type: "post",
                url: '/awards/search',
                cache: false,
                data: {year: year, filter: filter},
                dataType:'json',
                success: function(json) {
                    $('#loading').removeClass('active');
                    if (json.result == "NG") {
                        $('#popup .modal-title').html("Error !!!");
                        $('#popup .modal-text').html('<p>Ada Kesalahan Sistem.</p>');
                        $('#popup').addClass('active');
                    }

                    $container.empty();

                    $.each( json.datas, function( key, data ) {
                        var _elem = '<div class="award">' +
                                        '<div class="awardpic" id="awardpic1">';

                        $.each( data.images, function( key, img ) {
                            _elem += '<img src="'+ img.file_url +'" alt="'+ img.file_alt_name +'">';
                        });


                            _elem += 	'</div>' +
                                        '<div class="awardtext">' +
                                            '<div class="awardtitle">' +
                                                '<h3>'+ data.title +'</h3>' +
                                                '<span>'+ data.sub_title +'</span>' +
                                            '</div>' +
                                            '<div class="awardp">' +
                                                '<p>'+ data.description +'</p>' +
                                            '</div>'
                                        '</div>'
                                    '</div>';

                        $container.append(_elem);
                    });

                    $container.append('<div class="lead"></div>');

                    $(".awardpic").excoloSlider({
                        autoPlay: false,
                        repeat: false,
                        hoverPause: true,
                        prevnextAutoHide: false,
                        pagerNav: false,
                        autoSize: true,
                        width: 560,
                        height: 400
                    });
                },
                error: function() {
                    $('#loading').removeClass('active');
                    $('#popup .modal-title').html("Error !!!");
                    $('#popup .modal-text').html('<p>Ada Kesalahan Sistem.</p>');
                    $('#popup').addClass('active');
                }
            });
        }
    }

    var init_filter = function () {
        $('#year_filter').change (function(){
            var filter = [];

            if ($('input[name="produk[]"]:checked').length != 0) {
                $('input[name="produk[]"]:checked').each( function () {
                    filter.push($(this).val());
                });
            }

            if (filter.length > 0) {
                search(filter);
            } else if (filter.length <= 0) {
                search(filter);
            }

        });

        $('input[name="produk[]"]').change (function(){
            var filter = [];


            if ($('input[name="produk[]"]:checked').length != 0) {
                $('input[name="produk[]"]:checked').each( function () {
                    filter.push($(this).val());
                });
            }

            if (filter.length > 0) {
                search(filter);
            } else if (filter.length <= 0) {
                search(filter);
            }
        });
    }

	return {

		init : function () {
            init_slider();
            init_filter();
		}

	}

}();

$(document).ready(function () {
    awards.init();
});
