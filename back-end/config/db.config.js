import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    let db = await mongoose.connect("mongodb://127.0.0.1:27017/Book");
    console.log("db is connected : ", db.connection.name);
  } catch (error) {
    console.log("db is not connect : ", error);
  }
};

export default dbConnect;
