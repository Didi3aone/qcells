var create = function (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {
        title: {
            required: true,
        },
        sub_title: {
            required: true,
        },
        description : {
            required: true
        }
    };

    init_validate_form (create_form,create_rules);
};

var init_select_product = function () {
    $( "select.product-select" ).select2({
        ajax: {
            url: "/manager/product/get-list-product",
            dataType: "json",
            delay: 500,
            data: function(params) {
                return {
                    q: params.term,
                    page: params.page,
                };
            },
            processResults: function(data, params) {

                params.page = params.page || 1;

                return {
                    results: $.map(data.datas, function(item) {
                        return {
                            text: item.name,
                            id: item.id,
                        }
                    }),
                    pagination: {
                        more: (params.page * data.paging_size) < data.total_data,
                    }
                };
            },
            cache: true,
        },
        minimumInputLength: 0,
        allowClear: true,
        placeholder: "Pilih Product",
    });
}

$(document).ready(function() {
    create();

    init_select_product();

    $("#addimage").click(function (){
        var image_size = $(this).data("maxsize");
        var words_max_upload = $(this).data("maxwords");
        imageCropper ({
            target_form_selector : "#create-form",
            file_input_name : "image-file",
            data_crop_name : "data-image",
            image_ratio : 560/400,
            button_trigger_selector : "#addimage",
            image_preview_selector : "#preview-image-user",
            placeholder_path : "/img/placeholder/560x400.png",
            max_file_size : image_size,
            words_max_file_size : words_max_upload,
        } );
    });

});
