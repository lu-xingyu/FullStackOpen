import { useEffect, useState } from 'react'
import axios from 'axios'

const Name = ({name, number}) => (
  <p>{name} {number}</p>
)

const Filter = ({text, value, changeHandler}) => {
  return (
    <div>
      {text} 
      <input value={value} onChange={changeHandler}/>
    </div>
  )
}

const PersonForm = ({nameText, nameValue, nameHandler, numberText, numberValue, numberHandler, submitHandler}) => {
  return (
    <form onSubmit={submitHandler}>
      <Input text={nameText} value={nameValue} changeHandler={nameHandler} />
      <Input text={numberText} value={numberValue} changeHandler={numberHandler} />
      <button type="submit">add</button>
    </form>
  )
}

const Input = ({text, value, changeHandler}) => {
  return (
    <div>
      {text}
      <input value={value} onChange={changeHandler}/>
    </div>
  )
}

const Persons = ({persons}) => {
  return (
    persons.map((person) => <Name key={person.name} name={person.name} number={person.number} />)
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://didactic-halibut-q7pxpr6qv64g346j7-3001.app.github.dev/persons')
      .then(
        (response) => {
          setPersons(response.data)
        })
  },[])


  const getNewName = (event) => {
    setNewName(event.target.value)
  }

  const getNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const exist = (element) => element.name === newName
    if (persons.some(exist)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newId = persons.length + 1
      const submittedPerson = { name: newName, number: newNumber, id:newId}
      const newPersons = persons.concat(submittedPerson)
      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
    }
  }

  const getFilter = (event) => {
    setFilter(event.target.value)
  }

  const personToShow = persons.filter(element => (
    element.name.toLowerCase().includes(filter.toLowerCase())
  ))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter text='filter shown with: ' value={filter} changeHandler={getFilter} />

      <h2>add a new</h2>

      <PersonForm nameText='name: ' nameValue={newName} nameHandler={getNewName}
                  numberText='number: ' numberValue={newNumber} numberHandler={getNewNumber} 
                  submitHandler={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personToShow} />
    </div>
  )
}

export default App

// Remaining queations:
// empty name and number can be added

