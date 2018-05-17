var lists = function () {
    var table_id = "#dataTable";
    var ajax_source = "/manager/product/review/list-all-data/";
    var sorting = [
        [5, "asc"]
    ];
    var columns = [
        { "data": "id" },
        { "data": "product_name" },
        { "data": "member_name" },
        { "data": "rating_score" },
        { "data": "review_title" },
        { "data": "review_content" },
        { "data": "review_datetime" },
        {
            "sClass": "center",
            "mData": null,
            "bSortable": true,
            "mRender": function(data, type, full) {

                var label = '';

                if (full.status == 0) {
                    label = '<span class="label label-unapproved">Unapproved</span>';
                } 
                else if (full.status == 1){
                    label = '<span class="label label-approved">Aprroved</span>';
                }
                else if (full.status == 2){
                    label = '<span class="label label-rejected">Rejected</span>';
                }
                return label;
            }
        },
        {
            "class": "center",
            "data": null,
            "sortable": false,
            "render": function(data, type, full) {
                var btn_review = "";

                if(full.status != 1) {
                    btn_review = ' <a href="/manager/product/review/approve/' + full.id + '" class="btn btn-primary btn-circle btn-approve" rel="tooltip" title="Approve Review" data-placement="top" data-id="'+full.id+'" data-name="'+full.product_name+'"><i class="fa fa-check"></i></a>';
                }

                var edit =  '<td>';
                    edit +=  ' <a href="/manager/product/review/edit/' + full.id + '" class="btn btn-primary btn-circle" rel="tooltip" title="Edit Review" data-placement="top" ><i class="fa fa-pencil"></i></a>';
                    edit +=  btn_review;
                    edit +=  '</td>';

                return edit;
            }
        },
    ];
    init_datatables (table_id, ajax_source, columns);
};

$(document).ready(function() {
    lists();

    $(document).on("click", ".btn-approve", function(e) {
        e.stopPropagation();
        e.preventDefault();
        var url = $(this).attr("href");
        var data_id = $(this).data("id");
        var data_name = $(this).data("name");

        title = 'Approve Confirmation';
        content = 'Do you really want to approve this review ?';

        popup_confirm (url, data_id, title, content);
    });

    $(document).on("popup-confirm:success", function (e, url, data_id){
        $("#dataTable").dataTable().fnClearTable();
    });
});
