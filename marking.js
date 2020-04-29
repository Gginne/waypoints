
  let scene = document.querySelector('a-scene');
  const set_loc = document.querySelector("#set-location");

  navigator.geolocation.getCurrentPosition(function(pos){

    set_loc.addEventListener("click", function(){

      const latitude = pos.coords.latitude
      const longitude = pos.coords.longitude

      db.collection('Locations').add({
        name: prompt("New Location Name:"),
        coordinates: new firebase.firestore.GeoPoint(latitude, longitude)
      })
      
    })
   
  })
 