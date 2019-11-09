

const axios = require("axios");
const APIXU_KEY = "f658e22bd354ec117923e55bd4d5b05c";

const fetchNow = (location) => {
    let data;
    console.log(location);
    let city = location.city;
    let country = location.country;
    let place = city + (country ? ', ' + country : '');
    console.log(city + " " + country + " " + place);

    axios.get(`http://api.weatherstack.com/current?access_key=${APIXU_KEY}&query=${place}`)
      .then(function (response) {
        // handle success
        return response.data;
      })
      .then(function (response) {
          // handle success
          data = response;
          const now = {
            location: data.location.name,
            country: data.location.country,
            longitude: data.location.lon,
            latitude: data.location.lat,
            temperature: data.current.temperature,
            condition: data.current.weather_descriptions
          };
          console.log(now);
      })
      .catch(function (error) {
        // handle error
        console.log('---------------------------------');
        console.log(error);
      });
    };

    const weatherForecast = async (city) => {
      axios.get(`http://api.weatherstack.com/forecast?access_key=${APIXU_KEY}&query=${city}`)
        .then(function (response) {
            // handle success
            return response.data;
        })
        .then(function (response) {
            // handle success
            data = response;
            console.log(data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    };

    const addCity = (location) => {
      console.log(location);
    }

  module.exports = {
    fetchNow,
    weatherForecast,
    addCity
  };

