import express from "express"
import bodyParser from "body-parser"
import musicSheetRedisRoutes from "./routes/redis/musicSheet.routes.js"
import noteMongoRoutes from "./routes/mongo/notes.routes.js"
//import { mongoConnection } from "./models/mongo/index.js"
import { redisConnection } from "./models/redis/index.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send();
});

app.use(bodyParser.json())

//mongoConnection()
redisConnection()

app.get("/", (req, res) => {
  res.send("foo")
})

musicSheetRedisRoutes(app)
//noteMongoRoutes(app)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
