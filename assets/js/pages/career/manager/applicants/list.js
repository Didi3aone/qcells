var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/career/applicants/list-all-data/";
    var columns = [
        { "data": "id" },
        { "data": "vacancy" },
        { "data": "fullname" },
        { "data": "email" },
        { "data": "dob",
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return moment(data).format("DD MMMM YYYY");
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
                edit += '  <center><a href="/manager/career/applicants/detail/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="Detail Applicants" data-placement="top" ><i class="fa fa-eye"></i></a></center>';
                edit += '</td>';
                return edit;
            }
        },
    ];
    setup_daterangepicker(".date-range-picker");
    init_datatables (table_id, ajax_source, columns);
};

$(document).ready(function() {
    lists();
});
