var PaletteList = function () {
    var $container =  $('.griddscontent');

	var total_page_pallete = $("#total_page").val();
	var cur_page = 1;

	var gutter = 30;
	var min_width = 300;

    var search = "";
    var filter = [];

	function check_load_more () {
		if (cur_page >= total_page_pallete) {
			$("#loadmore").hide();
		} else {
			$("#loadmore").show();
		}
	}

    var load_palette = function (from = "") {
        $('#loading').addClass('active');

        $.ajax({
            type: "post",
            url: '/palette/loadmore-list',
            cache: false,
            data: {page: cur_page, search:search, filter: filter},
            dataType:'json',
            success: function(json) {
                $('#loading').removeClass('active');

                if (json.result == "NG") {
                    $('#popup .modal-title').html("Error !!!");
                    $('#popup .modal-text').html('<p>Ada Kesalahan Sistem.</p>');
                    $('#popup').addClass('active');
                } else {
                    if (from != "" || cur_page == 1) {
                        $container.masonry( 'remove', $container.find('.griddsitem') );
                        cur_page = 1;
                    }

                    $.each( json.datas, function( key, data ) {
                        var _elem = '<div class="griddsitem width-10 height-1 gridsep">' +
                                        '<h3 class="grid-section-title">'+ data.name +'</h3>' +
                                    '</div>';

                        if (data.image_thumb) {
                            _elem += '<div class="griddsitem gridcol width-2 height-3">' +
                                        '<a href="'+ data.image_url +'" class="colourbox trigger" data-lightbox="image-'+ data.id +'" data-title="'+ data.name +'">' +
                                            '<div class="colourboxcover">' +
                                                '<img src="'+ data.image_thumb +'" alt="'+ data.name +'" />' +
                                            '</div>' +
                                        '</a>' +
                                    '</div>';
                        }

                        $.each( data.pal_images, function( key, pal ) {
                            _elem += '<div class="griddsitem gridcol width-2 height-3">' +
                                        '<a href="'+ pal.image_url +'" class="colourbox trigger" data-lightbox="image-'+ data.id +'" data-title="'+ data.name +'">' +
                                            '<div class="colourboxcover">' +
                                                '<img src="'+ pal.image_thumb +'" alt="'+ data.name +'" />' +
                                            '</div>' +
                                        '</a>' +
                                    '</div>';
                        });

                        var $_elem = $(_elem);

                        $container.append($_elem);
                        $container.masonry( 'appended', $_elem );

                        $.each( data.colours, function( key, col ) {

                            var elems = '<div class="griddsitem gridcol width-2 height-3">' +
                                            '<div class="colourbox trigger coltrigger" targid="colpop" colcode="'+ col.code +'" colid="'+ col.id +'" colexist="'+ col.is_like +'">' +
                                                '<div class="colourboxtint autopalette" colhex="'+ col.hex_code +'"></div>' +
                                                '<div class="colourboxcode">'+ col.code +'</div>' +
                                                '<div class="colourboxname">'+ col.name +'</div>' +
                                            '</div>' +
                                        '</div>';

                            var $elems =	$(elems);

                            $container.append($elems);
                            $container.masonry( 'appended', $elems );

                        });

                        if (data.colours.length > 0) {
                            var elems = '<div class="griddsitem gridcol width-2 height-3">' +
                                            '<a href="/palette/detail/'+data.id+'" class="colourbox seemore">' +
                                                '<div><span>Lihat Semuanya</span></div>' +
                                            '</a>' +
                                        '</div>';
                        }

                        var $elems = $(elems);

                        $container.append($elems);
                        $container.masonry( 'appended', $elems );
                    });

                    total_page_pallete = json.total_page;

                    $container.masonry();

                    $('.autopalette').each(function(){
                        colhex = $(this).attr('colhex');
                        $(this).css({'background-color' : colhex});
                    });

                    check_load_more ();
                }


            },
            error: function() {
                $('#loading').removeClass('active');
                $('#popup .modal-title').html("Error !!!");
                $('#popup .modal-text').html('<p>Ada Kesalahan Sistem.</p>');
                $('#popup').addClass('active');
            }
        });
    }

    var set_search_filter = function () {
        search = $("#search-palette").val();

        if (search != ""){
            $('.clk_product').removeClass("active");
            filter = [];
        }
    }

	return {

		init : function (){
            check_load_more();

			$('#loadmore').on( 'click', function() {
				cur_page++;
				load_palette();
			});

			$("#search-palette").keyup(function(event){
				if(event.keyCode == 13){
					$("#search-btn").click();
				}
			});

			$("#search-btn").click(function (e){
				e.stopPropagation();
				e.preventDefault();

				set_search_filter();

                load_palette("search");

			});

			$("#clear-btn").click(function (){
				$("#search-palette").val("");
				$('input[name="produk[]"]').removeAttr('checked');

				$('.clk_product').removeClass("active");

				filter = [];
                search = "";

                load_palette("search");

			});

			$(document).on("click",'.savelikebox', function(){
				var color = $(this).data("id");

				likebox("color",color);
			});

			$(document).on("click",'.removelikebox', function(){
				var color = $(this).data("id");
				likebox_remove("color",color);
			});

			$('input[name="produk[]"]').change (function(){
				filter = [];

				if ($('input[name="produk[]"]:checked').length != 0) {
					$('input[name="produk[]"]:checked').each( function () {
						filter.push($(this).val());
					});
				}

				if (filter.length > 0) {
					$("#search-btn").click();
				} else if (filter.length <= 0) {
					$("#clear-btn").click();
				}
			});

			$('.clk_product').click (function(){
				filter = [];

				$('.clk_product').removeClass("active");
				$(this).addClass("active");

				filter.push($(this).data("id"));

				if (filter.length > 0) {
					$("#search-btn").click();
				} else if (filter.length <= 0) {
					$("#clear-btn").click();
				}
			});

		}

	}


}();


$(document).ready(function () {
    PaletteList.init();
});
