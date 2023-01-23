import { MusicSheet } from "../../models/mongo/index.js"
import { redisClient } from "../../models/redis/index.js"

const get = async (req, res) => {
  try {
    const id = req.params.id
    const sheet = await MusicSheet.findById(id)
    res.send(sheet)
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message)
    } else {
      res.status(400).send("Unknown error.")
    }
  }
}

const set = async (req, res) => {
  try {
    const uuid = req.params.uuid
    const sheet = JSON.parse(await redisClient.get(uuid))
    const musicSheet = new MusicSheet({
      sheet: sheet,
    })
    await musicSheet.save()
    res.send(musicSheet)
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message)
    } else {
      res.status(400).send("Unknown error.")
    }
  }
}

export default {
  get,
  set,
}
