var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/qcell/manager/operator/list_all_data";

    var columns = [
        { "data": "OperatorId" },
        { "data": "OperatorName" },
        { "data": "CardName"},
        { "data": "OperatorImage","sortable": false,
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return '<a href="'+ data +'" data-lightbox="image" data-title="'+ full.OperatorName +'"><img src="/qcell/'+ data +'" width="195px" height="137px"></a>';
                }
                return "";
            }
        },
        { "data": "OperatorDescription" },
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
