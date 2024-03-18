const axios = require("axios");
const userModel = require("../models/user");

const weatherController = async (req, res) => {
  try {
    const { uuid } = req.user;
    const { city } = await userModel.findOne({ uuid });

    const citiesObj = {
      locations: city.map((c) => ({ q: c })),
    };
    const { data } = await axios.post(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.VITE_WEATHER_API}&q=bulk`,
      citiesObj
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

const cityController = async (req, res) => {
  try {
    const { data } = await axios.post(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.VITE_WEATHER_API}&q=bulk`,
      cities
    );
    const id = req.params.id;
    if (data && id < 4) {
      const cityWeather = data.bulk;
      const CityDetail = {
        name: cityWeather[id].query.location.name,
        country: cityWeather[id].query.location.country,
        temperature: cityWeather[id].query.current.temp_c,
        humidity: cityWeather[id].query.current.humidity,
        condition: cityWeather[id].query.current.condition.text,
        icon_url: cityWeather[id].query.current.condition.icon,
      };
      res.status(200).send({
        success: true,
        message: "Got City Details",
        CityDetail,
      });
    } else {
      res.status(404).send({
        success: true,
        message: "City Not Found",
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

const cityUpdateController = async (req, res) => {
  try {
    const { uuid } = req.user;
    const { id } = req.params;
    const newCity = req.body.city;
    if (id < 4 && newCity) {
      await userModel.updateOne(
        { uuid: uuid, [`city.${id}`]: { $exists: true } },
        { $set: { [`city.${id}`]: newCity } }
      );
      res.status(200).json({ message: "City updated successfully" });
    } else {
      res.status(404).json({ error: "User not found or City does not exist" });
    }
  } catch (err) {
    console.error("Error updating city:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteController = async (req, res) => {
  try {
    const { uuid } = req.user;
    const { id } = req.params;
    if (id < 4) {
      await userModel.updateOne(
        { uuid: uuid, [`city.${index}`]: { $exists: true } }, 
        { $unset: { [`city.${index}`]: 1 } }
      );
      res.status(200).json({ message: "City updated successfully" });
    } else {
      res.status(404).json({ error: "User not found or City does not exist" });
    }
  } catch (err) {
    console.error("Error updating city:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  weatherController,
  cityController,
  cityUpdateController,
  deleteController,
};
