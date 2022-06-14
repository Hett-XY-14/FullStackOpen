
import CountryLine from "./CountryLine"

const List = ({ countries, onCountrySelection}) => {
    return (
        <div>
            {countries.map((country, index) => {
                return (
                    <div key={country.name.official}>
                        <CountryLine  id={index} country={country} onCountrySelection={onCountrySelection}/>
                    </div>
                )
            })}
        </div>
    )
}


export default List;