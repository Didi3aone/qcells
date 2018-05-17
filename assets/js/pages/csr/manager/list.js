$(document).ready(function() {
    lists();
    changeSliderOrder();
});

function lists () {
    var order_data = $("#order_data").val().split(",");

    var table_id = "#dataTable";
    var ajax_source = "/manager/csr/list-all-data/";
    var sorting = [
        [5, "asc"]
    ];
    var columns = [
        { "data": "id" },
        { "data": "judul" },
        { "data": "version" },
        { "data": "is_show_name" },
        {
            "data": "ordering",
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
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<td>';
                    edit +=  '<img class="csr-thumbs" src="'+full.image_landing+'">';
                    edit +=  '</td>';
                return edit;
            }
        },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<center><td>';
                    edit +=  ' <a href="/manager/csr/edit/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit CSR" data-placement="top" ><i class="fa fa-pencil"></i></a>';
                    edit +=  ' <a href="/manager/csr/slider/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="CSR Slider" data-placement="top" ><i class="fa fa-image"></i></a>';
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

        title   = 'Delete Confirmation';
        content = 'Do you really want to delete this CSR ?';

        popup_confirm (url, data_id, title, content);

    });

    $(document).on("popup-confirm:success", function (e, url, data_id){
        $("#dataTable").dataTable().fnClearTable();
    });
};


function changeSliderOrder () {
    $(document).on("change", ".order_data", function(e) {
        e.stopPropagation();
        e.preventDefault();
        var url = "/manager/csr/ordering_csr";
        var data_id = $(this).attr("data-id");
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
    });
}