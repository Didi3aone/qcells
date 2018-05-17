var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/menu/list_all_data";
    var columns = [
        { "data": "id" },
        { "data": "name" },
        {
            "data": "color",
            "sortable": false,
            "render" : function(data, type, full) {
                return '<div style="height:50px; background-color:'+full.color+'"></div>';
            }
        },
        { "data": "type_name" },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<td>';
                    edit +=  ' <a href="/manager/menu/edit/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit Menu" data-placement="top" ><i class="fa fa-pencil"></i></a>';
                    edit +=  '</td>';

                return edit;
            }
        },
    ];
    init_datatables (table_id, ajax_source, columns);
};

$(document).ready(function() {
    lists();
});
