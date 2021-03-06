async function loadPlaces(position) {
    const params = {
        radius: 200,    // search places not farther than this value (in meters)
        clientId: 'XQ3Y2UC3YSXJS2KEM0XB1R4ZD3MTLPLQN01OLV15KTUQLOUQ',
        clientSecret: 'TFE5C0YU4VEOHAYTYNQQCYUBIRPCANFVIK1NKT4ERCBOQKTT',
        version: '20300101',    // foursquare versioning, required but unuseful for this demo
    };

    // CORS Proxy to avoid CORS problems
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';

    // Foursquare API (limit param: number of maximum places to fetch)
    const endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
        &ll=${position.latitude},${position.longitude}
        &radius=${params.radius}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=10
        &v=${params.version}`;

    
    const req = await fetch(endpoint)
    const resp = await req.json()
    const data = await resp.response.venues
    return data;

};


window.onload = () => {
    const scene = document.querySelector('a-scene');
    
    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        
        // than use it to load from remote APIs some places nearby
        loadPlaces(position.coords)
            .then((places) => {
                places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;

                    // Add place tage name & coordinates
                    const marker = new Marker(place.name, latitude, longitude)
                    const tag = marker.render();

                    tag.addEventListener('loaded', () => {
                        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                    });

                    scene.appendChild(tag);
                    
                    
                });
            })

            db.collection('Locations').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
        
                    const latitude = doc.data().coordinates.Pc;
                    const longitude = doc.data().coordinates.Vc;
        
                    // Add place tag name & coordinates
                    const marker = new Marker(doc.data().name, latitude, longitude)
                    const tag = marker.render();

                    tag.addEventListener('loaded', () => {
                        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                    });
        
                    scene.appendChild(tag);
                  
                });
            })
        
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );

    
};


