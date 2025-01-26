const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./Config/db");
const userRoutes = require("./routes/userRoutes");
const pinRoutes = require("./routes/pinRoutes");
const boardRoutes = require("./routes/boardRoutes");
const app = express();
  

 // Load environment variables
 dotenv.config();
// console.log("JWT_SECRET from .env in index.js:", process.env.JWT_SECRET);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use(express.json());
// Routes
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/pins", require("./routes/pinRoutes"));
// app.use("/api/boards", require("./routes/boardRoutes"));

app.use("/api/users", userRoutes);
app.use("/api/pins", pinRoutes);
app.use("/api/boards", boardRoutes);

// Root endpoint
app.get("/", (req, res) => {
  console.log("Root endpoint hit"); // Debugging log
  res.send("Welcome to the Pinterest Clone API");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
