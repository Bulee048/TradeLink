require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

// Attempt to bypass local SRV DNS restrictions
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
  console.log("⚠️ Could not set custom DNS servers");
}
const jobs = require("./routes/jobs");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Routes
app.use("/api/jobs", jobs);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    // We don't exit here so the server can still respond with errors instead of dropping connections
  });

const server = app.listen(PORT, () => {
  console.log(`🚀 TradeLink API running on http://127.0.0.1:${PORT}`);
});

server.on('error', (err) => {
  console.error('❌ Server error:', err.message);
});
