$(document).ready({
  function initMap(){
    // Create a map project, specify DOM element for display
    var map = new google.maps.Map(document.getElementById("Map"), {
      center: {lat: -34.397, lng: 150.644},
      scrollwheel: false,
      zoom: 10
    })
  }
})
