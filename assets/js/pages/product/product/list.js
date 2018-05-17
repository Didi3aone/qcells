var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/qcell/manager/product/list_all_data";
    // var sorting = [
    //     [5, "asc"]
    // ];
    var columns = [
        { "data": "ProductId" },
        { "data": "ProductName"},
        { "data": "ProductPrice" },
        { "data": "ProductDiscount"},
        { "data": "ProductPriceFix" },
        { "data": "CategoryName" },
        { "data": "ProductDescription" },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<td>';
                    edit +=  ' <a href="/qcell/manager/product/edit/' + full.ProductId + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit Product" data-placement="top" ><i class="fa fa-pencil"></i></a>';
                    edit +=  ' <a href="/qcell/manager/product/delete" data-id ="' + full.ProductId + '" data-name ="' + full.name + '" class="btn btn-danger btn-circle delete-confirm" rel="tooltip" title="Delete Product" data-placement="top" ><i class="fa fa-trash-o"></i></a>';
                    edit +=  ' </td>';

                return edit;
            }
        },
    ];
    init_datatables (table_id, ajax_source, columns, [".filter-this"]);

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
