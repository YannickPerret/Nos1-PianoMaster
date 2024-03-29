import { redisClient } from "../../models/redis/index.js"

export const get = async (req, res) => {
  try {
    const uuid = req.params.uuid
    const sheet = await redisClient.get(uuid)
    res.send(JSON.parse(sheet))
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message)
    } else {
      res.status(400).send("Unknown error.")
    }
  }
}
export const set = async (req, res) => {
  try {
    const sheet = req.body.sheet
    const uuid = req.params.uuid
    await redisClient.set(uuid, JSON.stringify(sheet))
    res.status(204).send()
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message)
    } else {
      res.status(400).send("Unknown error.")
    }
  }
}

export default { get, set }
