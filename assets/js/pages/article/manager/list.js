var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/article/list_all_data";
    var columns = [
        { "data": "id" },
        { "data": "title" },
        { "data": "type_name" },
        { "data": "is_show_name" },
        { "data": "sticky_flag_name" },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<td>';
                    edit +=  ' <a href="/manager/article/edit/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit Article" data-placement="top" ><i class="fa fa-pencil"></i></a>';
                    edit +=  ' <a href="/manager/article/delete" data-id ="' + full.id + '" data-name ="' + full.title + '" class="btn btn-danger btn-circle delete-confirm" rel="tooltip" title="Delete Article" data-placement="top" ><i class="fa fa-trash-o"></i></a>';
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

    $(document).on("popup-confirm:success", function (e, url, data_id){
        $("#dataTable").dataTable().fnClearTable();
    });
};

$(document).ready(function() {
    lists();
});
