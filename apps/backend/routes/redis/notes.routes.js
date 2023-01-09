import express from 'express'
import notesController from '../../controllers/redis/notes.controller.js'

const note = app => {
  const router = express.Router()
  router.post('/', notesController.create)
  router.get('/:id', notesController.getById)
  router.put('/:id', notesController.update)
  router.delete('/:id', notesController.deleteById)
  
  app.use('/redis/notes', router)
}

export default note