$(document).on('ready', function(){
  $('.modal').modal('show').fadeIn();

  $('form').submit(function(event){
    console.log("submitting!");
    $('.modal').modal('hide')
    event.preventDefault;
  })

  $('#pin-on-map').click(function(event){
    event.preventDefault;
    console.log(event);
    map.addListener('click', function(event) {
      alert(event.latLng);
    })
  })

  $('.sidebar').hover(function(){
    $(this).toggleClass("wide");
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
  function geocodeAddress(geocoder, resultsMap) {
  var address = $('#incident_location').val();
  geocoder.geocode({address: address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      console.log("results")
      var reader = results[0].formatted_address.split(", ");
      console.log(results[0].geometry.location.lat()); // RETURNS LAT
      console.log(reader[0]);
      $('#location p').replaceWith("<p>Did you mean: " + reader[0] + "?" + 'No'.link('#') + "</p>");
      $('#location p').on("click", "a", function(){
        console.log('no clicked');
        $('#pin-on-map').click();
        

      })

    } else {
      alert("Not okay!");
      // alert('Geocode was not successful for the following reason: ' + status);
    }
    });
  }

})
