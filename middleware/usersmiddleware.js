const User = require("../models/users");
const jwt = require('jsonwebtoken');

function authMiddleware(req, res,next) {
    let auth = req.headers.authorization;
    console.log("Auth", auth)
    if (!auth) {
        return res.status(401).json({ msg: "Authorization token is missing" });
    }
    try {
        const token = jwt.verify(auth, process.env.jwt_secret_key);
        req.userId = token.userId; // attach to request object
        console.log("Authtoken.userId", token.userId)
        next(); // pass to next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
    
}

module.exports = {
    authMiddleware
}