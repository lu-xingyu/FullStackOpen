import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'

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

const Persons = ({persons, deleteHandler}) => {
  return (
    persons.map((person) => {
      return (
        <PersonDisplay key={person.id} name={person.name} number={person.number} deleteHandler={() => deleteHandler(person)}/>
      )
    })
  )
}



const PersonDisplay = ({name, number, deleteHandler}) => {
  return (
    <p>{name} {number} <button onClick={deleteHandler}>delete</button> </p>
  ) 
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({message: null, error: false})

  useEffect(() => {
    personService.getAll()
      .then((response) => {
        setPersons(response)
      })
  },[])


  const getNewName = (event) => {
    setNewName(event.target.value)
  }

  const getNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const renderNotification = (messageText, errorOrNot) => {
    setNotification({message: messageText, error: errorOrNot})
    setTimeout(() => {
      setNotification({message: null, error: false})
    }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const exist = (element) => element.name === newName
    if (persons.some(exist)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new on?`)){
        const personToUpdate = persons.find((element) => element.name === newName)
        const updatedPerson = {...personToUpdate, number: newNumber}
        personService.update(updatedPerson)
          .then((response)=>{
            const newPersons = persons.map((element) => (
              element.name === newName ?updatedPerson :element
            ))
            setPersons(newPersons)
            renderNotification(`Updated ${newName}`, false)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {renderNotification(`Information of ${newName} has already been removed from the server`, true)
          })
      }
    } else {
      const newId = String(persons.length + 1)
      const submittedPerson = { name: newName, number: newNumber, id:newId}
      personService.add(submittedPerson)
      .then((response) => {
        const newPersons = persons.concat(response)
        setPersons(newPersons)
        renderNotification(`Added ${newName}`, false)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log(error.response.data.error)
        renderNotification(error.response.data.error, true)
      })
    }
  }

  const getFilter = (event) => {
    setFilter(event.target.value)
  }

  const personToShow = persons.filter(element => (
    element.name.toLowerCase().includes(filter.toLowerCase())
  ))

  const deleteHandler = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(person.id)
      setPersons(persons.filter((element) => (element.id !== person.id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification.message} error={notification.error}/>

      <Filter text='filter shown with: ' value={filter} changeHandler={getFilter} />

      <h2>add a new</h2>

      <PersonForm nameText='name: ' nameValue={newName} nameHandler={getNewName}
                  numberText='number: ' numberValue={newNumber} numberHandler={getNewNumber} 
                  submitHandler={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personToShow} deleteHandler = {deleteHandler} />
    </div>
  )
}

export default App

/*
Remaining issues I found:
1. empty name and number can be added
2. Because the appState is not shared between different broswer: 
   if we open two browser, and add a person Esther via one broeser, and without refresh, add Esther to via another browser, 
   it will succeed and cause two Esther in the server 
   (the second browser doesn't know the changes of persons, and without refresh, it also doesn't know cahnges on the server)
*/

