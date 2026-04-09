import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongo Connection : ${conn.connection.host}`);
  } catch (error) {
    console.log("Mongo error : ", error);
    process.exit(1);
  }
};
