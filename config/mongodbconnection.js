import mongoose from "mongoose";

const mongoDbConnection = async()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDb Connected Successfully");
  } catch (error) {
    console.log("Error occur while connecting",error);
    process.exit(1);
  }
}
export default mongoDbConnection