import mongoose from "mongoose";
import { ConnectionOptions } from "tls";

// Connection to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI as string,
      {
        useNewUrlParser: true,
        dbName: "AutonomizeAI-MachineTest",
      } as ConnectionOptions
    );
    console.log("Database is connected");
  } catch (error: any) {
    throw new Error("Internal Server Error");
  }
};

export default connectDB;
