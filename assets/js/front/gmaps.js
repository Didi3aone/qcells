var geocoder;
var map;
var marker;
var markers = [];
var data_markers = [];
var distance;
var _lat;
var _lng;
var _lat_user;
var _lng_user;
var _search_by;
var infoWindowContent = [];
// var markerCluster;
var flag = false;
var infoWindow;
var infobox;
var search_flag = true;

function getData (latitude,longitude,callback) {
	$('.contloading').addClass('active');

	var search = $("#search-box").val();
	var search_by = $("#search-by").val();
	// var cust_color = (($('#cust_color').is(":checked")) ? 1 : 0);
	var cust_color = 0;
	var category = [];


	if ($('input[name="category[]"]:checked').length != 0) {
		$('input[name="category[]"]:checked').each( function () {
			category.push($(this).val());
		});
	}

	markers = [];

	markers[0] = [_lat_user,_lng_user,1];

	var zoom = map.getZoom();

	$.ajax({
			type: "post",
			url: "/store/get-data",
			cache: false,
			data: {lat_user: _lat_user, lng_user: _lng_user, lat: latitude, lng: longitude, distance: distance,cust_color:cust_color, search: search, search_by : search_by, category:category,zoom:zoom},
			dataType:'json',
			success: function(json) {
                $('.contloading').removeClass('active');

				if (search_by == 2 || search_by == 3) {
					if (search_flag == true) {
						if (json.latitude_moved != "" && json.longitude_moved != "") {
							var myLatlng = new google.maps.LatLng(json.latitude_moved, json.longitude_moved);
							setlatlng (json.latitude_moved,json.longitude_moved);
							map.setCenter(myLatlng);
						}
					}
				}

				if (json.datas.length > 0) {
					var no = 1;

					$.each( json.datas, function( key, data ) {
						if (data.count) {
							markers[no] = [data.coordinate.latitude,data.coordinate.longitude,data.count];
						} else {
							markers[no] = [data.latitude,data.longitude,1];
						}

						if (data.count) {
							infoWindowContent[no] = [""];
						} else {
							infoWindowContent[no] = ['<div class="storeinfobox" id="addressfloat">'+
													'   <div class="storeinfoboxleft">'+
													'      <div class="storepic" itemprop="photo">'+
													'          <img src="' + ((data.foto_toko_url) ? data.foto_toko_url : "/img/ui/store-img-placeholder.png") + '" alt="' + data.nama_customer + '" />'+
													'      </div>'+
													'      <div class="storename storeclick" itemprop="name" onclick="javascript:storeclick(\''+data.latitude+'\',\''+data.longitude+'\',\''+data.phone+'\')">'+ data.nama_customer +'</div>'+
													'      <span class="storecont store-add" itemprop="address">'+ ((data.alamat) ? data.alamat : data.alamat) +'</span>'+
													'      <a'+((data.phone) ? ' href="tel:'+data.phone+'"' : "") +' class="storecont store-phone" itemprop="telephone"><i class="fa fa-phone"></i>'+ ((data.phone) ? data.phone : "-") +'</a>'+
													'      <span class="storecont store-ophours"><i class="fa fa-clock-o"></i><time itemprop="openingHours" datetime="'+ ((data.opening_hour) ? data.opening_hour : "-") +'">'+ ((data.opening_hour) ? data.opening_hour : "-") +'</time></span>'+
													'   </div>'+
													'   <div class="storeinfoboxright">'+
													'      <a href="https://www.google.com/maps/dir/Current+Location/'+ data.latitude +','+data.longitude+'" class="btn navigate" target="_blank"></a><br/>'+
													'      <div class="store-dist"><span>'+ Number(parseFloat(data.user_distance).toFixed(2)) +'</span> KM</div>'+
													'      <div class="storepinrate rate_star_yellow rate-'+ Number(parseInt(data.rating_avianbrands)) +'">'+ Number(parseInt(data.rating_avianbrands)) +'</div>'+
													'      <div class="storepinrate rate_user_green rate-'+ Number(parseInt(data.user_rating_avg)) +'">'+ Number(parseInt(data.user_rating_avg).toFixed(2)) +'</div>'+
													'      <a href="/store/detail/'+ data.pretty_url +'" class="btn storedetail"></a>'+
													'   </div>'+
													'</div>'];
						}

						no++;

					});


				} else if(category.length === 0) {
                    if (search_by == 2 || search_by == 3) {
                        $('#popup .modal-title').html("Maaf");
                        if (search_by == 2) {
                            $('#popup .modal-text').html('<p>Nama Toko "'+ search +'" tidak di temukan.</p>');
                        } else if (search_by == 3) {
                            $('#popup .modal-text').html('<p>Toko yang menjual produk "'+ search +'" tidak di temukan.</p>');
                        } else {
                            $('#popup .modal-text').html('<p>Toko tidak di temukan.</p>');
                        }
                        $('#popup').addClass('active');
                    }
                } else{
                    $('#popup .modal-title').html("Maaf");
                    $('#popup .modal-text').html('<p>Toko yang menjual produk tersebut tidak dapat di temukan.</p>');
                    $('#popup').addClass('active');
                }

				callback(true);
			},
			error: function() {
				$('.contloading').removeClass('active');
				$('#popup .modal-title').html("Error !!!");
				$('#popup .modal-text').html('<p>Ada Kesalahan Sistem.</p>');
				$('#popup').addClass('active');
			}
		});
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < data_markers.length; i++) {
    data_markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  data_markers = [];
}

