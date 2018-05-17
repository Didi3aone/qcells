var Likebox = function () {
	return {

		init : function (){
			$(document).on("click",'.removelikebox', function(){
				var pcalc = $(this).data("id");
				likebox_remove_inlikebox("paint_calc",pcalc);
			});

			$(document).on("click",'.removecolor', function(){
				var color = $(this).data("id");
				var type = $(this).data("type");

				if(type == "6") {
					likebox_remove_inlikebox("custom_color",color);
				} else {
					likebox_remove_inlikebox("color",color);
				}
			});
		}
	}
}();

$(document).ready(function () {
    Likebox.init();
});
