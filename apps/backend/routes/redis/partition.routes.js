import express from 'express'
import { addNote } from '../../controllers/redis/partitions.controller.js'

const partition = app => {
  const router = express.Router()
  router.post('/', addNote)
  app.use('/partitions', router)
}

export default partition