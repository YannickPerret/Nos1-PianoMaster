import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema({
  note: String,
})

export default NoteSchema