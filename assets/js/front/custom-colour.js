var CustomColor = function () {
	return {

		init : function (){
			$(document).on("click",'.savelikebox', function(){
				var r = $("#cmxs1").attr("val");
				var g = $("#cmxs2").attr("val");
				var b = $("#cmxs3").attr("val");

				var r_val = Math.round(r*2.55);
				var g_val = Math.round(g*2.55);
				var b_val = Math.round(b*2.55);

				// console.log("R: "+ r_val + " , G: " + g_val + " , B: " + b_val);

				//check if name is already entered
				var name = $("#color_name").val();
				if(name == "") {
					$('#popup .modal-title').html("Error !!!");
					$('#popup .modal-text').html('<p>Please Enter Colour Name.</p>');
					$('#popup').addClass('active');
				} else {
					$.ajax({
						type: "post",
						url: '/custom-colour/send',
						cache: false,
						data: {r: r_val, g:g_val , b:b_val, name: name},
						dataType:'json',
						success: function(json) {
							$('#loading').removeClass('active');
							if (json.is_error == true) {
								$('#popup .modal-title').html(json.data);
								if (json.data == "Please Login First to Save to Likebox.") $('#popup .modal-text').html('<p><button class="btn" type="button" onclick="location.href=\'/login\'">Go To Login</button></p>');
								else $('#popup .modal-text').html('');
								$('#popup').addClass('active');
							} else {
								$(this).data("id",json.id);
								likebox("custom_color",json.id);
							}

						},
						error: function() {
							$('#loading').removeClass('active');
							$('#popup .modal-title').html("Error !!!");
							$('#popup .modal-text').html('<p>Something Went Wrong.</p>');
							$('#popup').addClass('active');
						}
					});
				}
				// var color = $(this).data("id");

				// likebox("color",color);
			});

			$(document).on("click",'.removelikebox', function(){
				var color = $(this).data("id");
				likebox_remove("custom_color",color);
			});
		}
	}
}();


$(document).ready(function () {
    colourmixer();
	CustomColor.init();
});
