import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CityProvider } from "./context/cities.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CityPage from "./Pages/CityPage.jsx";
import { UuidProvider } from "./context/uuid.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UuidProvider>
      <CityProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/:cityName" element={<CityPage />} />
          </Routes>
        </Router>
      </CityProvider>
    </UuidProvider>
  </React.StrictMode>
);
