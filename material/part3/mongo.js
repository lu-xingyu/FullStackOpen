const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}
// process is a global object of Node.js, represent the current process of the program

const password = process.argv[2]

const url = `mongodb+srv://estrellalxy_db_user:${password}@cluster0.addi0ax.mongodb.net/noteApp?appName=Cluster0`

mongoose.connect(url)   // connect to database, return a promise

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})   // define schema of collection

const Note = mongoose.model('Note', noteSchema)
// Create a inner model in mongoDB named Note, and create a collection named "notes" according to noteSchema, 
// and return the inner model as a class, which can be used to operate the collection


Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

/*
const note = new Note({
  content: 'Mongogoose makes things easy',
  important: true,
})

// create object / instance of Note class

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
*/
// save() note object in to collection, return a promise
// .then() call th Fn after the note is successfully saved