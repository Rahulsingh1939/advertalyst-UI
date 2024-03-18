import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWeather } from "../context/cities";

import { useUUID } from "../context/uuid";

const CityPage = () => {
  const [weather,setWeather] = useWeather();
  const [city, setCity] = useState({});
  const { cityName } = useParams();


  const [uuid, setUUID] = useUUID();
  const [jwt, setJWT] = useState("");
  useState(() => {
    const foundCity = weather.find((city) => city.name === cityName);
    if (foundCity) {
        console.log(foundCity);
      setCity(foundCity);
    }
  }, []);



  
  return (
    <>
      <p>{city.name}</p>
      <p>{city.country}</p>
      <p>This is City Page</p>
    </>
  );
};

export default CityPage;
