import { useState, useContext, createContext } from "react";

const CityContext = createContext();
const CityProvider = ({ children }) => {
  const [weather, setWeather] = useState([]);

  return (
    <CityContext.Provider value={[weather, setWeather]}>
      {children}
    </CityContext.Provider>
  );
};

// custom hook
const useWeather = () => useContext(CityContext);

export { useWeather, CityProvider };