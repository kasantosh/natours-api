const locations = JSON.parse(document.getElementById('map').dataset.locations);

console.log(locations);

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FudG9zaDM4IiwiYSI6ImNraHhtbm81bjAzajYycm4wa3JmaWVtZHEifQ.q30dLnCdVomE4f_CJy8uEA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/santosh38/ckhxwhwxb190q19ps1stxmtne',
    scrollZoom: false
    // center: [-118.113491, 34.111745], //mapbox takes longitude first
    // zoom: 10,
    // interactive: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
    // create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // add marker
    new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
    }).setLngLat(loc.coordinates).addTo(map);

    // Add popup
    new mapboxgl.Popup({ offset: 30 }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`).addTo(map);

    // extend map bounds to include current location
    bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
        padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100
    }
});
