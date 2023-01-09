import express from 'express'
import { getAll } from '../../controllers/mongo/partitions.controller.js'

const partition = app => {
  const router = express.Router()
  router.get('/', getAll)
  app.use('/partitions', router)
}

export default partition