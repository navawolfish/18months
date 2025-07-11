// script.js

// Set access token
mapboxgl.accessToken = 'pk.eyJ1IjoibmF2YXdvbGZpc2giLCJhIjoiY21iOWxyczk5MHV1ZDJrcHQ5aW12YTZ2MCJ9.asecPSLeRToQBLK9UlzVwA';

// Initialize the map
const map = new mapboxgl.Map({
  container: 'map', // ID of the container
  style: 'mapbox://styles/navawolfish/cmbpc1sk7001o01rz8wiz4puf', // Map style
  center: [-79.3832, 43.6532], // [lng, lat] — Toronto
  zoom: 12
});

// Load external GeoJSON file
const geojsonURL = 'https://raw.githubusercontent.com/navawolfish/18months/refs/heads/main/our_map.geojson'
const subtypeToEmoji = {
  "house": "🏠",
  "park": "🌳",
  "baseball": "⚾️",
  "food": "🍽️",
  "pasta": "🍝",
  "taco": "🌮",
  "burrito": "🌯",
  "library": "📚",
  "jewish": "✡️",
  "pub": "🍺",
  "pool": "🎱",
  "pizza": "🍕",
  "grocery": "🍎",
  "coffee": "☕️",
  "date": "👩‍❤️‍💋‍👨",
  "pancakes": "🥞",
  "flowers": "💐",
  "Default": "📍" // fallback
};

fetch(geojsonURL)
  .then(response => response.json())
  .then(geojson => {
    geojson.features.forEach((feature) => {
      const type = feature.properties.type;
      const emoji = subtypeToEmoji[type] || subtypeToEmoji["Default"];

      const el = document.createElement('div'); // Creates the marker
      el.textContent = emoji;
      el.style.fontSize = '17px';
      el.style.textShadow = '1px 1px 2px black';

      const marker = new mapboxgl.Marker(el) // adds marker to map
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);


      // click popup
      const clickPopup = new mapboxgl.Popup({ // hover popup
        offset: 10,
        closeButton: true,
        closeOnClick: true
      })
        .setHTML(`<div><div class = "popup-emoji">${emoji}</div>
          <div class = "popuptitle">${feature.properties.name}</div>
          <div class = "inner-popup">${feature.properties.notes}</div>
        `);

      // hover popup (persistent)
      const hoverPopup = new mapboxgl.Popup({
        offset: 10,
        closeButton: false,
        closeOnClick: false
      }).setHTML(`<div class = "hover-title">${feature.properties.name}</div><div class = "click-more">Click for more!</div>`);

      // Hover events
      el.addEventListener('mouseenter', () => {
        if (!clickPopup.isOpen()) {
          hoverPopup.setLngLat(feature.geometry.coordinates).addTo(map);
        }
      });

      el.addEventListener('mouseleave', () => {
        if (!clickPopup.isOpen()) {
          hoverPopup.remove();
        }
      });

      // Click toggle
      el.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent bubbling
        if (clickPopup.isOpen()) {
          clickPopup.remove();
        } else {
          hoverPopup.remove(); // ensure hover popup goes away
          clickPopup.setLngLat(feature.geometry.coordinates).addTo(map);
        }
      });

      // Close click popup if clicking anywhere else on map
      map.on('click', () => {
        clickPopup.remove();
      });

    });
  })
  .catch(error => console.error('Error loading GeoJSON:', error));

// Add zoom and rotation controls
map.addControl(new mapboxgl.NavigationControl(), 'top-right');


// for blobs
document.querySelectorAll('.blob-purple').forEach(blob => {
  if(blob.nextElementSibling && blob.nextElementSibling.classList.contains('hide-text')) {
    blob.classList.add('has-hide-text-sibling');
  }
});