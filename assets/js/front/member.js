var RegisterForm = function () {
    return {
        init: function () {
            $("#register-fm").validate({
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
					username: {
                        required: true,
						minlength: 6,
						maxlength: 15,
                    },
                    password: {
                        required: true,
						minlength: 6,
						maxlength: 12,
                    },
                },
                messages: { },
                submitHandler: function(form)
	            {
	                $(form).ajaxSubmit({
                        beforeSend: function()
	                    {
							$('#loading').addClass('active');
	                        $('#register-fm button[type="submit"]').attr('disabled', true);
	                    },
	                    success: function(data)
	                    {
                            $('#loading').removeClass('active');
                            var obj = jQuery.parseJSON(data);
							var status = obj['is_error'];
							var is_redirect = obj['is_redirect'];
							var error_count = obj['error_count'];
							if (status == false) {
								$('#register-fm button[type="submit"]').attr('disabled', false);
								document.getElementById('register-fm').reset();
								// $('#register-fm').addClass('hide');
								window.location = '/account/likebox';
							} else {
                                $('#register-fm button[type="submit"]').attr('disabled', false);
								if (error_count > 0) {
									$("#smessage").html(obj["data"]);
									$("#smessage").show();
								} else {
									$('#register-fm button[type="submit"]').attr('disabled', false);
									document.getElementById('register-fm').reset();
									// $('#register-fm').addClass('hide');
									window.location = '/account/likebox';
								}
							}
	                    },
						error: function (){
							$('#loading').removeClass('active');
							$('#register-fm button[type="submit"]').attr('disabled', false);
							// confirmSomething(true,"Error","Something Went wrong...");
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

var LoginForm = function () {
    return {
        init: function () {
            $("#login-fm").validate({
                errorClass: 'bigform-error',
                errorElement: "div",
				rules:
                {

					username: {
                            required: true,
							minlength: 6,
							maxlength: 15,
                        },

                    password: {
                            required: true,
							minlength: 6,
							maxlength: 12,
                        },

                },

                messages:
                {

                },

                submitHandler: function(form)
	            {
	                $(form).ajaxSubmit({
                        beforeSend: function()
	                    {
							$('#loading').addClass('active');
	                        $('#login-fm button[type="submit"]').attr('disabled', true);
	                    },
	                    success: function(data)
	                    {
                            $('#loading').removeClass('active');
                            var obj = jQuery.parseJSON(data);
							var status = obj['is_error'];
							var is_redirect = obj['is_redirect'];
							var error_count = obj['error_count'];
							if (status == false) {
								$('#login-fm button[type="submit"]').attr('disabled', false);
								document.getElementById('login-fm').reset();
								// $('#register-fm').addClass('hide');
								window.location = '/account/likebox';
							} else {
                                $('#login-fm button[type="submit"]').attr('disabled', false);
								if (error_count > 0) {
									$("#smessage").html(obj["data"]);
									$("#smessage").show();
								} else {
									$('#login-fm button[type="submit"]').attr('disabled', false);
									document.getElementById('login-fm').reset();
									// $('#register-fm').addClass('hide');
									window.location = '/account/likebox';
								}
							}
	                    },
						error: function (){
							$('#loading').removeClass('active');
							$('#login-fm button[type="submit"]').attr('disabled', false);
							// confirmSomething(true,"Error","Something Went wrong...");
						}
	                });
	            },

                errorPlacement: function(error, element)
	            {
                    $('#loading').removeClass('active');
	                error.insertAfter(element);
	            }
            });
        },
    };
}();

var FpassForm = function () {
    return {
        init: function () {
            $("#fpass-fm").validate({
                errorClass: 'bigform-error',
                errorElement: "div",
				rules:
                {

					email: {
                            required: true,
                            email: true,
                        },

                },

                messages:
                {

                },

                submitHandler: function(form)
	            {
	                $(form).ajaxSubmit({
                        beforeSend: function()
	                    {
							$('#loading').addClass('active');
	                        $('#fpass-fm button[type="submit"]').attr('disabled', true);
	                    },
	                    success: function(data)
	                    {
                            $('#loading').removeClass('active');
                            var obj = jQuery.parseJSON(data);
							var status = obj['is_error'];
							var is_redirect = obj['is_redirect'];
							var error_count = obj['error_count'];
							if (status == false) {
								$('#fpass-fm button[type="submit"]').attr('disabled', false);
								document.getElementById('fpass-fm').reset();
								$('#fpass-fm').remove();
								$('.contact-done').addClass('active');
								// window.location = '/account/likebox';
							} else {
                                $('#fpass-fm button[type="submit"]').attr('disabled', false);
								if (error_count > 0) {
									$("#smessage").html(obj["data"]);
									$("#smessage").show();
								} else {
									$('#fpass-fm button[type="submit"]').attr('disabled', false);
									document.getElementById('fpass-fm').reset();
									$('#fpass-fm').remove();
									$('.contact-done').addClass('active');
									// window.location = '/account/likebox';
								}
							}
	                    },
						error: function (){
							$('#loading').removeClass('active');
							$('#fpass-fm button[type="submit"]').attr('disabled', false);
							// confirmSomething(true,"Error","Something Went wrong...");
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

var RpassForm = function () {
    return {
        init: function () {
            $("#rpass-fm").validate({
                errorClass: 'bigform-error',
                errorElement: "div",
				rules:
                {

					password: {
                            required: true,
							minlength: 6,
							maxlength: 12,
                        },

					new_password: {
                            required: true,
							minlength: 6,
							maxlength: 12,
                        },

					confirm_password: {
                            required: true,
							minlength: 6,
							maxlength: 12,
							equalTo : '#new_password'
                        },

                },

                messages:
                {

                },

                submitHandler: function(form)
	            {
	                $(form).ajaxSubmit({
                        beforeSend: function()
	                    {
							$('#loading').addClass('active');
	                        $('#rpass-fm button[type="submit"]').attr('disabled', true);
	                    },
	                    success: function(data)
	                    {
                            $('#loading').removeClass('active');
                            var obj = jQuery.parseJSON(data);
							var status = obj['is_error'];
							var is_redirect = obj['is_redirect'];
							var error_count = obj['error_count'];
							if (status == false) {
								$('#rpass-fm button[type="submit"]').attr('disabled', false);
								document.getElementById('rpass-fm').reset();
								// $('#rpass-fm').addClass('hide');
								$("#smessage").html(obj["data"]);
								$("#smessage").show();
								// window.location = '/account/likebox';
							} else {
                                $('#rpass-fm button[type="submit"]').attr('disabled', false);
								if (error_count > 0) {
									$("#smessage").html(obj["data"]);
									$("#smessage").show();
								} else {
									$('#rpass-fm button[type="submit"]').attr('disabled', false);
									document.getElementById('rpass-fm').reset();
									// $('#rpass-fm').addClass('hide');
									$("#smessage").html(obj["data"]);
									$("#smessage").show();
									// window.location = '/account/likebox';
								}
							}
	                    },
						error: function (){
							$('#loading').removeClass('active');
							$('#rpass-fm button[type="submit"]').attr('disabled', false);
							// confirmSomething(true,"Error","Something Went wrong...");
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

var FrpassForm = function () {
    return {
        init: function () {
            $("#frpass-fm").validate({
                errorClass: 'bigform-error',
                errorElement: "div",
				rules:
                {
                },

                messages:
                {

                },

                submitHandler: function(form)
	            {
	                $(form).ajaxSubmit({
                        beforeSend: function()
	                    {
							$('#loading').addClass('active');
	                        $('#frpass-fm button[type="submit"]').attr('disabled', true);
	                    },
	                    success: function(data)
	                    {
                            $('#loading').removeClass('active');
                            var obj = jQuery.parseJSON(data);
							var status = obj['is_error'];
							var is_redirect = obj['is_redirect'];
							var error_count = obj['error_count'];
							if (status == false) {
								$('#frpass-fm button[type="submit"]').attr('disabled', false);
								document.getElementById('frpass-fm').reset();
								$('#frpass-fm').remove();
								$('.contact-done').addClass('active');
								// window.location = '/account/likebox';
							} else {
                                $('#frpass-fm button[type="submit"]').attr('disabled', false);
								if (error_count > 0) {
									$("#smessage").html(obj["data"]);
									$("#smessage").show();
								} else {
									$('#frpass-fm button[type="submit"]').attr('disabled', false);
									document.getElementById('frpass-fm').reset();
									$('#frpass-fm').remove();
									$('.contact-done').addClass('active');
									// window.location = '/account/likebox';
								}
							}
	                    },
						error: function (){
							$('#loading').removeClass('active');
							$('#frpass-fm button[type="submit"]').attr('disabled', false);
							// confirmSomething(true,"Error","Something Went wrong...");
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

    if ($("#login-fm").length > 0) {
        LoginForm.init();
    }

    if ($("#register-fm").length > 0) {
        RegisterForm.init();
    }

    if ($("#fpass-fm").length > 0) {
        FpassForm.init();
    }

    if ($("#rpass-fm").length > 0) {
        RpassForm.init();
    }

    if ($("#frpass-fm").length > 0) {
        FrpassForm.init();
    }

});
