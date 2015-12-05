$(document).on('ready', function(){

  $('#incident_location_1').on('keyup',function () {
      var searchValue = $(this).val();
      setTimeout(function(){
          if(searchValue == $('#incident_location_1').val() && searchValue != null && searchValue != "") {
            console.log("geocode");
              geocodeAddress(new google.maps.Geocoder(), map);
            }

      },300);
  });
// NE, SW {lat: 49.29, lng: -122.78}|{lat: 49.12, lng: -123.19}
  function geocodeAddress(geocoder, resultsMap) {
  var address = $('#incident_location_1').val();
  geocoder.geocode({address: address, bounds: LatLngBounds.build({lat: 49.12, lng:-123.19})|LatLngBounds.build({lat: 49.29, lng:-122.78})}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      console.log("Ok!");
      console.log(results);
      console.log(status);
      // resultsMap.setCenter(results[0].geometry.location);
      // var marker = new google.maps.Marker({
      //   map: resultsMap,
      //   position: results[0].geometry.location
      // });
    } else {
      alert("Not okay!");
      // alert('Geocode was not successful for the following reason: ' + status);
    }
    });
  }
})
