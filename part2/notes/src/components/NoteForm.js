import { useState } from 'react'

const NoteForm = ({ createNote }) => {
    const [newNote, setNewNote] = useState('')
    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random()>0.5,
            date: new Date().toISOString()
        }
        createNote(noteObject)
        setNewNote('')
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    return(
        <div>
            <h2>Create a new note</h2>
            <form onSubmit={addNote}>
                <input id='note-content-field' value={newNote} onChange={handleNoteChange}></input>
                <button type='submit'>Save Note</button>
            </form>
        </div>
    )
}

export default NoteForm