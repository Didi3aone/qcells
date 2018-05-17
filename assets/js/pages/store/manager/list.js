var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/store/list_all_data";
    var columns = [
        { "data": "kode_customer" },
        { "data": "nama_customer" },
        { "data": "alamat" },
        { "data": "rating_avianbrands" },
        { "data": "email" },
        { "data": "website" },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<td>';
                    edit +=  ' <a href="/manager/store/view/' + full.kode_customer + '" class="btn btn-circle bg-color-teal txt-color-white" rel="tooltip" title="View Store" data-placement="top" ><i class="fa fa-eye"></i></a>';
                    edit +=  ' <a href="/manager/store/edit/' + full.kode_customer + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit Store" data-placement="top" ><i class="fa fa-pencil"></i></a>';
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
