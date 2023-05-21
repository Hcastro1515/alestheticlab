import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const mongoConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit();
  }
}

export default mongoConnect; 
