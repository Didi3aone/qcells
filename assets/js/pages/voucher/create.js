var create = function (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {
        merchant_id: {
            required: true,
        },
        stok : {
            required: true
        },
    };

    init_validate_form (create_form,create_rules);
};

$(document).ready(function() {
    $("#addimage").click(function (){
        var image_size = $(this).data("maxsize");
        var words_max_upload = $(this).data("maxwords");
        imageCropper ({
            target_form_selector : "#create-form",
            file_input_name : "image-url",
            data_crop_name : "data-image",
            image_ratio : 640/256,
            button_trigger_selector : "#addimage",
            image_preview_selector : "#preview-image",
            placeholder_path : "/img/placeholder/640x256.png",
            max_file_size : image_size,
            words_max_file_size : words_max_upload,
        } );
    });

    create();
    init_tinymce();
});

