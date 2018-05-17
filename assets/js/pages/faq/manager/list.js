var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/faq/list_all_data";
    var columns = [
        { "data": "id" },
        { "data": "question" },
        { "data": "answer" },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<td>';
                    edit +=  ' <a href="/manager/faq/edit/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit FAQ" data-placement="top" ><i class="fa fa-pencil"></i></a>';
                    edit +=  ' <a href="/manager/faq/delete" data-id ="' + full.id + '" data-name ="' + full.id + '" class="btn btn-danger btn-circle delete-confirm" rel="tooltip" title="Delete FAQ" data-placement="top" ><i class="fa fa-trash-o"></i></a>';
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
