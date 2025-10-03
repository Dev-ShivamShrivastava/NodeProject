const User = require("../models/users");
const jwt = require('jsonwebtoken');



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

    return res.json({userDetails,token:auth});
}

async function handleDeleteUserById(req, res) {
    const userDetails = await User.findByIdAndDelete(req.params.userId);
    if (!userDetails) return res.status(400).json({ error: "User not found" });
    return res.json({ status: "Delete User Successfully" });
}

async function handleCreateUser(req, res) {
    var body = req.body;
    console.log("Body", body)
    if (!body) {
        return res.status(200).json({ status:"Failure", code:400, msg: "All fields are required!" })
    } else if (!body.firstName) {
        return res.status(200).json({ status:"Failure", code:400, msg: "First name is required!" })
    } else if (!body.lastName) {
        return res.status(200).json({status:"Failure", code:400, msg: "Last name is required!" })
    } else if (!body.email) {
        return res.status(200).json({status:"Failure", code:400, msg: "Email is required!" })
    } else if (!body.password) {
        return res.status(200).json({status:"Failure", code:400, msg: "Password is required!" })
    }
    const result = await User.create({ firstName: body.firstName, lastName: body.lastName, email: body.email, gender: body.gender, password: body.password });
    console.log("result", result);
    return res.status(201).json(result);
}

async function handleLogInUser(req, res) {
    var body = req.body;
    console.log("Body", body)
    if (!body || !body.email || !body.password) {
        return res.status(400).json({ msg: "All fields are required!" })
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
        return res.status(401).json({ msg: "Invalid Credentials!. Please enter correct email and password." });
    }
    const payload = { userId: user._id};
    const secretKey = process.env.jwt_secret_key;
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour

    console.log("result", user);
    return res.status(200).json({ user, token });
}
module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleDeleteUserById,
    handleCreateUser,
    handleLogInUser,
    handleUsersProfile
}