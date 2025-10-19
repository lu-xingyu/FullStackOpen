import { useState } from 'react'
import Note from './components/Note'

/* Create two states, one for current notes, one for the new input note;
new input note is updated whenever the value in the input is changed
new input note is concatted to the current notes when the form is submitted
after the current notes is updated, new input note is reset for next input */
const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  /*
  const addNote = (event) => {
    event.preventDefault() // in HTML, when a Form is submitted, the default ection is to reload the page
    console.log('button clicked', event.target)  // event.target is the DOM element that intrigues the event, here is the <form> element
  } */

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)  // event.target is the DOM element that intrigues the event, here is the input
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
        content: newNote,
        important: Math.random() < 0.5,
        id: String(notes.length + 1),
  }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>

      <form onSubmit={addNote}>          {/* React automatically creates en event object and call addNote(event) */}
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App 