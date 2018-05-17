var create = function (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {
        name: {
            required: true
        },
        code: {
            required: true
        },
        green: {
            required: true
        },
        blue: {
            required: true
        },
        hex_code: {
            required: true
        },
        red: {
            required: true
        }
    };

    init_validate_form (create_form,create_rules);
}

$(document).ready(function() {

    create();
                
    $('#pick_color').colorpicker({
      customClass: 'colorpicker-2x',
      format:"rgb",
      sliders: {
        saturation: {
          maxLeft: 200,
          maxTop: 200
        },
        hue: {
          maxTop: 200
        }
      }
    }).on('changeColor', function(ev) {
      $("#color_bg").css("background-color", ev.color.toHex());
      var rgb = ev.color.toRGB();
      $("#hex_code").val(ev.color.toHex());
      $("#red").val(rgb.r);
      $("#green").val(rgb.g);
      $("#blue").val(rgb.b);
    });
    
    $('#pick_color').colorpicker('setValue',$("#hex_code").val());
    
    $("#red, #green, #blue").change(function () {
        var r = $("#red").val();
        var g = $("#green").val();
        var b = $("#blue").val();
        
        var _rgb = "rgba("+r+","+g+","+b+",1)";
        
        $('#pick_color').colorpicker('setValue',_rgb);
    });
    
    $("#hex_code").change(function (){
        $('#pick_color').colorpicker('setValue',$(this).val());
    });

});
