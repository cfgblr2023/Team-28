import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MarkerIcon = () => {
  useEffect(() => {
    // Create a map instance and specify the container div
    const map = L.map('map').setView([51.505, -0.09], 13);

    // Create a tile layer with a map provider (e.g., OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors',
    }).addTo(map);

    // Define the coordinates for the marker
    const markerCoordinates = [51.505, -0.09];

    // Create a custom icon for the marker
    const circleIcon = L.divIcon({
      className: 'circle-icon',
      iconSize: [12, 12],
    });

    // Create a marker with the custom icon and add it to the map
    const marker = L.marker(markerCoordinates, { icon: circleIcon }).addTo(map);

    // Bind a popup to the marker
    marker.bindPopup('Highlighted Point').openPopup();
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default MarkerIcon;