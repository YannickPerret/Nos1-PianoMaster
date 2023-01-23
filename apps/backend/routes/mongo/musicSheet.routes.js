import express from "express"
import musicSheetController from "../../controllers/mongo/musicSheet.controller.js"

const musicSheet = (app) => {
  const router = express.Router()
  router.get("/:id", musicSheetController.get)
  router.post("/:uuid", musicSheetController.set)
  app.use("/music-sheets", router)
}

export default musicSheet
