$(document).on('ready', function() {
  var incidentLatLng;
  var inputs = ["#incident_reported_on",
                "#incident_reported_at",
                "#incident_phone_email",
                "#incident_location",
                "#incident_license",
                "#incident_latitude",
                "#incident_longitude",
                "#incident_you",
                "#incident_them",
                "#incident_incident_type",
                "#incident_details"
              ];

  $('.modal').modal('show').fadeIn();

  $('.timepicker').timepicker();

  $('button.menu').click(function(){
    if ($(this).attr('data-value') == "false") {
      $(this).attr('data-value', "true")
    } else {
      $(this).attr('data-value', "false")
    }
  });

  $('.menu').click(function(event){
    $(this).toggleClass('blue');
    event.stopPropagation();
  })

  $('form').submit(function(event) {
    event.preventDefault;
    setTimeout(function(){
      for (var i = 0; i < inputs.length; i++) {
        $(inputs[i]).val("");
      }
    }, 0);
    $('.modal').modal('hide');
  });

  $('#pin-on-map').click(function(event) {
    var bikeImage = new google.maps.MarkerImage('/assets/bike.png',
                                      new google.maps.Size(32, 35),
                                      new google.maps.Point(0, 0),
                                      new google.maps.Point(32 / 2, 35),
                                      new google.maps.Size(32, 35));
    var carImage = new google.maps.MarkerImage('/assets/car.png',
                                      new google.maps.Size(32, 35),
                                      new google.maps.Point(0, 0),
                                      new google.maps.Point(32 / 2, 35),
                                      new google.maps.Size(32, 35));
    var pedestrianImage = new google.maps.MarkerImage('/assets/pedestrian.png',
                                      new google.maps.Size(32, 35),
                                      new google.maps.Point(0, 0),
                                      new google.maps.Point(32 / 2, 35),
                                      new google.maps.Size(32, 35));
    event.preventDefault();
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    $('#location p').remove();
    $('#map-for-mapping').removeClass('invisible');
    $('#incident-details').addClass('invisible');
    $('#submit-button input').addClass('invisible');
    map = new google.maps.Map(document.getElementById('map-for-mapping'), {
          center: {lat: 49.265, lng: -123.1},
          zoom: 14,
          minZoom: 14,
          maxZoom: 18
        });
    var update_timeout = null;
    var markers = [];
    google.maps.event.addListener(map, 'click', function(event) {
      update_timeout = setTimeout(function(){
        coordinates = { lat: event.latLng.lat(), lng: event.latLng.lng() }
        if (markers.length > 0) {
          marker.setPosition(coordinates);
          incidentLatLng = coordinates;
          geocodeLatLng(geocoder, map, infowindow);
          $('#incident_latitude').val(incidentLatLng.lat);
          $('#incident_longitude').val(incidentLatLng.lng);
        } else {
          if ($('input[name="incident[you]"]:checked', '#incident').val() === 'bike') {
          marker =  new google.maps.Marker({
                    position: coordinates,
                    map: map,
                    icon: bikeImage,
                    draggable: true
                  })
        } else if ($('input[name="incident[you]"]:checked', '#incident').val() === 'car') {
          marker =  new google.maps.Marker({
                    position: coordinates,
                    map: map,
                    icon: carImage,
                    draggable: true
                  })
        } else {
          marker =  new google.maps.Marker({
                    position: coordinates,
                    map: map,
                    icon: pedestrianImage,
                    draggable: true
                  })
        }
        incidentLatLng = coordinates;
        markers.push(marker);
        geocodeLatLng(geocoder, map, infowindow);
        $('#incident_latitude').val(incidentLatLng.lat);
        $('#incident_longitude').val(incidentLatLng.lng);
        }
        google.maps.event.addListener(marker, 'dragend', function(event) {
          incidentLatLng = coordinates;
          console.log(incidentLatLng.lat, incidentLatLng.lng);
          geocodeLatLng(geocoder, map, infowindow);
          $('#incident_latitude').val(incidentLatLng.lat);
          $('#incident_longitude').val(incidentLatLng.lng);
        });
      }, 200);
    });
    google.maps.event.addListener(map, 'dblclick', function(event) {
        clearTimeout(update_timeout);
    });

  });

  $('input[name="incident[you]"]').focus(function() {
    $('#map-for-mapping').addClass('invisible');
    $('#incident-details').removeClass('invisible');
    $('#submit-button input').removeClass('invisible');
  });
  $('input[name="incident[them]"]').focus(function() {
    $('#map-for-mapping').addClass('invisible');
    $('#incident-details').removeClass('invisible');
    $('#submit-button input').removeClass('invisible');
  });
  $('#incident_incident_type').focus(function() {
    $('#map-for-mapping').addClass('invisible');
    $('#incident-details').removeClass('invisible');
    $('#submit-button input').removeClass('invisible');
  });
  $('#incident_location').focus(function() {
    $('#map-for-mapping').addClass('invisible');
    $('#incident-details').removeClass('invisible');
    $('#submit-button input').removeClass('invisible');
  });
  $('#incident_license').focus(function() {
    $('#map-for-mapping').addClass('invisible');
    $('#incident-details').removeClass('invisible');
    $('#submit-button input').removeClass('invisible');
  });

  $('input#incident_incident_type').on('keypress', function(event) {
    var code = event.which;
    if (code === 13) {
      event.preventDefault();
    }
  })

  $('.sidebar').hover(function() {
    $(this).toggleClass("wide");
    setTimeout(function(){
      $('.float-right').toggleClass('invisible').fadeIn(500);
  }, 500)
  });


  $('#incident_location').on('keyup',function() {
    var searchValue = $(this).val();
    setTimeout(function(){
      if(searchValue == $('#incident_location').val()
                        && searchValue != null
                        && searchValue != "") {
        geocodeAddress(new google.maps.Geocoder(), map);
      }
    },300);
    function geocodeAddress(geocoder, resultsMap) {
      var address = $('#incident_location').val();
      geocoder.geocode({address: address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          var reader = results[0].formatted_address.split(", ");
          $('#location p').replaceWith("<p>Did you mean " + reader[0] +
            "? If not, please find your location on map or include your city</p>");
            $('#incident_latitude').val(results[0].geometry.location.lat());
            $('#incident_longitude').val(results[0].geometry.location.lng());
        }
      });
    }
  });

  function geocodeLatLng(geocoder, map, infowindow) {
    var latlng = {lat: incidentLatLng.lat, lng: incidentLatLng.lng};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          console.log(latlng);
          address = results[0].formatted_address.split(",");
          console.log(address[0]);
          infowindow.setContent(address[0]);
          infowindow.open(map, marker);
          $('#incident_location').val(address[0]);
        } else {
          window.alert('No results found');
        }
      }
    });
  }

})
