import { useState } from 'react'

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
      <Input text={nameText} deFaultValue={nameValue} changeHandler={nameHandler} />
      <Input text={numberText} deFaultValue={numberValue} changeHandler={numberHandler} />
      <button type="submit">add</button>
    </form>
  )
}

const Input = ({text, defaultValue, changeHandler}) => {
  return (
    <div>
      {text}
      <input value={defaultValue} onChange={changeHandler}/>
    </div>
  )
}

const Persons = ({persons}) => {
  return (
    persons.map((person) => <Name key={person.name} name={person.name} number={person.number} />)
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
// after add, newName and newValue is reset, but the default value on the page is not
