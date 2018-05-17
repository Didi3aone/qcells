var create = function (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {
        name: {
            required: true,
        },
        color : {
            required: true
        }
    };

    init_validate_form (create_form,create_rules);
};

$(document).ready(function() {
    create();
    init_color_picker();
});
