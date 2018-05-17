var create = function (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {
        title: {
            required: true,
        },
        sub_title: {
            required: true,
        },
        description : {
            required: true
        },
        is_show : {
            required: true
        }
    };

    init_validate_form (create_form,create_rules);
};

$(document).ready(function() {
    create();
});
