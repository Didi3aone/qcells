var create = function (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {
    };

    init_validate_form (create_form,create_rules);
};

$(document).ready(function() {

    $("#addimage").click(function (){
        var image_size = $(this).data("maxsize");
        var words_max_upload = $(this).data("maxwords");

        imageCropper ({
            target_form_selector : "#create-form",
            file_input_name : "image-file",
            data_crop_name : "data-image",
            image_ratio : 640/256,
            button_trigger_selector : "#addimage",
            image_preview_selector : "#preview-image",
            placeholder_path : "/img/placeholder/640x256.png",
            max_file_size : image_size,
            words_max_file_size : words_max_upload,
        } );
    });

    $("#addimage2").click(function (){
        var image_size = $(this).data("maxsize");
        var words_max_upload = $(this).data("maxwords");

        imageCropper ({
            target_form_selector : "#create-form",
            file_input_name : "image-file-large",
            data_crop_name : "data-image-url",
            image_ratio : 640/640,
            button_trigger_selector : "#addimage2",
            image_preview_selector : "#preview-image2",
            placeholder_path : "/img/placeholder/640x640.png",
            max_file_size : image_size,
            words_max_file_size : words_max_upload,
        } );
    });


    create();
    init_tinymce();
    provinsi();
});

function provinsi () {
    $( ".select2Prov" ).select2({
        ajax: {
            url: "/manager/promo/get-list-provinsi",
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
        placeholder: "Pilih Provinsi",
    });
}