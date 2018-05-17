var create = function (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {
        name: {
            required: true,
        },
        // description : {
        //     required : true,
        // },
        product_category_id : {
            required : true,
        },
        ProductPrice : {
            required : true,
        }
    };

    init_validate_form (create_form,create_rules);
};


$(document).ready(function() {
    //init function 

    create();
    init_tinymce();
    
    $("#addimage").click(function (){
        var image_size = $(this).data("maxsize");
        var words_max_upload = $(this).data("maxwords");
        imageCropper ({
            target_form_selector : "#create-form",
            file_input_name : "image-url",
            data_crop_name : "data-image",
            image_ratio : 325/400,
            button_trigger_selector : "#addimage",
            image_preview_selector : "#preview-image",
            placeholder_path : "/qcell/assets/img/placeholder/325x400.png",
            max_file_size : image_size,
            words_max_file_size : words_max_upload,
        });
    });
});
    // Bind keyup event on the input
    $('#discount_is_not_empty').keyup(function() {
      // If value is not empty
      if ($(this).val().length == 0) {
        // Hide the element
        $('.show_hide').hide();
      } else {
        // Otherwise show it
        $('.show_hide').show();
      }
    }).keyup();


    $('.percent input[type=text]').on('keyup',function(){
        var oldstr=$('.percent input[type=text]').val();
        var str=oldstr.replace('%',''); 
        $('.percent input[type=text]').val(str+'%');        
     });

    var $price      = $("input[name='price']"),
        $percentage = $("input[name='discount']").on("input", calculatePrice),
        $discount   = $("input[name='pricefix']").on("input", calculatePerc);
        

    function calculatePrice() {
        var percentage = $(this).val();
        var price      = $price.val();
        var calcPrice  = (price - ( price * percentage / 100 )).toFixed(2);
        $discount.val( calcPrice );
    }

    function calculatePerc() {
        var discount = $(this).val();
        var price    = $price.val();
        var calcPerc = 100 - (discount * 100 / price);
        $percentage.val( calcPerc );
    }