function setlatlng (latitude,longitude) {
	_lat = latitude;
	_lng = longitude;
}

function setlatlng_user (latitude,longitude) {
	_lat_user = latitude;
	_lng_user = longitude;
}

function initialize(latitude, longitude, zoom) {
		if (zoom === undefined) {
			zoom = 15;
		}

		var myLatlng = new google.maps.LatLng(latitude, longitude);
		var mapOptions;

		if (latitude == 0 && longitude == 0) {
			myLatlng = new google.maps.LatLng(-1.7364578, 117.5134753);
			mapOptions = {
				zoom: 5,
				center: myLatlng,
				maxZoom: 20,
			}
		} else {
			mapOptions = {
				zoom: zoom,
				center: myLatlng,
				maxZoom: 20,
			}
		}
		// console.log(myLatlng);

		var elem = document.getElementById('gmap_object');
		// console.log(elem);

		map = new google.maps.Map(elem, mapOptions);

		geocoder = new google.maps.Geocoder();

		infoWindow = new google.maps.InfoWindow();

		//set lat long
		setlatlng (latitude,longitude);

		// mcOptions = {styles: [{
			// height: 52,
			// url: "/img/ui/store_pin_53.png",
			// width: 53
		// },
		// {
			// height: 55,
			// url: "/img/ui/store_pin_56.png",
			// width: 56
		// },
		// {
			// height: 65,
			// url: "/img/ui/store_pin_66.png",
			// width: 66
		// },
		// {
			// height: 77,
			// url: "/img/ui/store_pin_78.png",
			// width: 78
		// },
		// {
			// height: 89,
			// url: "/img/ui/store_pin_90.png",
			// width: 90
		// }]}

		// markerCluster = new MarkerClusterer(map,markers,mcOptions);

		infobox = new InfoBox({
			 disableAutoPan: false,
			 maxWidth: 360,
			 pixelOffset: new google.maps.Size(-140, 0),
			 zIndex: null,
			 boxStyle: {
				background: "url('/img/ui/segitiga-store.png') 116px 0px no-repeat",
				opacity: 1,
				width: "365px"
			},
			closeBoxMargin: "20px 10px 2px 2px;",
			closeBoxURL: "/img/ui/close_store_button.png",
			infoBoxClearance: new google.maps.Size(1, 1)
		});

		google.maps.event.addListener(infobox, 'domready', function(){
			flag = true;
		});

		google.maps.event.addListener(infobox,'closeclick',function(){
			flag = false;
		});

		google.maps.event.addListener(map,'dragend',function(event) {
			if (flag == true) flag = false;
		});

		google.maps.event.addListener(map,'zoom_changed',function(event) {
			if (flag == true) flag = false;
			if(infobox){
				infobox.close();
			}
		});

		google.maps.event.addListener(map,'idle',function(event) {

			distance = setproximityfrommap();
			latitude = map.getCenter().lat();
			longitude = map.getCenter().lng();

			//set lat long
			setlatlng (latitude,longitude);

			search_flag = false;

			// if (_search_by != 2 && flag == false) {
			if (flag == false) {
				getsearchdatas ();
			}


		});

}

