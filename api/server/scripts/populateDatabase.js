require("dotenv").config();

const { connectDB, disconnectDB } = require("../database/connection");
const userService = require("../services/userService");

const users = [
  {
    firstName: "Chloé",
    lastName: "Durand",
    email: "chloe.durand@devmail.com",
    password: "password123",
  },
  {
    firstName: "Jean",
    lastName: "Martin",
    email: "jean.martin@devmail.com",
    password: "password456",
  },
];

async function populate() {
  try {
    await connectDB();
    console.log("✅ Connected to the DB, we can populate…");

    const User = require("../database/models/userModel");
    await User.deleteMany({});
    console.log("🗑️  Users collection emptied.");

    for (const u of users) {
      try {
        await userService.createUser({
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          password: u.password,
        });
        console.log(`👤 Created user ${u.email}`);
      } catch (error) {
        console.error(`⚠️  Could not create ${u.email}:`, err.message);
      }
    }
    await disconnectDB();
    console.log("🎉 Data population completed !");
    process.exit(0);
  } catch (error) {
    console.error("❌ Data population error :", error);
    process.exit(1);
  }
}

populate();
