import { redisClient } from "../../models/redis/index.js"

export const get = async (req, res) => {
  try {
    console.log(req)
    const uuid = req.params.uuid
    const sheet = await redisClient.get(uuid)
    res.send({ sheet })
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
    await redisClient.set(uuid, sheet)
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
