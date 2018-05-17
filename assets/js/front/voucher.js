var Voucher = function () {
    var cur_page = 1;

    var limit = 3;

    var gutter = 30;
    var min_width = 300;

    function check_load_more () {
        if (cur_page == total_page_article) {
            $("#loadmore").hide();
        } else {
            $("#loadmore").show();
        }
    }

    function upper_case_each_words(str) {
        var array1 = str.toLowerCase().split(' ');
        var newarray1 = [];

        for(var x = 0; x < array1.length; x++){
            newarray1.push(array1[x].charAt(0).toUpperCase()+array1[x].slice(1));
        }
        return newarray1.join(' ');
    }

    function format_number(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }


    function format_date(date) {
        date = new Date(date);
        var monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    var load_voucher = function () {
        $.ajax({
            type: "post",
            url: '/vouchers/loadmore',
            cache: false,
            data: {
                page: cur_page, 
                limit:limit
            },
            dataType:'json',
            success: function(json) {
                if (json.result == "NG") {
                    $('#popup .modal-title').html("Error !!!");
                    $('#popup .modal-text').html('<p>Ada Kesalahan Sistem.</p>');
                    $('#popup').addClass('active');
                } else {
                    $.each( json.datas, function( key, data ) {

                        var $elems = $('<div class="vthird vthirdpictxt" >' +
                                        '<a href="/vouchers/detail/'+ data.id +'" class="griddsitem griddsitemvoucher gridcol width-4 height-3.5" >' +
                                        '<div class="voucherbox">' +
                                            '<div class="voucherpic"><img src="'+ data.image_url +'" /></div>' +
                                            '<div class="vouchername">'+ upper_case_each_words(data.title) +'</div>' +
                                            '<div class="voucherpoin">'+ format_number(data.price) +'<span>poin</span></div>' +
                                            '<div class="voucherdate"><span>Tersedia sampai:</span>'+ format_date(data.periode_end) +'</div>' +
                                        '</div>' +
                                        '</a>' +
                                    '</div>');

                        $grid.append( $elems ).masonry( 'appended', $elems ).masonry("layout");
                    });
                    total_page_article = json.total_page;
                    check_load_more ();
                }

            },
            error: function() {
                $('#popup .modal-title').html("Error !!!");
                $('#popup .modal-text').html('<p>Ada Kesalahan Sistem.</p>');
                $('#popup').addClass('active');
            }
        });
    };

    return {

        init : function (_limit = 3) {
            $("#loadmore").hide();

            limit = _limit;
            check_load_more ();

            $('#loadmore').on( 'click', function() {
                cur_page++;
                load_voucher();
            });

        }

    }

}();

$(document).ready(function () {
    if ($("#voucher-container.home").length > 0) {
        Voucher.init(3);
    }
});
