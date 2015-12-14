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

  var youCar = false;

  $('button.menu').click(function(){
    if ($(this).attr('data-value') == "false") {
      $(this).attr('data-value', "true")
    } else {
      $(this).attr('data-value', "false")
    }
  });

  $('button#heading').click(function(){
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/incidents/new.json",
      data: { you_car: $('#you-car').attr('data-value'),
              you_bike: $('#you-bike').attr('data-value'),
              you_pedestrian: $('#you-pedestrian').attr('data-value'),
              them_car: $('#them-car').attr('data-value'),
              them_bike: $('#them-bike').attr('data-value'),
              them_pedestrian: $('#them-pedestrian').attr('data-value'),
              them_road_hazard: $('#them-road-hazard').attr('data-value')
            },
      error: function() { alert("Please try again!") },
      success: function(data){
        var marker = new google.maps.MarkerImage('/assets/transparent.png',
                                          new google.maps.Size(16, 16),
                                          new google.maps.Point(0, 0),
                                          new google.maps.Point(8, 8));
        console.log(data)
        var dataPoints = [];
        var markers = [];
        for (var i = 0; i < data.length; i ++) {
          var latitude = parseFloat(data[i].latitude);
          var longitude = parseFloat(data[i].longitude);
          dataPoints.push(new google.maps.LatLng(latitude, longitude));
          var invisibleMarker = new google.maps.Marker({
                        position: {lat: latitude, lng: longitude},
                        map: map,
                        icon: marker
          })
          var time = data[i].reported_at.split("T");
          var formattedTime = time[1].split(":");
          var contentString = "<div id='heading'><p><strong>" + data[i].you +
                              "</strong> vs <strong>" + data[i].them +
                              "</strong></p></div><div id='inner'><p>" +
                              data[i].incident_type + "</p><p>" +
                              data[i].reported_on + " " +
                              formattedTime[0] + ":" + formattedTime[1] +
                              "</p></div>"
          attachInfowindow(invisibleMarker, contentString);
        }
        function attachInfowindow(marker, contentString) {
          var infowindow = new google.maps.InfoWindow({
            content: contentString
          })
          marker.addListener('mouseover', function(){
            infowindow.open(marker.get('map'), marker);
          })
          marker.addListener('mouseout', function(){
            infowindow.close(marker.get('map'), marker);
          })
        }
        heatmap.setMap(null);
        heatmap = new google.maps.visualization.HeatmapLayer({
          data: dataPoints,
          map: map
        });
        function toggleHeatmap() {
          heatmap.setMap(heatmap.getMap() ? null : map);
        };
        console.log(heatmap);
        console.log(dataPoints);
        console.log(markers);
      }
    })

  })

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
          marker =  new google.maps.Marker({
                    position: coordinates,
                    map: map,
                    icon: bikeImage,
                    draggable: true
                  })
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

  $('#incident_you').focus(function() {
    $('#map-for-mapping').addClass('invisible');
    $('#incident-details').removeClass('invisible');
    $('#submit-button input').removeClass('invisible');
  });
  $('#incident_them').focus(function() {
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
                          "? If not, please find your location on map</p>");
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
