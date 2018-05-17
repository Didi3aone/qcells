$(document).ready(function() {
    create();
    cropper();
});

function create (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {};

    init_validate_form (create_form,create_rules);
}

function cropper () {
    $("#addimage").click(function (){
        var image_size = $(this).data("maxsize");
        var words_max_upload = $(this).data("maxwords");
        imageCropper ({
            target_form_selector : "#create-form",
            file_input_name : "image-file",
            data_crop_name : "data-image",
            image_ratio : 660/410,
            button_trigger_selector : "#addimage",
            image_preview_selector : "#preview-image-user",
            placeholder_path : "/img/placeholder/660x410.png",
            max_file_size : image_size,
            words_max_file_size : words_max_upload,
        } );
    });
}