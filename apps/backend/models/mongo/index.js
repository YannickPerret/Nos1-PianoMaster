import mongoose from "mongoose"
import dotenv from "dotenv"
import MusicSheetSchema from "./musicSheet.model.js"

dotenv.config()

const MusicSheet = mongoose.model("MusicSheet", MusicSheetSchema)

const mongoConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("Mongo connected !")
  } catch (error) {
    console.error(error)
  }
}

export { mongoConnection, MusicSheet }
