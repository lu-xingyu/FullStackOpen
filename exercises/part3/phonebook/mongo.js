const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as an argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://estrellalxy_db_user:${password}@cluster0.addi0ax.mongodb.net/phonebook?appName=Cluster0`

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebookSchema)
if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const newName = process.argv[3]
  const newNumber = process.argv[4]
  const newPerson = new Person ({
    name: newName,
    number: newNumber,
  })
  newPerson.save().then(() => {
    console.log(`added ${newName} number ${newNumber} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('please provide person name and number')
  mongoose.connection.close()
}






