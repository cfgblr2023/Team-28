import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [initialPoint, setInitialPoint] = useState(null);
  const [destinationPoint, setDestinationPoint] = useState(null);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    if (!initialPoint) {
      setInitialPoint({ latitude: lat, longitude: lng });
    } else if (initialPoint && !destinationPoint) {
      setDestinationPoint({ latitude: lat, longitude: lng });
    } else {
      setInitialPoint({ latitude: lat, longitude: lng });
      setDestinationPoint(null);
    }
  };

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <div className="map-container">
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <MapEvents />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {initialPoint && <Marker position={[initialPoint.latitude, initialPoint.longitude]} />}
        {destinationPoint && <Marker position={[destinationPoint.latitude, destinationPoint.longitude]} />}
        {initialPoint && destinationPoint && (
          <Polyline positions={[
            [initialPoint.latitude, initialPoint.longitude],
            [destinationPoint.latitude, destinationPoint.longitude],
          ]} color="red" />
        )}
      </MapContainer>
      <div>
        Initial: {initialPoint ? `${initialPoint.latitude}, ${initialPoint.longitude}` : ''}
        <br />
        Destination: {destinationPoint ? `${destinationPoint.latitude}, ${destinationPoint.longitude}` : ''}
      </div>
    </div>
  );
};

export default MapComponent;
