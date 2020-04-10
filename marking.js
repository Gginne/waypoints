const set_loc = document.querySelector('#set-location');
const scene = document.querySelector("a-scene");
window.onload = () => {
  
  return navigator.geolocation.getCurrentPosition(function(pos){
    logPlaces(pos)
  },
  (err) => console.error('Error in retrieving position', err),
  {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 27000,
  }
  
  )
  
};

  function logPlaces(pos) {
    var crd = pos.coords;
  
    set_loc.addEventListener("click", function(){
        const placeText = document.createElement('a-link');
        placeText.setAttribute('gps-entity-place', `latitude: ${crd.latitude}; longitude: ${crd.longitude};`);
        placeText.setAttribute('title', `here\n lat:${crd.latitude} long:${crd.longitude}`);
        placeText.setAttribute('scale', '15 15 15');
        
        placeText.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(placeText);
        console.log(placeText)
     
    })

  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  

