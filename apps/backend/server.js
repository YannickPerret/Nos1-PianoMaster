import express from "express"
import bodyParser from "body-parser"
import musicSheetRedisRoutes from "./routes/redis/musicSheet.routes.js"
import musicSheetMongoRoutes from "./routes/mongo/musicSheet.routes.js"
import { mongoConnection } from "./models/mongo/index.js"
import { redisConnection } from "./models/redis/index.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

mongoConnection()
redisConnection()

app.get("/", (req, res) => {
  res.send("foo")
})

musicSheetRedisRoutes(app)
musicSheetMongoRoutes(app)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
