var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/colours/list-all-data/";
    var sorting = [
        [5, "asc"]
    ];
    var columns = [
        { "data": "id" },
        { "data": "name" },
        { "data": "code" },
        { "data": "is_show_name"},
        { 
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var color = '<div style="height:50px; background-color:'+full.hex_code+'"></div>';
                return color;
            }
        },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<center><td>';
                    if (full.status == 1) {
                        edit +=  ' <a href="/manager/colours/edit/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit Colours" data-placement="top" ><i class="fa fa-pencil"></i></a>';
                        edit +=  ' <a href="/manager/colours/delete" data-id ="' + full.id + '" data-name ="' + full.name + '" class="btn btn-danger btn-circle delete-confirm" rel="tooltip" title="Delete Colours" data-placement="top" ><i class="fa fa-trash-o"></i></a>';
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
