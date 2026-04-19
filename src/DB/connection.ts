import mongoose from "mongoose";
import { DB_URL } from "../config";

export const connectDB = async () => {
  //type assertion must be accurate to avoid runtime errors
  await mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((error) => {
      console.log("DB connection failed", error.message);
    });
};
