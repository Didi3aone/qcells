var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/promo/list_all_data";
    var columns = [
        { "data": "id" },
        { "data": "judul" },
        { "data": "name" },
        { "data": "image_url","sortable": false,
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return '<a href="'+ data +'" data-lightbox="image" data-title="'+ full.judul +'"><img src="'+ data +'" width="195px" height="137px"></a>';
                }
                return "";
            }
        },
        { "data": "popup_image_url","sortable": false,
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return '<a href="'+ data +'" data-lightbox="image" data-title="'+ full.judul +'"><img src="'+ data +'" width="195px" height="137px"></a>';
                }
                return "";
            }
        },
        { "data": "periode_start",
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return moment(data).format("DD MMM YYYY");
                }

                return "";
            }
        },
        { "data": "periode_end",
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return moment(data).format("DD MMM YYYY");
                }

                return "";
            }
        },
        { "data": "is_show_name"},
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<td>';
                if (full.is_show == "1") {
                    edit +=  ' <a href="/manager/promo/edit/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit Promo" data-placement="top" ><i class="fa fa-pencil"></i></a>';
                    edit +=  ' <a href="/manager/promo/delete" data-id ="' + full.id + '" data-name ="' + full.judul + '" class="btn btn-danger btn-circle delete-confirm" rel="tooltip" title="Delete Promo" data-placement="top" ><i class="fa fa-trash-o"></i></a>';
                       } else {
                    edit +=  ' <a href="/manager/promo/reactivate" data-id ="' + full.id + '" data-name ="' + full.name + '" class="btn btn-danger btn-circle reactivate-confirm" rel="tooltip" title="Reactivate Promo" data-placement="top" ><i class="fa fa-power-off"></i></a>';
                        }
                    edit +=  '</td>';
                return edit;
            }
        },      
    ];
    init_datatables (table_id, ajax_source, columns);
    setup_daterangepicker(".date-range-picker");

    $(document).on("click", ".delete-confirm", function(e) {
        e.stopPropagation();
        e.preventDefault();
        var url = $(this).attr("href");
        var data_id = $(this).data("id");
        var data_name = $(this).data("name");

        title = 'Delete Confirmation';
        content = 'Do you really want to delete ' + data_name + ' ?';

        popup_confirm (url, data_id, title, content);

    });

    $(document).on("click", ".reactivate-confirm", function(e) {
        e.stopPropagation();
        e.preventDefault();
        var url = $(this).attr("href");
        var data_id = $(this).data("id");
        var data_name = $(this).data("name");

        title = 'Re-activate Confirmation';
        content = 'Do you really want to re-activate ' + data_name + ' ?';

        popup_confirm (url, data_id, title, content);

    });

    $(document).on("popup-confirm:success", function (e, url, data_id){
        $("#dataTable").dataTable().fnClearTable();
    });
};

$(document).ready(function() {
    lists();
});
