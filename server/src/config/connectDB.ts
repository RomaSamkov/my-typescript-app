import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MONGODB connect: " + connection.connection.host);
  } catch (error) {
    console.log("MONGODB connection is: " + error);
    process.exit(1);
  }
};
