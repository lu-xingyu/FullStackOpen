const express = require('express')
const app = express()
app.use(express.json())

const MAX = 100000

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  const time = new Date()
  response.send(`
    <div> 
      <p>Phonebook has info for ${persons.length} people</p> 
      <p>${time.toString()}</p> </div>`
  )
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const person = persons.find(person => person.id === request.params.id)
  if (!person) {
    return response.status(404).end()
  }
  return response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  persons = persons.filter(p => p.id !== request.params.id)
  response.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * MAX)
}

app.post('/api/persons', (request, response) =>{
  const body = request.body

  if ((!body.name) || (!body.number)) {
    return response.status(400).json({
       error: 'the name or number is missing' 
    })
  } else if (persons.find(p => p.name === body.name)) {
    return response.status(400).json({
       error: 'name must be unique' 
    })
  }

  const newId = String(generateId())
  const newPerson = {
    "id": newId,
    "name": body.name,
    "number": body.number
  }

  persons = persons.concat(newPerson)
  response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})