const CountryLine = ({id, country, onCountrySelection}) => {
    return (
        <h3>{country.name.common} ({country.name.official}) <button id={id} onClick={onCountrySelection}> Select </button> {country.flag}</h3>
    )
}

export default CountryLine;