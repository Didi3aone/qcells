var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/awards/list_all_data";
    var order_data = $("#order_data").val().split(",");
    var sorting = [
        [4, "asc"]
    ];
    var columns = [
        { "data": "id" },
        { "data": "title" },
        { "data": "sub_title" },
        { "data": "description" },
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
        {"data": "is_show_name" },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<td>';
                    edit +=  ' <a href="/manager/awards/edit/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit Awards" data-placement="top" ><i class="fa fa-pencil"></i></a>' +
                             ' <a href="/manager/awards/delete" data-id ="' + full.id + '" data-name ="' + full.title + '" class="btn btn-danger btn-circle delete-confirm" rel="tooltip" title="Delete Awards" data-placement="top" ><i class="fa fa-trash-o"></i></a>'+
                             ' <a href="/manager/awards/image/lists/'+ full.id +'" class="btn btn-info btn-circle" rel="tooltip" title="See List Awards Images" data-placement="top" ><i class="fa fa-image"></i></a>';
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

    $(document).on("change", ".order_data", function(e) {
		e.stopPropagation();
		e.preventDefault();
		var url = "/manager/awards/ordering";
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

		// console.log(data_id);
	});
});
