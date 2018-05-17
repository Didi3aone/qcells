var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/event/list-all-data/";
    var sorting = [
        [5, "asc"]
    ];
    var columns = [
        { "data": "id" },
        { "data": "judul" },
        { "data": "image_url", "sortable": false,
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return '<a href="'+ data +'" data-lightbox="image" data-title="'+ full.title +'"><img src="'+ data +'" width="100px" height="100px"></a>';
                }

                return "";
            }
        },
        { "data": "popup_image_url", "sortable": false,
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return '<a href="'+ data +'" data-lightbox="image" data-title="'+ full.title +'"><img src="'+ data +'" width="100px" height="100px"></a>';
                }

                return "";
            }
        },
        { "data": "periode_start",
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return moment(data).format("DD MMMM YYYY");
                }

                return "";
            }
        },
        { "data": "periode_end",
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return moment(data).format("DD MMMM YYYY");
                }

                return "";
            }
        },
        { "data": "prov_name" },
        { "data": "is_show_name" },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<center><td>';
                    if (full.is_show == 1) {
                        edit +=  ' <a href="/manager/event/edit/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit Event" data-placement="top" ><i class="fa fa-pencil"></i></a>';
                        edit +=  ' <a href="/manager/event/delete" data-id ="' + full.id + '" class="btn btn-danger btn-circle delete-confirm" rel="tooltip" title="Delete Event" data-placement="top" ><i class="fa fa-trash-o"></i></a>';
                    }
                    edit +=  '</td></center>';
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

        title   = 'Delete Confirmation';
        content = 'Do you really want to delete this Event ?';

        popup_confirm (url, data_id, title, content);

    });

    $(document).on("popup-confirm:success", function (e, url, data_id){
        $("#dataTable").dataTable().fnClearTable();
    });
};

$(document).ready(function() {
    lists();
});
