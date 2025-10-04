const User = require("../models/users");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");




async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({})
  return res.json(allDbUsers);
}

async function handleUsersProfile(req, res) {
  const allDbUsers = await User.find({})
  return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
  let auth = req.headers.authorization;
  let userId = req.userId

  console.log("userId", userId)

  const userDetails = await User.findById(userId);
  // const userDetails = await User.findById(userId);

  if (!userDetails) return res.status(400).json({ error: "User not found." });

  return res.json({ userDetails, token: auth });
}

async function handleDeleteUserById(req, res) {
  const userDetails = await User.findByIdAndDelete(req.params.userId);
  if (!userDetails) return res.status(400).json({ error: "User not found" });
  return res.json({ status: "Delete User Successfully" });
}

async function handleCreateUser(req, res) {
  try {
    var body = req.body;
    const { name, email, phoneNo, password, dob } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "Failure",
        message: "Email already exists!"
      });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Body", body)
    const user = await User.create({
      name,
      email,
      phoneNo,
      dob,
      password: hashedPassword
    });
    return res.status(201).json({
      status: "Success",
      message: "User created successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNo: user.phoneNo,
        dob: user.dob
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "Failure", message: "Server error" });
  }



}

async function handleLogInUser(req, res) {
 try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({status: "Failure", message: "All fields are required!" });
    }

    // 2️⃣ Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({status: "Failure", message: "Invalid credentials! Email not found." });
    }

    // 3️⃣ Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({status: "Failure", message: "Invalid credentials! Incorrect password." });
    }

    // 4️⃣ Create JWT token
    const payload = { userId: user._id };
    const secretKey = process.env.jwt_secret_key;
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" }); // token expires in 1 hour

    // 5️⃣ Return success response
    return res.status(200).json({
      status: "Success",
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNo: user.phoneNo,
        dob: user.dob,
        token
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ status: "Failure", message: "Server error" });
  }
}
module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleDeleteUserById,
  handleCreateUser,
  handleLogInUser,
  handleUsersProfile
}