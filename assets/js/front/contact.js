var ContactForm = function () {
    return {
        init: function () {
            $("#contact-fm").validate({
                errorClass: 'bigform-error',
                errorElement: "div",
				rules: {
                    name: {
                        required: true
                    },
					email: {
                        required: true,
                        email: true,
                    },
                    message: {
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
	                        $('#contact-fm button[type="submit"]').attr('disabled', true);
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
								$('#contact-fm button[type="submit"]').attr('disabled', false);
								document.getElementById('contact-fm').reset();
								$('#contact-fm').remove();
								$('.contact-done').addClass('active');
							} else {
                                $('#contact-fm button[type="submit"]').attr('disabled', false);
								if (error_count > 0) {
									$("#smessage").html('<button type="button" class="close" id="alert_close"><span aria-hidden="true">&times;</span></button>');
									$("#smessage").append("There are " + error_count + "  errors. please fix all <br/>");
									$("#smessage").append(obj["data"]);
									$("#smessage").addClass("danger").removeClass("secondary");
									$("#smessage").show();
								} else {
									$('#contact-fm button[type="submit"]').attr('disabled', false);
									document.getElementById('contact-fm').reset();
									$('#contact-fm').remove();
									$('.contact-done').addClass('active');
								}
							}
	                    },
						error: function (){
							$('#loading').removeClass('active');
							$('#contact-fm button[type="submit"]').attr('disabled', false);
							$('#popup .modal-title').html("Error !!!");
							$('#popup .modal-text').html('<p>Ada Kesalahan Sistem.</p>');
							$('#popup').addClass('active');
						}
	                });
	            },
                errorPlacement: function(error, element)
	            {
                    $('#loading').removeClass('active');
	                error.insertAfter(element);
	            }
            });
        }
    };
}();

$(document).ready(function () {
    ContactForm.init();
});
