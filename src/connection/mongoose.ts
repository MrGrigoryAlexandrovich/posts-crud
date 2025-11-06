import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI!;
  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      dbName: "admin",
    });

    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
