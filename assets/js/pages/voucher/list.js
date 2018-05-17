var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/vouchers/voucher/list_all_data";
    var sorting = [
        [5, "asc"]
    ];
    var columns = [
        { "data": "id" },
        { "data": "merchant"},
        { "data": "title" },
        { "data": "price" },
        { "data": "image_url","sortable": false,
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return '<a href="'+ data +'" data-lightbox="image" data-title="'+ full.title +'"><img src="'+ data +'" width="195px" height="137px"></a>';
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
        { "data": "is_show_name" },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<td>';
                    edit +=  ' <a href="/manager/vouchers/voucher/edit/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit Voucher" data-placement="top" ><i class="fa fa-pencil"></i></a>';
                    edit +=  ' <a href="/manager/vouchers/voucher/delete" data-id ="' + full.id + '" data-name ="' + full.title + '" class="btn btn-danger btn-circle delete-confirm" rel="tooltip" title="Delete Voucher" data-placement="top" ><i class="fa fa-trash-o"></i></a>';
                    edit +=  ' </td>';

                return edit;
            }
        },
    ];
    setup_daterangepicker(".date-range-picker");
    init_datatables (table_id, ajax_source, columns, [".filter-this"] , sorting);

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

    $(document).on("popup-confirm:success", function (e, url, data_id){
        $("#dataTable").dataTable().fnClearTable();
    });
};

$(document).ready(function() {
    lists();
});
