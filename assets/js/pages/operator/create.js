var create = function (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {
        name: {
            required: true,
        }
    };

    init_validate_form (create_form,create_rules);
};

$(document).ready(function() {
    create();
    init_tinymce();
    $("#addimage").click(function (){

        var image_size = $(this).data("maxsize");
        var words_max_upload = $(this).data("maxwords");

        imageCropper ({
            target_form_selector : "#create-form",
            file_input_name : "image-url",
            data_crop_name : "data-image",
            image_ratio : 784/460,
            button_trigger_selector : "#addimage",
            image_preview_selector : "#preview-image",
            placeholder_path : "/qcell/assets/img/placeholder/784x460.png",
            max_file_size : image_size,
            words_max_file_size : words_max_upload,
        });
    });
});
