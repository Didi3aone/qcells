var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/qcell/manager/category/list_all_data";
    var sorting = [
        [3, "asc"]
    ];
    var columns = [
        { "data": "CategoryId" },
        { "data": "CategoryName" },
        { "data": "CategoryDescription" },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<td>';
                    edit +=  ' <a href="/qcell/manager/category/edit/' + full.CategoryId + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit Category" data-placement="top" ><i class="fa fa-pencil"></i></a>';
                    edit +=  '</td>';

                return edit;
            }
        },
    ];
    init_datatables (table_id, ajax_source, columns, [".filter-this"]);
};

$(document).ready(function() {
    lists();

    $(document).on("popup-confirm:success", function (e, url, data_id){
        $("#dataTable").dataTable().fnClearTable();
    });
});
