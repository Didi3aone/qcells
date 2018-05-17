var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/contact-us/list_all_data";
    var columns = [
        { "data": "id" },
        { "data": "name" },
        { "data": "email_address" },
        {
            "data": null ,
            "width": "200px",
            "sortable": false,
            render: function (data, type, full) {
                return full.message.replace(/(?:\r\n|\r|\n)/g, '<br />');
            }
        },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<td>';
                    edit +=  ' <a href="/manager/contact-us/reply/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="Reply" data-placement="top" ><i class="fa fa-reply"></i></a>';
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
