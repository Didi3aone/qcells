var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/visualize/result/list-all-data/";
    var columns = [
        { "data": "id" },
        { "data": "location_name" },
        { "data": "member_name" },
        { "data": "name" },
        { "data": "publish_date",
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return moment(data).format("DD MMM YYYY HH:mm:ss");
                }

                return "";
            }
        },
        { "data": "result_image_url","sortable": false,
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return '<a href="'+ data +'" data-lightbox="image" data-title="'+ full.title +'"><img src="'+ data +'" width="195px" height="137px"></a>';
                }
                return "";
            }
        },
        { "data": "result_image_large","sortable": false, 
            "render":function(data, type, full) {
                if (data != null && data != "") {
                    return '<a href="'+ data +'" data-lightbox="image" data-title="'+ full.title +'"><img src="'+ data +'" width="195px" height="137px"></a>';
                }
                return "";
            }
        },
        { "data": "is_published_name" },
        { "data": "is_show_name" },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var edit =  '<td>';
                if (full.is_show == 1) {
                    edit += '<a href="/manager/visualize/result/hide-show" data-id="' + full.id + '" data-name ="' + full.name + '" class="btn btn-info btn-circle hides" rel="tooltip" title="Hide Visualizer Result"><i class="fa fa-eye-slash"></i></a>';
                } else {
                    edit += '<a href="/manager/visualize/result/hide-show" data-id="' + full.id + '" data-name ="' + full.name + '" class="btn btn-primary btn-circle shows" rel="tooltip" title="Show Visualizer Result"><i class="fa fa-eye"></i></a>';
                }
                
                edit += '  <a href="/manager/visualize/result/delete" data-id ="' + full.id + '" data-name ="' + full.name + '" class="btn btn-danger btn-circle delete-confirm" rel="tooltip" title="Delete Visualizer Result" ><i class="fa fa-trash-o"></i></a>';
                edit += '</td>';

                return edit;
            }
        },
    ];
    setup_daterangepicker(".date-range-picker");
    init_datatables (table_id, ajax_source, columns);

    $(document).on("click", ".delete-confirm", function(e) {
        e.stopPropagation();
        e.preventDefault();
        var url       = $(this).attr("href");
        var data_id   = $(this).data("id");
        var data_name = $(this).data("name");

        title   = 'Delete Confirmation';
        content = 'Do you really want to delete ' + data_name + ' ?';

        popup_confirm (url, data_id, title, content);

    });

    $(document).on("click", ".shows", function(e) {
        e.stopPropagation();
        e.preventDefault();
        var url = $(this).attr("href");
        var data_id = $(this).data("id");
        var data_name = $(this).data("name");
        
        title = 'Show Confirmation';
        content = 'Do You Really Want to Show ' + data_name + ' ?';
        
        popup_confirm (url, data_id, title, content);
    });

    $(document).on("click", ".hides", function(e) {
        e.stopPropagation();
        e.preventDefault();
        var url = $(this).attr("href");
        var data_id = $(this).data("id");
        var data_name = $(this).data("name");
        
        title   = 'Hide confirmation';
        content = 'Do You Really Want to Hide ' + data_name + ' ?';
        
        popup_confirm (url, data_id, title, content);
    });

    $(document).on("popup-confirm:success", function (e, url, data_id){
        $("#dataTable").dataTable().fnClearTable();
    });
};

$(document).ready(function() {
    lists();
});