function getLocation(){
  if (navigator.geolocation){
	navigator.geolocation.getCurrentPosition(
		function(position) {
			_lat_user = position.coords.latitude;
			_lng_user = position.coords.longitude;

			google.maps.event.addDomListener(window, 'load', initialize(position.coords.latitude, position.coords.longitude));
		},
		function(error){
			google.maps.event.addDomListener(window, 'load', initialize(0, 0));
			switch(error.code)
				{
				case error.PERMISSION_DENIED:
					$('.contloading').removeClass('active');
					$('#popup .modal-title').html("Fitur pencarian toko membutuhkan lokasi Anda");
					$('#popup .modal-text').html('<p>Kami membutuhkan lokasi Anda untuk mencari lokasi toko yang terdekat dengan posisi Anda.</p>');
					$('#popup').addClass('active');
				  // alert("Please allow user location to help us get your location.");
				  break;
				case error.POSITION_UNAVAILABLE:
					$('.contloading').removeClass('active');
					$('#popup .modal-title').html("Error !!!");
					$('#popup .modal-text').html('<p>Posisi Anda tidak ditemukan.</p>');
					$('#popup').addClass('active');
				  // alert("Location information is unavailable.");
				  break;
				case error.TIMEOUT:
					$('.contloading').removeClass('active');
					$('#popup .modal-title').html("Error !!!");
					$('#popup .modal-text').html('<p>Posisi Anda tidak ditemukan.</p>');
					$('#popup').addClass('active');
				  // alert("The request to get user location timed out.");
				  break;
				case error.UNKNOWN_ERROR:
					$('.contloading').removeClass('active');
					$('#popup .modal-title').html("Error !!!");
					$('#popup .modal-text').html('<p>Pencarian sedang error. Coba sekali lagi.</p>');
					$('#popup').addClass('active');
				  // alert("An unknown error occurred.");
				  break;
				}
		}, { enableHighAccuracy: true,timeout : 5000 }
	);
  }
  else{x.innerHTML="Geolocation is not supported by this browser.";}
}

function moveToCurrentLocation(){
  if (navigator.geolocation){
	navigator.geolocation.getCurrentPosition(
		function(position) {
			_lat_user = position.coords.latitude;
			_lng_user = position.coords.longitude;

			var myLatlng = new google.maps.LatLng(_lat_user, _lng_user);
			setlatlng (_lat_user,_lng_user);
			map.setCenter(myLatlng);

			// console.log(_lat_user);
			// console.log(_lng_user);

			// google.maps.event.addDomListener(window, 'load', initialize(position.coords.latitude, position.coords.longitude));
		},
		function(error){
			// google.maps.event.addDomListener(window, 'load', initialize(-7.2754438, 112.6416439));
			switch(error.code)
				{
				case error.PERMISSION_DENIED:
					$('.contloading').removeClass('active');
					$('#popup .modal-title').html("Fitur pencarian toko membutuhkan lokasi Anda");
					$('#popup .modal-text').html('<p>Kami membutuhkan lokasi Anda untuk mencari lokasi toko yang terdekat dengan posisi Anda.</p>');
					$('#popup').addClass('active');
				  // alert("Please allow user location to help us get your location.");
				  break;
				case error.POSITION_UNAVAILABLE:
					$('.contloading').removeClass('active');
					$('#popup .modal-title').html("Error !!!");
					$('#popup .modal-text').html('<p>Posisi Anda tidak ditemukan.</p>');
					$('#popup').addClass('active');
				  // alert("Location information is unavailable.");
				  break;
				case error.TIMEOUT:
					$('.contloading').removeClass('active');
					$('#popup .modal-title').html("Error !!!");
					$('#popup .modal-text').html('<p>Posisi Anda tidak ditemukan.</p>');
					$('#popup').addClass('active');
				  // alert("The request to get user location timed out.");
				  break;
				case error.UNKNOWN_ERROR:
					$('.contloading').removeClass('active');
					$('#popup .modal-title').html("Error !!!");
					$('#popup .modal-text').html('<p>Pencarian sedang error. Coba sekali lagi.</p>');
					$('#popup').addClass('active');
				  // alert("An unknown error occurred.");
				  break;
				}
		}, { enableHighAccuracy: true,timeout : 5000 }
	);
  }
  else{x.innerHTML="Geolocation is not supported by this browser.";}
}

