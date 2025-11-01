const mongoose = require('mongoose')
mongoose.set('strictQuery', false) // only use field in schema to query

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

function validateNumber(number) {
  const arr = number.split('-')
  if (arr.length !== 2) {
    return false
  }

  if (arr[0].length !== 2 && arr[0].length !== 3) {
    return false
  }

  return true
}

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number:{
    type: String,
    minLength: 8,
    validate: { validator: validateNumber, message: 'phone number is not of correct form' },
    required: true
  }
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', phonebookSchema)