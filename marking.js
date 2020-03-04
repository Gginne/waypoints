const scene = document.querySelector("a-scene");

const set_loc = document.querySelector("#set-location")

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
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
  

  navigator.geolocation.getCurrentPosition(success, error, options);