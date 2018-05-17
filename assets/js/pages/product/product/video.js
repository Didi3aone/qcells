function form() {
    var form_id = $("#video-forms");

     $(form_id).validate({
        errorClass: 'invalid',
        errorElement: 'em',
        ignore: [],
        highlight: function(element) {
            $(element).parent().removeClass('state-success').addClass("state-error");
            $(element).removeClass('valid');
        },
        unhighlight: function(element) {
            $(element).parent().removeClass("state-error").addClass('state-success');
            $(element).addClass('valid');
        },
        // Rules for form validation
        rules: {},
        // Messages for form validation
        messages: {},

         // Ajax form submition.
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                dataType: 'json',
                // data: id:id
                beforeSend: function() {
                    $(form).find("button").attr('disabled', true);
                    $('.loading-box').css("display", "block");
                },
                success: function(data) {
                    if (data.is_error == true) swal("Error!", data.error_msg, "error");
                    location.reload();
                },
                error: function() {
                    swal("Error!", "Something Went wrong", "error");
                }
            });
        }
    });
}

$(document).ready(function() {
    form();
	/**
     * multiple add image
     */
    var id = 0;

    var rowNum = 0;
    function addRow() {
        rowNum ++;
		var row = '<div class="col-md-12 bordered" id="rowNum'+rowNum+'">' +
				'<div class="col-md-5"><input name="url[]" id="url-'+rowNum+'" type="text" data-id="'+ rowNum +'" class="form-control youtube" placeholder="URL" value="" /></div>' +
				'<div class="col-md-5 col-md-offset-1 text-center"><iframe id="view-'+rowNum+'" width="200" height="150" src="" frameborder="0" allowfullscreen></iframe></div>' +
				'<div class="col-md-1"><button type="button" name="remove-video" class="remove-video btn btn-warning btn-xs" data-id="'+ rowNum +'">Remove</button></div>'
			  '</div>';
        jQuery('#add-video').prepend(row);
        return rowNum;
    }

    function removeRow(rnum) {
        jQuery('#rowNum'+rnum).remove();
    }


    //button add to add image and show modal
    $(document).on("click","#btn-add-video",function() {
        addRow();
    });

    //button remove image in front
    $(document).on("click",".remove-video",function(e){
        e.stopPropagation();
        e.preventDefault();
        var getid = $(this).data("id");
        removeRow(getid);
    });
	
	$(document).on("change",".youtube",function(e){
        e.stopPropagation();
        e.preventDefault();
        var value = $(this).val();
		console.log(value);
        value = value.replace("/watch?v=","/embed/");
		var id = $(this).data("id");
		$(this).val(value);
        $("#view-"+id).attr("src",value); 
    });
});

$(document).on("click", ".deleteimage", function(e) {
    e.stopPropagation();
    e.preventDefault();
    var url = '/manager/product/products/delete_video';
    var data_id = $(this).attr("data-id");
    
    title = 'Delete Confirmation';
    content = 'Do You Really Want to Delete This ?';
    
    swal({
        title: title,
        text: content,
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "NO",
        confirmButtonText: "YES",
    }).then(function (text) {

        //show loading.
        $('.loading').css("display", "block");

        //ajax post.
        $.ajax({
            type: "POST",
            url: url,
            cache: false,
            dataType: 'json',
            data : {
                id:data_id
            },
            success: function(data) {
                if (data.is_error == true) swal("Error!", data.error_msg, "error");
                location.reload();
            },
            error: function() {
                swal("Error!", "Something Went wrong", "error");
            }
        });
    }).catch(swal.noop);
});