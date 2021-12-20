import "./App.css";
import { useState } from "react";
import virus from "./images/virus.jpg";
import staysafe from "./images/staysafe.jpg";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [country, setCountry] = useState("");

  const updateValue = (event) => {
    setUserInput(event.target.value);
  };

  const getCountry = async () => {
    const response = await fetch(
      `https://covid19-api.com/country?name=${userInput}&format=json`,
      {
        method: "GET",
      }
    );
    const country = await response.json();
    console.log(country[0]);
    setCountry(country[0]);
  };

  return (
    <div className="whole">
      <img id="virus" src={virus} />
      <h1 className="heading">Covid Watch</h1>
      <h3 id="second">Get real time COVID data from around the world</h3>
      <div className="askUser">
        <h4>Type your country here:</h4>

        <input value={userInput} onChange={updateValue} />
        <button onClick={getCountry}>Check</button>
      </div>
      <div className="data">
        {" "}
        {country ? (
          <CountryData
            country={country.country}
            confirmed={country.confirmed}
            recovered={country.recovered}
            critical={country.critical}
            deaths={country.deaths}
            lastUpdate={country.lastUpdate}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const CountryData = (props) => {
  return (
    <div className="countrybox">
      <p>Country: {props.country}</p>
      <p>Confirmed cases: {props.confirmed}</p>
      <p>Recovered: {props.recovered}</p>
      <p>Critical: {props.critical}</p>
      <p>Deaths: {props.deaths}</p>
      <p>Last update: {props.lastUpdate}</p>
    </div>
  );
};

export default App;
