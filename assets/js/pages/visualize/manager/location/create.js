var create = function (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {
        name: {
            required: true
        },
        
        is_show: {
            required: true
        },
    };

    init_validate_form (create_form,create_rules);
};
    
    


$(document).ready(function() {
    create();
    
    $("#add-image").click(function (){
        var image_size       = $(this).data("maxsize");
        var words_max_upload = $(this).data("maxwords");
        imageCropper ({
            target_form_selector : "#create-form",
            file_input_name : "image-file",
            data_crop_name : "data-image",
            image_ratio : 640/400,
            button_trigger_selector : "#add-image",
            image_preview_selector : "#preview-image",
            placeholder_path : "/img/placeholder/640x400.png",
            max_file_size : image_size,
            words_max_file_size : words_max_upload,
        } );
    });
});
