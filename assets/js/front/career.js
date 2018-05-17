var CareerForm = function () {
    return {
        init: function () {
            $("#career-fm").validate({
                errorClass: 'highlightext',
                errorElement: "div",
				rules: {
                    name: {
                        required: true
                    },
                    dob: {
                        required: true
                    },
					email: {
                        required: true,
                        email: true,
                    },
                    address: {
                        required: true
                    },
                    inputfile: {
                        required: true
                    },
                },
                messages: { },
                submitHandler: function(form)
	            {
	                $(form).ajaxSubmit({
                        beforeSend: function()
	                    {
							$('#loading').addClass('active');
	                        $('#career-fm button[type="submit"]').attr('disabled', true);
	                    },
	                    success: function(data)
	                    {
                            $('#loading').removeClass('active');
                            var obj = jQuery.parseJSON(data);
							var status = obj['is_error'];
							var is_redirect = obj['is_redirect'];
							var error_count = obj['error_count'];
							if (status == false) {
								//show pop up
								document.getElementById('career-fm').reset();
								$('#success_pop').addClass('active');
							} else {
                                $('#career-fm button[type="submit"]').attr('disabled', false);
								if (error_count > 0) {
									$("#smessage").html('<button type="button" class="close" id="alert_close"><span aria-hidden="true">&times;</span></button>');
									$("#smessage").append("There are " + error_count + "  errors. please fix all <br/>");
									$("#smessage").append(obj["data"]);
									$("#smessage").addClass("danger").removeClass("secondary");
									$("#smessage").show();
								} else {
									document.getElementById('career-fm').reset();
									$('#success_pop').addClass('active');
								}
							}
	                    },
						error: function (){
							$('#loading').removeClass('active');
							$('#career-fm button[type="submit"]').attr('disabled', false);
							$('#popup .modal-title').html("Error !!!");
							$('#popup .modal-text').html('<p>Ada Kesalahan Sistem.</p>');
							$('#popup').addClass('active');
						}
	                });
	            },

                errorPlacement: function(error, element)
	            {
                    $('#loading').removeClass('active');
                    if (element.attr("id") == "inputfile") {
						error.insertAfter(element.parent());
						element.parent().parent().addClass("highlight");
					} else {
						error.insertAfter(element);
					}
	            }
            });
        },
    };
}();

var fileuploader = function(){
    $("#inputfile").change(function () {
        var fileName = $(this).val().split("/").pop().split("\\").pop();
        $("#filename").html(fileName);
        $("#filename").addClass("active");
    });
};

$(document).ready(function() {
    $(".datepicker").each(function() {
		var $this = $(this),
			dataDateFormat = $(this).attr("data-dateformat") || "dd.mm.yy";

		$this.datepicker({
			dateFormat : dataDateFormat,
			prevText : "<",
			nextText : ">",
            changeMonth: true,
            changeYear: true,
            yearRange: "-100:+0",
		});

		//clear memory reference
		$this = null;
	});

    if($("#inputfile").length > 0) {
        fileuploader();
    }

    CareerForm.init();
});
