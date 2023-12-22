import mongoose from "mongoose";

const Connect = async () => {
  // if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

export default Connect;