var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/palette/list_all_data";
    var sorting = [
        [1, "asc"]
    ];
    var columns = [
        { "data": "id" },
        { "data": "name" },
        { "data": "code" },
        { "data": "prod" },
        { "data": "is_show_name" },
        { "data": "visualizer_type_name" },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<td>';
                    edit +=  ' <a href="/manager/palette/edit/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit Slider" data-placement="top" ><i class="fa fa-pencil"></i></a>';
                    edit +=  ' <a href="/manager/palette/delete" data-id ="' + full.id + '" data-name ="' + full.name + '" class="btn btn-danger btn-circle delete-confirm" rel="tooltip" title="Delete Palette" data-placement="top" ><i class="fa fa-trash-o"></i></a>';
                    edit +=  ' <a href="/manager/palette/palimages/lists/' + full.id + '" class="btn btn-info btn-circle" rel="tooltip" title="List palette images" data-placement="top" ><i class="fa fa-image"></i></a>';
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

    $("#btn_export").click(function () {
        //call ajax form submit handler.
        form_ajax_submit ("#export-form", []);
    });

    $(document).on("form-submit:success", function(e, form , data) {
        var $a = $("<a>");
        $a.attr("href",data.file_data);
        $("body").append($a);
        $a.attr("download",data.filename + ".xlsx");
        $a[0].click();
        $a.remove();
    } );
});
