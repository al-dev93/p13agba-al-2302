require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDocs = yaml.load("./swagger.yaml");
const { connectDB, disconnectDB } = require("./database/connection");

const app = express();
const PORT = process.env.PORT || 3001;
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.FRONTEND_URL]
    : ["http://localhost:3000", process.env.FRONTEND_URL].filter(Boolean);

// Connect to the database
(async () => await connectDB())();

// Handle CORS issues
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB, exiting...", err);
    process.exit(1);
  }
})();

// Handle custom routes
app.use("/api/v1/user", require("./routes/userRoutes"));

// API Documentation
if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

app.get("/health", (req, res) => {
  res.status(200).send("ok");
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, disconnecting DB...");
  await disconnectDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, disconnecting DB...");
  await disconnectDB();
  process.exit(0);
});
