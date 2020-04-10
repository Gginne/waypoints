navigator.geolocation.getCurrentPosition(function(pos){

  const scene = document.querySelector('a-scene');
  const set_loc = document.querySelector("#set-location");

  set_loc.addEventListener("click", function(){

    let latitude = pos.coords.latitude
    let longitude = pos.coords.longitude
  
    let marker = document.createElement('a-link');
    marker.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    marker.setAttribute('title', `here\n lat:${latitude} long:${longitude}`);
    marker.setAttribute('scale', '15 15 15');
    marker.setAttribute('animation-mixer', '');
    
    marker.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
    });
  
    scene.appendChild(marker);
    console.log(marker)
   
  })

})


