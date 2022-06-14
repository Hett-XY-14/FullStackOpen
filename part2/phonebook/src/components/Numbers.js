const Numbers = ({persons, onDeletion}) => {
    console.log(persons)
    return(
        persons.map((person) => 
        <div className="number-row" key={person.name}>
            <p className="name-number-text" > 
                {person.name} : {person.number}
            </p>
            <button className="delete-button" onClick={() => onDeletion(person.id)}>delete</button> 
        </div>
        )
    )
}
export default Numbers;