var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/page/list_all_data";
    var columns = [
        { "data": "id" },
        { "data": "name" },
        { "data": "title" },
        { "data": "meta_keys" },
        { "data": "meta_desc" },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<td>';
                    edit +=  ' <a href="/manager/page/edit/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit Page" data-placement="top" ><i class="fa fa-pencil"></i></a>';
                    edit +=  '</td>';

                return edit;
            }
        },
    ];
    init_datatables (table_id, ajax_source, columns, [".filter-this"], [[0, "asc"]]);
};

$(document).ready(function() {
    lists();
});
