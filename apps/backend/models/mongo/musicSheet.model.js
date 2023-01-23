import mongoose from "mongoose"

const MusicSheetSchema = new mongoose.Schema({
  sheet: {
    sol: [],
    fa: [],
  },
})

export default MusicSheetSchema
