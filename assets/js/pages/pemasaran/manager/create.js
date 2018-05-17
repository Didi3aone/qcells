var create = function (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {
        name: {
            required: true
        },
        address: {
            required: true
        },
        latitude: {
            required: true
        },
        longitude: {
            required: true
        },
        type: {
            required: true
        },
    };

    init_validate_form (create_form,create_rules);
};

$(document).ready(function() {
    create();
});
