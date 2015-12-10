$(document).on('ready', function() {
  var incidentLatLng;

  $('.modal').modal('show').fadeIn();

  $('form').submit(function(event) {
    console.log("submitting!");
    $('.modal').modal('hide')
    event.preventDefault;
  });

  $('#pin-on-map').click(function(event) {
    var bikeImage = new google.maps.MarkerImage('/assets/bike.png',
                                      new google.maps.Size(32, 35),
                                      new google.maps.Point(0, 0),
                                      new google.maps.Point(32 / 2, 35),
                                      new google.maps.Size(32, 35));
    event.preventDefault();
    $('#location p').remove();
    $('#map-for-mapping').toggleClass('invisible');
    $('#incident-details').toggleClass('invisible');
    $('#submit-button').toggleClass('invisible');
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
        } else {
          marker =  new google.maps.Marker({
                    position: coordinates,
                    map: map,
                    icon: bikeImage,
                    draggable: true,
                    infowindow: "abc"
                  })
        incidentLatLng = coordinates;
        markers.push(marker);
        geocodeLatLng(geocoder, map, infowindow);
        }
        google.maps.event.addListener(marker, 'dragend', function(event) {
          console.log(event.latLng.lat());
          incidentLatLng = coordinates;
          geocodeLatLng(geocoder, map, infowindow);
        });
      }, 200);
    });
    google.maps.event.addListener(map, 'dblclick', function(event) {
        clearTimeout(update_timeout);
    });

  });

  $('#incident_you').focus(function() {
    console.log('away');
  });

  $('.sidebar').hover(function() {
    $(this).toggleClass("wide");
  });

  $('#incident_location').on('keyup',function() {
    var searchValue = $(this).val();
    setTimeout(function(){
      if(searchValue == $('#incident_location').val()
                          && searchValue != null
                          && searchValue != "") {
        console.log("geocode");
        geocodeAddress(new google.maps.Geocoder(), map);
      }
    },300);
    function geocodeAddress(geocoder, resultsMap) {
      var address = $('#incident_location').val();
      geocoder.geocode({address: address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
        // console.log("results")
        // console.log(geolocate());
          var reader = results[0].formatted_address.split(", ");
          console.log(results[0].geometry.location.lat()); // RETURNS LAT
          console.log(reader[0]);
          $('#location p').replaceWith("<p>Did you mean " + reader[0] + "? If not, please......"+ "NO".link("#")+"</p>");
          $('#location p').on("click", "a", function(event){
            console.log('no clicked');
            event.preventDefault();
            $('#pin-on-map').click();
          })
        } else {
          alert("Not okay!");
          // alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  });

  function geocodeLatLng(geocoder, map, infowindow) {
    var latlngStr = incidentLatLng.split(',', 2);
    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          map.setZoom(11);
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          infowindow.setContent(results[1].formatted_address);
          infowindow.open(map, marker);
          $('#incident_location').val(results[1].formatted_address);
          console.log(results[1].formatted_address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

            function geolocate() {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                  var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  };
                  var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                  });
                  // console.log((circle.getBounds()));
                  console.log("circle bounds " + circle.getBounds())
                  return (circle.getBounds());
                });
              }

            }
})
