import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        
      })
  }, [])

  const onClick = (name) => {
    setFilter(name)
  }
  
  return (
    <div>
      find countries
      <form>
        <input
        value={filter}
        onChange={handleChange} 
        />
      </form>
      <ul>
        <Country countries={countries} filter={filter} onClick={onClick}/>
      </ul>
    </div>
  );
}

const Country = (props) => {
  const filtered = props.countries.filter(country => country.name.toLowerCase().includes(props.filter.toLowerCase())) 

  if (filtered.length > 10) {
    return <li>'Too many matches, specify another filter'</li>
  } else if (filtered.length > 1) {
    return filtered.map(country => <li key={country.name}>{country.name} <button onClick={() => props.onClick(country.name)} >show</button></li>)
  } else if (filtered.length === 1) {
    const country = filtered[0]
    return (
      <li>
        <h1>{country.name}</h1>
        <div>
          capital {country.capital}
        </div>
        <div> 
          population {country.population}
        </div>
        <h2>Languages</h2>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <div >
          <img src={country.flag} alt='flag'></img>
        </div>   
        <Weather country={country} />  
      </li>
      
    )
  } else {
    return ''
  } 
}

const Weather = ({country}) => {
  const [weather, setWeather] = useState()
  const url = 'http://api.weatherstack.com/current'
  const access_key = '?access_key=' + process.env.REACT_APP_API_KEY
  const query = '&query=' + country.capital


  useEffect(() => {
    axios
      .get(url + access_key + query)
      .then(response => {
        setWeather(response.data)    
      })
  }, [access_key, query])
  
  console.log(weather)
  return (
    <>
    {weather
      ? (
        <>
          <h2>Weather in {country.capital}</h2>
          <div>
            <b>temperature:</b> {weather.current.temperature} Celsius
          </div>
          <img src={weather.current.weather_icons[0]} alt='weather'></img>
          <div>
            <b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
          </div>
        </>
      )
      : null
    }
    </>
  )
}


export default App;
