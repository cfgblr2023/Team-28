import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaDirections } from "react-icons/fa";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { useTimerContext } from "../contexts/SessionContext";
const center = [51.505, -0.09]

const polyline = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
]

const multiPolyline = [
  [
    [51.5, -0.1],
    [51.5, -0.12],
    [51.52, -0.12],
  ],
  [
    [51.5, -0.05],
    [51.5, -0.06],
    [51.52, -0.06],
  ],
]

const polygon = [
  [51.515, -0.09],
  [51.52, -0.1],
  [51.52, -0.12],
]

const multiPolygon = [
  [
    [51.51, -0.12],
    [51.51, -0.13],
    [51.53, -0.13],
  ],
  [
    [51.51, -0.05],
    [51.51, -0.07],
    [51.53, -0.07],
  ],
]

const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
]

const fillBlueOptions = { fillColor: 'blue' }
const blackOptions = { color: 'black' }
const limeOptions = { color: 'lime' }
const purpleOptions = { color: 'purple' }
const redOptions = { color: 'red' }
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
  const circleIcon = L.divIcon({
      className: 'circle-icon',
      iconSize: [12, 12],
    });
  const navigation = useNavigate();
  const { setActiveSessionId } = useTimerContext();
  const [destinationPoint, setDestinationPoint] = useState(null);
  const [myLocation, setMyLocation] = useState({
    longitude: 82,
    latitude: 23.3,
  });
  const customIcon = L.icon({
  iconUrl: "location.png", // Replace with the path to your marker image
  iconSize: [32, 32], // Adjust the icon size as needed
});
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
  const createSession = async () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        fetch("http://localhost:5000/api/users/createSession/", {
          method: "POST",
          body: JSON.stringify({
            startTimestamp: new Date().toISOString(),
            endTimestamp: "",
            coordinatesCovered: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Session: new", data);
            // Reset the camera
            setActiveSessionId(data._id);
            navigation(`/session/${data._id}`);
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
          });
      },
      (error) => {
        console.error(error);
      }
    );
  };
  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);
  return (
    <div className="w-full h-full">
      <MapContainer
        center={[myLocation?.latitude,myLocation.longitude]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        // icon={customIcon}
      >
        <MapEvents />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[myLocation?.latitude,myLocation.longitude]}>
          <Popup>
            Your Location
          </Popup>
        </Marker>
        <Polyline pathOptions={limeOptions} positions={polyline} />
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
          {/* <Link to="/session/123"> */}
          <button
            onClick={async () => {
              await createSession();
            }}
            style={{ background: currentColor, borderRadius: "50%" }}
            className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <FaDirections />
          </button>
          {/* </Link> */}
        </TooltipComponent>
      </div>
    </div>
  );
};

export default MapComponent;
