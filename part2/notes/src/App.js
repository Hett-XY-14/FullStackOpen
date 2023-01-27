import { useState, useEffect, useRef } from 'react'
import noteService from './services/notes'
import loginService from './services/login'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Login from './components/Login'
import Logout from './components/Logout'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  useEffect(()=>{
    const user = JSON.parse(window.localStorage.getItem('loggedNoteAppUser'))
    if (user) {
      setUser(user)
      console.log(user.token)
      noteService.setToken(user.token)
    } 
  },[])

  useEffect(() => {
    console.log('Effect')
    noteService
    .getAll()
    .then(intialNotes => {
      setNotes(intialNotes)
    })
  }, [])
  console.log('render', notes.length, 'notes')
// -   -   -   -   -   -   -   -   -   -   -   -   -
  const addNote = (noteObject)=> {
    noteFormRef.current.toggleVisibility()
    noteService
    .create(noteObject, user.token)
    .then(returnedNote => {
      console.log(returnedNote)
      setNotes(notes.concat(returnedNote))
    })
  }
// -   -   -   -   -   -   -   -   -   -   -   -   -
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
    .update(id, changedNote)
    .then(updatedNote => {
      setNotes(notes.map((note => note.id !== id ? note : updatedNote)))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      console.log(error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
      setNotes(notes.filter(n => n.id !== id))
    })
  }
// -   -   -   -   -   -   -   -   -   -   -   -   -
  const notesToShow = showAll ? 
  notes : 
  notes.filter((note) => note.important === true)
// -   -   -   -   -   -   -   -   -   -   -   -   -
  const handleLogin = async (event) => {
    event.preventDefault()
    
    const credentials = {
      username:username,
      password:password
    }
    console.log('logging in with', username, password)
    
    try {
    
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)
      
    } catch (exception) {
      
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    
    }
  }
// -   -   -   -   -   -   -   -   -   -   -   -   -
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteAppUser')
    noteService.setToken(null)
    setUser(null)
  }
// -   -   -   -   -   -   -   -   -   -   -   -   -
  const onUsernameChange = (event) => {
    setUsername(event.target.value)
  }
// -   -   -   -   -   -   -   -   -   -   -   -   -
  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }
// -   -   -   -   -   -   -   -   -   -   -   -   -  
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      
      {!user && 
        <Togglable buttonLabel={'login'}> 
          <Login 
            username={username} 
            password={password} 
            onUsernameChange={onUsernameChange} 
            onPasswordChange={onPasswordChange} 
            handleLogin={handleLogin}/>
        </Togglable>
      }
      { user &&
          <>
            <Logout username={user.username} handleLogout={handleLogout}/>

            <Togglable buttonLabel={'Create note'} ref={noteFormRef}>
              <NoteForm createNote={addNote}/>
          </Togglable>
        </>
      }
      
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Important' : 'All'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App