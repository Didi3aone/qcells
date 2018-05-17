var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/merchant/list-all-data/";
    var sorting = [
        [5, "asc"]
    ];
    var columns = [
        { "data": "id" },
        { "data": "name" },
        { "data": "logo_image", "sortable": false,
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return '<a href="'+ data +'" data-lightbox="image" data-title="'+ full.name +'"><img src="'+ data +'" width="100px" height="100px"></a>';
                }

                return "";
            }
        },
        { "data": "email" },
        { "data": "last_login_date",
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return moment(data).format("DD MMMM YYYY");
                }

                return "";
            }
        },
        { "data": "is_banned_name" },
        { "data": "status_name" },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<center><td>';
                    if (full.is_banned == 0 && full.status == 1) {
                        edit +=  ' <a href="/manager/merchant/edit/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit Merchant" data-placement="top" ><i class="fa fa-pencil"></i></a>';
                    }
                    if (full.is_banned == 0) {
                        edit +=  ' <a href="/manager/merchant/banned" data-id ="' + full.id + '" data-name ="' + full.name + '" class="btn btn-danger btn-circle ban-confirm" rel="tooltip" title="Ban Merchant" data-placement="top" ><i class="fa fa-close"></i></a>';
                    } else {
                        edit +=  ' <a href="/manager/merchant/unbanned" data-id ="' + full.id + '" data-name ="' + full.name + '" class="btn btn-info btn-circle unban-confirm" rel="tooltip" title="Unban Merchant" data-placement="top" ><i class="fa fa-check"></i></a>';
                    }
                    if (full.status == 1) {
                        edit +=  ' <a href="/manager/merchant/hide" data-id ="' + full.id + '" data-name ="' + full.name + '" class="btn btn-danger btn-circle hide-confirm" rel="tooltip" title="Hide Merchant" data-placement="top" ><i class="fa fa-trash-o"></i></a>';
                    } else {
                        edit +=  ' <a href="/manager/merchant/show" data-id ="' + full.id + '" data-name ="' + full.name + '" class="btn btn-success btn-circle show-confirm" rel="tooltip" title="Show Merchant" data-placement="top" ><i class="fa fa-check"></i></a>';
                    }
                    edit +=  '</td></center>';
                return edit;
            }
        },
    ];
    setup_daterangepicker(".date-range-picker");
    init_datatables (table_id, ajax_source, columns);

    $(document).on("click", ".hide-confirm", function(e) {
        e.stopPropagation();
        e.preventDefault();
        var url = $(this).attr("href");
        var data_id = $(this).data("id");
        var data_name = $(this).data("name");

        title = 'Hide Confirmation';
        content = 'Do you really want to hide ' + data_name + ' ?';

        popup_confirm (url, data_id, title, content);
    });

    $(document).on("click", ".show-confirm", function(e) {
        e.stopPropagation();
        e.preventDefault();
        var url = $(this).attr("href");
        var data_id = $(this).data("id");
        var data_name = $(this).data("name");

        title = 'Show Confirmation';
        content = 'Do you really want to show ' + data_name + ' ?';

        popup_confirm (url, data_id, title, content);
    });

    $(document).on("click", ".ban-confirm", function(e) {
        e.stopPropagation();
        e.preventDefault();
        var url = $(this).attr("href");
        var data_id = $(this).data("id");
        var data_name = $(this).data("name");

        title = 'Ban Confirmation';
        content = 'Do you really want to ban ' + data_name + ' ?';

        popup_confirm (url, data_id, title, content);
    });

    $(document).on("click", ".unban-confirm", function(e) {
        e.stopPropagation();
        e.preventDefault();
        var url = $(this).attr("href");
        var data_id = $(this).data("id");
        var data_name = $(this).data("name");

        title = 'Unban Confirmation';
        content = 'Do you really want to unban ' + data_name + ' ?';

        popup_confirm (url, data_id, title, content);
    });

    $(document).on("popup-confirm:success", function (e, url, data_id){
        $("#dataTable").dataTable().fnClearTable();
    });
};

$(document).ready(function() {

    lists();

});
