import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import React, { useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { Footer, Navbar, Sidebar, ThemeSettings } from "./components";
import { Home } from "./pages";

import { useStateContext } from "./contexts/ContextProvider";
import Login from "./components/screens/Login";
import SignUp from "./components/screens/SignUp";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Session from "./pages/Session";
import UploadPhotos from "./components/screens/UploadPhotos";
import { TimerProvider } from "./contexts/SessionContext";
import Analytics from "./pages/Analytics";
import AllSessions from "./components/screens/AllSessions";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <TimerProvider>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <BrowserRouter>
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: "50%" }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}
            <div
              className={
                activeMenu
                  ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                  : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
              }
            >
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>
              <div className="flex-1 h-full w-full">
                {themeSettings && <ThemeSettings />}

                <Routes>
                  {/* dashboard  */}
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/session/:id" element={<Session />} />
                  <Route path="/AllSessions" element={<AllSessions />} />
                  <Route path="/analytics" element={<Analytics />} />

                  <Route
                    exact
                    path="/uploadPhotos"
                    element={<UploadPhotos />}
                  />
                  {/* pages  */}
                  {/* <Route exact path="/transactions" element={<Transactions />} /> */}
                </Routes>
              </div>
              {/* <Footer /> */}
            </div>
          </div>
        </BrowserRouter>
      </div>
    </TimerProvider>
  );
};

export default App;
