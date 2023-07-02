import React, { createContext, useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const [activeSessionId, setActiveSessionId] = useState("");
  

  useEffect(() => {
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


  const startTimer = async() => {
    const currentDate = new Date();
    setStartTime(currentDate);
  };

  const endTimer = () => {
    const currentDate = new Date();
    setEndTime(currentDate);
  };

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / 1000 / 3600) % 24);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const timerContextValue = {
    startTime,
    endTime,
    elapsedTime,
    startTimer,
    endTimer,
    formatTime,
    setActiveSessionId,
    activeSessionId,
  };

  return (
    <TimerContext.Provider value={timerContextValue}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => useContext(TimerContext);
