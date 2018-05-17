var create = function (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {
        to: {
            required: true,
        },
        email_from: {
            required: true,
        },
        name_from: {
            required: true,
        },
        subject: {
            required: true,
        },
        content : {
            required: true
        }
    };

    init_validate_form (create_form,create_rules);
};

$(document).ready(function() {
    create();
});
