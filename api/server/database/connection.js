const mongoose = require("mongoose");

const isProd = process.env.NODE_ENV === "production";
const databaseUrl = isProd
  ? process.env.DATABASE_URL_PROD
  : process.env.DATABASE_URL_DEV;

if (!databaseUrl) {
  throw new Error(`MongoDB URI non définie (NODE_ENV=${process.env.NODE_ENV})`);
}

async function connectDB() {
  try {
    const conn = await mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
        autoIndex: !isProd,
      },
    });
    console.log(
      `Database successfully connected to ${
        isProd ? "production" : "development"
      } DB`
    );
    return conn;
  } catch (error) {
    console.error("❌ Database connectivity error : ", error);
    throw error;
  }
}

async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log("✅ Database disconnected");
  } catch (error) {
    console.error("❌ Error during database disconnection:", error);
  }
}

module.exports = { connectDB, disconnectDB };
