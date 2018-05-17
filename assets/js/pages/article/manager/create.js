var create = function (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {
        type: {
            required: true,
        },
        title : {
            required: true
        },
        sticky_flag : {
            required: true
        },
        pretty_url : {
            required: true
        },
        full_content : {
            required: true
        },
        is_show : {
            required: true
        },
        enable_push : {
            required: true
        }
    };

    init_validate_form (create_form,create_rules);
};

var set_pretty_url = function () {
    //to set pretty url same as title
    $("#title").change(function(){
        var myStr = $(this).val();
        myStr=myStr.toLowerCase();
        myStr=myStr.replace(/[^a-z\d]+/gi, "-");
        $("#pretty_url").val(myStr);
    });

    //replace all space to - in pretty_url
    $("#pretty_url").change(function(){
        var myStr = $(this).val();
        myStr=myStr.toLowerCase();
        myStr=myStr.replace(/[^a-z\d]+/gi, "-");
        $("#pretty_url").val(myStr);
    });
}

$(document).ready(function() {

    $("#addimage").click(function (){
        var image_size = $(this).data("maxsize");
        var words_max_upload = $(this).data("maxwords");
        imageCropper ({
            target_form_selector : "#create-form",
            file_input_name : "image-file",
            data_crop_name : "data-image",
            image_ratio : 740/500,
            button_trigger_selector : "#addimage",
            image_preview_selector : "#preview-image",
            placeholder_path : "/img/placeholder/740x500.png",
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
            image_ratio : 640/256,
            button_trigger_selector : "#addimagedevice",
            image_preview_selector : "#preview-image-device",
            placeholder_path : "/img/placeholder/640x256.png",
            max_file_size : image_size,
            words_max_file_size : words_max_upload,
        } );
    });


    create();
    set_pretty_url();
    init_tinymce();
});
