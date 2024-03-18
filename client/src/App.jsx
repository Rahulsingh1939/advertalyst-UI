import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";

function App() {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uuid, setUUID] = useState(localStorage.getItem("uuid") || "");
  const [jwt, setJWT] = useState("");
  const cities = {
    locations: [
      {
        q: "London",
      },
      {
        q: "Mumbai",
      },
      {
        q: "Bangalore",
      },
      {
        q: "Paris",
      },
    ],
  };

  useEffect(() => {
    const getWeather = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(
          `http://api.weatherapi.com/v1/current.json?key=${
            import.meta.env.VITE_WEATHER_API
          }&q=bulk`,
          cities
        );
        setWeather(data.bulk);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getWeather();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!uuid) {
      const generatedUUID = uuidv4();
      setUUID(generatedUUID);
      localStorage.setItem("uuid", generatedUUID);
    }
    fetchJWT();

    authRequest();
  }, [uuid]);

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

  const authRequest = async () => {
    axios.get('http://localhost:3000/api/v1/auth/', {
      headers: {
          'authorization': jwt
      }
  })
  .then(response => {
      console.log(response.user.uuid);
  })
  .catch(error => {
      console.error('Error:', error);
  });
}
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
