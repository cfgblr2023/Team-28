import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import { FaDirections } from "react-icons/fa";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";

const Session = () => {
  const [initialPoint, setInitialPoint] = useState(null);
  const [destinationPoint, setDestinationPoint] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [location, setLocation] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);

  useEffect(() => {
    // Update the elapsed time every second
    const interval = setInterval(() => {
      if (startTime) {
        const currentDate = new Date();
        const elapsed = currentDate - startTime;
        setElapsedTime(elapsed);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startTime]);

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / 1000 / 3600) % 24);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const handleStartTimer = () => {
    const currentDate = new Date();
    setStartTime(currentDate);

    // Start the countdown
    setCountdown(
      setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - currentDate.getTime();
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        setCountdown(`${minutes}m ${seconds}s`);
      }, 1000)
    );
  };
  useEffect(() => {
    let interval;

    if (startTime && !endTime) {
      interval = setInterval(() => {
        const currentDate = new Date();
        const elapsed = currentDate - startTime;
        setElapsedTime(elapsed);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [startTime, endTime]);
  const handleEndTimer = () => {
    const currentDate = new Date();
    setEndTime(currentDate);

    // // Stop the countdown
    // clearInterval(countdown);
    // setCountdown(null);
  };

  useEffect(() => {
    // Fetch Location
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    };

    // Fetch location every 30 seconds
    const interval = setInterval(() => {
      fetchLocation();
    }, 30000);

    // Stop Timer and Clear Interval on component unmount
    return () => {
      const currentDate = new Date();
      setEndTime(currentDate);
      clearInterval(interval);
    };
  }, []);

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
  const getRotationDegrees = (time, maxTime) => {
    return (360 * time) / maxTime;
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
      </MapContainer>
      <div className="clock-container">
        <div className="clock-face border-2 border-black rounded-full relative">
          <div
            className="hand hour-hand bg-black absolute w-4 h-60 transform origin-bottom"
            style={{
              transform: `rotate(${getRotationDegrees(
                (elapsedTime / 1000 / 3600) % 12,
                12
              )}deg)`,
            }}
          ></div>
          <div
            className="hand minute-hand bg-black absolute w-3 h-80 transform origin-bottom"
            style={{
              transform: `rotate(${getRotationDegrees(
                (elapsedTime / 1000 / 60) % 60,
                60
              )}deg)`,
            }}
          ></div>
          <div
            className="hand second-hand bg-black absolute w-2 h-90 transform origin-bottom"
            style={{
              transform: `rotate(${getRotationDegrees(
                (elapsedTime / 1000) % 60,
                60
              )}deg)`,
            }}
          ></div>
          <div className="center-dot bg-black absolute w-12 h-12 rounded-full"></div>
        </div>
      </div>
      <div
        className="fixed bottom-4 left-0 right-0 flex justify-center"
        style={{ zIndex: 1000 }}
      >
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleStartTimer}
          disabled={startTime !== null}
        >
          {startTime ? "Timer Started" : "Start Timer"}
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={handleEndTimer}
          disabled={!startTime || endTime !== null}
        >
          {endTime ? "Timer Ended" : "End Timer"}
        </button>
      </div>
      {startTime && (
        <div
          className="fixed bottom-20 left-0 right-0 text-center"
          style={{ zIndex: 1000 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Elapsed Time</h2>
          <p className="text-3xl md:text-5xl font-bold">
            {formatTime(elapsedTime)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Session;
