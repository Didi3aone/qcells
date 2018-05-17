var import_form = function (){
    //init validate form
    var import_form = "#import-form";
    var import_rules = {
        file: {
            required: true,
        },
    };

    init_validate_form (import_form,import_rules);
};

$(document).ready(function() {
    import_form();
});
