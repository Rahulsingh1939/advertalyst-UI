import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card";

import axios from "axios";

function App() {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);
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
        const {data} = await axios.post(
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
  return (
    <>
      <div className="h-32">
        <p
          className="text-5xl font-bold from-stone-900 gradient-text"
          style={{ fontFamily: "SAMAN",color:"#D9FFF8" }}
        >
          Weather App
        </p>
      </div>
      {/* grid container */}
      {loading ? (
        "Loading ..."
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-10 gap-y-20 h-fit text-xl">
            {/* product cards */}
            {weather.map((city,index)=>
              (<Card key={index} city={city} />)
            )
            }
          </div>
        </>
      )}
    </>
  );
}

export default App;
