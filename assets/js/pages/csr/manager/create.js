$(document).ready(function() {
    init_tinymce();
    create();
    cropper();
});

function create (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {
        judul: {
            required: true,
        },
    };

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
            image_ratio : 600/165,
            button_trigger_selector : "#addimage",
            image_preview_selector : "#preview-image-user",
            placeholder_path : "/img/placeholder/600x165.png",
            max_file_size : image_size,
            words_max_file_size : words_max_upload,
        } );
    });
}