import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI!;
  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // koliko dugo čeka da pronađe primarni node
      socketTimeoutMS: 45000, // koliko dugo čeka na odgovor
      connectTimeoutMS: 10000, // koliko dugo pokušava da se spoji
    } as mongoose.ConnectOptions); // 🔥 eksplicitno castanje tipa

    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