function clearClusters() {
	markerCluster.clearMarkers();
}

function isLocationFree(search) {
  for (var i = 0, l = lookup.length; i < l; i++) {
    if (lookup[i][0] === search[0] && lookup[i][1] === search[1]) {
      return false;
    }
  }
  return true;
}

function getsearchdatas () {
	deleteMarkers();
	// clearClusters();
	// console.log("here");
	//find lat long
	getData (_lat,_lng,function(data){
		var bounds = new google.maps.LatLngBounds();
		var marker;

		// console.log(markers.length);
		// Loop through our array of markers & place each one on the map
		for( i = 0; i < markers.length; i++ ) {

			var position = new google.maps.LatLng(markers[i][0], markers[i][1]);
			// bounds.extend(position);

			//change icon
			if(i == 0) { icon = "/img/ui/pin-my.png"; }
			else { icon = "/img/ui/pinbig.png"; }

			var _anchor;
			if (markers[i][2] > 1 && markers[i][2] <= 50) {
				icon = "/img/ui/store_pin_53.png";
				_anchor = new google.maps.Point(5, 32);
			} else if (markers[i][2] > 50 && markers[i][2] <= 99) {
				icon = "/img/ui/store_pin_56.png";
				_anchor = new google.maps.Point(5, 35);
			} else if (markers[i][2] > 99 && markers[i][2] <= 999) {
				icon = "/img/ui/store_pin_66.png";
				_anchor = new google.maps.Point(9, 40);
			} else if (markers[i][2] > 999 && markers[i][2] <= 9999) {
				icon = "/img/ui/store_pin_78.png";
				_anchor = new google.maps.Point(12, 45);
			} else if (markers[i][2] > 10000) {
				icon = "/img/ui/store_pin_90.png";
				_anchor = new google.maps.Point(15, 50);
			}

			var _label = "";

            var marker = new MarkerWithLabel({
                position: position,
                map: map,
                animation: google.maps.Animation.DROP,
                icon: icon,
                labelContent: _label,
                labelAnchor: _anchor,
            });


			// Allow each marker to have an info window
			google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {
					if (infoWindowContent[i][0] == "") {
						// map.fitBounds(this.marker.getBounds());
						map.panTo(this.getPosition());

						var zoom = map.getZoom();
						map.setZoom(zoom+2);
						// console.log(zoom);
					} else {

						infobox.setContent(infoWindowContent[i][0]);
						infobox.open(map, marker);

						if (marker.getAnimation() != null) {
							marker.setAnimation(null);
						} else {
							marker.setAnimation(google.maps.Animation.BOUNCE);
							setTimeout(function() {
									marker.setAnimation(null);
							}, 700);
						}
					}
				}
			})(marker, i));

			data_markers.push(marker);

		}
		// markerCluster.addMarkers(data_markers);

		$('.contloading').removeClass('active');

	});
}

