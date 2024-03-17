const axios = require("axios");
// const getWeather = async () => {

// }

const weatherController = async (req, res) => {
  try {
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
    const { data } = await axios.post(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.VITE_WEATHER_API}&q=bulk`,
      cities
    );
    if (data) {
      const cityWeather = data.bulk;
      const CitiesDetails = cityWeather.map((city) => {
        return {
          name: city.query.location.name,
          country: city.query.location.country,
          temperature: city.query.current.temp_c,
          humidity: city.query.current.humidity,
          condition: city.query.current.condition.text,
          icon_url: city.query.current.condition.icon,
        };
      });
      res.status(200).send({
        success: true,
        message: "All Cities Weather",
        CitiesDetails,
      });
    } else {
      res.status(400).send({
        success: true,
        message: "Error Getting Weather Data form API",
        cityWeather,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = weatherController;
