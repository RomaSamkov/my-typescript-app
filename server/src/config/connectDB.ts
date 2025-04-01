import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MONGODB connect: " + connection.connection.host);
  } catch (error) {
    if (error instanceof Error) {
      console.log("MONGODB connection is: " + error.message);
    } else {
      console.log("MONGODB connection failed with an unknown error");
    }
    process.exit(1);
  }
};
