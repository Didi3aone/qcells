var create = function (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {
        title: {
            required: true
        },
        position: {
            required: true
        },
        available_from_date: {
            required: true
        },
        available_to_date: {
            required: true
        }
    };

    init_validate_form (create_form,create_rules);
}

$(document).ready(function() {
    $("#available_from_date").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        onClose: function (selectedDate) {
            $("#available_to_date").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#available_to_date").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        onClose: function (selectedDate) {
            // $("#available_to_date").datepicker("option", "minDate", selectedDate);
        }
    });

    create();
    init_tinymce();


});
