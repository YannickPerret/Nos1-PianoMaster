import express from 'express'
import notesController from '../../controllers/mongo/notes.controller.js'

const note = app => {
  const router = express.Router()
  router.get('/', notesController.getAll)
  router.post('/', notesController.create)
  router.get('/:id', notesController.getById)
  router.put('/:id', notesController.update)
  router.delete('/:id', notesController.deleteById)
  app.use('/mongo/notes', router)
}

export default note