var create = function (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {
        name: {
            required: true,
        },
    };

    init_validate_form (create_form,create_rules);
};


var set_pretty_url = function () {
    //to set pretty url same as name
    $("#name").change(function(){
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

var product = function () {
    $('.sel2product').select2({
        ajax: {
            url: "/manager/palette/list_product",
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
        allowClear: false,
        tags: true,
    });
};

$(document).ready(function() {
    create();
    set_pretty_url();
    product();

    $("#addimageurl").click(function (){
        var image_size = $(this).data("maxsize");
        var words_max_upload = $(this).data("maxwords");
        imageCropper ({
            target_form_selector : "#create-form",
            file_input_name : "image-url",
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