function codeAddress(address,callback) {
	geocoder.geocode( { 'address': address}, function(results, status) {
	  switch(status)
		{
		case google.maps.GeocoderStatus.OK:
			map.setCenter(results[0].geometry.location);
			// marker.setPosition(results[0].geometry.location);
			// console.log("lat : " + results[0].geometry.location.lat());
			setlatlng (results[0].geometry.location.lat(),results[0].geometry.location.lng());
			callback(results[0].geometry.location.lat(),results[0].geometry.location.lng());
		  break;
		case google.maps.GeocoderStatus.ZERO_RESULTS:
			$('.contloading').removeClass('active');
			$('#popup .modal-title').html("Error !!!");
			$('#popup .modal-text').html('<p>Lokasi tidak di temukan</p>');
			$('#popup').addClass('active');
		  // alert("Location information is unavailable.");
		  break;
		case google.maps.GeocoderStatus.OVER_QUERY_LIMIT:
			$('.contloading').removeClass('active');
			$('#popup .modal-title').html("Error !!!");
			$('#popup .modal-text').html('<p>Limit pencarian sudah habis.</p>');
			$('#popup').addClass('active');
		  // alert("The request to get user location timed out.");
		  break;
		case google.maps.GeocoderStatus.REQUEST_DENIED:
			$('.contloading').removeClass('active');
			$('#popup .modal-title').html("Error !!!");
			$('#popup .modal-text').html('<p>Pencarian di tolak.</p>');
			$('#popup').addClass('active');
		  // alert("An unknown error occurred.");
		  break;
		case google.maps.GeocoderStatus.INVALID_REQUEST:
			$('.contloading').removeClass('active');
			$('#popup .modal-title').html("Error !!!");
			$('#popup .modal-text').html('<p>Pencarian tidak valid.</p>');
			$('#popup').addClass('active');
		  // alert("An unknown error occurred.");
		  break;
		case google.maps.GeocoderStatus.UNKNOWN_ERROR:
			$('.contloading').removeClass('active');
			$('#popup .modal-title').html("Error !!!");
			$('#popup .modal-text').html('<p>Pencarian sedang error. Coba sekali lagi.</p>');
			$('#popup').addClass('active');
		  // alert("An unknown error occurred.");
		  break;
		}
	});
}

function initmaps (_latitude,_longitude,_user_latitude,_user_longitude,search_by,zoom) {
	if (zoom === undefined) {
          zoom = 15;
    }

	if (_latitude == 0 && _longitude == 0) {
		getLocation();
	} else {
		setlatlng (_latitude,_longitude);
		setlatlng_user (_user_latitude,_user_longitude);
		_search_by = search_by;
		google.maps.event.addDomListener(window, 'load', initialize(_latitude, _longitude, zoom));
		// getsearchdatas ();
	}
}

function checked_function (id, checked , callback) {
	$("input[class='category_"+id+"']").prop('checked', checked);
	callback(true);
}


function load_checked() {
	$('input[name="category[]"]').each( function () {
		var _class = $(this).attr("class");
		if ($('.p_'+_class).prop('checked') == true && this.checked == false)
			$('.p_'+_class).prop('checked', false);
		if (this.checked == true) {
			var flag = true;
			$("input[class='"+_class+"']").each(
				function() {
					if (this.checked == false) {
						flag = false;
					}
				}
			);
			$('.p_'+_class).prop('checked', flag);
		}
	});
}

function storeclick(s_lat, s_lng, s_tel){
	//open pop up
	$('#popup .modal-title').html("Apa yang ingin Anda lakukan ?");
	$('#popup .modal-text').html('<a href="tel:'+ ((s_tel) ? s_tel : "0") +'" class="btn storetelbtn">Hubungi Toko ini</a> <a href="https://www.google.com/maps/dir/Current+Location/'+ s_lat +','+s_lng+'" class="btn opgoogbtn" target="_blank">Navigasi ke Toko ini</a>');
	$('#popup').addClass('active');
};

