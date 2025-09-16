import React, { useEffect } from "react";
import "./Weather.css";
import searchIcon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/windSpeed.png";
import few_clouds_icon from "../assets/few_clouds.png";
import scattered_clouds_icon from "../assets/scattered_clouds.png";
import broken_clouds_icon from "../assets/broken_clouds.png";
import shower_rain_icon from "../assets/shower_rain.png";
import rain_icon from "../assets/rain.png";
import thunderstorm_icon from "../assets/thunderstorm.png";
import snow_icon from "../assets/snow.png";
import mist_icon from "../assets/mist.png";

const Weather = () => {
  const [weatherData, setWeatherData] = React.useState(false);
  const inputRef = React.useRef();

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": few_clouds_icon,
    "02n": few_clouds_icon,
    "03d": scattered_clouds_icon,
    "03n": scattered_clouds_icon,
    "04d": broken_clouds_icon,
    "04n": broken_clouds_icon,
    "09d": shower_rain_icon,
    "09n": shower_rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": thunderstorm_icon,
    "11n": thunderstorm_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": mist_icon,
    "50n": mist_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Please enter a city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const res = await fetch(url);
      const data = await res.json();

      if(!res.ok){
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        temperature: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        location: data.name,
        icon: icon,
      });
    } catch (error) {
        setWeatherData(false);
        console.log("Error in fetching data: ", error);
        alert("Error in fetching data");
    }
  };

  useEffect(() => {
    search("Chicago");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Enter city name" />
        <img
          src={searchIcon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°F</p>
          <p className="location">{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed} mph</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
