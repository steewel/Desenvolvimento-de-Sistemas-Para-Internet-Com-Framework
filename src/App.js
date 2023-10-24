import React, { useState } from "react";

import "./App.css";

import SummerImage from "./img/summer.jpg";
import WinterImage from "./img/winter.jpg";

const api = {
  key: "3ee32176fbc4070662893138e0e9dea6",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [temp, setTemp] = useState(null);
  const [weather, setWeather] = useState(null);

  const handleAPI = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
    );
    const data = await response.json();

    if (data.cod === "404") {
      setError(`Digite uma cidade válida!`);
      setWeather(null);
      setTemp(null);
      return;
    }

    setError(null);
    setWeather(data);
    setTemp(data.main.temp);
    console.log(data);
  };

  return (
    <div className="app">
      <div className="data">
        <form className="search" onSubmit={(e) => handleAPI(e)}>
          <input
            className="search__input"
            type="text"
            placeholder="Qual cidade deseja saber o clima?"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />

          <button className="search__button">Buscar</button>
        </form>

        {error && <div className="error">{error}</div>}

        {weather && weather.name && (
          <div className="content">
            <div className="content__date">
              {new Date(weather.dt * 1000).toLocaleDateString("pt-BR")}
            </div>

            <h1 className="content__name">
              <span>{weather.name}</span>,<span> {weather.sys.country}</span>
            </h1>
          </div>
        )}

        {weather && temp && (
          <div className="temp">
            {weather.weather[0].icon && (
              <img
                className="content__icon"
                src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt="icone do tempo atual"
              />
            )}
            <h2 className="temp__value">
              {temp.toFixed(0)}
              <span className="temp__value--celsius">ºC</span>
            </h2>
          </div>
        )}
      </div>

      {weather && temp && (
        <div className="bg">
          {temp > 15 && (
            <img className="bg__image" src={SummerImage} alt="céu azul" />
          )}

          {temp <= 15 && (
            <img className="bg__image" src={WinterImage} alt="céu nublado" />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
