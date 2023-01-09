import mongoose from 'mongoose';
import dotenv from 'dotenv';
import NoteSchema from './notes.model';

dotenv.config();

const Note = mongoose.model('Note', NoteSchema);

const mongoConnection = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.DB_MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    console.error(error);
  }
};

export { mongoConnection, Note };