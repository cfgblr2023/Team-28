import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaDirections } from "react-icons/fa";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";

const MapComponent = () => {
  const [initialPoint, setInitialPoint] = useState(null);
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();
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
    <div className="w-full h-full">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <MapEvents />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {initialPoint && (
          <Marker position={[initialPoint.latitude, initialPoint.longitude]} />
        )}
        {destinationPoint && (
          <Marker
            position={[destinationPoint.latitude, destinationPoint.longitude]}
          />
        )}
        {initialPoint && destinationPoint && (
          <Polyline
            positions={[
              [initialPoint.latitude, initialPoint.longitude],
              [destinationPoint.latitude, destinationPoint.longitude],
            ]}
            color="red"
          />
        )}
      </MapContainer>
      <div className="fixed left-4 bottom-4" style={{ zIndex: "1000" }}>
        <TooltipComponent content="Settings" position="Top">
          <Link to="/session/123">
            <div
              // onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FaDirections />
            </div>
          </Link>
        </TooltipComponent>
      </div>
    </div>
  );
};

export default MapComponent;