function setproximityfrommap() {
    // Get Gmap radius / proximity start
    // First, determine the map bounds
    var bounds = map.getBounds();

    var sw = bounds.getSouthWest();
	var ne = bounds.getNorthEast();
	var east = new google.maps.LatLng(0, ne.lng());
	var west = new google.maps.LatLng(0, sw.lng());
	var north = new google.maps.LatLng(ne.lat(), 0);
	var south = new google.maps.LatLng(sw.lat(), 0);
	var width = google.maps.geometry.spherical.computeDistanceBetween(east, west);
	var height = google.maps.geometry.spherical.computeDistanceBetween(north, south);

	var radius = (height/2) + ((width*width)/(8*height));

	return radius * 0.001;
}

$(document).ready(function () {
    var x = document.getElementById("gmap_object");

    var front_lat = $("#f_lat").val();
    var front_long = $("#f_long").val();
    var front_user_lat = $("#f_user_lat").val();
    var front_user_long = $("#f_user_long").val();
    var front_search_by = $("#f_search_by").val();
    var front_zoom = parseInt($("#f_zoom").val());

    initmaps(front_lat,front_long,front_user_lat, front_user_long,front_search_by,front_zoom);

    load_checked();

    $('input[name="parent_category[]"]').change (function(){
    	var id = $(this).val();
    	var checked = $(this).prop("checked");
    	checked_function (id, checked , function(data) {
    		if(infobox){
    			infobox.close();
    		}

    		getsearchdatas ();
    	});

    });

    $('input[name="category[]"]').click(
    	function() {
    		var _class = $(this).attr("class");
    		if ($('.p_'+_class).prop('checked') == true && this.checked == false)
    			$('.p_'+_class).prop('checked', false);
    		if (this.checked == true) {
    			var flag = true;
    			$("input[class='"+_class+"']").each(
    				function() {
    					if (this.checked == false) {
    						flag = false;
    					}
    				}
    			);
    			$('.p_'+_class).prop('checked', flag);
    		}

    		if(infobox){
    			infobox.close();
    		}

    		getsearchdatas ();
    	}
    );

    $("#cust_color").change(function(){
    	getsearchdatas ();
    });

    $("#search-store").click(function(){
    	var search_by = $("#search-by").val();
    	var search_box = $("#search-box").val();

    	if (search_box == "") {
    		$("#search-by").val("1");
    	} else {
    		if(infobox){
    			infobox.close();
    		}

    		_search_by = search_by;
    		if (search_by == 1) {
    			//search by location, get latitude longitude from address
    			codeAddress(search_box,function(lat,lng) {
    				getsearchdatas ();
    			});
    		} else {
    			search_flag = true;
    			getsearchdatas ();
    		}
    	}

    });

    $("#pin-location").click(function (){
    	// getLocation();
    	if(infobox){
    		infobox.close();
    	}

    	moveToCurrentLocation();
    });

    $("#clear-btn").click(function (){
    	if(infobox){
    		infobox.close();
    	}

    	_search_by = 1;
    	$("#search-box").val("");
    	$("#search-box").attr("placeholder","Masukan Nama Lokasi");
    	$("#search-by").val("1");
    	$("#premium").prop('checked', false);
    	$("#cust_color").prop('checked', false);
    	$('input[name="category[]"]').prop('checked', false);
    	$('input[name="parent_category[]"]').prop('checked', false);
    	getsearchdatas ();
    });

    $("#search-by").change (function(){
    	var val_searchby = $(this).val();
    	if (val_searchby == 1) {
    		$("#search-box").attr("placeholder","Masukan Nama Lokasi");
    	} else if (val_searchby == 2) {
    		$("#search-box").attr("placeholder","Masukan Nama Toko");
    	} else if (val_searchby == 3) {
    		$("#search-box").attr("placeholder","Masukan Nama Produk");
    	} else {
    		$("#search-box").attr("placeholder","Masukan Nama Lokasi");
    	}
    });

    $("#search-box").keyup(function(event){
    	if(event.keyCode == 13){
    		$("#search-store").click();
    	}
    });
});
