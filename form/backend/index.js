const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const form1Routes = require("./routes/form1Routes");
const form2Routes = require("./routes/form2Routes");
const form3Routes = require("./routes/form3Routes");
const form4Routes = require("./routes/form4Routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use("/api/form1", form1Routes);
app.use("/api/form2", form2Routes);
app.use("/api/form3", form3Routes);
app.use("/api/form4", form4Routes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
