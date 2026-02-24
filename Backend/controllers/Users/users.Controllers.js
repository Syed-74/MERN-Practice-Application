const User = require("../../models/Users/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if(password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in register route:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Validate required fields
    if (!email && !username) {
      return res.status(400).json({ message: "Email or username is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Check if user exists (by email or username)
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Send success response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        lastLogin: user.lastLogin,
        role: user.role,
        token: generateToken(user),
      },
    });
    console.log(user);
  } catch (error) {
    console.error("Error in login route:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  }
  catch (error) {
    console.error("Error in getProfile route:", error);
    res.status(500).json({ message: "Server error" });
  } 
};

module.exports = { register, login, getProfile };
