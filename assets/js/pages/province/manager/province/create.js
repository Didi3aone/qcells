var create = function (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {
        country: {
            required: true
        },
        province: {
            required: true
        }
    };

    init_validate_form (create_form,create_rules);
}

var country = function () {
    $( ".select2Country" ).select2({
        ajax: {
            url: "/manager/province/select-country",
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
        allowClear: true,
        placeholder: "Pilih Country",
    });
}

$(document).ready(function() {

    create();
    country();

});
