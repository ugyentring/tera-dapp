// backend/config/db.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js"; // Ensure the User model is correctly imported

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    console.log("✅ MongoDB connected successfully");

    // Check if the predefined user (supervisor) exists
    const existingUser = await User.findOne({ email: "bhutantera@gvt.bt" });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("Bhutangovt@123", 10);
      const newUser = new User({
        cid: "9876543210", // Example CID for supervisor
        email: "bhutantera@gvt.bt",
        phone: "1234567890",
        password: hashedPassword,
        isSupervisor: true, // Mark this user as supervisor
      });

      await newUser.save();
      console.log(
        "✅ Predefined supervisor (government) user inserted into database."
      );
    } else {
      console.log("ℹ️ Predefined supervisor already exists.");
    }
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
