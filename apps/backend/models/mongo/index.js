import mongoose from 'mongoose'
import dotenv from 'dotenv'
import NoteSchema from './notes.model.js'

dotenv.config()

const Note = mongoose.model('Note', NoteSchema)

const mongoConnection = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(process.env.DB_MONGO)
}

export {
  mongoConnection,
  Note,
}