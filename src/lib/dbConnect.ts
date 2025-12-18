import mongoose from "mongoose";

type ConnectionObject = {
  isConnnected?: number;
};
const connection: ConnectionObject = {};

async function connectDB(): Promise<void> {
  if (connection.isConnnected) {
    console.log("Already Conncted to DB");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "");
    connection.isConnnected = db.connections[0].readyState;
    console.log("✅DB Connected Successfully");
  } catch (error) {
    console.log("❌DB Connection Failed", error);
    process.exit();
  }
}
export default connectDB;
