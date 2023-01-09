import { Note } from '../../models/mongo/index.js'

const getAll = async (req, res) => {
  try {
    const notes = await Note.find()
    res.send(notes)
  } catch (error) {
    res.status(500).send(error)
  }
}

const create = async (req,res) => {
  try {
    const note = new Note({
      note: req.body.note
    })
    await note.save()
    res.send(note)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    if (!note) res.status(404).send("Aucune note trouvée avec cet ID.")
    res.send(note)
  } catch (error) {
    res.status(500).send(error)
  }
}

const update = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!note) res.status(404).send("Aucune note trouvée avec cet ID.")
    res.send(note)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteById = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id)
    if (!note) res.status(404).send("Aucune note trouvée avec cet ID.")
    res.send(note)
  } catch (error) {
    res.status(500).send(error)
  }
}

export default {
  getAll,
  create,
  getById,
  update,
  deleteById,
}