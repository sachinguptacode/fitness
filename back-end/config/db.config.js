import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/fitness`);
  } catch (error) {
    console.log("db is not connect : ", error);
  }
};

export default dbConnect;
