// Export
var goExport = function (){
    //init validate form org
    var create_form = "#form";

    init_validate_form (create_form);
};

var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/province/list-all-data/";
    var sorting = [
        [5, "asc"]
    ];
    var columns = [
        { "data": "id" },
        { "data": "country_name" },
        { "data": "name" },
        { "data": "version" },
        { "data": "is_show_name" },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<center><td>';
                    if (full.is_show == 1) {
                        edit +=  ' <a href="/manager/province/edit/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit Province" data-placement="top" ><i class="fa fa-pencil"></i></a>';
                        edit +=  ' <a href="/manager/province/delete" data-id ="' + full.id + '" data-name ="' + full.name + '" class="btn btn-danger btn-circle delete-confirm" rel="tooltip" title="Hide Province" data-placement="top" ><i class="fa fa-trash-o"></i></a>';
                    } else {
                        edit +=  ' <a href="/manager/province/show" data-id ="' + full.id + '" data-name ="' + full.name + '" class="btn btn-success btn-circle show-confirm" rel="tooltip" title="Show Province" data-placement="top" ><i class="fa fa-check"></i></a>';
                    }
                    edit +=  '</td></center>';
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

        title = 'Hide Confirmation';
        content = 'Do you really want to hide ' + data_name + ' ?';

        popup_confirm (url, data_id, title, content);

    });

    $(document).on("click", ".show-confirm", function(e) {
        e.stopPropagation();
        e.preventDefault();
        var url = $(this).attr("href");
        var data_id = $(this).data("id");
        var data_name = $(this).data("name");

        title = 'Show Confirmation';
        content = 'Do you really want to show ' + data_name + ' ?';

        popup_confirm (url, data_id, title, content);

    });

    $(document).on("popup-confirm:success", function (e, url, data_id){
        $("#dataTable").dataTable().fnClearTable();
    });
};

$(document).ready(function() {
    lists();
    goExport();

    var $a = $("<a>");

    $(document).on("form-submit:success", function(e, form , data) {
        $a.attr("href",data.file_data);
        $("body").append($a);
        $a.attr("download",data.filename + ".xlsx");
        $a[0].click();
        $a.remove();
    } );

});
