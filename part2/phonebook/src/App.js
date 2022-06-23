import { useState, useEffect } from "react";
import Filter from './components/Filter'
import Form from "./components/Form";
import Numbers from "./components/Numbers";
import phonebookService from "./services/phonebookService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsFiltered, setPersonsFiltered] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [notification, setNotification] = useState({message:null, type:0})

  useEffect(() => {
    phonebookService
    .getAll()
    .then((persons) => {
      setPersons(persons)
    })
  },[])

  useEffect(( () => {
    if(persons.length >= 1) {
      setPersonsFiltered(persons)
    }
  }), [persons])

  const handleFilterChange = (event) => {
    const filterWord = event.target.value.toLowerCase()
    const filteredList = persons.filter((person) => {
      return (person.name.toLowerCase().includes(filterWord) )
    })
    setPersonsFiltered(filteredList)
  }

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const checkExistence = (newNameFormatted) => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.localeCompare(newNameFormatted) === 0){
        return true
      }
    }
    return false
  }
  
  const formatString = (str) => {
    const strLowerCase = str.toLowerCase()
    const strArray = strLowerCase.split(" ")
    const strArrayFormatted = strArray.map((word) => capitalize(word))
    const strFormatted = strArrayFormatted.join(" ")
    return strFormatted
  }

  const capitalize = (word) => {
    const firstLetter = word.charAt(0).toUpperCase()
    const rest = word.slice(1)
    return firstLetter + rest
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newNameFormatted = formatString(newName)
    const exists = checkExistence(newNameFormatted)

    if (exists) {
      if (window.confirm(`${newNameFormatted} was already added to phonebook, do you want to update the old phone number to this new one?`)) {
        
        const personSelected = persons.find((person) => {
          return (person.name === newNameFormatted)
        })        
        const updatedPerson = {...personSelected, number : newNumber}
        
        phonebookService
        .update(updatedPerson.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) => {
            return (person.id !== returnedPerson.id ? person : returnedPerson)
            })
          )   
          setNotification({message:`Number updated`, type:1})
          setTimeout(() => {
            setNotification({message:null, type:0})
          }, 2000);
          setNewName('')
          setNewNumber('')
        })
        .catch((error) => {
          setNotification({message:`${updatedPerson.name} was already removed from the server`, type:2})
          setTimeout(() => {
            setNotification({message:null, type:0})
          }, 2000);
          setPersons(persons.filter((person) => {
            return ( person.id !== updatedPerson.id )
          }))
          setNewName('')
          setNewNumber('')
        })
      }

    } else {
      const personObject = {
        name: newNameFormatted,
        number: newNumber,
      }
      phonebookService.create(personObject).then((person) =>{
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
        setNotification({message:`${personObject.name} was added`, type:1})
          setTimeout(() => {
            setNotification({message:null, type:0})
          }, 2000);
      })
    }
  }

  const onDeletion = (id) => {
    const personToDelete = persons.find((person) => {
      return( person.id === id )
    })
    if (window.confirm(`Are you sure you want to delete 
    ${personToDelete.name} from your contacts?`)) {
      phonebookService
      .deletePerson(id)
      .then((data) => {
        setPersons(
          persons.filter((person) => {
            return( person.id !== id )
        }))
        setNotification({message:`${personToDelete.name} was removed`, type:1})
          setTimeout(() => {
            setNotification({message:null, type:0})
          }, 2000);
      })
      .catch((error) => {
        setNotification({message:`${personToDelete.name} was already removed from the server`, type:2})
        setTimeout(() => {
          setNotification({message:null, type:0})
        }, 2000);
        setPersons(persons.filter((person) => {
          return ( person.id !== id )
        }))
      })
    }
  }

  return (
    <div className="mainWindow">
      
      <div className="header">
        <h1 className="title">Phonebook</h1>
        <Filter onChange={handleFilterChange}/>
      </div>
      <div className="subtitle">
        <h3>add new contact</h3>
      </div>
      <Form onSubmit={handleSubmit}
            onNameChange={handleNameInputChange} nameValue={newName} 
            onNumberChange={handleNumberInputChange} numberValue={newNumber}
      />
      <Notification message={notification.message} type={notification.type}/>
      <div className="subtitle contacts">
        <h3>contacts</h3>
      </div>
      <Numbers persons={personsFiltered} onDeletion={onDeletion}/>
    </div>
  )
}

export default App;