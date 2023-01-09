import express from 'express'
import bodyParser from 'body-parser'
import noteRedisRoutes from './routes/redis/notes.routes.js'
import noteMongoRoutes from './routes/mongo/notes.routes.js'
import { mongoConnection } from './models/mongo/index.js'
import { redisConnection } from './models/redis/index.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

mongoConnection()
//redisConnection()

noteRedisRoutes(app)
noteMongoRoutes(app)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})