var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/member/list_all_data";
    var columns = [
        { "data": "id" },
        { "data": "name" },
        { "data": "email" },
        { "data": "username" },
        { "data": "status_name" },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<td>';
                if (full.status == "1") {
                    edit += ' <a href="/manager/member/delete" data-id ="' + full.id + '" data-name ="' + full.name + '" class="btn btn-danger btn-circle delete-confirm" rel="tooltip" title="Delete Member" data-placement="top" ><i class="fa fa-trash-o"></i></a>';
                    } else {
                    edit +=  ' <a href="/manager/member/reactivate" data-id ="' + full.id + '" data-name ="' + full.name + '" class="btn btn-danger btn-circle reactivate-confirm" rel="tooltip" title="Reactivate Member" data-placement="top" ><i class="fa fa-power-off"></i></a>';
                }
                    edit +=  '</td>';

                return edit;
            }
        },
    ];
    init_datatables (table_id, ajax_source, columns);

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
