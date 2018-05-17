var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/visualize/location/list-all-data/";
    var order_data = $("#order_data").val().split(",");
    var sorting = [
        [4, "asc"]
    ];
    var columns = [
        { "data": "id" },
        { "data": "name" },
        { "data": "is_show_name" },
        { "data": "is_interior_name" },
        { "data": "ordering",
            "render":function(data, type, full) {
                var ord = '<td>' +
                    '<select class="form-control order_data" data-id="'+full.id+'">';
                        $.each (order_data , function (key , val_order) {
                    ord += '<option value="'+ val_order +'"';
                        if (parseInt(val_order) == parseInt(data)) {
                    ord += ' selected="selected"';
                        }
                    ord +='>'+ val_order +'</option>';
                        });

                    ord += '</select>' +
                '</td>';
                return ord;
            }
        },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<td>';
                    edit +=  ' <a href="/manager/visualize/location/edit/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit visualizer Location" data-placement="top" ><i class="fa fa-pencil"></i></a>';
                    edit +=  ' <a href="/manager/visualize/detail/lists/' + full.id + '" class="btn btn-info btn-circle" rel="tooltip" title="Detail visualizer Location" data-placement="top" ><i class="fa fa-list"></i></a>';
                    edit +=  '</td>';

                return edit;
            }
        },
    ];
    init_datatables (table_id, ajax_source, columns , [".filter-this"] , sorting);
};

$(document).ready(function() {
    lists();
    $(document).on("change", ".order_data", function(e) {
        e.stopPropagation();
        e.preventDefault();
        var url = "/manager/visualize/location/ordering";
        var data_id    = $(this).attr("data-id");
        var data_value = $(this).val();

        $.ajax({
            type: "post",
            url: url,
            cache: false,
            data: {id: data_id, val:data_value},
            dataType:'json',
            success: function(data) {
                if (data.is_error == true) swal("Error!", data.error_msg, "error");
                $("#dataTable").dataTable().fnClearTable();
            },
            error: function() {
                swal("Error!", "Something Went wrong", "error");
            }
        });

        // console.log(data_id);
    });
});
