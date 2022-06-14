const Details = ({ country, weather }) => {
    
    return (
        <>
            <h1>{country.name.common}</h1>
            <img src={country.flags.png} alt="Country Flag"></img>
            <h3>Official Name: {country.name.official}</h3>
            <h3>Region: {country.region}</h3>
            <h3>Subregion: {country.subregion}</h3>
            <h3>Capital: {country.capital[0]}</h3>
            <h3>Population: {country.population}</h3>
            <div>
                <h3>Languages:</h3>
                <ul>
                    {Object.keys(country.languages).map((key) => {
                        return (
                        <li key={key}>
                            <h3>{country.languages[key]}</h3>
                        </li>)
                    })}
                </ul>
            </div>
            <div>
                <h3>Maps:</h3>
                <ul> 
                    <li><h3><a href={country.maps.googleMaps} target="_blank" rel="noreferrer">Google Maps</a></h3></li>
                    <li><h3><a href={country.maps.openStreetMaps} target="_blank"  rel="noreferrer">Open Street Maps</a></h3></li>
                </ul>
            </div>
            <br></br>
            <div>
                <h2>Weather in {country.capital[0]}</h2>
                <img src={'http://openweathermap.org/img/wn/'+weather.weather[0].icon+'@2x.png'} alt="Flag of the country"></img>
                <h4>Main :  {weather.weather[0].description}</h4>
                <h4>Current Temperature : {Math.round((weather.main.temp - 271)*100)/100} ° Celsius</h4>
                <h4>Feels like : {Math.round((weather.main.feels_like - 271)*100)/100} ° Celsius</h4>
                <h4>Humidity : {weather.main.humidity} %</h4>
            </div>
        </>
    )
}

export default Details