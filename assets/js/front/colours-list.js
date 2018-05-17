var ColoursList = function () {
    var $container =  $('.griddscontent');

	var total_page_color = 1;
	var cur_page = 1;

	var gutter = 30;
	var min_width = 300;

    var search = "";

	function check_load_more () {
		if (cur_page >= total_page_color) {
			$("#loadmore").hide();
		} else {
			$("#loadmore").show();
		}
	}

    var load_color = function (from = "") {
        $('#loading').addClass('active');
        $.ajax({
            type: "post",
            url: '/colours/loadmore-list',
            cache: false,
            data: {page: cur_page, search:search},
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

                        var elems = '<div class="griddsitem gridcol width-2 height-3">' +
                                        '<div class="colourbox trigger coltrigger" targid="colpop" colcode="'+ data.code +'" colid="'+ data.id +'" colexist="'+ data.is_like +'">' +
                                            '<div class="colourboxtint autopalette" colhex="'+ data.hex_code +'"></div>' +
                                            '<div class="colourboxcode">'+ data.code +'</div>' +
                                            '<div class="colourboxname">'+ data.name +'</div>' +
                                        '</div>' +
                                    '</div>';

                        var $elems = $(elems);

                        $container.append($elems);
                        $container.masonry( 'appended', $elems );

                    });

                    total_page_color = json.total_page;

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

	return {

		init : function (){
            $("#loadmore").hide();

            search = $("#search-colour").val();

            if (filter == 0) {
                load_color();
            }

			$('#loadmore').on( 'click', function() {
				cur_page++;
                load_color();
			});

			$("#search-colour").keyup(function(event){
				if(event.keyCode == 13){
					$("#search-btn").click();
				}
			});

			$("#search-btn").click(function (){
				search = $("#search-colour").val();

				load_color("search");
			});

			$("#clear-btn").click(function (){
                $("#search-colour").val("");

                search = "";

				load_color("search");

			});

			$(document).on("click",'.savelikebox', function(){
				var color = $(this).data("id");
				likebox("color",color);
			});

			$(document).on("click",'.removelikebox', function(){
				var color = $(this).data("id");
				likebox_remove("color",color);
			});

		}

	}

}();

$(document).ready(function () {
    ColoursList.init();
});
