const express = require("express");
const dotenv = require("dotenv");
const UserRoutes = require("../Backend/routes/Users/users.Routes");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/Users", UserRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
