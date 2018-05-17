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
var _search_box;
var infoWindowContent = [];
var markerCluster;
var flag = false;
var infoWindow;
var infobox;

function initmaps () {
	_search_box = $("#search-box").data("search");
	google.maps.event.addDomListener(window, 'load', initialize());

}

function setlatlng (latitude,longitude) {
	_lat = latitude;
	_lng = longitude;
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

function deleteMarkers() {
  clearMarkers();
  data_markers = [];
}

function getData (search,callback) {
	markers = [];

	$.ajax({
		type: "post",
		url: "/pemasaran/get-data",
		cache: false,
		data: {search: search},
		dataType:'json',
		success: function(json) {
			if (json.datas.length > 0) {
				// $("#listname").html("Found "+ json.datas.length +" Stores : ");
				$(".storelist").empty();

				var no = 0;
                var prefix = 'http://';
                var prefix_2 = 'https://';
				$.each( json.datas, function( key, data ) {
					var _address = data.address.replace(/(?:\r\n|\r|\n)/g, '<br />');
					markers[no] = [data.latitude,data.longitude,data.type];
					infoWindowContent[no] = ['<div class="storeinfobox officeinfobox" id="addressfloat">'+
													'   <div class="storeinfoboxfull">'+
													'      <div class="storepic" itemprop="photo">'+
													'          <img src="' + ((data.store_photo) ? data.store_photo : "/img/ui/store-img-placeholder.png") + '" alt="' + data.name + '" />'+
													'      </div>'+
													'      <div class="storename storeclick" itemprop="name" onclick="javascript:storeclick(\''+data.latitude+'\',\''+data.longitude+'\',\''+data.phone+'\')">'+ data.name +'</div>'+
													'      <span class="storecont store-add" itemprop="address">'+ _address +'</span>'+
													'      <a'+((data.telephone) ? ' href="tel:'+data.telephone+'"' : "") +' class="storecont store-phone" itemprop="telephone"><i class="fa fa-phone"></i>'+ ((data.telephone) ? data.telephone : "-") +'</a>'+
													'      <a'+((data.handphone) ? ' href="tel:'+data.handphone+'"' : "") +' class="storecont store-handphone" itemprop="handphone"><i class="fa fa-mobile"></i>'+ ((data.handphone) ? data.handphone : "-") +'</a>'+
													'      <a'+((data.fax) ? ' href="tel:'+data.fax+'"' : "") +' class="storecont store-fax" itemprop="fax"><i class="fa fa-fax"></i>'+ ((data.fax) ? data.fax : "-") +'</a>'+
                                                    ((data.email) ? '   <a class="storecont store-email" itemprop="email" href="mailto:'+ data.email +'"><i class="fa fa-envelope"></i>'+ data.email +'</a>' : "") +
												    ((data.website) ? '   <a class="storecont store-website" itemprop="website" target="_blank" href="'+ ((data.website.substr(0, prefix.length) !== prefix || data.website.substr(0, prefix_2.length) !== prefix_2) ? prefix+data.website : data.website) +'"><i class="fa fa-globe"></i>'+ data.website +'</a>' : "") +
													'      <span class="storecont store-ophours"><i class="fa fa-clock-o"></i><time itemprop="openingHours" datetime="'+ ((data.opening_hour) ? data.opening_hour : "-") +'">'+ ((data.opening_hour) ? data.opening_hour : "-") +'</time></span>'+
													'   </div>'+
													'</div>'];

					if (search != "") {
						var elems = '<div class="store" itemscope itemtype="http://schema.org/LocalBusiness">' +
										'<div class="storelink">' +
											'<span class="storepic '+ ((data.type == 2) ? 'store-agent' : '') +'" itemprop="photo">' +
												'<img src="/img/ui/'+ ((data.type == 2) ? 'agent' : 'office') +'-img-placeholder.png" />' +
											'</span>' +
											'<span class="storeinfo">' +
												'<span class="storename" itemprop="name">'+ data.name +'</span>' +
												'<span class="storecont store-add" itemprop="address">'+ _address +'</span>' +
												'<span class="storecont store-phone" itemprop="telephone">T : '+ ((data.telephone) ? data.telephone : '-' )  +'</span>' +
												'<span class="storecont store-handphone" itemprop="handphone">H : '+  ((data.handphone) ? data.handphone : '-' ) +'</span>' +
												'<span class="storecont store-fax" itemprop="fax">F : '+ ((data.fax) ? data.fax : '-' )  +'</span>' +
												((data.email) ? '<span class="store-email" itemprop="email"><a href="mailto:'+ data.email +'">'+ data.email +'</a></span>' : "") +
                                                ((data.website) ? '   <span class="store-website" itemprop="website"><a target="_blank" href="'+ ((data.website.substr(0, prefix.length) !== prefix || data.website.substr(0, prefix_2.length) !== prefix_2) ? prefix+data.website : data.website) +'">'+ data.website +'</a></span>' : "") +
											'</span>' +
										'</div>' +
									'</div>';
						$(".storelist").append(elems);
					}

					no++;

				});
				if (json.datas.length > 4) {
					$(".scrollbarcust").customScrollbar({updateOnWindowResize: true});
				}

			} else {
				$(".storelist").empty();
				$(".scrollbarcust").customScrollbar({updateOnWindowResize: true});
			}
			callback(true);
		},
		error: function() {
            $('#loading').removeClass('active');
            $('#popup .modal-title').html("Error !!!");
            $('#popup .modal-text').html('<p>Ada Kesalahan Sistem.</p>');
            $('#popup').addClass('active');
		}
	});
}

function getsearchdatas () {
	deleteMarkers();

	//find lat long
	getData (_search_box,function(data){
		var bounds = new google.maps.LatLngBounds();
		var marker;

		// Loop through our array of markers & place each one on the map
		for( i = 0; i < markers.length; i++ ) {
			var position = new google.maps.LatLng(markers[i][0], markers[i][1]);
			// bounds.extend(position);

			if (markers[i][2] == 1) {
				//change icon
				icon = "/img/ui/pin_office.png";
			} else {
				icon = "/img/ui/agen_pin_small.png";
			}

			var marker = new google.maps.Marker({
				position: position,
				map: map,
				animation: google.maps.Animation.DROP,
				icon: icon,
			});

			// Allow each marker to have an info window
			google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {
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
			})(marker, i));

			data_markers.push(marker);
		}

	});
}

function initialize() {
	var myLatlng = new google.maps.LatLng("-1.7364578", "117.5134753");

	var mapOptions = {
		zoom: 5,
		center: myLatlng
	}

	var elem = document.getElementById('gmap_object');

	map = new google.maps.Map(elem, mapOptions);

	geocoder = new google.maps.Geocoder();

	infoWindow = new google.maps.InfoWindow();

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

	var latitude = "2.5471049";
	var longitude = "122.3035143";

	//set lat long
	setlatlng (latitude,longitude);

	getsearchdatas ();
}

function init_event () {
    $("#search-box").change(function(){
    	var search_box = $("#search-box").val();
    	_search_box = search_box;
    	getsearchdatas ();
    });

    $("#search-store").click(function(){
    	var search_box = $("#search-box").val();
    	_search_box = search_box;
    	getsearchdatas ();

    });

    $("#clear-btn").click(function (){
    	_search_box = "";
    	$("#search-box").val("");
    	getsearchdatas ();
    });
}

$(document).ready(function () {
    init_event ();
    initmaps();
});
