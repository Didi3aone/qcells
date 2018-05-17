var lists = function () {
    var table_id = "#dataTable";
    var data_id = $("#pal_id").val();
    var ajax_source = "/manager/palette/palimages/list_all_data/" + data_id;
    var sorting = [
        [3, "asc"]
    ];
    var columns = [
        { "data": "id" },
        { "data": "nama_pallete" },
        { "data": "image_url","sortable": false,
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return '<img src="'+ data +'" width="195px" height="137px">';
                }
                return "";
            }
        },
        { "data": "image_thumb","sortable": false,
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return '<img src="'+ data +'" width="195px" height="137px">';
                }
                return "";
            }
        },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<td>';
                    edit +=  ' <a href="/manager/palette/palimages/delete" data-id ="' + full.id + '" data-name ="' + full.nama_pallete + '" class="btn btn-danger btn-circle delete-confirm" rel="tooltip" title="Delete Palette" data-placement="top" ><i class="fa fa-trash-o"></i></a>';
                    edit +=  '</td>';

                return edit;
            }
        },
    ];
    init_datatables (table_id, ajax_source, columns, [".filter-this"] , sorting);

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
