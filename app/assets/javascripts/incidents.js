
$(document).on('ready', function(){

  $('form').submit(function(event){
    console.log("submitting!");
    $('.modal').modal('hide')
    event.preventDefault;
  })

  $('#incident_location').on('keyup',function () {
      var searchValue = $(this).val();
      setTimeout(function(){
          if(searchValue == $('#incident_location').val() && searchValue != null && searchValue != "") {
            console.log("geocode");
              geocodeAddress(new google.maps.Geocoder(), map);
            }

      },300);
  });
  // var latLng = new google.maps.LatLng(49.21, -123.05);

  // var LatLngBounds = new google.maps.Circle({center: latLng, radius: 10000}).getBounds();
  // var LatLngBounds = ({49.29, -122.78}, {49.12, -123.19});
// NE, SW {lat: 49.29, lng: -122.78}|{lat: 49.12, lng: -123.19}
  // public LatLngBounds({49.12, -123.19}, {49.29, -122.78});
  // var latLng1 = new google.maps.LatLng(49.12, -123.19);
  // var latLng2 = new google.maps.LatLng(49.12, -123.19);
  // var LatLngBounds = builder(latLng1, latLng2);
  // public static LatLngBounds.Builder builder(latLng1, latLng2);
  function geocodeAddress(geocoder, resultsMap) {
  var address = $('#incident_location').val();
  geocoder.geocode({address: address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      console.log("results")
      var reader = results[0].formatted_address.split(", ");
      console.log(results[0].geometry.location.lat()); // RETURNS LAT
      console.log(reader[0]);
      $('#location p').replaceWith("<p>Did you mean: " + reader[0] + "?" + 'No'.link('#') + "</p>");

      // map.set('styles', [
      //
      // ])
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
