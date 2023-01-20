import express from "express"
import musicSheetController from "../../controllers/redis/musicSheet.controller.js"

const musicSheet = (app) => {
  const router = express.Router()
  router.get("/:uuid", musicSheetController.get)
  router.post("/:uuid", musicSheetController.set)

  app.use("/temp/music-sheets", router)
}

export default musicSheet
