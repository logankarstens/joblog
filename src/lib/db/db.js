import mongoose from "mongoose";
const { DB_URI } = process.env;

export const connect = async () => {
  try {
      let { connection } = await mongoose.connect(DB_URI)
      if (connection.readyState === 1) {
        return Promise.resolve(true);
      }
 
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};