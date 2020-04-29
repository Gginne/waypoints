
  let scene = document.querySelector('a-scene');
  const set_loc = document.querySelector("#set-location");

  navigator.geolocation.getCurrentPosition(function(pos){

    set_loc.addEventListener("click", function(){

      const latitude = pos.coords.latitude
      const longitude = pos.coords.longitude
    
      const marker = document.createElement('a-link');
      marker.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
      marker.setAttribute('title', `Here\n lat:${latitude} long:${longitude}`);
      marker.setAttribute('scale', '15 15 15');

      scene.appendChild(marker);

      db.collection('Locations').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          const latitude = doc.data().coordinates.Pc;
          const longitude = doc.data().coordinates.Vc;
          console.log(latitude, longitude)
        });
      })
    
    })
   
  })
