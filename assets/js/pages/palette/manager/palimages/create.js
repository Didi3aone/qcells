var create = function (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {
        file_real: {
            required: true,
        },
        file_small: {
            required: true,
        },
    };


    init_validate_form (create_form,create_rules);
};


$(document).ready(function() {
    create();

    $("#addimageurl").click(function (){
        var image_size = $(this).data("maxsize");
        var words_max_upload = $(this).data("maxwords");
        imageCropper ({
            target_form_selector : "#create-form",
            file_input_name : "file_small",
            data_crop_name : "data-image",
            image_ratio : 174/164,
            button_trigger_selector : "#addimageurl",
            image_preview_selector : "#preview-image-url",
            placeholder_path : "/img/placeholder/174x164.png",
            max_file_size : image_size,
            words_max_file_size : words_max_upload,
        } );
    });

});
