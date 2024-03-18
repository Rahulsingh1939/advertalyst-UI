import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import { useWeather } from "./context/cities";
import { useUUID } from "./context/uuid";

function App() {
  const [weather, setWeather] = useWeather();
  const [loading, setLoading] = useState(false);
  const [uuid, setUUID] = useUUID();
  const [jwt, setJWT] = useState("");
  const getWeather = async () => {
    try {
      setLoading(true);
      if (jwt) {
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/weather`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setWeather(data?.CitiesDetails);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!uuid) {
      const generatedUUID = uuidv4();
      setUUID(generatedUUID);
      localStorage.setItem("uuid", generatedUUID);
    }

    const fetchJWTAndWeather = async () => {
      await fetchJWT();
      getWeather();
    };
    fetchJWTAndWeather();
  }, []);
  useEffect(() => {
    getWeather();
  }, [jwt]);

  const fetchJWT = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/getJWT",
        { uuid },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setJWT(response.data.token);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="h-32">
        <p
          className="text-5xl font-bold from-stone-900 gradient-text"
          style={{ fontFamily: "SAMAN", color: "#D9FFF8" }}
        >
          Weather App
        </p>
      </div>
      {/* grid container */}
      {loading ? (
        <div className="text-2xl font-bold from-stone-900 ">Loading ...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-10 gap-y-20 h-fit text-xl">
            {/* product cards */}
            {weather.map((city, index) => (
              <Card key={index} city={city} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default App;
