class Marker{
    constructor(name, lat, long){
        this.name = name;
        this.lat = lat;
        this.long = long;
    }

    render(){
        const placeText = document.createElement('a-link');
        placeText.setAttribute('gps-entity-place', `latitude: ${this.lat}; longitude: ${this.long};`);
        placeText.setAttribute('title', `${this.name}`);
        placeText.setAttribute('scale', '15 15 15');
        
        return placeText;
    }
}