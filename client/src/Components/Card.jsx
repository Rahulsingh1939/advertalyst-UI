import React, { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ city }) => {
  const [img, setImg] = useState([]);
  useEffect(() => {
    const getImg = async () => {
      try {
        const { data } = await axios.get(
          `https://api.unsplash.com/search/photos?page=1&per_page=1&query=${
            city?.query.q
          }&client_id=${import.meta.env.VITE_CLIENT_ID}`
        );
        console.log(data);
        setImg(data?.results[0].urls?.regular);
      } catch (error) {
        console.log(error);
      }
    };
    getImg();
  }, []);
  return (
    <>
      <a
        href=""
        className="flex flex-col bg-white drop-shadow hover:drop-shadow-lg hover:opacity-70 rounded-md"
      >
        <div
          alt="Fiction Product"
          className="h-36 flex object-cover rounded-tl-md rounded-tr-md"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <div className="background-overlay"></div>
          <img
            src={`https:${city?.query.current.condition.icon}`}
            alt="Weather"
            className="h-16 w-16 m-14 mx-30 object-cover rounded-tl-md rounded-tr-md"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.0);",
              zIndex: "2",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            }}
          />
          <p className="lg:text-4xl text-5xl font-sans font-semibold text-gray-100 flex items-center m-20">
            {Math.round(city?.query.current.temp_c)}{" "}
            <sup className="lg:text-2xl text-2xl">o </sup>
            <span className="lg:text-4xl text-4xl"> C</span>
          </p>
        </div>
        <div className="inline">
          {city?.query.current.condition.text}
          
        </div>
        <div className="px-3 pb-2">
          <h1 className=" text-2xl font-semibold">{city?.query.q},</h1>
          <p className="text-sm">{city?.query.location.country}</p>
        </div>
      </a>
    </>
  );
};

export default Card;
