/*
* FlowType.JS v1.1
* Copyright 2013-2014, Simple Focus http://simplefocus.com/
*
* FlowType.JS by Simple Focus (http://simplefocus.com/)
* is licensed under the MIT License. Read a copy of the
* license in the LICENSE.txt file or at
* http://choosealicense.com/licenses/mit
*
* Thanks to Giovanni Difeterici (http://www.gdifeterici.com/)
*/

(function($) {
   $.fn.flowtype = function(options) {

// Establish default settings/variables
// ====================================
      var settings = $.extend({
         maximum   : 9999,
         minimum   : 1,
         maxFont   : 9999,
         minFont   : 1,
         fontRatio : 35
      }, options),

// Do the magic math
// =================
      changes = function(el) {
         var $el = $(el),
            elw = $el.width(),
            width = elw > settings.maximum ? settings.maximum : elw < settings.minimum ? settings.minimum : elw,
            fontBase = width / settings.fontRatio,
            fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;
         $el.css('font-size', fontSize + 'px');
      };

// Make the magic visible
// ======================
      return this.each(function() {
      // Context for resize callback
         var that = this;
      // Make changes upon resize
         $(window).resize(function(){changes(that);});
      // Set changes on load
         changes(this);
      });
   };
}(jQuery));

init = function()
{
	$(document).on("click",'.click_comp', function(){
		$('#popup .modal-title').html("Selamat Anda telah menemukan clue Avian Web Hunt.");
		$('#popup .modal-text').html('<p>Kirimkan screenshot jawaban yang ditemukan di website Avian Brands disertai dengan watermark nama di setiap screenshot dan tag postingan jawaban ke 10 akun Facebook lainnya untuk mengikuti kuis.</p>');
		$('#popup').addClass('active');
	});

    $('body').flowtype({
     minimum   : 500,
     maximum   : 1200,
     minFont   : 12,
     maxFont   : 40,
     fontRatio : 30
    });

    var targid = 0,
        targroup = 0,
		winwidth = 0;

    $(document).on("click",".trigger", function(event){
        event.stopPropagation();
		event.preventDefault();

        targid = $(this).attr("targid");

		//get the datachoice
		var datachoice = 0;
		datachoice = $(this).attr("datachoice");

		//set reg / pro
		if (datachoice && datachoice != 0) {
			$.ajax({
				type: "post",
				url: "/index/set-choice",
				cache: false,
				data: {choice: datachoice},
				dataType:'json',
				success: function(json) {
					if (json.is_reload == "yes") {
						location.reload();
					}

				},
				error: function() {

				}
			});
		}

		if (targid == "calcpop") {
			var _ex_t = $(this).data("t");
			var _ex_b = $(this).data("b");
			var _ex_id = $(this).data("id");
			$("#ex_top").html(_ex_t);
			$("#ex_bot").html(_ex_b);
			$(".removelikebox").data("id",_ex_id);
		}

		if (targid == "colpop") {
			var _coltype = $(this).attr("coltype");
			var _colid = $(this).attr("colid");
			$(".removecolor").data("type",_coltype);
			$(".removecolor").data("id",_colid);
		}

		if($(".target"+targid).hasClass("active")==false)
        {
            $('.clearable_sp').removeClass("active");
            $(".target"+targid).addClass("active");
        }else
        {
            $('.clearable_sp').removeClass("active");
            $(".target"+targid).removeClass("active");
        }

		if ($(this).hasClass('triggerscrollbar')==true)
        {
            setTimeout(
              function()
              {
                $(".scrollbarcust").customScrollbar("resize", true);
              }, 500);
        }else
        {
        }

    });

	//set the choice in nav
	$("._datachoice").click(function(e){
		e.stopPropagation();
		e.preventDefault();

		var datachoice = $(this).attr("datachoice");
		$.ajax({
			type: "post",
			url: "/index/set-choice",
			cache: false,
			data: {choice: datachoice},
			dataType:'json',
			success: function(json) {
				location.reload();
			},
			error: function() {

			}
		});
	});

	var colhexpop = 0,
        colhextarg = 0,
        colcode = 0,
        colname = 0;

    $(document).on("click",".coltrigger", function(event){
        colhextarg = $(this).attr("targid");
        colhexpop = $(this).find('.autopalette').attr('colhex');
        colcode = $(this).attr('colcode');
        colname = $(this).find('.colourboxname').text();
        colid = $(this).attr('colid');
        colexist = $(this).attr('colexist');
        $(".target"+colhextarg).find('.colhextarg').css({'background-color' : colhexpop});
        $(".colcodetarg").html(colcode);
        $(".colnametarg").html(colname);

		if (colexist == 1){
			$(".savelikebox").addClass("active");
			$(".savelikebox").addClass("removelikebox");
			$(".savelikebox").removeClass("savelikebox");
			$(".removelikebox").data("id",colid);
		} else {
			$(".removelikebox").addClass("savelikebox");
			$(".savelikebox").removeClass("active");
			$(".removelikebox").removeClass("removelikebox");
			$(".savelikebox").data("id",colid);
		}
    });

    $(".triggergroup").click(function(event){
        event.stopPropagation();
		event.preventDefault();

		var targlink = 0;
		targlink = $(this).attr("targlink");

		if (targlink && targlink != 0) {
			window.location = targlink;
		}

        targid = $(this).attr("targid");
        targroup = $(this).attr("targroup");
        if($(".target"+targid).hasClass("active")==false)
        {
            $('.clearable_sp').removeClass("active");
			$(".targroup"+targroup).removeClass("active");
            $(".target"+targid).addClass("active");
        }else
        {
            $('.clearable_sp').removeClass("active");
			$(".target"+targid).removeClass("active");
        }
    });

	var disaph = $(".disap").height();
    $(".disap").height(disaph);

	disap = function()
    {
        if($(".disap").hasClass("active")==false)
        {
            $(".disap").height(0);
        }else
        {
            $(".disap").height(disaph);
        }
    }

	$(".tabgroup").click(function(event){
        event.stopPropagation()
        targid = $(this).attr("targid");
        targroup = $(this).attr("targroup");
        if($(".target"+targid).hasClass("active")==false)
        {
            $('.clearable_sp').removeClass("active");
            $(".targroup"+targroup).removeClass("active");
            $(".target"+targid).addClass("active");
        }else
        {
        }
		disap();
    });

    $('body').click(function(){
        $('.clearable').removeClass("active");
		$('.clearable_sp').removeClass("active");
    });

	var colhex = 1;

    $('.autopalette').each(function(){
        colhex = $(this).attr('colhex');
        if(typeof colhex != 'undefined')
        {
            $(this).css({'background-color' : colhex});
        }
    });

	$(document).on("click",'.needlogin', function(){
		$('#popup .modal-title').html("Silahkan masuk terlebih dahulu untuk menambahkan ke Kotak Favorit Anda.");
		$('#popup .modal-text').html('<p><button class="btn" type="button" onclick="location.href=\'/login\'">Ke Halaman Login</button></p>');
		$('#popup').addClass('active');
	});

	$(document).on("click",'.needloginvisual', function(){
		$('#popup .modal-title').html("Silahkan masuk terlebih dahulu untuk membuat design baru.");
		$('#popup .modal-text').html('<p><button class="btn" type="button" onclick="location.href=\'/login\'">Ke Halaman Login</button></p>');
		$('#popup').addClass('active');
	});

    var winh = 0,
        modh = 0,
        hval = 0;

    modal_repos = function()
    {
        winh = $( window ).height();
        modh = 700;
        hval = winh/2;
        modh = modh/2;
        hval = hval-modh;
        if(hval<=10){hval=10;}else{};
        $('.modal-window').each(function(){

			if($(this).hasClass("modalofst")==false)
			{
				$(this).css('margin-top',hval+'px');
			}else
			{
			}

        });
    }
    modal_repos();
    window.addEventListener("resize", function() {
        modal_repos();
    }, false);

    var scrlps = 0;

    modal_offset = function(){
    	scrlps = window.pageYOffset+15;
    	if(isNaN(scrlps) == true){
    		scrlps = $(window).scrollTop()+15;
    	// console.log(scrlps+"*updated");
    	}else{};
        $('.modal-window').css('margin-top',scrlps+'px');
    };
	modal_offset();

    $(".triggerofst").click(function(){
    	modal_offset();
    });

	//back to top
	// hide #back-top first
	$(".backtotop").hide();

	// fade in #back-top
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 500) {
				$('.backtotop').fadeIn();
			} else {
				$('.backtotop').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('.backtotop a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});


};


colourmixer = function(){
    var targ = 0,
        posval = 0,
        curval = 0,
        incval = 0,
        col1 = 0,
        col2 = 0,
        col3 = 0,
        val1 = 0,
        val2 = 0,
        val3 = 0,
        defcol = 0;
    defcol = $("#colourmixer").attr("defcol");
    $("#cmixresult").css({'background-color' : "#"+defcol});
    changecolour = function(){
        /* Update Mixer Values */
        targ = $(this).attr("targ");
        posval = $(this).attr("pos");
        curval = parseInt($("#"+targ).attr("val"));
        incval = parseInt($(this).attr("inc"));
        if(posval=="0")
        {
            if(curval>=0+incval)
            {
                curval = curval-incval;
            }
        }
        if(posval=="1")
        {
            if(curval<=100-incval)
            {
                curval = curval+incval;
            }
        }

        $("#"+targ).attr("val",curval);
        $("#"+targ).text(curval+"%");

        /* Update Result Values */
        col1 = $("#cmxs1").attr("val");
        col2 = $("#cmxs2").attr("val");
        col3 = $("#cmxs3").attr("val");
        $("#outcmxs1").text(col1+"%");
        $("#outcmxs2").text(col2+"%");
        $("#outcmxs3").text(col3+"%");
        val1 = Math.round(col1*2.55);
        val2 = Math.round(col2*2.55);
        val3 = Math.round(col3*2.55);
        /*console.log(posval+"||"+col1+","+col2+","+col3+"|"+val1+","+val2+","+val3);*/
        $("#cmixresult").css({'background-color' : "rgb("+val1+", "+val2+", "+val3+")"});

		if ( $( ".removelikebox" ).length ) {
			$("#color_name").val("");
			$(".removelikebox").addClass("savelikebox");
			$(".removelikebox").removeClass("active");
			$(".removelikebox").removeClass("removelikebox");
		}
    }

    $(".cmxs_btn").click(changecolour);

}

visualizer = function()
{
    var la_w = $(".la_s").width(),
        la_h = $(".la_s").height(),
        part = $("input[name=viszer_part]:radio:checked").val(),
        defcol = 0,
        col = 0,
        curpalid = 0,
        curcolid = 0;

	var palletes = [];
	var palletes_layer = [];

    visualizer_resize = function()
    {
        setTimeout(
          function()
          {;
            la_w = $(".la_s").width();
            la_h = $(".la_s").height();
            // console.log(la_w+", "+la_h);
            $('.viszer_la svg').each(function(){
                $(this).width(la_w);
                $(this).height(la_h);
            });
          }, 300)
    }
    visualizer_resize();

    $('.flscrnbtn').click(function(){visualizer_resize();});

    window.addEventListener("resize", function() {
		visualizer_resize();
    }, false);

    $('.viszer_la').each(function(){
        defcol = $(this).attr('defcol');
        $(this).find('path').css({ fill: defcol });
        $(this).find('polygon').css({ fill: defcol });
        $(this).find('rect').css({ fill: defcol });
    });

    var parteid = 0;

    $('.pallabel').click(function(){
        parteid = $(this).attr("part");
        $('html, body').animate({
            scrollTop: $('.viszer_parts').offset().top-100
        }, 500);
        $(".viszer_parts").customScrollbar("scrollTo", '#vpc_'+parteid)
    });

    $('.viszer_part').click(function(){
        part = $(this).attr("part");

        curpalid = $("#vp_"+part).attr('selpalid');
        curcolid = $("#vp_"+part).attr('selcolid');

        $('.pallabel').removeClass("active");
        $('.pallabel'+part).addClass("active");
        $('#vp_'+part).prop("checked", true);

		if(typeof palletes_layer[part] === 'undefined') {
			//get list pallete
			getLayerPallete(part,function(data_layer){
				if ($.isArray(data_layer)) {
					if ("0" in data_layer) {
						$("#vp_"+part).attr('selpalid', 'a'+data_layer[0]['id']);
						curpalid = 'a'+data_layer[0]['id'];
					} else {
						$("#vp_"+part).attr('selpalid', 'a0');
						curpalid = 'a0';
					}

					$("#pallete_val").val(curpalid);

					changePallete(function(data){
						if (data) {
							if(curcolid != "" && curcolid != "pall_a") $('#'+curcolid).prop('checked', true);
							else $('input[name=viszer_pallette]').attr('checked',false);
						}
					});
				}
			});
		} else {
			$('#pallete_val').empty();
			var palls = palletes_layer[part];
			if (palls.length > 0) {
				$.each( palls, function( key, data ) {
					$('#pallete_val').append($("<option></option>").attr("value", 'a' + data.id).text(data.name));
				});
			}

			$("#pallete_val").val(curpalid);

			changePallete(function(data){
				if (data) {
					if(curcolid != "") $('#'+curcolid).prop('checked', true);
					else $('input[name=viszer_pallette]').attr('checked',false);
				}
			});
		}

		// var selected_pallete = $("#pallete_val").val();

		// console.log("selected_pallete : " +selected_pallete);

		// // if (selected_pallete != curpalid) {
			// $("#pallete_val").val(curpalid);

			// changePallete(function(data){
				// if (data) {
					// if(curcolid != "") $('#'+curcolid).prop('checked', true);
					// else $('input[name=viszer_pallette]').attr('checked',false);
				// }
			// });
		// } else {
			// // if(curcolid != "") $('#pall_'+curcolid).prop('checked', true);
			// if(curcolid != "") $('#'+curcolid).prop('checked', true);
			// else $('input[name=viszer_pallette]').attr('checked',false);
		// }

		// if (selected_pallete != curpalid) {
			setTimeout(
			  function()
			  {;
				$(".scrollbarcust").customScrollbar("resize", true);
			  }, 50);
		// }
    });

    // $('.viszer_pall').click(function(){
    $(document).on("click",".viszer_pall", function(){
        col = $(this).parent().attr('colhex');

        if(typeof col != 'undefined')
        {
            $('#la'+part).find('path').css({ fill: col });
            $('#la'+part).find('polygon').css({ fill: col });
            $('#la'+part).find('rect').css({ fill: col });
            $('#samp_'+part).attr('colhex',col);
            $('#samp_'+part).css({'background-color' : col});
            //console.log('#pallabel'+part);
            $('.pallabel'+part).css({'border-color' : col});
            // curpalid = $(this).siblings("input").attr('id');
            curpalid = $(this).siblings("input").data('pall');
            // curpalid = curpalid.slice(5,7);
            curcolid = $(this).siblings("input").attr('id');
            // curcolid = curcolid.slice(7,10);
            var sellll = $('.viszer_part_con input:selected');
            $('.viszer_part_con input:checked').attr("selpalid",curpalid);
            // $('.viszer_part_con input:checked').attr("selcolid",curpalid+curcolid);
            $('.viszer_part_con input:checked').attr("selcolid",curcolid);
        }
    });

    var palval1 = 0,
        palval2 = 0;

	changePallete = function (callback) {
		getPallete( function(data){
			palval2 = $("#pallete_val").val();
			if (palval2 != null) {
				palval1 = palval2.slice(0,1);
				$('.gpals_'+palval1).removeClass("active");
				$('.pals_'+palval2).addClass("active");
			} else {
				$('.gpals_a').removeClass("active");
			}

			//console.log("palval2 : " + palval2);

			// $(this).find( "option:selected" ).each(function() {
				// palval2 = $( this ).attr("value");
				// palval1 = palval2.slice(0,1);
			// });

			// console.log($('.pals_'+palval2));
			// if (palval2 != null) {
				// palval1 = palval2.slice(0,1);
				// if ($('.pals_'+palval2).length == 0) {
					// var _palnew = '';
					// _palnew = '<div class="viszer_pallscroll scrollbarcust scrollbarcust_simple gpals_a pals_' + palval2 + '">' +
									// '</div>';
					// $('.pals_a0').before(_palnew);
					// $(".scrollbarcust").customScrollbar({updateOnWindowResize: true});
				// }
			// }

			callback(true);
		});
	}

    $("#pallete_val").change(function(){

		changePallete(function(){

		});

    });

	//get data colors from pallete
    getPallete = function(callback) {

		var pall_val = $("#pallete_val").val();

		if (pall_val != null) {
			if ($('.pals_'+pall_val).length == 0) {
				var _palnew = '';
				_palnew = '<div class="viszer_pallscroll scrollbarcust scrollbarcust_simple gpals_a pals_' + pall_val + '">' +
								'</div>';
				$('.viszer_pall_group').append(_palnew);
				$(".scrollbarcust").customScrollbar({updateOnWindowResize: true});
			}
		}

		if(typeof palletes[pall_val] === 'undefined') {
			$('#loading').addClass('active');
			// does not exist
			$.ajax({
				type: "post",
				url: '/visualize/getpallete',
				cache: false,
				data: {pallete: pall_val},
				dataType:'json',
				success: function(json) {
					$('#loading').removeClass('active');
					if (json.is_error == true) {
						$('#popup .modal-title').html('Error !!!');
						$('#popup .modal-text').html('<p>'+json.data+'</p>');
						$('#popup').addClass('active');
					} else {
						//push to pall_val
						palletes[pall_val] = json.pallete;

						//insert to html
						$.each( json.pallete.colors, function( key, data ) {

							var elems = '<div class="viszer_pall_cont autopalette" colhex="'+data.hex_code+'">' +
                                        '<input type="radio" data-pall="a'+ json.pallete.id +'"  id="pall_a'+ json.pallete.id + data.id +'" name="viszer_pallette"/>' +
                                        '<label class="viszer_pall" for="pall_a'+ json.pallete.id + data.id +'"><span>'+data.name+'</span></label>' +
                                    '</div>';

							$(".pals_a"+json.pallete.id + " .viewport > .overview").append(elems);

						});

						$('.autopalette').each(function(){
							colhex = $(this).attr('colhex');
							if(typeof colhex != 'undefined')
							{
								$(this).css({'background-color' : colhex});
							}
						});


						setTimeout(
						  function()
						  {;
							$(".scrollbarcust").customScrollbar("resize", true);
						  }, 50);

						callback(true);
					}

				},
				error: function() {
					$('#loading').removeClass('active');
					$('#popup .modal-title').html("Error !!!");
					$('#popup .modal-text').html('<p>Ada Kesalahan Sistem.</p>');
					$('#popup').addClass('active');
				}
			});
		}
		else {
			// does exist
			callback(true);
		}


	}

	getLayerPallete = function(_vis_id,callback) {

		if(typeof palletes_layer[_vis_id] === 'undefined') {
			$('#loading').addClass('active');
			// does not exist
			$.ajax({
				type: "post",
				url: '/visualize/getlayerpallete',
				cache: false,
				data: {vis_id : _vis_id},
				dataType:'json',
				success: function(json) {
					$('#loading').removeClass('active');
					if (json.is_error == true) {
						$('#popup .modal-title').html('Error !!!');
						$('#popup .modal-text').html('<p>'+json.data+'</p>');
						$('#popup').addClass('active');
					} else {
						//push to pall_val
						palletes_layer[_vis_id] = json.pallete;

						$('#pallete_val').empty();

						if (json.pallete.length > 0) {
							//insert to html
							$.each( json.pallete, function( key, data ) {
								if (key == 0) {
									$('#pallete_val').append($("<option></option>").attr("value", 'a' + data.id).attr("selected", 'selected').text(data.name));
								} else {
									$('#pallete_val').append($("<option></option>").attr("value", 'a' + data.id).text(data.name));
								}
							});

						}

						// $('.autopalette').each(function(){
							// colhex = $(this).attr('colhex');
							// if(typeof colhex != 'undefined')
							// {
								// $(this).css({'background-color' : colhex});
							// }
						// });


						// setTimeout(
						  // function()
						  // {;
							// $(".scrollbarcust").customScrollbar("resize", true);
						  // }, 50);

						callback(palletes_layer[_vis_id]);
					}

				},
				error: function() {
					$('#loading').removeClass('active');
					$('#popup .modal-title').html("Error !!!");
					$('#popup .modal-text').html('<p>Ada Kesalahan Sistem.</p>');
					$('#popup').addClass('active');
				}
			});
		}
		else {
			// does exist
			callback(true);
		}


	}


	var _init_vis_id = $("input[name='viszer_part']:checked").val();

	//console.log(_init_vis_id);

	//get initial pallete layers then get pallete put selected pallete into the first pallete
	getLayerPallete(_init_vis_id,function(data_layer) {

		if ($.isArray(data_layer) && data_layer.length > 0) {
			//console.log(data_layer[0]['id']);
			$("input[name='viszer_part']:checked").attr("selpalid", 'a'+data_layer[0]['id']);
			//console.log($("input[name='viszer_part']:checked").attr("selpalid"));
			//for intial get pallete
			getPallete(function(data){
				if (data) {

					var f_curcolid = $('input[name=viszer_part]:radio:checked').attr("selcolid");

					if(f_curcolid != "") $('#'+f_curcolid).prop('checked', true);
					else $('input[name=viszer_pallette]').attr('checked',false);
				}
			});
		}

	});

	saveVisual = function() {
		var vid = $("#vis_id").val();
		var vis_name = $("#visual_name").val();
		var publish = $('input[name=viszer_publishstate]:radio:checked').val();

		//get all col_id
		var _visual = $('input[name=viszer_part]:radio');
		var flag_error = 0;
		var total = 0;

		var _visual_det = [];

		_visual.each(function() {
			var _d_id = $( this ).attr("id");
			var _d_palid = $( this ).attr("selpalid");
			var _d_colid = $( this ).attr("selcolid");

			if (_d_colid == "") {
				flag_error += 1;
			}

			if (_d_colid != "" || _d_colid != 0) {
				var _v_detail = {id:_d_id, pal_id:_d_palid, col_id:_d_colid};

				_visual_det.push(_v_detail);
			}
			total += 1;
		});

		if (vis_name == "") {
			$('#popup .modal-title').html("Error !!!");
			$('#popup .modal-text').html('<p>Masukan Nama Tema</p>');
			$('#popup').addClass('active');
		} else if (publish != 0 && publish != 1) {
			$('#popup .modal-title').html("Error !!!");
			$('#popup .modal-text').html('<p>Pilih Publish / Unpublish</p>');
			$('#popup').addClass('active');
		} else if (flag_error == total) {
			$('#popup .modal-title').html("Error !!!");
			$('#popup .modal-text').html('<p>Pilih warna minimum 1</p>');
			$('#popup').addClass('active');
		} else {

			$('#loading').addClass('active');

			$.ajax({
				type: "post",
				url: '/visualize/save_visualize',
				cache: false,
				data: {name: vis_name, publish:publish, detail:_visual_det, vid:vid},
				dataType:'json',
				success: function(json) {
					$('#loading').removeClass('active');
					if (json.is_error == true) {
						$('#popup .modal-title').html('Error !!!');
						$('#popup .modal-text').html('<p>'+json.data+'</p>');
						$('#popup').addClass('active');
					} else {
						window.location = json.redirect;
					}

				},
				error: function() {
					$('#loading').removeClass('active');
					$('#popup .modal-title').html("Error !!!");
					$('#popup .modal-text').html('<p>Ada Kesalahan Sistem.</p>');
					$('#popup').addClass('active');
				}
			});
		}
	}

	updateVisual = function(res_id) {
		var vis_name = $("#visual_name").val();
		var publish = $('input[name=viszer_publishstate]:radio:checked').val();

		//get all col_id
		var _visual = $('input[name=viszer_part]:radio');
		var flag_error = 0;
		var total = 0;

		var _visual_det = [];

		_visual.each(function() {
			var _d_id = $( this ).attr("id");
			var _d_palid = $( this ).attr("selpalid");
			var _d_colid = $( this ).attr("selcolid");

			if (_d_colid == "") {
				flag_error += 1;
			}

			var _v_detail = {id:_d_id, pal_id:_d_palid, col_id:_d_colid};

			_visual_det.push(_v_detail);
			total += 1;
		});

		if (vis_name == "") {
			$('#popup .modal-title').html("Error !!!");
			$('#popup .modal-text').html('<p>Masukan Nama Tema</p>');
			$('#popup').addClass('active');
		} else if (publish != 0 && publish != 1) {
			$('#popup .modal-title').html("Error !!!");
			$('#popup .modal-text').html('<p>Pilih Publish / Unpublish</p>');
			$('#popup').addClass('active');
		} else if (flag_error == total) {
			$('#popup .modal-title').html("Error !!!");
			$('#popup .modal-text').html('<p>Pilih warna minimum 1</p>');
			$('#popup').addClass('active');
		} else {

			$('#loading').addClass('active');

			$.ajax({
				type: "post",
				url: '/visualize/update_visualize',
				cache: false,
				data: {name: vis_name, publish:publish, detail:_visual_det, rid:res_id},
				dataType:'json',
				success: function(json) {
					$('#loading').removeClass('active');
					if (json.is_error == true) {
						$('#popup .modal-title').html('Error !!!');
						$('#popup .modal-text').html('<p>'+json.data+'</p>');
						$('#popup').addClass('active');
					} else {
						window.location = json.redirect;
					}

				},
				error: function() {
					$('#loading').removeClass('active');
					$('#popup .modal-title').html("Error !!!");
					$('#popup .modal-text').html('<p>Ada Kesalahan Sistem.</p>');
					$('#popup').addClass('active');
				}
			});
		}
	}

}


visualizeview = function()
{
    var la_w = $(".la_s").width(),
        la_h = $(".la_s").height(),
        part = 'a',
        defcol = 0,
        col = 0;

	$("img.la_s").load(function(){
	  la_h = $(this).height();
	  setHeightLa (la_h);
	});

	setHeightLa = function(la_h) {
		$('.viszer_la svg').each(function(){
			$(this).width("100%");
			$(this).height(la_h);
			$(this).css("width","100%");
			$(this).css("height",la_h);
		});

	}

	$('.viszer_la svg').each(function(){
		$(this).width(la_w);
		$(this).height(la_h);
	});

    $('.viszer_la').each(function(){
        defcol = $(this).attr('defcol');
        $(this).find('path').css({ fill: defcol });
        $(this).find('polygon').css({ fill: defcol });
		$(this).find('rect').css({ fill: defcol });
    });

    visualizer_resize = function()
    {
        setTimeout(
          function()
          {
            la_w = $(".la_s").width();
            la_h = $(".la_s").height();
            $('.viszer_la svg').each(function(){
                $(this).width(la_w);
                $(this).height(la_h);
            });
          }, 100)
    }
    $('.flscrnbtn').click(function(){visualizer_resize();});
    window.addEventListener("resize", function() {
        visualizer_resize();
    }, false);
}


disapinit = function()
{
    var disaph = $(".disap").height();
    $(".disap").height(disaph);

    disap = function()
    {
        if($(".disap").hasClass("active")==false)
        {
            $(".disap").height(0);
        }else
        {
            $(".disap").height(disaph);
        }
    }
}

likebox = function(_from,_id){
	$('#loading').addClass('active');

	$.ajax({
		type: "post",
		url: '/likebox/send',
		cache: false,
		data: {_from: _from, _id:_id},
		dataType:'json',
		success: function(json) {
			$('#loading').removeClass('active');
			if (json.is_error == true) {
				$('#popup .modal-title').html(json.data);
				if (json.data == "Silahkan masuk terlebih dahulu untuk menambahkan ke Kotak Favorit Anda.") $('#popup .modal-text').html('<p><button class="btn" type="button" onclick="location.href=\'/login\'">Ke Halaman Login</button></p>');
				else $('#popup .modal-text').html('');
				$('#popup').addClass('active');
			} else {
				$(".savelikebox").addClass("active");
				$(".savelikebox").addClass("removelikebox");
				$(".savelikebox").removeClass("savelikebox");
				$('#popup .modal-title').html("Sukses");
				$('#popup .modal-text').html('<p>Simpan ke kotak favorit.</p>');
				$('#popup').addClass('active');
				$('.coltrigger[colid="'+_id+'"]').attr("colexist","1");

				if (_from == "custom_color" || _from == "paint_calc") {
					$(".removelikebox").data("id",_id);
				}
			}

		},
		error: function() {
			$('#loading').removeClass('active');
			$('#popup .modal-title').html("Error !!!");
			$('#popup .modal-text').html('<p>Ada Kesalahan Sistem.</p>');
			$('#popup').addClass('active');
		}
	});
}

likebox_remove = function(_from,_id) {
	$('#loading').addClass('active');

	$.ajax({
		type: "post",
		url: '/likebox/remove',
		cache: false,
		data: {_from: _from, _id:_id},
		dataType:'json',
		success: function(json) {
			$('#loading').removeClass('active');
			if (json.is_error == true) {
				$('#popup .modal-title').html("Error !!!");
				if (json.data == "Silahkan masuk terlebih dahulu untuk mengurangi Kotak Favorit Anda.") {
					$('#popup .modal-text').html('<p>'+ json.data +'</p><p><button class="btn" type="button" onclick="location.href=\'/login\'">Ke Halaman Login</button></p>');
				}
				else $('#popup .modal-text').html('<p>'+ json.data +'</p>');
				$('#popup').addClass('active');
			} else {
				$(".removelikebox").removeClass("active");
				$(".removelikebox").addClass("savelikebox");
				$(".removelikebox").removeClass("removelikebox");
				$('#popup .modal-title').html("Sukses");
				$('#popup .modal-text').html('<p>Mengurangi dari Kotak Favorit.</p>');
				$('#popup').addClass('active');
				$('.coltrigger[colid="'+_id+'"]').attr("colexist","0");
			}

		},
		error: function() {
			$('#loading').removeClass('active');
			$('#popup .modal-title').html("Error !!!");
			$('#popup .modal-text').html('<p>Ada Kesalahan Sistem.</p>');
			$('#popup').addClass('active');
		}
	});
}

likebox_remove_inlikebox = function(_from,_id) {
	$('#loading').addClass('active');

	$.ajax({
		type: "post",
		url: '/likebox/remove',
		cache: false,
		data: {_from: _from, _id:_id},
		dataType:'json',
		success: function(json) {
			$('#loading').removeClass('active');
			if (json.is_error == true) {
				$('#popup .modal-title').html("Error !!!");
				if (json.data == "Silahkan masuk terlebih dahulu untuk mengurangi Kotak Favorit Anda.") $('#popup .modal-text').html('<p>'+ json.data +'</p><p><button class="btn" type="button" onclick="location.href=\'/login\'">Ke Halaman Login</button></p>');
				else $('#popup .modal-text').html('<p>'+ json.data +'</p>');
				$('#popup').addClass('active');
			} else {
				$('.clearable_sp').removeClass("active");
				if (_from == "paint_calc") {
					$(".targetcalcpop").removeClass("active");
					$(".paintcalc[data-id='"+_id+"']").remove();
				} else {
					$(".targetcolpop").removeClass("active");
					if (_from == "color") $(".coltrigger[coltype='2'][colid='"+_id+"']").remove();
					else $(".coltrigger[coltype='6'][colid='"+_id+"']").remove();
				}

				$('#popup .modal-title').html("Sukses");
				$('#popup .modal-text').html('<p>Mengurangi dari Kotak Favorit.</p>');
				$('#popup').addClass('active');
			}

		},
		error: function() {
			$('#loading').removeClass('active');
			$('#popup .modal-title').html("Error !!!");
			$('#popup .modal-text').html('<p>Ada Kesalahan Sistem.</p>');
			$('#popup').addClass('active');
		}
	});
}

var $grid = $('.griddscontent').masonry({
    columnWidth: '.grid-sizer',
    gutter: '.gutter-sizer',
    itemSelector: '.griddsitem',
    isFitWidth: true
});

$(document).ready(function (){
    init();

    $(".scrollbarcust").customScrollbar({updateOnWindowResize: true});

    var reinit = function() {
        $grid.masonry()
    };

    setTimeout(reinit,500);

    window.addEventListener("resize", function() {
        reinit();
    }, false);

});
