import express from 'express'
import bodyParser from 'body-parser'
import partitionRedis from './routes/redis/partition.routes.js'
import partitionMongo from './routes/mongo/partition.routes.js'
import { mongoConnection } from './models/mongo/index.js'

const app = express()
const port = 3000

app.use(bodyParser.json())

mongoConnection()

partitionRedis(app)
partitionMongo(app)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})