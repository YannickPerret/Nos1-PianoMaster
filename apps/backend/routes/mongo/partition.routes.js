import express from 'express'
import partitionController from '../../controllers/mongo/partitions.controller.js'

const partition = app => {
  const router = express.Router()
  router.get('/', partitionController.getAll)
  router.post('/', partitionController.create)
  router.get('/:id', partitionController.getById)
  router.put('/:id', partitionController.update)
  router.delete('/:id', partitionController.delete)
  app.use('/mongo/partitions', router)
}

export default partition