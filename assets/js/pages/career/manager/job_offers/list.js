var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/career/job/list-all-data/";
    var sorting = [
        [5, "asc"]
    ];
    var columns = [
        { "data": "id" },
        { "data": "title" },
        { "data": "position" },
        { "data": "available_from_date",
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return moment(data).format("DD MMMM YYYY");
                }

                return "";
            }
        },
        { "data": "available_to_date",
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return moment(data).format("DD MMMM YYYY");
                }

                return "";
            }
        },
        { "data": "is_show_name" },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<center><td>';
                    if (full.status == 1) {
                        edit +=  ' <a href="/manager/career/job/edit/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit Vacancy" data-placement="top" ><i class="fa fa-pencil"></i></a>';
                        edit +=  ' <a href="/manager/career/job/delete" data-id ="' + full.id + '" class="btn btn-danger btn-circle delete-confirm" rel="tooltip" title="Delete Vacancy" data-placement="top" ><i class="fa fa-trash-o"></i></a>';
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

        title = 'Delete Confirmation';
        content = 'Do you really want to delete this vacancy ?';

        popup_confirm (url, data_id, title, content);

    });

    $(document).on("popup-confirm:success", function (e, url, data_id){
        $("#dataTable").dataTable().fnClearTable();
    });
};

$(document).ready(function() {
    lists();
});
