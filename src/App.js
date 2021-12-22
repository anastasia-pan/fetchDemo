import "./App.css";
import { useState } from "react";
import virus from "./images/virus.jpg";
import primary from "./images/primary.png"



const App = () => {
  const [userInput, setUserInput] = useState("");
  const [country, setCountry] = useState("");
  const [countryArray, setCountryArray] = useState([]);
  const [errorTrue, setErrorTrue] = useState(false)

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
    if (country.length === 0) {
      console.log(`No country matched ${userInput}`)
      setErrorTrue(true)
      return
    }

    setErrorTrue(false)
    let x = country[0];
    setCountry(x);
    let newarray = [...countryArray];
    newarray.push(x);
    setCountryArray(newarray);

  };

  const remove = (index) => {
    let newarray = [...countryArray]
    newarray.splice(index,1)
    setCountryArray(newarray)
  
    
  }
  

  return (
    <div className="whole">
      <div className="header">
       
      <img  id="virus" src={primary} alt="covid virus" height="100" width="100" style={{padding:"20px"}}/>
      <h1 className="heading">COVID-19 Watch</h1>
   
    
      </div>
      <h3  id="second">Get real-time COVID data from around the world</h3>
      <div className="askUser">
        <h4>Type your country here</h4>
        <input value={userInput} onChange={updateValue} />
        <button onClick={getCountry}>Check</button>
      </div>
      <div className="current">
        {errorTrue && (<h4 id="errorMessage" style={{color:"teal", opacity:"0.8"}}>Country doesn't exist, try again</h4>)}

      {country && (
        <>
    
        <h3 id="currentSet">Current set </h3>
        <div className="data">
          <CountryData
            country={country.country}
            confirmed={country.confirmed}
            recovered={country.recovered}
            critical={country.critical}
            deaths={country.deaths}
            lastUpdate={country.lastUpdate}
          />
        </div>
        </>
      )}
      </div>
      <div className="pastResults">
      <h3 className="compare">Enter more countries to compare</h3>
      <ul className="displayAll">

      {countryArray.map((country,index) =>(
           <li className="previousCountry"><AllCountries
           key={index}
           country={country.country}
           confirmed={country.confirmed}
           recovered={country.recovered}
           critical={country.critical}
           deaths={country.deaths}
           lastUpdate={country.lastUpdate}
           remove={() => remove(country.index)}
         />
         </li>
         
      ))}
      </ul>
      </div>
    </div>
  );
};

const CountryData = (props) => {
  return (
    <div className="countrybox">
      <p style={{fontWeight: "bold"}} >{props.country}</p>
      <p >Confirmed cases: {props.confirmed}</p>
      <p >Recovered: {props.recovered}</p>
      <p >Critical: {props.critical}</p>
      <p >Deaths: {props.deaths}</p>
      <p >Last update: {props.lastUpdate}</p>
  
    </div>
  );
};


const AllCountries = (props) => {
  return (
    <div className="countrybox">
      <p className="green" style={{textAlign:"center",fontWeight: "bold"} }>{props.country}</p>
      <p className="white">Confirmed cases: <br/> {props.confirmed}</p>
      <p className="green">Recovered: {props.recovered}</p>
      <p className="white">Critical: {props.critical}</p>
      <p className="green">Deaths: {props.deaths}</p>
      <p className="white">Last update: {props.lastUpdate}</p>
      <button id="remove"onClick={props.remove}>Remove </button>
    </div>
  );
};

export default App;
