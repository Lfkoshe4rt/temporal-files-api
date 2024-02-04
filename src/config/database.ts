import "dotenv/config";
import mongoose from "mongoose";

const conectDB = async () => {
  try {
   
    const databaseUrl = process.env.DATABASE;
   
    if (!databaseUrl) {
      throw new Error("Database URL is not defined");
    }

    await mongoose.connect(databaseUrl);

    console.log("Database connected successfully 🚀");
  } catch (error) {
    console.log("Database connection failed 🚨");
  }
};

export default conectDB;
