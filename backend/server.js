const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI =
  "mongodb+srv://psvishnu131:vishnu@cluster0.uzjsjsi.mongodb.net/";

// Routes
app.post("/api/register", async (req, res) => {
  try {
    const { name, mobile } = req.body;

    const user = new User({
      name,
      mobile,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
});

// New endpoint to get users from Memunda temple
app.get("/api/users/memunda", async (req, res) => {
  try {
    const users = await User.find({ temple: "Memunda" });
    const count = users.length;
    res.json({ users, count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

const PORT = 5001;
app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Error ", error);
  }
});
