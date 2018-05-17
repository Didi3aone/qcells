// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
	  // Logged into your app and Facebook.
		// console.log('Connected.');
	  
	} else if (response.status === 'not_authorized') {
	  // The person is logged into Facebook, but not your app.

	} else {
	  // The person is not logged into Facebook, so we're not sure if
	  // they are logged into this app or not.
	  // console.log('Please log into Facebook.');
	}
}

window.fbAsyncInit = function() {
	FB.init({
	  appId      : '596785490489621',
	  xfbml      : true,
	  oauth   : true,
	  status  : true, // check login status
	  cookie  : true, // enable cookies to allow the server to access the session
	  version    : 'v2.5'
	});
	
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
};

function daftar () {
	FB.api('/me', {fields: 'email,name'},  function(response_me) {
		if (response_me && !response_me.error) {
			$.ajax({
				url  : '/facebook/fb_login',
				data : {"data" : response_me},
				type : 'POST',
				success : function(data){
					var obj = $.parseJSON(data);
					if( obj.is_error === true ){
						//show pop up
						$('#popup .modal-title').html("Error !!!");
						$('#popup .modal-text').html('<p>'+obj.data+'</p>');
						$('#popup').addClass('active');
					} else {
						window.location = '/account/likebox';
					}
				},
			});
		}
	});
}

function fb_login(){
	FB.login(function(response) {

		// statusChangeCallback(response);
		
		if(response.status === 'connected'){

			daftar();

		} else {
			
		}
	}, {
		scope: 'email,public_profile'
	});
}

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));