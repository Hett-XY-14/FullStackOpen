import axios from "axios";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import List from "./components/List"
import Details from "./components/Details";

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weatherList, setWeatherList] = useState([])

  useEffect(() => {
    const promise = axios.get('https://restcountries.com/v3.1/all')
    console.log(promise)
    promise.then((response => {
    setCountries(response.data)
    setFilteredCountries(response.data)
    }))
  }, [])

  useEffect(()=>{

    if (filteredCountries.length === 1) {
      console.log("Use Effect 2")
      const country = filteredCountries[0]
      const capitalLatLng = country.capitalInfo.latlng
      const call = 'https://api.openweathermap.org/data/2.5/weather?lat='+capitalLatLng[0]+'&lon='+capitalLatLng[1]+'&appid='+process.env.REACT_APP_API_KEY  
      axios.get(call).then( response => { 
        setWeatherList(response.data)
        console.log(response.data)
      })
      
    }
  }, [filteredCountries])

  const handleCountrySelection = (event) => {
    console.log('handle Country Selection')
    const country = filteredCountries[event.target.id]
    console.log(country)
    setFilteredCountries([ country ])
  }

  const handleInputChange = (event) => {
    const filter = event.target.value.toLowerCase()
    const filteredList = countries.filter((country) => {
      return (country.name.common.toLowerCase().includes(filter) || 
      country.name.official.toLowerCase().includes(filter))
    })
    setFilteredCountries(filteredList)
  }

  const componentDispatcher = () => {
    if (filteredCountries.length > 10) {
      return (
        <h3>You'll need a better filter, still too many matches!</h3>
      )
    }else if (filteredCountries.length === 1 && weatherList.name!==undefined) {
      console.log(weatherList, 'componentDisp 2nd cond')
      return (
        <Details country={filteredCountries[0]} weather={weatherList} />
      )
    } else {
      console.log('componentDisp 3rd cond')
      return (
        <List countries={filteredCountries} onCountrySelection={handleCountrySelection} weather={weatherList}></List>
      )  
    }
  }

  return (
    <div>
      <h1>Countries</h1>
      <Filter onChange={handleInputChange}/>
      <br></br>
      {componentDispatcher()}
    </div>
  )
}
export default App;