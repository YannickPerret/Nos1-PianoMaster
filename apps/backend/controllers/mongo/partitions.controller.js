import { Note } from '../../models/mongo/index.js'

const getAll = async (req, res) => {
  const notes = await Note.find()
  res.send(notes)
}

const create = async (req,res) => {
  const note = new Note({
    note: req.body.note
  })
  note.save()

  res.send(note)
}

export default {
  getAll,
  create,
}