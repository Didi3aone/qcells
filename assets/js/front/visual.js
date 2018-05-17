var VisualList = function () {
	var $container =  $('.griddscontent');

	var total_page_visual = 1;
	var cur_page = 1;

	var gutter = 30;
	var min_width = 300;

    var search = "";

	function check_load_more () {
		if (cur_page >= total_page_visual) {
			$("#loadmore").hide();
		} else {
			$("#loadmore").show();
		}
	}

    var load_visualize = function (from = "") {
        $('#loading').addClass('active');

        $.ajax({
            type: "post",
            url: '/visualize/loadmore',
            cache: false,
            data: {page: cur_page, search:search },
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
                        $container.masonry();
                        cur_page = 1;
                    }

                    $.each( json.datas, function( key, data ) {

                        var elems = '<a href="/visualize/detail/'+ data.url +'" class="griddsitem griddsitemtheme gridcol width-2 height-3">' +
                                        '<div class="themebox">' +
                                            '<div class="themepic"><img src="'+ data.image +'"/></div>' +
                                            '<div class="themecollist">';
                                            $.each( data.colors, function( keycol, col ) {
                                                elems += '<div class="themecol autopalette" colhex="'+ col +'"></div>';
                                            });
                                elems += 	'</div>' +
                                            '<div class="themename">'+ data.name +'</div>' +
                                            '<div class="themeauth">By: '+ data.member_name +'</div>' +
                                        '</div>' +
                                    '</a>';

                        var $elems =	$(elems);

                        $container.append($elems);
                        $container.masonry( 'appended', $elems );

                    });

                    total_page_visual = json.total_page;

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

            search = $("#search-visual").val();

            load_visualize();

			$('#loadmore').on( 'click', function() {
				cur_page++;
				load_visualize();
			});

			$("#search-visual").keyup(function(event){
				if(event.keyCode == 13){
					$("#search-btn").click();
				}
			});

			$("#search-btn").click(function (){
                search = $("#search-visual").val();
                load_visualize("search");
			});

			$("#clear-btn").click(function (){
				$("#search-visual").val("");
                search = "";
				load_visualize("search");
			});
		}

	}


}();

var VisualDetail = function () {
	return {

		init : function (){
			$(document).on("click",'.savelikebox', function(){
				var vis = $(this).data("id");
				likebox("visualizer",vis);
			});

			$(document).on("click",'.removelikebox', function(){
				var vis = $(this).data("id");
				likebox_remove("visualizer",vis);
			});
		}
	}
}();

$(document).ready(function () {
    if ($('.griddscontent').length > 0) {
        VisualList.init();
    }


    if ($(".viszer_info").length > 0) {
        visualizeview();
        VisualDetail.init();
    }
});
