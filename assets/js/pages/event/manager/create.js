var map, marker;
var latlng = {lat: -1.7364578, lng: 117.5134753};

var create = function (){
    //init validate form
    var create_form = "#create-form";
    var create_rules = {};

    init_validate_form (create_form,create_rules);
}

function provinsi_select(){
    $( ".provinsi-select" ).select2({
        ajax: {
            url: "/manager/event/get-list-provinsi",
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
        placeholder: "Pilih Provinsi",
    });
}


function initMap(latlng) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: latlng,
      streetViewControl: false,
      zoom: 9
    });
    marker = new google.maps.Marker({
      position: latlng,
      map: map,
      draggable: true
    });

    // Add listener
    google.maps.event.addListener(marker, "dragend", function (event) {
        var latitude  = this.position.lat();
        var longitude = this.position.lng();

        $("#latitude").val(latitude);
        $("#longitude").val(longitude);
    });

}

$(document).ready(function() {
    latlng = {lat: -1.7364578, lng: 117.5134753};

    create();
    init_tinymce();
    provinsi_select();
    initMap(latlng);

    if ($("#latitude").val() != 0 || $("#longitude").val() != 0) {
        latlng = {
            lat: parseFloat($("#latitude").val()),
            lng: parseFloat($("#longitude").val())
        };
        initMap(latlng);
    }

    // Event
    $("#latitude, #longitude").change(function(){
        latlng = {
            lat: parseFloat($("#latitude").val()),
            lng: parseFloat($("#longitude").val())
        };
        initMap(latlng);
    });
    $("#periode_start").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        numberOfMonths: 3,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        onClose: function (selectedDate) {
            $("#periode_end").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#periode_end").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        numberOfMonths: 3,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        onClose: function (selectedDate) {
            // $("#available_to_date").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#add-image").click(function (){
        var image_size       = $(this).data("maxsize");
        var words_max_upload = $(this).data("maxwords");
        imageCropper ({
            target_form_selector : "#create-form",
            file_input_name : "image-file",
            data_crop_name : "data-image",
            image_ratio : 640/256,
            button_trigger_selector : "#add-image",
            image_preview_selector : "#preview-image",
            placeholder_path : "/img/placeholder/640x256.png",
            max_file_size : image_size,
            words_max_file_size : words_max_upload,
        } );
    });
    $("#add-image-popup").click(function (){
        var image_size       = $(this).data("maxsize");
        var words_max_upload = $(this).data("maxwords");
        imageCropper ({
            target_form_selector : "#create-form",
            file_input_name : "image-popup-file",
            data_crop_name : "data-image-popup",
            image_ratio : 640/640,
            button_trigger_selector : "#add-image-popup",
            image_preview_selector : "#preview-image-popup",
            placeholder_path : "/img/placeholder/640x640.png",
            max_file_size : image_size,
            words_max_file_size : words_max_upload,
        } );
    });

});
