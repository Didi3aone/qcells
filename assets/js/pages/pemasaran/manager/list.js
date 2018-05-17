var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/pemasaran/list_all_data";
    var columns = [
        { "data": "id" },
        { "data": "name" },
        { "data": "province" },
        { "data": "address" },
        { "data": "telephone" },
        { "data": "type_name" },
        { "data": "is_show_name" },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<td>';
                    edit += ' <a href="/manager/pemasaran/view/' + full.id + '" class="btn btn-info btn-circle" rel="tooltip" title="View Office" data-placement="top" ><i class="fa fa-eye"></i></a>' +
                            ' <a href="/manager/pemasaran/edit/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit Office" data-placement="top" ><i class="fa fa-pencil"></i></a>' +
                            ' <a href="/manager/pemasaran/delete" data-id ="' + full.id + '" data-name ="' + full.name + '" class="btn btn-danger btn-circle delete-confirm" rel="tooltip" title="Delete Office" data-placement="top" ><i class="fa fa-trash-o"></i></a>';
                    edit += '</td>';

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

    $(document).on("popup-confirm:success", function (e, url, data_id){
        $("#dataTable").dataTable().fnClearTable();
    });
};

$(document).ready(function() {
    lists();
});
