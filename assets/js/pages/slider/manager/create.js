var create = function (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {
        show_in: {
            required: true,
        },
        is_show: {
            required: true,
        },
    };

    init_validate_form (create_form,create_rules);
};

$(document).ready(function() {
    create();

    $("#addimage").click(function (){
        var image_size = $(this).data("maxsize");
        var words_max_upload = $(this).data("maxwords");
        imageCropper ({
            target_form_selector : "#create-form",
            file_input_name : "image-file",
            data_crop_name : "data-image",
            image_ratio : 1126/539,
            button_trigger_selector : "#addimage",
            image_preview_selector : "#preview-image-user",
            placeholder_path : "/img/placeholder/1126x539.png",
            max_file_size : image_size,
            words_max_file_size : words_max_upload,
        } );
    });

    $("#addimagepro").click(function (){
        var image_size = $(this).data("maxsize");
        var words_max_upload = $(this).data("maxwords");
        imageCropper ({
            target_form_selector : "#create-form",
            file_input_name : "image-file-pro",
            data_crop_name : "data-image-pro",
            image_ratio : 784/460,
            button_trigger_selector : "#addimagepro",
            image_preview_selector : "#preview-image-pro",
            placeholder_path : "/img/placeholder/784x460.png",
            max_file_size : image_size,
            words_max_file_size : words_max_upload,
        } );
    });

    $("#addimagedevice").click(function (){
        var image_size = $(this).data("maxsize");
        var words_max_upload = $(this).data("maxwords");
        imageCropper ({
            target_form_selector : "#create-form",
            file_input_name : "image-file-device",
            data_crop_name : "data-image-device",
            image_ratio : 563/269.5,
            button_trigger_selector : "#addimagedevice",
            image_preview_selector : "#preview-image-device",
            placeholder_path : "/img/placeholder/640x256.png",
            max_file_size : image_size,
            words_max_file_size : words_max_upload,
        } );
    });

    $("#addimagepopup").click(function (){
        var image_size = $(this).data("maxsize");
        var words_max_upload = $(this).data("maxwords");
        imageCropper ({
            target_form_selector : "#create-form",
            file_input_name : "image-file-popup",
            data_crop_name : "data-image-popup",
            image_ratio : 640/640,
            button_trigger_selector : "#addimagepopup",
            image_preview_selector : "#preview-image-popup",
            placeholder_path : "/img/placeholder/640x640.png",
            max_file_size : image_size,
            words_max_file_size : words_max_upload,
        } );
    });
});
