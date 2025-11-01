require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
var morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (request, response) => {
  return JSON.stringify(request.body)
})

app.use(morgan('tiny', {skip: (request, response) => {
  return (request.method === "POST")
}}))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {skip: (request, response) => {
  return (request.method !== "POST")
}}))


/*
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
*/

app.get('/info', async (request, response) => {
    const time = new Date();
    const count = await Person.countDocuments();
    response.send(`
      <div> 
        <p>Phonebook has info for ${count} people</p> 
        <p>${time.toString()}</p> 
      </div>`
    )
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person) {
        response.json(person)
      } else {
        response.status(404).end()
      } 
    })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(deletedPerson => {
      response.status(204)
      response.json(deletedPerson)
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response) =>{
  const body = request.body

  if ((!body.name) || (!body.number)) {
    return response.status(400).json({
       error: 'the name or number is missing' 
    })
  } else {
    const newPerson = new Person({
      name: body.name,
      number: body.number
    })
    newPerson.save().then(savedPerson => {
      response.json(savedPerson)
    })
  }
})

app.put('/api/persons/:id', (request, response) => {
  const {person, number} = request.body
  Person.findById(request.params.id)
    .then(p => {
      if (!p) {
        response.status(404).end()
      } else {
        p.person = person
        p.number = number
        p.save()
          .then(updatedPerson => {
            response.json(updatedPerson)
          })  
      }
   })
   .catch(error => next(error))
})


const unkownEndpoint = (resuest, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(unkownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name = 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})